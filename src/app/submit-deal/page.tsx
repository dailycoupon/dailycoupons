import type { Metadata } from 'next';
import SubmitDealForm from './SubmitDealForm';

export const metadata: Metadata = {
  title: 'Submit a Deal | DailyCoupons',
  description: 'Found a great coupon or deal? Share it with the DailyCoupons community.',
};

export default function SubmitDealPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Submit a Deal</h1>
          <p>Found a great coupon? Share it and help thousands of shoppers save money.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SubmitDealForm />
        </div>
      </section>
    </>
  );
}
