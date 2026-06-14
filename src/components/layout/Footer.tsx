import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>🏷️ DailyCoupons</div>
            <p>Your go-to source for the best coupon codes, promo codes, and online deals — verified daily.</p>
            <div className={styles.footerSocial}>
              <a href="https://twitter.com/dailycoupons" title="Twitter" rel="noopener noreferrer" target="_blank">𝕏</a>
              <a href="https://facebook.com/dailycoupons" title="Facebook" rel="noopener noreferrer" target="_blank">f</a>
              <a href="https://instagram.com/dailycoupons" title="Instagram" rel="noopener noreferrer" target="_blank">📷</a>
            </div>
          </div>

          <div className={styles.footerCol}>
            <h4>Site Links</h4>
            <ul>
              <li><Link href="/coupons">Coupons</Link></li>
              <li><Link href="/stores">Stores</Link></li>
              <li><Link href="/coupons?category=cashback">2xCashback</Link></li>
              <li><Link href="/coupons">Saving Guides</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Info</h4>
            <ul>
              <li><a href="mailto:hello@dailycoupons.com">Contact Us</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service">Terms of Service</Link></li>
              <li><Link href="/affiliate-disclosure">Affiliate Disclosure</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 DailyCoupons. All rights reserved.</span>
          <div className={styles.footerBottomLinks}>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-service">Terms</Link>
            <Link href="/affiliate-disclosure">Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
