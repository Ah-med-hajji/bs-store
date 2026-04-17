'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { t } from '@/lib/i18n';
import { SHIPPING } from '@/lib/constants';

export default function CartSidebar() {
  const { lang } = useLanguage();
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    sidebarOpen,
    setSidebarOpen,
    setOrderFormOpen,
  } = useCart(lang);

  const handleClose = () => {
    setSidebarOpen(false);
  };

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    setSidebarOpen(false);
    setOrderFormOpen(true);
  };

  const subtotal = getSubtotal();
  const total = getTotal();

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div className={`cart-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="cart-header">
          <h3>{t('cart.title', lang)}</h3>
          <button className="cart-close" onClick={handleClose} aria-label="Close">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="20"
              height="20"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <p className="cart-empty">{t('cart.empty', lang)}</p>
          ) : (
            items.map((item) => {
              const name = lang === 'fr' ? item.name_fr : item.name_en;
              const sizeLabel = item.size ? ` (${item.size})` : '';

              return (
                <div
                  className="cart-item"
                  key={`${item.id}-${item.size || 'none'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={name}
                    className="cart-item-thumb"
                    loading="lazy"
                  />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">
                      {name}{sizeLabel}
                    </h4>
                    <p className="cart-item-price">{item.price} TND</p>
                    <div className="cart-qty-controls">
                      <button
                        className="cart-qty-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.size, -1)
                        }
                        aria-label="Decrease"
                      >
                        -
                      </button>
                      <span className="cart-qty-value">{item.quantity}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.size, 1)
                        }
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id, item.size)}
                    aria-label={t('cart.remove', lang)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>{t('cart.subtotal', lang)}</span>
              <span>{subtotal} TND</span>
            </div>
            <div className="cart-summary-row">
              <span>{t('cart.shipping', lang)}</span>
              <span>{SHIPPING} TND</span>
            </div>
            <div className="cart-summary-row cart-total-row">
              <span>{t('cart.total', lang)}</span>
              <span>{total} TND</span>
            </div>
            <button className="btn-checkout" onClick={handleCheckout}>
              {t('cart.checkout', lang)}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
