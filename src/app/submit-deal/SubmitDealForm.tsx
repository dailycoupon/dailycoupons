'use client';

import { useState } from 'react';
import { STORES, CATEGORIES } from '@/lib/data';
import styles from './submit-deal.module.css';

type Field = {
  store: string;
  code: string;
  discount: string;
  description: string;
  expiry: string;
  category: string;
  name: string;
  email: string;
  phone: string;
};

const EMPTY: Field = {
  store: '', code: '', discount: '', description: '',
  expiry: '', category: '', name: '', email: '', phone: '',
};

export default function SubmitDealForm() {
  const [fields, setFields] = useState<Field>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className={styles.successCard}>
        <div className={styles.successIcon}>🎉</div>
        <h2>Deal submitted — thank you!</h2>
        <p>
          We&apos;ve received your coupon and our team will review it shortly.
          If it checks out, it&apos;ll go live on DailyCoupons within 24 hours.
        </p>
        <button className="btn btn-primary" onClick={() => { setFields(EMPTY); setSubmitted(false); }}>
          Submit Another Deal
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGrid}>

        {/* ── Deal details ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Deal Details</h2>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Store Name <span className={styles.required}>*</span>
              <select className={styles.input} value={fields.store} onChange={set('store')} required>
                <option value="">Select a store…</option>
                {STORES.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
                <option value="__other__">Other / Not listed</option>
              </select>
            </label>

            <label className={styles.label}>
              Category <span className={styles.required}>*</span>
              <select className={styles.input} value={fields.category} onChange={set('category')} required>
                <option value="">Select a category…</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Coupon Code
              <input
                className={styles.input}
                type="text"
                placeholder="e.g. SAVE20"
                value={fields.code}
                onChange={set('code')}
              />
              <span className={styles.hint}>Leave blank if no code is needed (auto-applied deal)</span>
            </label>

            <label className={styles.label}>
              Discount Amount <span className={styles.required}>*</span>
              <input
                className={styles.input}
                type="text"
                placeholder="e.g. 20% Off or $10 Off"
                value={fields.discount}
                onChange={set('discount')}
                required
              />
            </label>
          </div>

          <label className={styles.label}>
            Deal Description <span className={styles.required}>*</span>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Describe the deal in a sentence, e.g. 'Save 20% sitewide on your first order'"
              value={fields.description}
              onChange={set('description')}
              rows={3}
              required
            />
          </label>

          <label className={styles.label} style={{ maxWidth: 260 }}>
            Expiry Date
            <input
              className={styles.input}
              type="date"
              value={fields.expiry}
              onChange={set('expiry')}
            />
          </label>
        </div>

        {/* ── Your details ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Details</h2>
          <p className={styles.sectionSubtitle}>
            We may reach out if we need more info about the deal.
          </p>

          <label className={styles.label}>
            Full Name <span className={styles.required}>*</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Jane Smith"
              value={fields.name}
              onChange={set('name')}
              required
            />
          </label>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Email Address <span className={styles.required}>*</span>
              <input
                className={styles.input}
                type="email"
                placeholder="jane@example.com"
                value={fields.email}
                onChange={set('email')}
                required
              />
            </label>

            <label className={styles.label}>
              Phone Number
              <input
                className={styles.input}
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={fields.phone}
                onChange={set('phone')}
              />
            </label>
          </div>
        </div>
      </div>

      <div className={styles.formFooter}>
        <p className={styles.disclaimer}>
          By submitting you confirm this deal is legitimate and not misleading.
          We review all submissions before publishing.
        </p>
        <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
          Submit Deal →
        </button>
      </div>
    </form>
  );
}
