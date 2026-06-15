import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getConfig } from '@/lib/antifraud/config';
import { buildImpid } from '@/lib/antifraud/impid';
import { getClientIp, isIpInSubnets, normalizeIp } from '@/lib/antifraud/ip';

export const dynamic = 'force-dynamic';

/** First-party cookie that stores the visitor / ad-synced identity. */
const VID_COOKIE = 'af_vid';
/** Max 256 chars per SWARM auth contract. */
const MAX_USER_ID_LEN = 256;
/** 1-year TTL for the visitor cookie. */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Common ad-click ID query params that an ad network may append to the landing URL. */
const AD_CLICK_PARAMS = ['gclid', 'fbclid', 'ttclid', 'msclkid', 'click_id', 'adid'];

/** Factory — never share a single NextResponse instance across requests. */
function noShow() {
  return NextResponse.json(
    { show: false },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // ── 1. Load config (throws if misconfigured) ──────────────────────────────
  let cfg: ReturnType<typeof getConfig>;
  try {
    cfg = getConfig();
  } catch (err) {
    console.error('[antifraud]', err);
    return noShow();
  }

  if (!cfg.enabled) return noShow();

  // ── 2. Subnet gate ────────────────────────────────────────────────────────
  // normalizeIp strips ::ffff: prefix so IPv4-mapped v6 addresses match v4 CIDRs
  const rawIp = getClientIp(request.headers);
  const ip = normalizeIp(rawIp);
  if (!ip || !isIpInSubnets(ip, cfg.subnets)) return noShow();

  const ua = request.headers.get('user-agent') ?? '';

  // ── 3. Resolve USER_ID (cookie sync: ad click ID > existing cookie > new UUID) ──
  // The client component passes ?adid= when an ad-click param is found in the page URL.
  // Fall back to the persistent first-party visitor cookie, or generate a fresh UUID.
  const searchParams = request.nextUrl.searchParams;
  let adId = '';
  for (const param of AD_CLICK_PARAMS) {
    const val = searchParams.get(param);
    if (val) { adId = val.slice(0, MAX_USER_ID_LEN); break; }
  }

  // Clamp cookie value to contract limit and strip any pipe that would corrupt
  // the IP|TS|UA|UID payload (pipe chars can arrive via URL-decoded %7C click IDs)
  const sanitize = (s: string) => s.replace(/\|/g, '').slice(0, MAX_USER_ID_LEN);

  const existingVid = sanitize(request.cookies.get(VID_COOKIE)?.value ?? '');
  const userId = sanitize(adId) || existingVid || randomUUID();

  // ── 4. Mint impid ─────────────────────────────────────────────────────────
  let impid: string;
  try {
    impid = buildImpid({ key: cfg.keyBytes, ip, ua, userId });
  } catch (err) {
    console.error('[antifraud] impid generation failed:', err);
    return noShow();
  }

  const iframeUrl = `${cfg.iframeBaseUrl}/iframe?${cfg.queryParam}=${encodeURIComponent(impid)}`;

  // ── 5. Build response and persist visitor cookie ──────────────────────────
  const response = NextResponse.json(
    { show: true, url: iframeUrl },
    { headers: { 'Cache-Control': 'no-store' } }
  );

  // secure: true is required in production (Netlify always serves HTTPS).
  // In local dev (NODE_ENV=development) the cookie is served over http://localhost,
  // so we omit secure to prevent the cookie being silently dropped by the browser.
  response.cookies.set(VID_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return response;
}
