'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { getStoreById, formatExpiry } from '@/lib/utils';
import styles from './CouponModal.module.css';

export default function CouponModal() {
  const { activeCoupon, closeModal } = useModal();
  const [copied, setCopied] = useState(false);

  useEffect(() => { setCopied(false); }, [activeCoupon]);

  useEffect(() => {
    if (!activeCoupon) return;
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handler);
    };
  }, [activeCoupon, closeModal]);

  if (!activeCoupon) return null;

  const store = getStoreById(activeCoupon.storeId);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(activeCoupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea');
      el.value = activeCoupon.code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button className={styles.modalClose} onClick={closeModal} aria-label="Close">✕</button>
          <h3>Your Coupon Code</h3>
          <p>Copy the code below and paste it at checkout</p>
        </div>

        <div className={styles.modalBody}>
          {store && (
            <div className={styles.modalStoreInfo}>
              <Image
                src={store.logo}
                alt={store.name}
                width={48}
                height={48}
                className={styles.modalStoreLogo}
                unoptimized
              />
              <div className={styles.modalStoreName}>{store.name}</div>
            </div>
          )}

          <div className={styles.modalCodeBox}>
            {activeCoupon.code ? (
              <>
                <div className={styles.modalCode}>{activeCoupon.code}</div>
                <button
                  className={`${styles.btnCopy} ${copied ? styles.copied : ''}`}
                  onClick={copyCode}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </>
            ) : (
              <div className={styles.modalCodeNoCode}>
                No code needed — deal applied automatically at checkout
              </div>
            )}
          </div>

          <p className={styles.modalDesc}>{activeCoupon.description}</p>

          {activeCoupon.expiry && (
            <p className={styles.modalExpiry}>Expires {formatExpiry(activeCoupon.expiry)}</p>
          )}

          <div className={styles.modalActions}>
            {store && (
              <a
                href={store.url}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {store.name}
              </a>
            )}
            <button className="btn btn-outline" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
