/**
 * Server-only module: generates an impid token for the SWARM anti-fraud iframe.
 *
 * Algorithm mirrors swarm/integration_tests/sdk-e2e/build-qq.ts exactly:
 *   plaintext = "IP|YYYY-MM-DD_HH:MM:SS|USER_AGENT|USER_ID"
 *   iv        = random 16 bytes
 *   ciphertext = AES-256-CBC(key, iv, PKCS7-pad(plaintext))
 *   impid     = base64(iv ‖ ciphertext)
 *
 * PKCS7 padding is applied manually and setAutoPadding(false) is used so that
 * Node's cipher does not add a second padding block (Go auth strips only one).
 */

import { createCipheriv, randomBytes } from 'crypto';

/** Returns the current UTC time formatted as "YYYY-MM-DD_HH:MM:SS". */
export function nowUTC(): string {
  const d = new Date();
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const h = String(d.getUTCHours()).padStart(2, '0');
  const min = String(d.getUTCMinutes()).padStart(2, '0');
  const s = String(d.getUTCSeconds()).padStart(2, '0');
  return `${y}-${mo}-${day}_${h}:${min}:${s}`;
}

export interface BuildImpidParams {
  /** 32-byte AES-256 key */
  key: Buffer;
  /** Client IPv4 (or "IP_XFF" form if XFF present) — must match what SWARM auth sees */
  ip: string;
  /** User-Agent string — must exactly match the iframe request UA */
  ua: string;
  /** Visitor / ad ID — non-empty, max 256 chars */
  userId: string;
}

/**
 * Encrypts the impid payload and returns the base64-encoded token.
 * The token must be URL-encoded before embedding in the iframe src.
 */
export function buildImpid({ key, ip, ua, userId }: BuildImpidParams): string {
  if (key.length !== 32) throw new Error('[antifraud] key must be exactly 32 bytes');
  if (!ip) throw new Error('[antifraud] ip is required');
  // Go auth rejects empty UA: `if ua == "" { return nil, fmt.Errorf("missing user agent") }`
  if (!ua) throw new Error('[antifraud] ua is required');
  if (!userId) throw new Error('[antifraud] userId is required');
  // The Go auth service parses exactly 4 pipe-delimited fields; any | in the
  // individual fields would shift the split and cause permanent auth rejection.
  if (ip.includes('|')) throw new Error('[antifraud] ip must not contain "|"');
  if (ua.includes('|')) throw new Error('[antifraud] ua must not contain "|"');
  if (userId.includes('|')) throw new Error('[antifraud] userId must not contain "|"');
  // Auth service rejects userId longer than 256 chars
  if (userId.length > 256) throw new Error('[antifraud] userId exceeds 256 chars');

  const ts = nowUTC();
  const iv = randomBytes(16);
  const plain = Buffer.from(`${ip}|${ts}|${ua}|${userId}`, 'utf-8');

  // Manual PKCS7 pad to a 16-byte boundary
  const padLen = 16 - (plain.length % 16);
  const padded = Buffer.alloc(plain.length + padLen);
  plain.copy(padded);
  for (let i = plain.length; i < padded.length; i++) padded[i] = padLen;

  const cipher = createCipheriv('aes-256-cbc', key, iv);
  // Disable Node's automatic padding — we already padded manually above
  cipher.setAutoPadding(false);
  const encrypted = Buffer.concat([cipher.update(padded), cipher.final()]);

  return Buffer.concat([iv, encrypted]).toString('base64');
}
