import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy (formerly "middleware"). Runs on the Node.js runtime.
 *
 * Sole responsibility: resolve the anti-fraud visitor identity (USER_ID) and
 * make it available to server rendering, so the hidden SWARM iframe can be
 * embedded directly in the initial HTML by <AntiFraudFrame /> — no client-side
 * /api/antifraud round-trip.
 *
 * Why this lives here and not in the Server Component: Server Components cannot
 * write cookies, and the ad-click query params only exist on the landing URL
 * (which a root-layout component can't read). Proxy sees both, so it:
 *   1. resolves USER_ID  = ad-click id → existing af_vid cookie → new UUID
 *   2. forwards it upstream via the x-antifraud-uid request header (so the
 *      Server Component mints an impid with the SAME id on the very first visit)
 *   3. persists it in the first-party af_vid cookie for subsequent requests
 *
 * No secret/crypto here by design (Proxy is meant to stay light and may run at
 * the edge of the deployment); the AES impid is minted in the Server Component.
 */

/** First-party cookie that stores the visitor / ad-synced identity. */
const VID_COOKIE = 'af_vid';
/** Request header used to pass the resolved USER_ID to the Server Component. */
const UID_HEADER = 'x-antifraud-uid';
/** Max 256 chars per SWARM auth contract. */
const MAX_USER_ID_LEN = 256;
/** 1-year TTL for the visitor cookie. */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Common ad-click ID query params an ad network may append to the landing URL. */
const AD_CLICK_PARAMS = ['gclid', 'fbclid', 'ttclid', 'msclkid', 'click_id', 'adid'];

/**
 * Clamp to the contract limit and strip any pipe that would corrupt the
 * IP|TS|UA|UID impid payload (pipe chars can arrive via URL-decoded %7C ids).
 */
const sanitize = (s: string) => s.replace(/\|/g, '').slice(0, MAX_USER_ID_LEN);

export function proxy(request: NextRequest): NextResponse {
  // ── Resolve USER_ID: ad-click id > existing cookie > fresh UUID ────────────
  const params = request.nextUrl.searchParams;
  let adId = '';
  for (const param of AD_CLICK_PARAMS) {
    const val = params.get(param);
    if (val) {
      adId = val;
      break;
    }
  }

  const existingVid = sanitize(request.cookies.get(VID_COOKIE)?.value ?? '');
  const userId = sanitize(adId) || existingVid || crypto.randomUUID();

  // ── Forward USER_ID upstream via a request header ─────────────────────────
  // `.set()` overwrites any client-supplied x-antifraud-uid, so it can't be spoofed.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(UID_HEADER, userId);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // ── Persist the visitor cookie for subsequent requests ────────────────────
  // secure is required in production (Netlify is always HTTPS); omitted in dev
  // so the cookie is not silently dropped over http://localhost.
  response.cookies.set(VID_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return response;
}

export const config = {
  // Run on page navigations only; skip API routes, Next internals and metadata.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
