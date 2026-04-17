'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLenis } from '@/hooks/useLenis';

export default function BackToTop() {
  const { scrollTo } = useLenis();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = useCallback(() => {
    scrollTo(0);
  }, [scrollTo]);

  return (
    <button
      className={`back-to-top${visible ? ' visible' : ''}`}
      onClick={handleClick}
      aria-label="Back to top"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="20"
        height="20"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
