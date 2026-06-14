import { Suspense } from 'react';
import type { Metadata } from 'next';
import { COUPONS, CATEGORIES } from '@/lib/data';
import { getStoreById } from '@/lib/utils';
import { AB_ZONES } from '@/lib/adbutler';
import CouponCard from '@/components/coupons/CouponCard';
import FilterBar from '@/components/ui/FilterBar';
import AdSlot from '@/components/ads/AdSlot';
import styles from './coupons.module.css';

export const metadata: Metadata = {
  title: 'Coupon Codes & Promo Codes | DailyCoupons',
  description: 'Browse hundreds of verified coupon codes and promo deals from top stores. Save on fashion, electronics, travel, food, and more.',
};

export default async function CouponsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = '', category = 'All' } = await searchParams;

  let coupons = COUPONS;

  if (category !== 'All') {
    coupons = coupons.filter(c => c.category === category);
  }

  if (q) {
    const lq = q.toLowerCase();
    coupons = coupons.filter(c => {
      const store = getStoreById(c.storeId);
      return (
        c.description.toLowerCase().includes(lq) ||
        c.discount.toLowerCase().includes(lq) ||
        c.category.toLowerCase().includes(lq) ||
        (store && store.name.toLowerCase().includes(lq))
      );
    });
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Coupon Codes &amp; Deals</h1>
          <p>Browse verified promo codes from top stores</p>
        </div>
      </div>

      <AdSlot zoneId={AB_ZONES.LEADERBOARD} width={728} height={90} />

      <section className="section">
        <div className="container">
          <Suspense>
            <FilterBar
              categories={CATEGORIES}
              searchPlaceholder="Search coupons or stores…"
            />
          </Suspense>

          {coupons.length === 0 ? (
            <div className="empty-state">
              <h3>No coupons found</h3>
              <p>Try a different search or browse all categories.</p>
            </div>
          ) : (
            <div className={styles.couponsGrid}>
              {coupons.map(coupon => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
