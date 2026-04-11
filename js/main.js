/* ===== BS Store — Premium Interactions ===== */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

  // ===== Preloader =====
  const preloader = document.getElementById('preloader');
  const preloaderWords = document.querySelectorAll('.preloader-word');
  const preloaderFill = document.querySelector('.preloader-bar-fill');

  // Animate preloader words in
  gsap.to(preloaderWords, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    from: { y: 40, opacity: 0 },
    delay: 0.3
  });

  // Set initial state
  gsap.set(preloaderWords, { y: 40, opacity: 0 });

  // Re-run the animation properly
  const preloaderTl = gsap.timeline({ delay: 0.2 });
  preloaderTl
    .to(preloaderWords, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    })
    .to(preloaderFill, {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut'
    }, '-=0.4')
    .to(preloaderWords, {
      y: -60,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.in'
    }, '+=0.3')
    .to(preloader, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        initPage();
      }
    }, '-=0.3');

  // Lock scroll during preloader
  document.body.style.overflow = 'hidden';

  // ===== Initialize Everything After Preloader =====
  function initPage() {
    initLenis();
    initCursor();
    initHeroAnimation();
    initScrollAnimations();
    initNavbar();
    initMobileMenu();
    initTestimonialSlider();
    initScrollProgress();
    initBackToTop();
    initMagneticButtons();
  }

  // ===== Lenis Smooth Scroll =====
  let lenis;
  function initLenis() {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // ===== Custom Cursor =====
  function initCursor() {
    const dot = document.getElementById('cursorDot');
    const circle = document.getElementById('cursorCircle');

    if (!dot || !circle || window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let circleX = 0, circleY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.classList.add('active');
      circle.classList.add('active');

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: 'power2.out'
      });
    });

    document.addEventListener('mouseleave', () => {
      dot.classList.remove('active');
      circle.classList.remove('active');
    });

    // Smooth follow for circle
    function animateCircle() {
      circleX += (mouseX - circleX) * 0.12;
      circleY += (mouseY - circleY) * 0.12;

      circle.style.left = circleX + 'px';
      circle.style.top = circleY + 'px';

      requestAnimationFrame(animateCircle);
    }
    animateCircle();

    // Hover effects on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .product-card, .contact-card, .magnetic');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hovering');
        circle.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hovering');
        circle.classList.remove('hovering');
      });
    });
  }

  // ===== Hero Cinematic Animation =====
  function initHeroAnimation() {
    const heroElements = document.querySelectorAll('.hero-anim');

    heroElements.forEach(el => {
      const delay = parseFloat(el.dataset.delay) || 0;

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: delay,
        ease: 'power3.out'
      });
    });

    // Hero title letter animation
    const heroTitleSpans = document.querySelectorAll('.hero-title span');
    gsap.fromTo(heroTitleSpans,
      { y: '120%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1.4,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.8
      }
    );

    // Parallax on hero background
    gsap.to('.hero', {
      backgroundPositionY: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // ===== Scroll-Triggered Animations =====
  function initScrollAnimations() {
    // Section subtitles
    gsap.utils.toArray('.section-subtitle.reveal-text').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    // Section titles
    gsap.utils.toArray('.section-title.reveal-text').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    // About text lines
    gsap.utils.toArray('.reveal-line').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(el => {
      const target = parseInt(el.dataset.count);
      const noSuffix = el.hasAttribute('data-no-suffix');

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          if (noSuffix) return; // Don't animate "TND"

          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(counter.val);
            }
          });
        }
      });
    });

    // Product cards stagger
    gsap.utils.toArray('.product-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true
        }
      });
    });

    // Contact cards
    gsap.utils.toArray('.contact-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true
        }
      });
    });

    // Stats parallax
    gsap.utils.toArray('.stat').forEach((stat, i) => {
      gsap.from(stat, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 88%',
          once: true
        }
      });
    });

    // CTA section
    const ctaText = document.querySelector('.cta-section p.reveal-text');
    if (ctaText) {
      gsap.to(ctaText, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaText,
          start: 'top 85%',
          once: true
        }
      });
    }
  }

  // ===== Navbar =====
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    });
  }

  // ===== Mobile Menu =====
  function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');

      // Prevent scroll when menu open
      if (navLinks.classList.contains('open')) {
        lenis && lenis.stop();
      } else {
        lenis && lenis.start();
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        lenis && lenis.start();
      });
    });
  }

  // ===== Testimonial Slider =====
  function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    const total = document.querySelectorAll('.testimonial-card').length;

    function goToSlide(index) {
      current = index;
      gsap.to(track, {
        x: `-${current * 100}%`,
        duration: 0.7,
        ease: 'power3.inOut'
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.index));
      });
    });

    // Auto-rotate
    let autoplay = setInterval(() => {
      goToSlide((current + 1) % total);
    }, 5000);

    // Pause on hover
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
      slider.addEventListener('mouseenter', () => clearInterval(autoplay));
      slider.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => {
          goToSlide((current + 1) % total);
        }, 5000);
      });
    }
  }

  // ===== Scroll Progress Bar =====
  function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }

  // ===== Back to Top =====
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > window.innerHeight) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // ===== Magnetic Buttons =====
  function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const magnets = document.querySelectorAll('.magnetic');

    magnets.forEach(el => {
      const strength = parseInt(el.dataset.strength) || 25;

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: (x / rect.width) * strength,
          y: (y / rect.height) * strength,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

});
