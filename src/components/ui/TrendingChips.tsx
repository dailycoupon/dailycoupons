import Link from 'next/link';
import styles from './TrendingChips.module.css';

export default function TrendingChips({ searches }: { searches: string[] }) {
  return (
    <div className={styles.trendingChips}>
      {searches.map(term => (
        <Link
          key={term}
          href={`/coupons?q=${encodeURIComponent(term)}`}
          className={styles.chip}
        >
          🔥 {term}
        </Link>
      ))}
    </div>
  );
}
