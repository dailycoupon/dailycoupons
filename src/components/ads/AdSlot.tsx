'use client';

import { useEffect, useRef } from 'react';
import { AB_ACCOUNT } from '@/lib/adbutler';
import styles from './AdSlot.module.css';
import AntiFraudFrame from './AntiFraudFrame';

interface AdSlotProps {
  zoneId: number;
  width: number;
  height: number;
}

declare global {
  interface Window {
    AdButler: { ads: unknown[]; register: (...args: unknown[]) => void };
    abkw: string;
    [key: `plc${number}`]: number;
  }
}

export default function AdSlot({ zoneId, width, height }: AdSlotProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.AdButler = window.AdButler || { ads: [] };
    window.AdButler.ads = window.AdButler.ads || [];
    window.abkw = window.abkw || '';

    const plcKey = `plc${zoneId}` as `plc${number}`;
    window[plcKey] = window[plcKey] || 0;
    const place = window[plcKey];
    window[plcKey] = place + 1;

    const placementId = `placement_${zoneId}_${place}`;
    if (divRef.current) divRef.current.id = placementId;

    window.AdButler.ads.push({
      handler: function (opt: { place: number }) {
        window.AdButler.register(
          AB_ACCOUNT,
          zoneId,
          [width, height],
          `placement_${zoneId}_${opt.place}`,
          opt
        );
      },
      opt: {
        place,
        keywords: window.abkw,
        domain: 'servedbyadbutler.com',
        click: 'CLICK_MACRO_PLACEHOLDER',
      },
    });
  }, [zoneId, width, height]);

  const isLeaderboard = width === 728;

  return (
    <>
      {/* In per-ad mode, trigger the anti-fraud check alongside each ad slot.
          AntiFraudFrame's module-level singleton ensures only the first slot fires. */}
      {process.env.NEXT_PUBLIC_ANTIFRAUD_INJECTION_MODE === 'per-ad' && (
        <AntiFraudFrame />
      )}
      <div className={`${styles.adSlot} ${isLeaderboard ? styles.leaderboard : styles.rectangle}`}>
        <span className={styles.adLabel}>Advertisement</span>
        <div ref={divRef} />
      </div>
    </>
  );
}
