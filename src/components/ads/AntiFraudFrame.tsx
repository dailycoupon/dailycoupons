'use client';

import { useEffect, useRef } from 'react';

/**
 * Ad-click ID query params that ad/affiliate networks commonly append to landing URLs.
 * When found, the value is forwarded to the server for cookie syncing as USER_ID.
 */
const AD_CLICK_PARAMS = [
  'gclid',    // Google Ads
  'fbclid',   // Meta / Facebook
  'ttclid',   // TikTok
  'msclkid',  // Microsoft Ads
  'click_id', // Generic affiliate networks
  'adid',     // Generic ad ID
] as const;

interface AntifraudResponse {
  show: boolean;
  url?: string;
}

/**
 * Module-level flag: ensures exactly one iframe injection per browser page-load
 * (i.e. per JS module lifetime), regardless of how many component instances are
 * mounted. This matters in `per-ad` injection mode where multiple <AdSlot />
 * components each render this component.
 *
 * Resets to false on full page reload (module re-evaluates). Does NOT reset on
 * client-side navigation (desired: one injection per SPA session).
 */
let _pageInjected = false;

/**
 * Hidden anti-fraud SDK component. Mounts once per page, calls /api/antifraud
 * to get a single-use impid-bearing iframe URL, then injects a zero-size
 * sandboxed SWARM iframe into the document body.
 *
 * Injection mode is controlled by NEXT_PUBLIC_ANTIFRAUD_INJECTION_MODE:
 *   global  → rendered by layout.tsx, fires on every page
 *   per-ad  → rendered by AdSlot.tsx, fires only on pages with ad slots
 *
 * In either mode, the module-level singleton guarantees at most one injection.
 */
export default function AntiFraudFrame() {
  // Instance-level ref prevents React Strict Mode's double-invoke from
  // decrementing/resetting the module singleton before it is set.
  const instanceFired = useRef(false);

  useEffect(() => {
    // Guard 1: module-level — prevents multiple instances (per-ad mode)
    // Guard 2: instance-level — prevents React Strict Mode double-invoke
    if (_pageInjected || instanceFired.current) return;
    instanceFired.current = true;
    _pageInjected = true;

    // ── Cookie sync: forward any ad-click ID from the landing URL ────────────
    const pageParams = new URLSearchParams(window.location.search);
    let adId = '';
    for (const param of AD_CLICK_PARAMS) {
      const val = pageParams.get(param);
      if (val) {
        adId = val;
        break;
      }
    }

    const apiUrl = adId
      ? `/api/antifraud?adid=${encodeURIComponent(adId)}`
      : '/api/antifraud';

    fetch(apiUrl, {
      cache: 'no-store',
      credentials: 'same-origin',
    })
      .then((res) => {
        if (!res.ok) return;
        return res.json();
      })
      .then((data: AntifraudResponse | undefined) => {
        if (!data?.show || !data.url) return;

        const iframe = document.createElement('iframe');
        iframe.src = data.url;
        iframe.sandbox.add('allow-scripts');
        iframe.sandbox.add('allow-same-origin');
        iframe.title = 'SWARM auth iframe';
        // Hidden off-screen — anti-fraud probing only, no visible content
        iframe.style.cssText =
          'position:absolute;width:0;height:0;border:0;overflow:hidden';
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;

        document.body.appendChild(iframe);
      })
      .catch(() => {
        // Anti-fraud is non-critical; silently discard errors so ads still load
      });
  }, []);

  return null;
}
