'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { t } from '@/lib/i18n';
import type { Category } from '@/lib/types';

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const { lang, toggleLanguage } = useLanguage();
  const { itemCount, setSidebarOpen } = useCart(lang);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleCartClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setMenuOpen(false);
      setSidebarOpen(true);
    },
    [setSidebarOpen]
  );

  const handleLinkClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const langLabel = lang === 'fr' ? 'EN' : 'FR';

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          BS<span>Store</span>
        </Link>

        <ul className={`nav-links${menuOpen ? ' active' : ''}`} id="navLinks">
          <li>
            <Link href="/" onClick={handleLinkClick}>
              {t('nav.home', lang)}
            </Link>
          </li>
          <li>
            <Link href="/#about" onClick={handleLinkClick}>
              {t('nav.about', lang)}
            </Link>
          </li>
          <li className="nav-dropdown">
            <Link href="/#categories" className="nav-dropdown-trigger" onClick={handleLinkClick}>
              {t('nav.shop', lang)}
            </Link>
            <ul className="nav-dropdown-menu">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    onClick={handleLinkClick}
                  >
                    {lang === 'fr' ? cat.name_fr : cat.name_en}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link href="/#contact" onClick={handleLinkClick}>
              {t('nav.contact', lang)}
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            className="nav-lang-toggle"
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            {langLabel}
          </button>
          <button
            className="nav-cart-btn"
            onClick={handleCartClick}
            aria-label={t('nav.cart', lang)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              width="22"
              height="22"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </button>
        </div>

        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
