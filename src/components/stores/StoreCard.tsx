import Link from 'next/link';
import Image from 'next/image';
import { getCouponsByStore } from '@/lib/utils';
import type { Store } from '@/types';
import styles from './StoreCard.module.css';

export default function StoreCard({ store }: { store: Store }) {
  const coupons = getCouponsByStore(store.id);
  const topDeal = coupons[0];

  return (
    <Link href={`/stores/${store.id}`} className={styles.storeCard}>
      <Image
        src={store.logo}
        alt={store.name}
        width={60}
        height={60}
        className={styles.storeLogo}
        unoptimized
      />
      <div className={styles.storeName}>{store.name}</div>
      {topDeal && <div className={styles.storeDeal}>{topDeal.discount}</div>}
      {store.cashback !== '0%' && (
        <div className={styles.storeCashback}>{store.cashback} Cashback</div>
      )}
    </Link>
  );
}
