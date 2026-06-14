'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { getStoreById } from '@/lib/utils';
import type { Coupon } from '@/types';
import styles from './CouponRow.module.css';

export default function CouponRow({ coupon }: { coupon: Coupon }) {
  const { openModal } = useModal();
  const store = getStoreById(coupon.storeId);
  if (!store) return null;

  return (
    <div className={styles.couponRow}>
      <Link href={`/stores/${store.id}`} title={store.name} className={styles.logoLink}>
        <Image
          src={store.logo}
          alt={store.name}
          width={48}
          height={48}
          className={styles.storeLogoSm}
          unoptimized
        />
      </Link>

      <div className={styles.couponInfo}>
        <div className={styles.couponStore}>{store.name}</div>
        <div className={styles.couponDesc}>{coupon.description}</div>
        <div className={styles.couponTags}>
          {coupon.verified && <span className="badge badge-verified">✓ Verified</span>}
          {coupon.exclusive && <span className="badge badge-exclusive">Exclusive</span>}
        </div>
      </div>

      <span className="badge badge-discount">{coupon.discount}</span>

      <button className={styles.btnShowCode} onClick={() => openModal(coupon)}>
        Show Code
      </button>
    </div>
  );
}
