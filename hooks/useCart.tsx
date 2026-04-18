'use client';

import { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { CartItem } from '@/lib/types';
import { SHIPPING, WHATSAPP_NUMBER } from '@/lib/constants';
import { t } from '@/lib/i18n';
import type { Language } from '@/lib/types';

const STORAGE_KEY = 'bs-store-cart';

function loadItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Migration: clear old format items that used nameKey
    if (Array.isArray(parsed)) {
      const migrated = parsed.filter(
        (item: Record<string, unknown>) => !item.nameKey
      );
      return migrated;
    }
    return [];
  } catch {
    return [];
  }
}

function saveItems(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: string, size: string | null) => void;
  updateQuantity: (id: string, size: string | null, delta: number) => void;
  getSubtotal: () => number;
  getTotal: () => number;
  clearCart: () => void;
  itemCount: number;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  orderFormOpen: boolean;
  setOrderFormOpen: (open: boolean) => void;
  sendWhatsAppOrder: (formData: {
    name: string;
    phone: string;
    address: string;
    governorate: string;
  }) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  lang,
  children,
}: {
  lang: Language;
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderFormOpen, setOrderFormOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setItems(loadItems());
  }, []);

  const addItem = useCallback((product: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.size === (product.size || null)
      );
      let next: CartItem[];
      if (existing) {
        next = prev.map((i) =>
          i.id === product.id && i.size === (product.size || null)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        next = [...prev, { ...product, quantity: 1 }];
      }
      saveItems(next);
      return next;
    });
    setSidebarOpen(true);
  }, []);

  const removeItem = useCallback((id: string, size: string | null) => {
    setItems((prev) => {
      const next = prev.filter(
        (i) => !(i.id === id && i.size === (size || null))
      );
      saveItems(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback(
    (id: string, size: string | null, delta: number) => {
      setItems((prev) => {
        const item = prev.find(
          (i) => i.id === id && i.size === (size || null)
        );
        if (!item) return prev;

        if (item.quantity + delta <= 0) {
          const next = prev.filter(
            (i) => !(i.id === id && i.size === (size || null))
          );
          saveItems(next);
          return next;
        }

        const next = prev.map((i) =>
          i.id === id && i.size === (size || null)
            ? { ...i, quantity: i.quantity + delta }
            : i
        );
        saveItems(next);
        return next;
      });
    },
    []
  );

  const getSubtotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const getTotal = useCallback(() => {
    return getSubtotal() + SHIPPING;
  }, [getSubtotal]);

  const clearCart = useCallback(() => {
    const empty: CartItem[] = [];
    saveItems(empty);
    setItems(empty);
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const buildWhatsAppMessage = useCallback(
    (formData: {
      name: string;
      phone: string;
      address: string;
      governorate: string;
    }) => {
      const L = lang;
      let msg = '*' + t('wa.order_title', L) + '*\n\n';
      msg += '*' + t('wa.client', L) + ':* ' + formData.name + '\n';
      msg += '*' + t('wa.phone', L) + ':* ' + formData.phone + '\n';
      msg += '*' + t('wa.address', L) + ':* ' + formData.address + '\n';
      msg += '*' + t('wa.governorate', L) + ':* ' + formData.governorate + '\n\n';
      msg += '*' + t('wa.items', L) + ':*\n';

      items.forEach((item) => {
        const name = L === 'fr' ? item.name_fr : item.name_en;
        const sizeStr = item.size ? ' (' + item.size + ')' : '';
        msg +=
          '- ' +
          name +
          sizeStr +
          ' x' +
          item.quantity +
          ' = ' +
          item.price * item.quantity +
          ' TND\n';
      });

      msg += '\n*' + t('wa.subtotal', L) + ':* ' + getSubtotal() + ' TND\n';
      msg += '*' + t('wa.shipping', L) + ':* ' + SHIPPING + ' TND\n';
      msg += '*' + t('wa.total', L) + ':* ' + getTotal() + ' TND';

      return msg;
    },
    [items, lang, getSubtotal, getTotal]
  );

  const sendWhatsAppOrder = useCallback(
    (formData: {
      name: string;
      phone: string;
      address: string;
      governorate: string;
    }) => {
      const message = buildWhatsAppMessage(formData);
      const url =
        'https://wa.me/' +
        WHATSAPP_NUMBER +
        '?text=' +
        encodeURIComponent(message);
      window.open(url, '_blank');

      setTimeout(() => {
        clearCart();
        setOrderFormOpen(false);
      }, 1000);
    },
    [buildWhatsAppMessage, clearCart]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        getSubtotal,
        getTotal,
        clearCart,
        itemCount,
        sidebarOpen,
        setSidebarOpen,
        orderFormOpen,
        setOrderFormOpen,
        sendWhatsAppOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
