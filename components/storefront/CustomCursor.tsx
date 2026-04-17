'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';

export default function CustomCursor() {
  const { gsap } = useGSAP();
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    // Detect touch device
    const isTouchDevice =
      typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    // Activate cursor
    dot.classList.add('active');
    circle.classList.add('active');

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      gsap.set(dot, { x: e.clientX, y: e.clientY });

      // Circle follows with easing
      gsap.to(circle, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseEnterInteractive = () => {
      dot.classList.add('hovering');
      circle.classList.add('hovering');
    };

    const handleMouseLeaveInteractive = () => {
      dot.classList.remove('hovering');
      circle.classList.remove('hovering');
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Add hover effects on interactive elements
    const interactiveSelectors =
      'a, button, input, textarea, select, .btn, .category-card, .product-card';

    const addHoverListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };

    addHoverListeners();

    // Re-attach listeners when DOM changes (for dynamically loaded content)
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, [gsap]);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-circle" ref={circleRef}></div>
    </>
  );
}
