'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { useLanguage } from '@/hooks/useLanguage';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const { gsap } = useGSAP();
  const { lang } = useLanguage();
  const preloaderRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if already played this session
    if (sessionStorage.getItem('bs-preloader-played')) {
      onComplete();
      return;
    }

    const el = preloaderRef.current;
    const fill = fillRef.current;
    if (!el || !fill) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('bs-preloader-played', '1');
        gsap.to(el, {
          opacity: 0,
          visibility: 'hidden',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            el.classList.add('hidden');
            onComplete();
          },
        });
      },
    });

    // Animate text words
    tl.fromTo(
      '.preloader-word',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }
    );

    // Animate progress bar
    tl.to(
      fill,
      {
        width: '100%',
        duration: 1.2,
        ease: 'power2.inOut',
      },
      '-=0.4'
    );

    // Hold briefly
    tl.to({}, { duration: 0.3 });

    return () => {
      tl.kill();
    };
  }, [gsap, onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader-inner">
        <div className="preloader-text">
          <span className="preloader-word">BS</span>
          <span className="preloader-word">Store</span>
        </div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" ref={fillRef}></div>
        </div>
      </div>
    </div>
  );
}
