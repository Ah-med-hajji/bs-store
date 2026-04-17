'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/lib/i18n';

export default function AboutSection() {
  const { gsap, ScrollTrigger } = useGSAP();
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Section header reveals
      gsap.fromTo(
        '.about .section-subtitle',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.about .section-subtitle',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.about .section-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.about .section-title',
            start: 'top 85%',
          },
        }
      );

      // Text line reveals
      gsap.fromTo(
        '.reveal-line',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
          },
        }
      );

      // Stat counter animations
      const stats = section.querySelectorAll('.stat');
      stats.forEach((stat) => {
        const numEl = stat.querySelector('.stat-number');
        const suffixEl = stat.querySelector('.stat-suffix');
        const target = numEl?.getAttribute('data-target');

        if (target && numEl) {
          ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.fromTo(
                stat,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6 }
              );

              const numTarget = parseInt(target, 10);
              const suffix = suffixEl?.textContent || '';

              gsap.to(
                { val: 0 },
                {
                  val: numTarget,
                  duration: 2,
                  ease: 'power2.out',
                  onUpdate: function () {
                    numEl.textContent = Math.round(this.targets()[0].val).toString();
                    if (suffixEl) suffixEl.textContent = suffix;
                  },
                }
              );
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, [gsap, ScrollTrigger]);

  const stats = [
    { target: 100, suffix: '+', labelKey: 'about.stat1.label' },
    { target: 50, suffix: '+', labelKey: 'about.stat2.label' },
    { target: 2024, suffix: '', labelKey: 'about.stat3.label' },
  ];

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle reveal-text">
            {t('about.subtitle', lang)}
          </p>
          <h2 className="section-title reveal-text">
            {t('about.title', lang)}
          </h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="reveal-line">{t('about.p1', lang)}</p>
            <p className="reveal-line">{t('about.p2', lang)}</p>
          </div>

          <div className="about-stats">
            {stats.map((stat, i) => (
              <div className="stat" key={i}>
                <div>
                  <span
                    className="stat-number"
                    data-target={stat.target}
                  >
                    0
                  </span>
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <span className="stat-label">
                  {t(stat.labelKey, lang)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
