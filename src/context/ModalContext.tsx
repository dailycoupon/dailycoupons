'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Coupon } from '@/types';

interface ModalContextType {
  activeCoupon: Coupon | null;
  openModal: (coupon: Coupon) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  return (
    <ModalContext.Provider value={{
      activeCoupon,
      openModal: setActiveCoupon,
      closeModal: () => setActiveCoupon(null),
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
