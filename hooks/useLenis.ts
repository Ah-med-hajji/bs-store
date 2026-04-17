'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo: (target: string | number, options?: Record<string, unknown>) => {
      lenisRef.current?.scrollTo(target, options);
    },
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  };
}
