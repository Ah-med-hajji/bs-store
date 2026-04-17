'use client';

import { useState, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { t } from '@/lib/i18n';
import { SHIPPING, GOVERNORATES } from '@/lib/constants';

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  governorate?: string;
}

export default function OrderForm() {
  const { lang } = useLanguage();
  const {
    items,
    getSubtotal,
    getTotal,
    orderFormOpen,
    setOrderFormOpen,
    sendWhatsAppOrder,
  } = useCart(lang);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = t('form.name_required', lang);
    }
    if (!phone.trim()) {
      newErrors.phone = t('form.phone_required', lang);
    } else if (!/^(\+216|00216)?\d{8}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = t('form.phone_format', lang);
    }
    if (!address.trim()) {
      newErrors.address = t('form.address_required', lang);
    }
    if (!governorate) {
      newErrors.governorate = t('form.gov_required', lang);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, phone, address, governorate, lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    sendWhatsAppOrder({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      governorate,
    });

    // Reset form
    setName('');
    setPhone('');
    setAddress('');
    setGovernorate('');
    setErrors({});
  };

  const handleClose = () => {
    setOrderFormOpen(false);
    setErrors({});
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const subtotal = getSubtotal();
  const total = getTotal();

  return (
    <div
      className={`order-form-overlay${orderFormOpen ? ' open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="order-form">
        <div className="order-form-header">
          <h3>{t('form.title', lang)}</h3>
          <button
            className="order-form-close"
            onClick={handleClose}
            aria-label="Close"
          >
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

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className={`form-group${errors.name ? ' has-error' : ''}`}>
            <label htmlFor="orderName">{t('form.name', lang)}</label>
            <input
              type="text"
              id="orderName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('form.name_placeholder', lang)}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          {/* Phone */}
          <div className={`form-group${errors.phone ? ' has-error' : ''}`}>
            <label htmlFor="orderPhone">{t('form.phone', lang)}</label>
            <input
              type="tel"
              id="orderPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('form.phone_placeholder', lang)}
            />
            {errors.phone && (
              <span className="form-error">{errors.phone}</span>
            )}
          </div>

          {/* Address */}
          <div className={`form-group${errors.address ? ' has-error' : ''}`}>
            <label htmlFor="orderAddress">{t('form.address', lang)}</label>
            <textarea
              id="orderAddress"
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t('form.address_placeholder', lang)}
            />
            {errors.address && (
              <span className="form-error">{errors.address}</span>
            )}
          </div>

          {/* Governorate */}
          <div
            className={`form-group${errors.governorate ? ' has-error' : ''}`}
          >
            <label htmlFor="orderGovernorate">
              {t('form.governorate', lang)}
            </label>
            <select
              id="orderGovernorate"
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
            >
              <option value="">{t('form.governorate_default', lang)}</option>
              {GOVERNORATES.map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
            {errors.governorate && (
              <span className="form-error">{errors.governorate}</span>
            )}
          </div>

          {/* Order Summary */}
          <div className="order-summary-section">
            <h4>{t('form.order_summary', lang)}</h4>
            <div>
              {items.map((item, i) => {
                const itemName =
                  lang === 'fr' ? item.name_fr : item.name_en;
                const sizeStr = item.size ? ` (${item.size})` : '';
                return (
                  <div className="order-item-row" key={i}>
                    <span>
                      {itemName}
                      {sizeStr} x{item.quantity}
                    </span>
                    <span>{item.price * item.quantity} TND</span>
                  </div>
                );
              })}
            </div>
            <div className="order-summary-totals">
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
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-whatsapp">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.4 0-4.637-.81-6.42-2.175l-.447-.355-2.796.937.937-2.796-.355-.447A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            <span>{t('form.confirm_whatsapp', lang)}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
