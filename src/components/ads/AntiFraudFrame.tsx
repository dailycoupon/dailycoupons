import { headers, cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { getConfig } from '@/lib/antifraud/config';
import { buildImpid } from '@/lib/antifraud/impid';
import { getClientIp, isIpInSubnets, normalizeIp } from '@/lib/antifraud/ip';

/** First-party cookie that stores the visitor / ad-synced identity. */
const VID_COOKIE = 'af_vid';
/** Request header set by proxy.ts carrying the resolved USER_ID. */
const UID_HEADER = 'x-antifraud-uid';
/** Max 256 chars per SWARM auth contract. */
const MAX_USER_ID_LEN = 256;

/**
 * Server Component that embeds the hidden SWARM anti-fraud iframe directly in
 * the server-rendered HTML — no client-side /api/antifraud fetch.
 *
 * The visitor identity (USER_ID) is resolved in proxy.ts and passed in via the
 * x-antifraud-uid request header (with the af_vid cookie as a fallback for any
 * route the proxy matcher skips). The encrypted impid is minted here on the
 * Node.js runtime so the AES key never leaves server rendering.
 *
 * Reading headers()/cookies() opts the route into dynamic rendering, which is
 * required: the impid embeds a per-request timestamp + IV and is per-visitor,
 * so the surrounding HTML must never be statically cached.
 */
export default async function AntiFraudFrame() {
  let cfg: ReturnType<typeof getConfig>;
  try {
    cfg = getConfig();
  } catch (err) {
    console.error('[antifraud]', err);
    return null;
  }

  if (!cfg.enabled) return null;

  // ── Subnet gate ───────────────────────────────────────────────────────────
  // normalizeIp strips ::ffff: prefix so IPv4-mapped v6 addresses match v4 CIDRs
  const h = await headers();
  const ip = normalizeIp(getClientIp(h));
  if (!ip || !isIpInSubnets(ip, cfg.subnets)) return null;

  // Go auth rejects an empty UA; bail rather than mint an invalid impid.
  const ua = h.get('user-agent') ?? '';
  if (!ua) return null;

  // ── Resolve USER_ID (proxy header → cookie fallback → fresh UUID) ─────────
  let userId = h.get(UID_HEADER) ?? '';
  if (!userId) {
    const cookieStore = await cookies();
    userId = cookieStore.get(VID_COOKIE)?.value ?? '';
  }
  if (!userId) userId = randomUUID();
  userId = userId.replace(/\|/g, '').slice(0, MAX_USER_ID_LEN);

  // ── Mint impid and build the iframe URL ───────────────────────────────────
  let impid: string;
  try {
    impid = buildImpid({ key: cfg.keyBytes, ip, ua, userId });
  } catch (err) {
    console.error('[antifraud] impid generation failed:', err);
    return null;
  }

  const iframeUrl = `${cfg.iframeBaseUrl}/iframe?${cfg.queryParam}=${encodeURIComponent(impid)}`;

  // Hidden off-screen, sandboxed — anti-fraud probing only, no visible content.
  return (
    <iframe
      src={iframeUrl}
      sandbox="allow-scripts allow-same-origin"
      title="SWARM auth iframe"
      aria-hidden="true"
      tabIndex={-1}
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        border: 0,
        overflow: 'hidden',
      }}
    />
  );
}
