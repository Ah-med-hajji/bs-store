'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/lib/i18n';

export default function ContactSection() {
  const { gsap } = useGSAP();
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Section header
      gsap.fromTo(
        '.contact .section-subtitle',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.contact .section-subtitle',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.contact .section-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.contact .section-title',
            start: 'top 85%',
          },
        }
      );

      // Cards stagger
      gsap.fromTo(
        '.contact-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [gsap]);

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle reveal-text">
            {t('contact.subtitle', lang)}
          </p>
          <h2 className="section-title reveal-text">
            {t('contact.title', lang)}
          </h2>
        </div>

        <div className="contact-grid">
          {/* Phone */}
          <a href="tel:+21658113142" className="contact-card">
            <div className="contact-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <h3>{t('contact.phone_label', lang)}</h3>
            <p>+216 58 131 142</p>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/21658113142"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-icon">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.4 0-4.637-.81-6.42-2.175l-.447-.355-2.796.937.937-2.796-.355-.447A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
            </div>
            <h3>{t('contact.whatsapp_label', lang)}</h3>
            <p>+216 58 131 142</p>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/ben_saad_store/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <h3>{t('contact.instagram_label', lang)}</h3>
            <p>@ben_saad_store</p>
          </a>
        </div>
      </div>
    </section>
  );
}
