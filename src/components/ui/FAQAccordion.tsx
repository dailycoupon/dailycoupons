'use client';

import { useState } from 'react';
import type { FAQItem } from '@/types';
import styles from './FAQAccordion.module.css';

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.faqList}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`${styles.faqItem} ${openIndex === i ? styles.open : ''}`}
        >
          <div
            className={styles.faqQuestion}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.question}
            <span className={styles.faqIcon}>+</span>
          </div>
          <div className={styles.faqAnswer}>
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
