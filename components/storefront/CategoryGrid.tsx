'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@/hooks/useGSAP';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/lib/i18n';
import type { Category } from '@/lib/types';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const { gsap } = useGSAP();
  const { lang } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.category-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, [gsap, categories]);

  return (
    <section className="categories" id="categories">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle reveal-text">
            {t('categories.subtitle', lang)}
          </p>
          <h2 className="section-title reveal-text">
            {t('categories.title', lang)}
          </h2>
        </div>

        <div className="category-grid" ref={gridRef}>
          {categories.map((cat) => (
            <Link
              href={`/categories/${cat.slug}`}
              className="category-card"
              key={cat.id}
            >
              <div className="category-card-image">
                {cat.image_url && (
                  <Image
                    src={cat.image_url}
                    alt={lang === 'fr' ? cat.name_fr : cat.name_en}
                    width={800}
                    height={600}
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="category-card-info">
                <h3>{lang === 'fr' ? cat.name_fr : cat.name_en}</h3>
                <p>
                  {lang === 'fr' ? cat.card_desc_fr : cat.card_desc_en}
                </p>
                <span className="category-card-cta">
                  {t('categories.view_all', lang)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
