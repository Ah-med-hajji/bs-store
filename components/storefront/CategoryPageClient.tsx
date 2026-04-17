'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Category, Product } from '@/lib/types';
import { useLanguage } from '@/hooks/useLanguage';
import { useGSAP } from '@/hooks/useGSAP';
import { useLenis } from '@/hooks/useLenis';
import { t } from '@/lib/i18n';
import ProductCard from './ProductCard';

export default function CategoryPageClient({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const { lang } = useLanguage();
  const { gsap, ScrollTrigger } = useGSAP();
  const lenis = useLenis();

  const name = lang === 'fr' ? category.name_fr : category.name_en;
  const subtitle = lang === 'fr' ? category.subtitle_fr : category.subtitle_en;
  const desc = lang === 'fr' ? category.desc_fr : category.desc_en;

  useEffect(() => {
    // Hero reveal
    const elements = document.querySelectorAll(
      '.category-hero .section-subtitle, .category-hero .section-title, .category-hero .category-description'
    );
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3,
      }
    );

    // Product card stagger
    const cards = document.querySelectorAll('.product-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.category-products',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st: { kill: () => void }) => st.kill());
    };
  }, [gsap, ScrollTrigger, products]);

  return (
    <>
      <section className="category-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{t('cat.breadcrumb_home', lang)}</Link>
            <span>/</span>
            <Link href="/#categories">{t('cat.breadcrumb_shop', lang)}</Link>
            <span>/</span>
            <span>{name}</span>
          </div>
          <p className="section-subtitle">{subtitle}</p>
          <h1 className="section-title">{name}</h1>
          {desc && <p className="category-description">{desc}</p>}
        </div>
      </section>

      <section className="category-products">
        <div className="container">
          <div className="category-product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categorySlug={category.slug}
              />
            ))}
          </div>
          <p
            style={{
              textAlign: 'center',
              marginTop: '24px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--text-light)',
            }}
          >
            {products.length} {t('cat.products_count', lang)}
          </p>
        </div>
      </section>
    </>
  );
}
