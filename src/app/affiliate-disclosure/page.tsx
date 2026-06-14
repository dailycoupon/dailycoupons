import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | DailyCoupons',
  description: 'DailyCoupons participates in affiliate marketing programs. Learn how we earn commissions.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="legal-page">
      <div className="container" style={{ maxWidth: 800 }}>
        <h1>Affiliate Disclosure</h1>
        <p className="effective-date">Last Updated: June 14, 2026</p>

        <p>
          DailyCoupons participates in affiliate marketing programs. This means that when you click a
          link to a retailer on our site and make a qualifying purchase, we may earn a commission or
          referral fee — at <strong>no additional cost to you</strong>.
        </p>

        <h2>FTC Disclosure</h2>
        <p>
          In accordance with the Federal Trade Commission&apos;s guidelines (16 CFR Part 255), we disclose
          that links on DailyCoupons may be affiliate links. The compensation we receive does not
          influence our editorial decisions or the deals we choose to feature.
        </p>

        <h2>Programs We Participate In</h2>
        <p>DailyCoupons may earn commissions through, but not limited to, the following programs:</p>
        <ul>
          <li><strong>Amazon Associates Program</strong> — Earn commissions on Amazon purchases.</li>
          <li><strong>Commission Junction (CJ Affiliate)</strong> — Affiliate network covering many major retailers.</li>
          <li><strong>ShareASale</strong> — Affiliate network with thousands of merchants.</li>
          <li><strong>Rakuten Advertising</strong> — Performance-based affiliate network.</li>
          <li><strong>Impact (formerly Impact Radius)</strong> — Technology-driven affiliate partnerships.</li>
          <li><strong>Direct retailer programs</strong> — Individual programs operated by specific stores listed on our site.</li>
        </ul>

        <h2>How It Works</h2>
        <p>
          When you click a coupon, deal, or &quot;Shop Now&quot; link on DailyCoupons, you may be redirected
          through an affiliate tracking link. If you complete a purchase during that session, the retailer
          reports the sale to the affiliate network, and we receive a small commission.
        </p>
        <p>
          This commission helps us cover the costs of running and maintaining DailyCoupons as a free service.
        </p>

        <h2>Our Editorial Independence</h2>
        <p>
          Our coupon listings and deal recommendations are based on value to our users — not on commission
          rates. We list deals we believe are genuinely worthwhile regardless of whether an affiliate
          relationship exists. We do not accept payment to feature specific coupons or stores.
        </p>

        <h2>No Extra Cost to You</h2>
        <p>
          Affiliate commissions are paid by the retailer, not by you. The price you pay at checkout is
          exactly the same whether you come through DailyCoupons or go directly to the store.
        </p>

        <h2>Questions</h2>
        <p>
          If you have questions about our affiliate relationships, please contact us at{' '}
          <a href="mailto:disclosure@dailycoupons.com">disclosure@dailycoupons.com</a>.
        </p>
      </div>
    </div>
  );
}
