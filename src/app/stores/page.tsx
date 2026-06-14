import { Suspense } from 'react';
import type { Metadata } from 'next';
import { STORES, CATEGORIES } from '@/lib/data';
import StoreCard from '@/components/stores/StoreCard';
import FilterBar from '@/components/ui/FilterBar';
import styles from './stores.module.css';

export const metadata: Metadata = {
  title: 'All Stores | DailyCoupons',
  description: 'Browse 60+ top stores and find the best coupons, promo codes, and cashback offers.',
};

export default async function StoresPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = '', category = 'All' } = await searchParams;

  let stores = STORES;

  if (category !== 'All') {
    stores = stores.filter(s => s.category === category);
  }

  if (q) {
    const lq = q.toLowerCase();
    stores = stores.filter(
      s => s.name.toLowerCase().includes(lq) || s.category.toLowerCase().includes(lq)
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>All Stores</h1>
          <p>{STORES.length} stores with verified coupons and cashback</p>
        </div>
      </div>

      {/* Ad slot placeholder */}
      <div className="ad-slot" id="ad-leaderboard-top" />

      <section className="section">
        <div className="container">
          <Suspense>
            <FilterBar
              categories={CATEGORIES}
              searchPlaceholder="Search stores…"
            />
          </Suspense>

          {stores.length === 0 ? (
            <div className="empty-state">
              <h3>No stores found</h3>
              <p>Try a different search or browse all categories.</p>
            </div>
          ) : (
            <div className={styles.storesGrid}>
              {stores.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
