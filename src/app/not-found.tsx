import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 – Page Not Found | DailyCoupons',
};

export default function NotFound() {
  return (
    <div className="empty-state" style={{ padding: '80px 20px' }}>
      <h3 style={{ fontSize: 24, marginBottom: 12 }}>Page Not Found</h3>
      <p style={{ marginBottom: 24 }}>The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
