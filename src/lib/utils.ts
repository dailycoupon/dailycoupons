import { STORES, COUPONS } from './data';
import type { Store, Coupon } from '@/types';

export function getStoreById(id: string): Store | undefined {
  return STORES.find(s => s.id === id);
}

export function getCouponsByStore(storeId: string): Coupon[] {
  return COUPONS.filter(c => c.storeId === storeId);
}

export function getFeaturedStores(): Store[] {
  return STORES.filter(s => s.featured);
}

export function getTrendingCoupons(): Coupon[] {
  return COUPONS.filter(c => c.trending);
}

export function searchStores(query: string): Store[] {
  const q = query.toLowerCase();
  return STORES.filter(
    s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
  );
}

export function formatExpiry(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
