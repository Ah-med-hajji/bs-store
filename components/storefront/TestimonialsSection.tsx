'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/lib/i18n';

const TESTIMONIAL_COUNT = 3;

export default function TestimonialsSection() {
  const { gsap } = useGSAP();
  const { lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const isHovered = useRef(false);

  const testimonials = Array.from({ length: TESTIMONIAL_COUNT }, (_, i) => ({
    name: t(`test.${i + 1}.name`, lang),
    badge: t(`test.${i + 1}.badge`, lang),
    text: t(`test.${i + 1}.text`, lang),
  }));

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % TESTIMONIAL_COUNT) + TESTIMONIAL_COUNT) % TESTIMONIAL_COUNT;
      setCurrent(next);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!isHovered.current) {
        setCurrent((prev) => (prev + 1) % TESTIMONIAL_COUNT);
      }
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Animate track
  useEffect(() => {
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: `-${current * 100}%`,
        duration: 0.7,
        ease: 'power3.out',
      });
    }
  }, [current, gsap]);

  // Section reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials .section-subtitle',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.testimonials .section-subtitle',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.testimonials .section-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.testimonials .section-title',
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [gsap]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  return (
    <section className="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle reveal-text">
            {t('testimonials.subtitle', lang)}
          </p>
          <h2 className="section-title reveal-text">
            {t('testimonials.title', lang)}
          </h2>
        </div>

        <div
          className="testimonial-slider"
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="testimonial-track" ref={trackRef}>
            {testimonials.map((item, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-quote">&ldquo;</div>
                <p className="testimonial-text">{item.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <span className="testimonial-name">{item.name}</span>
                    <span className="testimonial-role">{item.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`dot${i === current ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
