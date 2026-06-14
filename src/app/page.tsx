import Link from 'next/link';
import { STORES, COUPONS, TRENDING_SEARCHES, FAQ } from '@/lib/data';
import { getTrendingCoupons, getFeaturedStores } from '@/lib/utils';
import { AB_ZONES } from '@/lib/adbutler';
import StoreCard from '@/components/stores/StoreCard';
import CouponRow from '@/components/coupons/CouponRow';
import FAQAccordion from '@/components/ui/FAQAccordion';
import TrendingChips from '@/components/ui/TrendingChips';
import AdSlot from '@/components/ads/AdSlot';
import styles from './page.module.css';

export default function HomePage() {
  const trendingCoupons = getTrendingCoupons();
  const featuredStores = getFeaturedStores();
  const staffPicks = STORES.filter(s => s.cashback !== '0%').slice(0, 8);

  return (
    <>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <h1>Save More on Every Purchase</h1>
          <p>Find the best coupon codes, promo codes, and deals from 60+ top stores — verified daily.</p>
          <div className={styles.heroActions}>
            <Link href="/coupons" className="btn btn-white">Browse Coupons</Link>
            <Link href="/stores" className="btn btn-ghost">All Stores</Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <div className={styles.num}>{STORES.length}+</div>
              <div className={styles.label}>Stores</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.num}>{COUPONS.length}+</div>
              <div className={styles.label}>Active Deals</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.num}>100%</div>
              <div className={styles.label}>Free to Use</div>
            </div>
          </div>
        </div>
      </div>

      <AdSlot zoneId={AB_ZONES.LEADERBOARD} width={728} height={90} />

      {/* Trending Coupons */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Today&apos;s Trending Coupons</h2>
            <Link href="/coupons">See all →</Link>
          </div>
          <div className={styles.couponList}>
            {trendingCoupons.slice(0, 8).map(coupon => (
              <CouponRow key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </div>
      </section>

      <AdSlot zoneId={AB_ZONES.RECTANGLE} width={300} height={250} />

      {/* Best Deals */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Best Deals Right Now</h2>
            <Link href="/stores">See all →</Link>
          </div>
          <div className={styles.storeGrid}>
            {featuredStores.slice(0, 8).map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      </section>

      {/* Staff Picks */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Staff Picks</h2>
            <Link href="/stores">See all →</Link>
          </div>
          <div className={styles.storeGrid}>
            {staffPicks.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Stores Directory */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Popular Stores</h2>
            <Link href="/stores">All stores →</Link>
          </div>
          <div className={styles.storesDirectory}>
            {STORES.map(store => (
              <Link key={store.id} href={`/stores/${store.id}`} className={styles.storeLink}>
                {store.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdSlot zoneId={AB_ZONES.LEADERBOARD} width={728} height={90} />

      {/* Trending Searches */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Trending Searches</h2>
          </div>
          <TrendingChips searches={TRENDING_SEARCHES} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          <FAQAccordion items={FAQ} />
        </div>
      </section>
    </>
  );
}
