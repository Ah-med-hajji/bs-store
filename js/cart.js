/* ============================================
   BS Store — Cart Logic + WhatsApp Ordering
   ============================================ */

var Cart = (function() {
  'use strict';

  var STORAGE_KEY = 'bs-store-cart';
  var SHIPPING = 8;

  /* ── Storage ──────────────────────────── */
  function getItems() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch(e) {
      return [];
    }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  /* ── Cart operations ──────────────────── */
  function addItem(product) {
    var items = getItems();
    var existing = items.find(function(item) {
      return item.id === product.id && item.size === (product.size || null);
    });

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        id: product.id,
        nameKey: product.nameKey,
        price: product.price,
        image: product.image,
        size: product.size || null,
        quantity: 1,
        category: product.category || ''
      });
    }

    save(items);
    renderBadge();
    renderSidebar();
    return true;
  }

  function removeItem(id, size) {
    var items = getItems().filter(function(item) {
      return !(item.id === id && item.size === (size || null));
    });
    save(items);
    renderBadge();
    renderSidebar();
  }

  function updateQuantity(id, size, delta) {
    var items = getItems();
    var item = items.find(function(i) {
      return i.id === id && i.size === (size || null);
    });

    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        items = items.filter(function(i) {
          return !(i.id === id && i.size === (size || null));
        });
      }
    }

    save(items);
    renderBadge();
    renderSidebar();
  }

  function getSubtotal() {
    return getItems().reduce(function(sum, item) {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  function getTotal() {
    return getSubtotal() + SHIPPING;
  }

  function clearCart() {
    save([]);
    renderBadge();
    renderSidebar();
  }

  /* ── UI Rendering ─────────────────────── */
  function renderBadge() {
    var badge = document.getElementById('cartBadge');
    if (!badge) return;
    var count = getItems().reduce(function(sum, item) {
      return sum + item.quantity;
    }, 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  function renderSidebar() {
    var container = document.getElementById('cartItems');
    var subtotalEl = document.getElementById('cartSubtotal');
    var totalEl = document.getElementById('cartTotal');
    var summaryEl = document.getElementById('cartSummary');
    if (!container) return;

    var items = getItems();

    if (items.length === 0) {
      container.innerHTML = '<p class="cart-empty" data-i18n="cart.empty">' + t('cart.empty') + '</p>';
      if (summaryEl) summaryEl.style.display = 'none';
      return;
    }

    if (summaryEl) summaryEl.style.display = 'block';

    var html = '';
    items.forEach(function(item) {
      var name = t(item.nameKey);
      var sizeLabel = item.size ? ' (' + item.size + ')' : '';
      html += '\
        <div class="cart-item" data-id="' + item.id + '" data-size="' + (item.size || '') + '">\
          <img src="' + item.image + '" alt="' + name + '" class="cart-item-thumb" loading="lazy">\
          <div class="cart-item-info">\
            <h4 class="cart-item-name">' + name + sizeLabel + '</h4>\
            <p class="cart-item-price">' + item.price + ' TND</p>\
            <div class="cart-qty-controls">\
              <button class="cart-qty-btn cart-qty-minus" aria-label="Decrease">-</button>\
              <span class="cart-qty-value">' + item.quantity + '</span>\
              <button class="cart-qty-btn cart-qty-plus" aria-label="Increase">+</button>\
            </div>\
          </div>\
          <button class="cart-item-remove" aria-label="Remove">\
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">\
              <path d="M18 6L6 18M6 6l12 12"/>\
            </svg>\
          </button>\
        </div>';
    });

    container.innerHTML = html;

    var subtotal = getSubtotal();
    if (subtotalEl) subtotalEl.textContent = subtotal + ' TND';
    if (totalEl) totalEl.textContent = getTotal() + ' TND';
  }

  /* ── Sidebar toggle ───────────────────── */
  function openSidebar() {
    var sidebar = document.getElementById('cartSidebar');
    var overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    /* Close mobile menu if open */
    var navLinks = document.getElementById('navLinks');
    var hamburger = document.getElementById('hamburger');
    if (navLinks) navLinks.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
  }

  function closeSidebar() {
    var sidebar = document.getElementById('cartSidebar');
    var overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Order Form ───────────────────────── */
  function openOrderForm() {
    if (getItems().length === 0) return;

    var overlay = document.getElementById('orderFormOverlay');
    if (!overlay) return;

    renderOrderSummary();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeSidebar();
  }

  function closeOrderForm() {
    var overlay = document.getElementById('orderFormOverlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderOrderSummary() {
    var container = document.getElementById('orderItemsSummary');
    var subtotalEl = document.getElementById('orderSubtotal');
    var totalEl = document.getElementById('orderTotal');
    if (!container) return;

    var items = getItems();
    var html = '';
    items.forEach(function(item) {
      var name = t(item.nameKey);
      var sizeLabel = item.size ? ' (' + item.size + ')' : '';
      html += '\
        <div class="order-item-row">\
          <span>' + name + sizeLabel + ' x' + item.quantity + '</span>\
          <span>' + (item.price * item.quantity) + ' TND</span>\
        </div>';
    });

    container.innerHTML = html;
    if (subtotalEl) subtotalEl.textContent = getSubtotal() + ' TND';
    if (totalEl) totalEl.textContent = getTotal() + ' TND';
  }

  function validateOrderForm() {
    var name = document.getElementById('orderName').value.trim();
    var phone = document.getElementById('orderPhone').value.trim();
    var address = document.getElementById('orderAddress').value.trim();
    var gov = document.getElementById('orderGovernorate').value;

    /* Clear previous errors */
    document.querySelectorAll('.form-error').forEach(function(el) {
      el.textContent = '';
    });
    document.querySelectorAll('.form-group').forEach(function(el) {
      el.classList.remove('has-error');
    });

    var valid = true;

    if (!name) {
      showFieldError('orderName', 'errorName', 'form.name_required');
      valid = false;
    }
    if (!phone) {
      showFieldError('orderPhone', 'errorPhone', 'form.phone_required');
      valid = false;
    } else if (!/^(\+216|00216)?\d{8}$/.test(phone.replace(/\s/g, ''))) {
      showFieldError('orderPhone', 'errorPhone', 'form.phone_format');
      valid = false;
    }
    if (!address) {
      showFieldError('orderAddress', 'errorAddress', 'form.address_required');
      valid = false;
    }
    if (!gov) {
      showFieldError('orderGovernorate', 'errorGovernorate', 'form.gov_required');
      valid = false;
    }

    return valid;
  }

  function showFieldError(inputId, errorId, messageKey) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    if (input) input.closest('.form-group').classList.add('has-error');
    if (error) error.textContent = t(messageKey);
  }

  /* ── WhatsApp message builder ─────────── */
  function buildWhatsAppMessage() {
    var name = document.getElementById('orderName').value.trim();
    var phone = document.getElementById('orderPhone').value.trim();
    var address = document.getElementById('orderAddress').value.trim();
    var gov = document.getElementById('orderGovernorate').value;
    var items = getItems();

    var msg = '*' + t('wa.order_title') + '*\n\n';
    msg += '*' + t('wa.client') + ':* ' + name + '\n';
    msg += '*' + t('wa.phone') + ':* ' + phone + '\n';
    msg += '*' + t('wa.address') + ':* ' + address + '\n';
    msg += '*' + t('wa.governorate') + ':* ' + gov + '\n\n';
    msg += '*' + t('wa.items') + ':*\n';

    items.forEach(function(item) {
      var itemName = t(item.nameKey);
      var sizeStr = item.size ? ' (' + item.size + ')' : '';
      msg += '- ' + itemName + sizeStr + ' x' + item.quantity + ' = ' + (item.price * item.quantity) + ' TND\n';
    });

    msg += '\n*' + t('wa.subtotal') + ':* ' + getSubtotal() + ' TND\n';
    msg += '*' + t('wa.shipping') + ':* ' + SHIPPING + ' TND\n';
    msg += '*' + t('wa.total') + ':* ' + getTotal() + ' TND';

    return msg;
  }

  function sendWhatsAppOrder() {
    if (!validateOrderForm()) return;

    var message = buildWhatsAppMessage();
    var url = 'https://wa.me/21658113142?text=' + encodeURIComponent(message);
    window.open(url, '_blank');

    /* Clear cart after sending */
    setTimeout(function() {
      clearCart();
      closeOrderForm();
    }, 1000);
  }

  /* ── Event listeners ──────────────────── */
  function initEvents() {
    /* Cart toggle */
    var cartToggle = document.getElementById('cartToggle');
    if (cartToggle) {
      cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        openSidebar();
      });
    }

    /* Cart close */
    var cartClose = document.getElementById('cartClose');
    if (cartClose) {
      cartClose.addEventListener('click', closeSidebar);
    }

    /* Cart overlay close */
    var cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
      cartOverlay.addEventListener('click', closeSidebar);
    }

    /* Cart item interactions (event delegation) */
    var cartItems = document.getElementById('cartItems');
    if (cartItems) {
      cartItems.addEventListener('click', function(e) {
        var item = e.target.closest('.cart-item');
        if (!item) return;

        var id = item.dataset.id;
        var size = item.dataset.size || null;

        if (e.target.closest('.cart-qty-minus')) {
          updateQuantity(id, size, -1);
        } else if (e.target.closest('.cart-qty-plus')) {
          updateQuantity(id, size, 1);
        } else if (e.target.closest('.cart-item-remove')) {
          removeItem(id, size);
        }
      });
    }

    /* Checkout button */
    var btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) {
      btnCheckout.addEventListener('click', function(e) {
        e.preventDefault();
        openOrderForm();
      });
    }

    /* Order form close */
    var orderFormClose = document.getElementById('orderFormClose');
    if (orderFormClose) {
      orderFormClose.addEventListener('click', closeOrderForm);
    }

    /* Order form overlay click to close */
    var orderFormOverlay = document.getElementById('orderFormOverlay');
    if (orderFormOverlay) {
      orderFormOverlay.addEventListener('click', function(e) {
        if (e.target === orderFormOverlay) closeOrderForm();
      });
    }

    /* Order form submit */
    var orderForm = document.getElementById('orderForm');
    if (orderForm) {
      orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendWhatsAppOrder();
      });
    }

    /* WhatsApp button click */
    var btnWhatsApp = document.getElementById('btnWhatsApp');
    if (btnWhatsApp) {
      btnWhatsApp.addEventListener('click', function(e) {
        e.preventDefault();
        sendWhatsAppOrder();
      });
    }
  }

  /* ── Init ─────────────────────────────── */
  function init() {
    renderBadge();
    renderSidebar();
    initEvents();
  }

  /* Public API */
  return {
    init: init,
    getItems: getItems,
    addItem: addItem,
    removeItem: removeItem,
    updateQuantity: updateQuantity,
    getSubtotal: getSubtotal,
    getTotal: getTotal,
    clearCart: clearCart,
    renderBadge: renderBadge,
    renderSidebar: renderSidebar,
    openSidebar: openSidebar,
    closeSidebar: closeSidebar,
    openOrderForm: openOrderForm,
    closeOrderForm: closeOrderForm
  };

})();
