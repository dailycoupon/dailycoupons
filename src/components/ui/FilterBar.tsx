'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  categories: string[];
  searchPlaceholder: string;
}

export default function FilterBar({ categories, searchPlaceholder }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('category') ?? 'All';
  const query = searchParams.get('q') ?? '';

  const updateParams = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  return (
    <div className={styles.filterBar}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={searchPlaceholder}
        defaultValue={query}
        onChange={e => updateParams('q', e.target.value)}
        autoComplete="off"
      />
      <div className={styles.categoryTabs}>
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            className={`${styles.tab} ${activeCategory === cat ? styles.active : ''}`}
            onClick={() => updateParams('category', cat)}
          >
            {cat === 'Food & Dining' ? 'Food' : cat === 'Home & Garden' ? 'Home' : cat}
          </button>
        ))}
      </div>
    </div>
  );
}
