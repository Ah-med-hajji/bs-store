'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/lib/i18n';
import type { Category } from '@/lib/types';

interface FooterProps {
  categories: Category[];
}

export default function Footer({ categories }: FooterProps) {
  const { lang } = useLanguage();
  const quickLinkCategories = categories.slice(0, 3);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-brand">
              BS<span>Store</span>
            </h3>
            <p>{t('footer.brand_desc', lang)}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer.quick_links', lang)}</h4>
            <ul>
              <li>
                <Link href="/">{t('nav.home', lang)}</Link>
              </li>
              {quickLinkCategories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/categories/${cat.slug}`}>
                    {lang === 'fr' ? cat.name_fr : cat.name_en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footer.contact', lang)}</h4>
            <ul>
              <li>
                <a href="tel:+21658113142">+216 58 131 142</a>
              </li>
              <li>
                <a
                  href="https://wa.me/21658113142"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ben_saad_store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2024 BS Store. {t('footer.rights', lang)}
          </p>
        </div>
      </div>
    </footer>
  );
}
