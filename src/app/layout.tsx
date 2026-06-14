import type { Metadata } from 'next';
import Script from 'next/script';
import { ModalProvider } from '@/context/ModalContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CouponModal from '@/components/coupons/CouponModal';
import './globals.css';

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
      <body>
        <ModalProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CouponModal />
        </ModalProvider>
        <Script
          id="adbutler-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `if(!window.AdButler){(function(){var s=document.createElement("script");s.async=true;s.type="text/javascript";s.src="https://servedbyadbutler.com/app.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(s,n);})();}`,
          }}
        />
      </body>
    </html>
  );
}
