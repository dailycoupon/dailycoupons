import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | DailyCoupons',
  description: 'Read the DailyCoupons Terms of Service governing use of our website.',
};

export default function TermsOfServicePage() {
  return (
    <div className="legal-page">
      <div className="container" style={{ maxWidth: 800 }}>
        <h1>Terms of Service</h1>
        <p className="effective-date">Last Updated: June 14, 2026</p>

        <p>
          Please read these Terms of Service (&quot;Terms&quot;) carefully before using the DailyCoupons website.
          By accessing or using DailyCoupons, you agree to be bound by these Terms.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By using DailyCoupons, you confirm that you are at least 18 years old (or the age of majority
          in your jurisdiction) and that you agree to these Terms. If you do not agree, please do not use
          our site.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          DailyCoupons is a coupon and deal aggregation service that provides promo codes, discount offers,
          and cashback information from third-party retailers. We do not sell products directly and are not
          party to any transaction between you and a retailer.
        </p>

        <h2>3. Coupon Codes and Deals</h2>
        <p>
          Coupon codes and deals are provided &quot;as is.&quot; We make reasonable efforts to verify codes before
          publishing them, but we cannot guarantee that any coupon will work at the time you attempt to
          use it. Retailers may change or revoke promotions at any time without notice. Expiry dates
          shown on our site are approximate.
        </p>
        <p>
          DailyCoupons is not liable for any savings not achieved or for purchases made in reliance on
          listed coupons or deals.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          The DailyCoupons website, including its design, code, text, and original content, is owned by
          DailyCoupons and protected by applicable intellectual property laws. Store names, logos, and
          trademarks displayed on the site remain the property of their respective owners.
        </p>
        <p>
          You may not reproduce, distribute, or create derivative works from DailyCoupons content
          without our express written permission.
        </p>

        <h2>5. Prohibited Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Scrape, crawl, or use automated tools to access or collect data from DailyCoupons.</li>
          <li>Use our site for competitive intelligence or to build a competing service.</li>
          <li>Interfere with the operation of the site or circumvent security measures.</li>
          <li>Use our site in any way that violates applicable laws or regulations.</li>
        </ul>

        <h2>6. Disclaimer of Warranties</h2>
        <p>
          DailyCoupons is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any
          kind, either express or implied, including but not limited to warranties of merchantability,
          fitness for a particular purpose, or non-infringement.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, DailyCoupons and its operators shall not be liable for
          any indirect, incidental, special, consequential, or punitive damages arising out of your use of
          or inability to use the site, even if we have been advised of the possibility of such damages.
          Our total liability to you for any claims arising from these Terms or your use of the site shall
          not exceed $100.
        </p>

        <h2>8. Affiliate Links</h2>
        <p>
          Many links on DailyCoupons are affiliate links. When you click a link and make a purchase, we
          may earn a commission at no additional cost to you. See our{' '}
          <Link href="/affiliate-disclosure">Affiliate Disclosure</Link> for full details.
        </p>

        <h2>9. Third-Party Sites</h2>
        <p>
          DailyCoupons contains links to third-party websites. We do not control those sites and are not
          responsible for their content, privacy practices, or terms. Visiting linked sites is at your own risk.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>
          We may update these Terms at any time. Changes take effect immediately upon posting. Continued
          use of DailyCoupons after changes constitutes acceptance of the updated Terms.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of the State of New York,
          without regard to its conflict of law principles. Any disputes shall be resolved in the courts
          located in New York County, New York.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about these Terms? Contact us at{' '}
          <a href="mailto:legal@dailycoupons.com">legal@dailycoupons.com</a>.
        </p>
      </div>
    </div>
  );
}
