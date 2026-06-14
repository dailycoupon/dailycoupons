import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | DailyCoupons',
  description: 'Learn how DailyCoupons collects, uses, and protects your information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <div className="container" style={{ maxWidth: 800 }}>
        <h1>Privacy Policy</h1>
        <p className="effective-date">Effective Date: June 14, 2026</p>

        <p>
          DailyCoupons (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the DailyCoupons website. This Privacy Policy
          explains how we collect, use, and share information when you visit our site.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We do not require you to create an account or provide personal information to use DailyCoupons.
          We may automatically collect:
        </p>
        <ul>
          <li><strong>Log data:</strong> IP address, browser type, pages visited, referring URL, and timestamps.</li>
          <li><strong>Cookies:</strong> Session cookies for site functionality and analytics cookies from third-party providers.</li>
          <li><strong>Analytics data:</strong> Aggregate usage data collected through ContentSquare and similar tools.</li>
        </ul>

        <h2>2. How We Use Information</h2>
        <ul>
          <li>Deliver, operate, and improve the DailyCoupons website.</li>
          <li>Serve advertisements through our ad network partners.</li>
          <li>Analyze traffic patterns to understand how visitors use the site.</li>
          <li>Detect and prevent fraud or abuse.</li>
        </ul>

        <h2>3. Cookies and Advertising</h2>
        <p>
          We use cookies to operate the site and serve advertising. Our advertising partners may use
          cookies to deliver personalized ads based on your browsing activity. You can opt out of
          personalized advertising by visiting the{' '}
          <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">
            NAI opt-out page
          </a>{' '}
          or the{' '}
          <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">
            DAA opt-out page
          </a>.
        </p>
        <p>
          You can also control cookies through your browser settings. Note that disabling cookies may
          affect site functionality.
        </p>

        <h2>4. Third-Party Links</h2>
        <p>
          DailyCoupons links to retailer websites and third-party services. We are not responsible for
          the privacy practices of those sites and encourage you to review their policies before providing
          any personal information.
        </p>

        <h2>5. Affiliate Relationships</h2>
        <p>
          We earn commissions on purchases made through links on our site. See our{' '}
          <Link href="/affiliate-disclosure">Affiliate Disclosure</Link> for full details.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          Server log data is retained for up to 90 days. Analytics data is retained per the policies
          of our third-party analytics providers.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, or delete personal data
          we hold about you. To make a request, contact us at{' '}
          <a href="mailto:privacy@dailycoupons.com">privacy@dailycoupons.com</a>.
        </p>
        <p>
          California residents may have additional rights under the California Consumer Privacy Act (CCPA).
          We do not sell personal information.
        </p>

        <h2>8. Children&apos;s Privacy</h2>
        <p>
          DailyCoupons is not directed at children under the age of 13. We do not knowingly collect
          personal information from children.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted to this page with
          an updated effective date. Continued use of DailyCoupons after any changes constitutes
          acceptance of the updated policy.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:privacy@dailycoupons.com">privacy@dailycoupons.com</a>.
        </p>
      </div>
    </div>
  );
}
