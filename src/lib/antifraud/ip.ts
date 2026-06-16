/**
 * Server-only module: client IP extraction and CIDR subnet matching.
 * Supports IPv4 and IPv6.
 */

/**
 * Extracts the real client IP from request headers.
 * Priority: x-forwarded-for (leftmost / client-originated) → Netlify native
 * header → x-real-ip.
 *
 * NOTE on ordering: when the request passes through Next.js proxy (middleware),
 * the SSR function sits behind Netlify's edge hop, so x-nf-client-connection-ip
 * reports that internal hop (e.g. an AWS 3.64.x address) rather than the real
 * visitor. The originating client is the leftmost entry of x-forwarded-for, so
 * we trust that first and fall back to the Netlify header only if XFF is absent.
 */
export function getClientIp(headers: Headers): string {
  // Leftmost x-forwarded-for entry is the client-originated address. This must
  // match the IP the SWARM auth service sees when the browser loads the iframe.
  const xff = headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0].trim();
    if (first) return first;
  }

  // Fallback: Netlify's TCP-peer header (correct when no proxy hop is in front)
  const nfIp = headers.get('x-nf-client-connection-ip');
  if (nfIp) return nfIp.trim();

  // Last-resort fallback
  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return '';
}

// ── IPv4 helpers ──────────────────────────────────────────────────────────────

function ipv4ToUint32(ip: string): number | null {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  let result = 0;
  for (const part of parts) {
    const n = parseInt(part, 10);
    if (isNaN(n) || n < 0 || n > 255 || part.trim() !== String(n)) return null;
    result = (result << 8) | n;
  }
  return result >>> 0;
}

function parseIPv4Cidr(cidr: string): { net: number; mask: number } | null {
  const slash = cidr.indexOf('/');
  if (slash === -1) return null;
  const addr = cidr.slice(0, slash);
  const bitsStr = cidr.slice(slash + 1);
  const bits = Number(bitsStr);
  // Reject non-integers (e.g. "24.5") and out-of-range values
  if (!Number.isInteger(bits) || bits < 0 || bits > 32) return null;
  const net = ipv4ToUint32(addr);
  if (net === null) return null;
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return { net: (net & mask) >>> 0, mask };
}

// ── IPv6 helpers (byte-array based, ES2017 compatible) ───────────────────────

function expandIPv6(ip: string): string | null {
  // Strip optional zone ID (e.g. fe80::1%eth0)
  const zoneIdx = ip.indexOf('%');
  if (zoneIdx !== -1) ip = ip.slice(0, zoneIdx);

  if (!ip.includes('::')) {
    const groups = ip.split(':');
    return groups.length === 8 ? ip : null;
  }
  const sides = ip.split('::');
  if (sides.length !== 2) return null;
  const left = sides[0] ? sides[0].split(':') : [];
  const right = sides[1] ? sides[1].split(':') : [];
  const missingCount = 8 - left.length - right.length;
  if (missingCount < 0) return null;
  const middle = Array<string>(missingCount).fill('0');
  return [...left, ...middle, ...right].join(':');
}

function ipv6ToBytes(ip: string): Uint8Array | null {
  const expanded = expandIPv6(ip);
  if (!expanded) return null;
  const groups = expanded.split(':');
  if (groups.length !== 8) return null;
  const bytes = new Uint8Array(16);
  try {
    for (let i = 0; i < 8; i++) {
      const val = parseInt(groups[i] || '0', 16);
      if (isNaN(val) || val < 0 || val > 0xffff) return null;
      bytes[i * 2] = (val >> 8) & 0xff;
      bytes[i * 2 + 1] = val & 0xff;
    }
  } catch {
    return null;
  }
  return bytes;
}

function parseIPv6Cidr(cidr: string): { net: Uint8Array; mask: Uint8Array } | null {
  const slash = cidr.indexOf('/');
  if (slash === -1) return null;
  const addr = cidr.slice(0, slash);
  const bitsStr = cidr.slice(slash + 1);
  const bits = Number(bitsStr);
  // Reject non-integers (e.g. "64.5") and out-of-range values
  if (!Number.isInteger(bits) || bits < 0 || bits > 128) return null;
  const net = ipv6ToBytes(addr);
  if (net === null) return null;
  // Build 128-bit mask as 16 bytes
  const mask = new Uint8Array(16);
  for (let i = 0; i < bits; i++) {
    mask[Math.floor(i / 8)] |= 1 << (7 - (i % 8));
  }
  const maskedNet = new Uint8Array(16);
  for (let i = 0; i < 16; i++) maskedNet[i] = net[i] & mask[i];
  return { net: maskedNet, mask };
}

function ipv6InCidr(
  ipBytes: Uint8Array,
  cidr: { net: Uint8Array; mask: Uint8Array }
): boolean {
  for (let i = 0; i < 16; i++) {
    if ((ipBytes[i] & cidr.mask[i]) !== cidr.net[i]) return false;
  }
  return true;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Normalises IPv4-mapped IPv6 addresses to plain IPv4 so they match IPv4 CIDRs.
 * Handles both forms:
 *   ::ffff:1.2.3.4       (dotted-decimal, most common from Netlify/Linux)
 *   ::ffff:0102:0304     (hex-encoded, RFC 5952 alternative)
 * Returns the input unchanged for all other addresses.
 */
function normalizeIp(ip: string): string {
  // Dotted-decimal form: ::ffff:1.2.3.4
  const dotted = /^::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/i.exec(ip);
  if (dotted) return dotted[1];

  // Hex form: ::ffff:aabb:ccdd  (two 16-bit hex groups encoding 4 bytes)
  const hex = /^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i.exec(ip);
  if (hex) {
    const hi = parseInt(hex[1], 16);
    const lo = parseInt(hex[2], 16);
    return `${hi >> 8}.${hi & 0xff}.${lo >> 8}.${lo & 0xff}`;
  }

  return ip;
}

/**
 * Returns true if `ip` falls within any of the provided CIDRs.
 * An empty `cidrs` array means "allow all".
 */
export function isIpInSubnets(ip: string, cidrs: string[]): boolean {
  if (cidrs.length === 0) return true;

  // Normalise ::ffff:x.x.x.x to plain IPv4 so v4 CIDRs still match
  const normalised = normalizeIp(ip);
  const v4 = ipv4ToUint32(normalised);
  const v6Bytes = v4 === null ? ipv6ToBytes(normalised) : null;

  for (const cidr of cidrs) {
    const isV6Cidr = cidr.includes(':');
    if (isV6Cidr) {
      if (v6Bytes === null) continue;
      const parsed = parseIPv6Cidr(cidr);
      if (parsed && ipv6InCidr(v6Bytes, parsed)) return true;
    } else {
      if (v4 === null) continue;
      const parsed = parseIPv4Cidr(cidr);
      // >>> 0 coerces to unsigned Uint32; without it, IPs ≥ 128.0.0.0 compare as negative
      if (parsed && ((v4 & parsed.mask) >>> 0) === parsed.net) return true;
    }
  }
  return false;
}

/** Also export for use in the route handler when embedding the IP in impid. */
export { normalizeIp };
