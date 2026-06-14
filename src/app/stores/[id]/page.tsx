import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { STORES } from '@/lib/data';
import { getStoreById, getCouponsByStore } from '@/lib/utils';
import CouponRow from '@/components/coupons/CouponRow';
import StoreCard from '@/components/stores/StoreCard';
import styles from './store.module.css';

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return STORES.map(s => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const store = getStoreById(id);
  if (!store) return {};
  return {
    title: `${store.name} Coupons & Promo Codes | DailyCoupons`,
    description: `Save money at ${store.name} with verified promo codes and deals. Up to ${store.cashback !== '0%' ? store.cashback + ' cashback + ' : ''}exclusive discounts.`,
  };
}

export default async function StoreDetailPage({ params }: Props) {
  const { id } = await params;
  const store = getStoreById(id);
  if (!store) notFound();

  const coupons = getCouponsByStore(id);
  const otherStores = STORES.filter(s => s.id !== id).slice(0, 8);

  return (
    <>
      <div className={styles.storeHeader}>
        <div className="container">
          <div className={styles.storeHeaderInner}>
            <Image
              src={store.logo}
              alt={store.name}
              width={80}
              height={80}
              className={styles.storeHeaderLogo}
              unoptimized
            />
            <div className={styles.storeHeaderInfo}>
              <h1>{store.name} Coupons &amp; Promo Codes</h1>
              <p>Save money at {store.name} with verified promo codes and exclusive deals.</p>
              <div className={styles.storeHeaderStats}>
                <span className={styles.storeStat}>
                  <strong>{coupons.length}</strong> active {coupons.length === 1 ? 'deal' : 'deals'}
                </span>
                {store.cashback !== '0%' && (
                  <span className={styles.storeStat}>
                    <strong>{store.cashback}</strong> Cashback
                  </span>
                )}
                <span className={styles.storeStat}>
                  <strong>{store.category}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Available Coupons</h2>
            <Link href="/stores">← All Stores</Link>
          </div>

          {coupons.length === 0 ? (
            <div className="empty-state">
              <h3>No coupons available right now</h3>
              <p>Check back soon — we update deals daily.</p>
            </div>
          ) : (
            <div className={styles.couponList}>
              {coupons.map(coupon => (
                <CouponRow key={coupon.id} coupon={coupon} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>More Popular Stores</h2>
            <Link href="/stores">All stores →</Link>
          </div>
          <div className={styles.storeGrid}>
            {otherStores.map(s => (
              <StoreCard key={s.id} store={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
