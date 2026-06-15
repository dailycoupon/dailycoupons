import type { Metadata } from 'next';
import Script from 'next/script';
import { ModalProvider } from '@/context/ModalContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CouponModal from '@/components/coupons/CouponModal';
import AntiFraudFrame from '@/components/ads/AntiFraudFrame';
import './globals.css';

const ADSENSE_ID = 'ca-pub-2131672681898268';

export const metadata: Metadata = {
  title: 'DailyCoupons – Best Promo Codes & Coupon Codes for 2026',
  description: 'Find the best verified coupon codes, promo codes, and deals from 60+ top stores. Save money every time you shop online.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏷️</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="monetag" content="bf3b29c78e2afd7ee33307222343f529" />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ModalProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CouponModal />
        </ModalProvider>
        <Script
          id="monetag-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='11150434',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
          }}
        />
        <Script
          id="adbutler-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `if(!window.AdButler){(function(){var s=document.createElement("script");s.async=true;s.type="text/javascript";s.src="https://servedbyadbutler.com/app.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(s,n);})();}`,
          }}
        />
        {/* Inject anti-fraud iframe globally unless per-ad mode is chosen.
            In per-ad mode AdSlot renders AntiFraudFrame alongside each placement. */}
        {process.env.NEXT_PUBLIC_ANTIFRAUD_INJECTION_MODE !== 'per-ad' && (
          <AntiFraudFrame />
        )}
      </body>
    </html>
  );
}
