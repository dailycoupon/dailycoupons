export type Category =
  | 'Shopping'
  | 'Fashion'
  | 'Electronics'
  | 'Travel'
  | 'Food & Dining'
  | 'Beauty'
  | 'Home & Garden'
  | 'Sports'
  | 'Pets'
  | 'Entertainment'
  | 'Education';

export interface Store {
  id: string;
  name: string;
  logo: string;
  category: Category;
  url: string;
  cashback: string;
  featured: boolean;
}

export interface Coupon {
  id: number;
  storeId: string;
  code: string;
  description: string;
  discount: string;
  category: Category;
  expiry: string;
  verified: boolean;
  exclusive: boolean;
  trending: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
