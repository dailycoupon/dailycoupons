'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { searchStores } from '@/lib/utils';
import type { Store } from '@/types';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Store[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    setResults(searchStores(query).slice(0, 6));
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/coupons?q=${encodeURIComponent(query.trim())}`);
      setResults([]);
      setQuery('');
    }
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <Link href="/" className={styles.navLogo}>
          Daily<span>Coupons</span>
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link href="/coupons" className={isActive('/coupons') ? styles.active : ''}>
              Coupons
            </Link>
          </li>
          <li>
            <Link href="/stores" className={isActive('/stores') ? styles.active : ''}>
              Stores
            </Link>
          </li>
          <li>
            <Link href="/coupons?category=cashback">
              2xCashback <span className={styles.cashbackBadge}>NEW</span>
            </Link>
          </li>
          <li>
            <Link href="/coupons">Saving Guides</Link>
          </li>
        </ul>

        <div className={styles.navSearch} ref={searchRef}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search stores or coupons…"
            autoComplete="off"
          />
          {results.length > 0 && (
            <div className={`${styles.navSearchResults} ${styles.show}`}>
              {results.map(s => (
                <Link
                  key={s.id}
                  href={`/stores/${s.id}`}
                  className={styles.searchResultItem}
                  onClick={() => { setResults([]); setQuery(''); }}
                >
                  <Image
                    src={s.logo}
                    alt={s.name}
                    width={32}
                    height={32}
                    className={styles.resultImg}
                    unoptimized
                  />
                  <div>
                    <div className={styles.resultName}>{s.name}</div>
                    <div className={styles.resultCat}>{s.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/submit-deal" className={styles.submitBtn}>
          + Submit a Deal
        </Link>

        <button
          className={`${styles.navHamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavLinks}>
            <li><Link href="/coupons" onClick={() => setMenuOpen(false)}>Coupons</Link></li>
            <li><Link href="/stores" onClick={() => setMenuOpen(false)}>Stores</Link></li>
            <li><Link href="/coupons?category=cashback" onClick={() => setMenuOpen(false)}>2xCashback</Link></li>
            <li><Link href="/coupons" onClick={() => setMenuOpen(false)}>Saving Guides</Link></li>
            <li><Link href="/submit-deal" onClick={() => setMenuOpen(false)}>+ Submit a Deal</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
