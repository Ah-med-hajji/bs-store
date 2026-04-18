'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { t } from '@/lib/i18n';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  categorySlug: string;
}

export default function ProductCard({ product, categorySlug }: ProductCardProps) {
  const { lang } = useLanguage();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const name = lang === 'fr' ? product.name_fr : product.name_en;
  const badgeText = product.badge || null;

  const handleAddToCart = useCallback(() => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) return;

    addItem({
      id: product.id,
      name_fr: product.name_fr,
      name_en: product.name_en,
      price: product.price,
      image: product.image_url || '',
      size: selectedSize,
      quantity: 1,
      categorySlug,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }, [product, selectedSize, categorySlug, addItem]);

  return (
    <div className="product-card visible">
      <div className="product-card-image">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={name}
            width={600}
            height={750}
            style={{ objectFit: 'cover' }}
          />
        )}
        {badgeText && (
          <span className="product-card-badge">{badgeText}</span>
        )}
      </div>

      <div className="product-card-body">
        <h3 className="product-card-name">{name}</h3>
        <p className="product-card-price">{product.price} TND</p>

        {product.sizes && product.sizes.length > 0 && (
          <>
            <span className="size-label">{t('product.select_size', lang)}</span>
            <div className="size-selector">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-option${selectedSize === size ? ' selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </>
        )}

        <button
          className={`btn-add-to-cart${added ? ' added' : ''}`}
          onClick={handleAddToCart}
          disabled={
            !!(product.sizes && product.sizes.length > 0 && !selectedSize)
          }
        >
          {added ? t('cart.added', lang) : t('product.add_to_cart', lang)}
        </button>
      </div>
    </div>
  );
}
