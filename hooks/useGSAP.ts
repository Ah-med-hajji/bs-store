'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useGSAP() {
  const registered = useRef(false);

  useEffect(() => {
    if (!registered.current && typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      registered.current = true;
    }
  }, []);

  return { gsap, ScrollTrigger };
}
