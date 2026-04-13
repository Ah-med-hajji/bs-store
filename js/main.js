/* ===== BS Store — Homepage Interactions ===== */

document.addEventListener('DOMContentLoaded', function() {

  // ===== Preloader =====
  var preloader = document.getElementById('preloader');
  var preloaderWords = document.querySelectorAll('.preloader-word');
  var preloaderFill = document.querySelector('.preloader-bar-fill');

  gsap.set(preloaderWords, { y: 40, opacity: 0 });

  var preloaderTl = gsap.timeline({ delay: 0.2 });
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
      onComplete: function() {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        initPage();
      }
    }, '-=0.3');

  document.body.style.overflow = 'hidden';

  // ===== Initialize Everything After Preloader =====
  var lenis;
  function initPage() {
    initCart();
    initLanguage();
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

  // ===== Cart init =====
  function initCart() {
    if (typeof Cart !== 'undefined') {
      Cart.init();
    }
  }

  // ===== Language =====
  function initLanguage() {
    if (typeof applyLanguage === 'function') {
      applyLanguage();
    }
  }

  // ===== Lenis Smooth Scroll =====
  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    lenis = new Lenis({
      duration: 1.2,
      easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      orientation: 'vertical',
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(function(time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // ===== Custom Cursor =====
  function initCursor() {
    var dot = document.getElementById('cursorDot');
    var circle = document.getElementById('cursorCircle');

    if (!dot || !circle || 'ontouchstart' in window) return;

    var mouseX = 0, mouseY = 0;
    var circleX = 0, circleY = 0;

    document.addEventListener('mousemove', function(e) {
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

    document.addEventListener('mouseleave', function() {
      dot.classList.remove('active');
      circle.classList.remove('active');
    });

    function animateCircle() {
      circleX += (mouseX - circleX) * 0.12;
      circleY += (mouseY - circleY) * 0.12;
      circle.style.left = circleX + 'px';
      circle.style.top = circleY + 'px';
      requestAnimationFrame(animateCircle);
    }
    animateCircle();

    var hoverTargets = document.querySelectorAll('a, button, .category-card, .contact-card, .magnetic');
    hoverTargets.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        dot.classList.add('hovering');
        circle.classList.add('hovering');
      });
      el.addEventListener('mouseleave', function() {
        dot.classList.remove('hovering');
        circle.classList.remove('hovering');
      });
    });
  }

  // ===== Hero Cinematic Animation =====
  function initHeroAnimation() {
    var heroElements = document.querySelectorAll('.hero-anim');
    heroElements.forEach(function(el) {
      var delay = parseFloat(el.dataset.delay) || 0;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: delay,
        ease: 'power3.out'
      });
    });

    var heroTitleSpans = document.querySelectorAll('.hero-title span');
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
    gsap.utils.toArray('.section-subtitle.reveal-text').forEach(function(el) {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });

    // Section titles
    gsap.utils.toArray('.section-title.reveal-text').forEach(function(el) {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });

    // About text lines
    gsap.utils.toArray('.reveal-line').forEach(function(el, i) {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(function(el) {
      var target = parseInt(el.dataset.count);
      var noSuffix = el.hasAttribute('data-no-suffix');

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: function() {
          if (noSuffix) return;
          var counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              el.textContent = Math.round(counter.val);
            }
          });
        }
      });
    });

    // Category cards stagger
    gsap.utils.toArray('.category-card').forEach(function(card, i) {
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
    gsap.utils.toArray('.contact-card').forEach(function(card, i) {
      gsap.from(card, {
        opacity: 0, y: 40, duration: 0.8, delay: i * 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true }
      });
    });

    // Stats
    gsap.utils.toArray('.stat').forEach(function(stat, i) {
      gsap.from(stat, {
        opacity: 0, y: 50, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: stat, start: 'top 88%', once: true }
      });
    });
  }

  // ===== Navbar =====
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ===== Mobile Menu =====
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');

      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
      } else {
        document.body.style.overflow = '';
        if (lenis) lenis.start();
      }
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
      });
    });
  }

  // ===== Testimonial Slider =====
  function initTestimonialSlider() {
    var track = document.getElementById('testimonialTrack');
    var dots = document.querySelectorAll('.dot');
    if (!track || dots.length === 0) return;

    var current = 0;
    var total = document.querySelectorAll('.testimonial-card').length;

    function goToSlide(index) {
      current = index;
      gsap.to(track, {
        x: '-' + (current * 100) + '%',
        duration: 0.7,
        ease: 'power3.inOut'
      });
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        goToSlide(parseInt(dot.dataset.index));
      });
    });

    var autoplay = setInterval(function() {
      goToSlide((current + 1) % total);
    }, 5000);

    var slider = document.querySelector('.testimonial-slider');
    if (slider) {
      slider.addEventListener('mouseenter', function() { clearInterval(autoplay); });
      slider.addEventListener('mouseleave', function() {
        autoplay = setInterval(function() {
          goToSlide((current + 1) % total);
        }, 5000);
      });
    }
  }

  // ===== Scroll Progress Bar =====
  function initScrollProgress() {
    var progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
      var scrollTop = window.pageYOffset;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }

  // ===== Back to Top =====
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function() {
      if (window.pageYOffset > window.innerHeight) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function() {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // ===== Magnetic Buttons =====
  function initMagneticButtons() {
    if ('ontouchstart' in window) return;

    var magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(function(el) {
      var strength = parseInt(el.dataset.strength) || 25;

      el.addEventListener('mousemove', function(e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          x: (x / rect.width) * strength,
          y: (y / rect.height) * strength,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      el.addEventListener('mouseleave', function() {
        gsap.to(el, {
          x: 0, y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

});
