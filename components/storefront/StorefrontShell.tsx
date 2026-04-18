'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { CartProvider } from '@/hooks/useCart';
import { Category } from '@/lib/types';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from './CartSidebar';
import OrderForm from './OrderForm';
import Preloader from './Preloader';
import ScrollProgress from './ScrollProgress';
import CustomCursor from './CustomCursor';
import BackToTop from './BackToTop';

export function StorefrontShell({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    // Check if preloader already played this session
    if (sessionStorage.getItem('bs-preloader-played')) {
      setPreloaderDone(true);
    }
  }, []);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(() => {});
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <CartProvider lang={lang}>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <ScrollProgress />
      <CustomCursor />
      <Navbar categories={categories} />
      <main>{children}</main>
      <Footer categories={categories} />
      <CartSidebar />
      <OrderForm />
      <BackToTop />
    </CartProvider>
  );
}
