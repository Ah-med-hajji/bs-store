/* ============================================
   BS Store — Category Page Logic
   Renders product grid, handles add-to-cart,
   initializes GSAP animations on category pages
   ============================================ */

(function() {
  'use strict';

  var currentCategory = document.body.dataset.category || '';
  var lenis = null;

  /* ── Render Product Grid ─────────────── */
  window.renderProductGrid = function() {
    var grid = document.getElementById('productGrid');
    if (!grid || !PRODUCTS[currentCategory]) return;

    var products = PRODUCTS[currentCategory];
    var html = '';

    products.forEach(function(product) {
      var name = t(product.nameKey);
      var badgeHtml = '';
      if (product.badge) {
        badgeHtml = '<span class="product-card-badge" data-i18n="badge.new">' + t('badge.new') + '</span>';
      }

      var sizeSelectorHtml = '';
      if (product.sizes && product.sizes.length > 0) {
        sizeSelectorHtml = '<span class="size-label" data-i18n="product.select_size">' + t('product.select_size') + '</span>';
        sizeSelectorHtml += '<div class="size-selector">';
        product.sizes.forEach(function(size, idx) {
          var selectedClass = idx === 0 ? ' selected' : '';
          sizeSelectorHtml += '<button type="button" class="size-option' + selectedClass + '" data-size="' + size + '">' + size + '</button>';
        });
        sizeSelectorHtml += '</div>';
      }

      html += '\
        <div class="product-card" data-product-id="' + product.id + '">\
          <div class="product-card-image">\
            ' + badgeHtml + '\
            <img src="' + product.image + '" alt="' + name + '" loading="lazy">\
          </div>\
          <div class="product-card-body">\
            <h3 class="product-card-name">' + name + '</h3>\
            <p class="product-card-price">' + product.price + ' TND</p>\
            ' + sizeSelectorHtml + '\
            <button class="btn-add-to-cart" data-i18n="product.add_to_cart">' + t('product.add_to_cart') + '</button>\
          </div>\
        </div>';
    });

    grid.innerHTML = html;

    /* Stagger animate cards */
    requestAnimationFrame(function() {
      staggerCards();
    });
  };

  function staggerCards() {
    var cards = document.querySelectorAll('.product-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.category-products',
          start: 'top 85%',
          once: true
        }
      }
    );
  }

  /* ── Size selector interaction ──────────── */
  function initSizeSelectors() {
    document.addEventListener('click', function(e) {
      if (!e.target.classList.contains('size-option')) return;
      var selector = e.target.closest('.size-selector');
      if (!selector) return;
      selector.querySelectorAll('.size-option').forEach(function(btn) {
        btn.classList.remove('selected');
      });
      e.target.classList.add('selected');
    });
  }

  /* ── Add to Cart handler ────────────────── */
  function initAddToCart() {
    document.addEventListener('click', function(e) {
      var btn = e.target.closest('.btn-add-to-cart');
      if (!btn || btn.classList.contains('added')) return;

      var card = btn.closest('.product-card');
      if (!card) return;

      var productId = card.dataset.productId;
      var product = findProduct(productId);
      if (!product) return;

      /* Get selected size */
      var selectedSize = null;
      var selectedSizeBtn = card.querySelector('.size-option.selected');
      if (selectedSizeBtn) {
        selectedSize = selectedSizeBtn.dataset.size;
      }

      Cart.addItem({
        id: product.id,
        nameKey: product.nameKey,
        price: product.price,
        image: product.image,
        size: selectedSize,
        category: currentCategory
      });

      /* Visual feedback */
      btn.textContent = t('cart.added');
      btn.classList.add('added');
      setTimeout(function() {
        btn.textContent = t('product.add_to_cart');
        btn.classList.remove('added');
      }, 1500);
    });
  }

  function findProduct(id) {
    for (var cat in PRODUCTS) {
      var found = PRODUCTS[cat].find(function(p) { return p.id === id; });
      if (found) return found;
    }
    return null;
  }

  /* ── Lenis smooth scroll ────────────────── */
  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true
    });

    lenis.on('scroll', function() {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.update();
      }
    });

    gsap.ticker.add(function(time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  /* ── Navbar scroll behavior ─────────────── */
  function initNavbarScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ── Mobile menu ────────────────────────── */
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

    /* Close on link click */
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
      });
    });
  }

  /* ── Scroll Progress ─────────────────────── */
  function initScrollProgress() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', function() {
      var scrollTop = window.pageYOffset;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = (scrollTop / docHeight) * 100;
      bar.style.width = pct + '%';
    });
  }

  /* ── Back to top ────────────────────────── */
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function() {
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* ── Custom cursor (desktop) ────────────── */
  function initCursor() {
    var dot = document.getElementById('cursorDot');
    var circle = document.getElementById('cursorCircle');
    if (!dot || !circle || 'ontouchstart' in window) return;

    document.addEventListener('mousemove', function(e) {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(circle, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    var hoverEls = document.querySelectorAll('a, button, .product-card, .size-option');
    hoverEls.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        circle.classList.add('hover');
      });
      el.addEventListener('mouseleave', function() {
        circle.classList.remove('hover');
      });
    });
  }

  /* ── Category hero text reveal ──────────── */
  function initHeroReveal() {
    var elements = document.querySelectorAll('.category-hero .section-subtitle, .category-hero .section-title, .category-hero .category-description');
    gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.5
      }
    );
  }

  /* ── Preloader ──────────────────────────── */
  function initPreloader() {
    var preloader = document.getElementById('preloader');
    if (!preloader) {
      initPageContent();
      return;
    }

    /* Animate preloader text */
    var words = preloader.querySelectorAll('.preloader-word');
    gsap.to(words, {
      y: function(i) { return (i === 0 ? -1 : 1) * 60; },
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.in',
      delay: 0.8
    });

    /* Fill progress bar */
    gsap.to(preloader.querySelector('.preloader-bar-fill'), {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    });

    /* Hide preloader */
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.5,
      delay: 1.6,
      ease: 'power2.inOut',
      onComplete: function() {
        preloader.style.display = 'none';
        initPageContent();
      }
    });
  }

  function initPageContent() {
    initLenis();
    initNavbarScroll();
    initMobileMenu();
    initScrollProgress();
    initBackToTop();
    initCursor();
    initHeroReveal();
    renderProductGrid();
    Cart.init();
    applyLanguage();
    initSizeSelectors();
    initAddToCart();
    initMagneticButtons();
  }

  /* ── Magnetic buttons ───────────────────── */
  function initMagneticButtons() {
    if ('ontouchstart' in window) return;
    document.querySelectorAll('.magnetic').forEach(function(el) {
      var strength = parseInt(el.dataset.strength) || 20;
      el.addEventListener('mousemove', function(e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          x: x * (strength / 100),
          y: y * (strength / 100),
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      el.addEventListener('mouseleave', function() {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  /* ── Initialize on DOM ready ────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreloader);
  } else {
    initPreloader();
  }

})();
