'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { getStoreById, formatExpiry } from '@/lib/utils';
import type { Coupon } from '@/types';
import styles from './CouponCard.module.css';

export default function CouponCard({ coupon }: { coupon: Coupon }) {
  const { openModal } = useModal();
  const store = getStoreById(coupon.storeId);
  if (!store) return null;

  return (
    <div className={styles.couponCard}>
      <div className={styles.couponCardHeader}>
        <Image
          src={store.logo}
          alt={store.name}
          width={36}
          height={36}
          className={styles.storeLogo}
          unoptimized
        />
        <Link href={`/stores/${store.id}`} className={styles.storeNameLink}>
          {store.name}
        </Link>
        {coupon.exclusive && (
          <span className="badge badge-exclusive" style={{ marginLeft: 'auto' }}>Exclusive</span>
        )}
      </div>

      <div className={styles.couponCardBody}>
        <div className={styles.couponCardDiscount}>{coupon.discount}</div>
        <p className={styles.couponCardDesc}>{coupon.description}</p>
        <button className={styles.btnShowCode} onClick={() => openModal(coupon)}>
          {coupon.code ? 'Show Code' : 'Get Deal'}
        </button>
      </div>

      <div className={styles.couponCardFooter}>
        <span className={styles.expiry}>Expires {formatExpiry(coupon.expiry)}</span>
        {coupon.verified && <span className="badge badge-verified">✓ Verified</span>}
      </div>
    </div>
  );
}
