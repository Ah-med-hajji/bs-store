'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@/hooks/useGSAP';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/lib/i18n';

export default function HeroSection() {
  const { gsap, ScrollTrigger } = useGSAP();
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Load hero image asynchronously
    const img = new Image();
    img.src =
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&h=1080&fit=crop&q=80';
    img.onload = () => {
      if (bgRef.current) {
        bgRef.current.style.backgroundImage = `url(${img.src})`;
        bgRef.current.classList.add('loaded');
      }
    };

    // Animate hero elements
    const ctx = gsap.context(() => {
      // Subtitle
      gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      // Title spans
      gsap.to('.hero-title span', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.5,
        ease: 'power3.out',
      });

      // Tagline
      gsap.to('.hero-tagline', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: 'power3.out',
      });

      // CTA button
      gsap.to('.hero .btn', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.3,
        ease: 'power3.out',
      });

      // Scroll indicator
      gsap.to('.hero-scroll-indicator', {
        opacity: 1,
        duration: 1,
        delay: 2,
        ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, [gsap]);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-bg" ref={bgRef}></div>
      <div className="hero-overlay"></div>
      <div className="hero-grain"></div>

      <div className="hero-content">
        <p className="hero-subtitle">{t('hero.subtitle', lang)}</p>
        <h1 className="hero-title">
          <span>{t('hero.title_word1', lang)}</span>
          <span>{t('hero.title_word2', lang)}</span>
        </h1>
        <p className="hero-tagline">{t('hero.tagline', lang)}</p>
        <Link href="/#categories" className="btn btn-primary">
          <span>{t('hero.cta', lang)}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="16"
            height="16"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="hero-scroll-indicator">
        <span>{t('hero.scroll', lang)}</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
