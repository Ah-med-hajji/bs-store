/* ============================================
   BS Store — Shared UI Components
   Injects navbar, footer, cart sidebar, and
   order form into placeholder divs on every page
   ============================================ */

(function() {
  'use strict';

  /* Detect if we're on a category page (subdirectory) */
  var isCategoryPage = window.location.pathname.indexOf('/categories/') !== -1;
  var prefix = isCategoryPage ? '../' : '';

  /* ── Navbar ─────────────────────────────── */
  function injectNavbar() {
    var mount = document.getElementById('navbar-mount');
    if (!mount) return;

    mount.innerHTML = '\
    <nav class="navbar" id="navbar">\
      <div class="nav-container">\
        <a href="' + prefix + 'index.html" class="nav-logo magnetic" data-strength="20">BS<span>Store</span></a>\
        <div class="nav-actions">\
          <button class="nav-lang-toggle" id="langToggle" onclick="toggleLanguage()" aria-label="Toggle language">' + (getCurrentLang() === 'fr' ? 'EN' : 'FR') + '</button>\
          <button class="nav-cart-btn magnetic" data-strength="15" id="cartToggle" aria-label="Cart">\
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22">\
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>\
              <line x1="3" y1="6" x2="21" y2="6"/>\
              <path d="M16 10a4 4 0 01-8 0"/>\
            </svg>\
            <span class="cart-badge" id="cartBadge">0</span>\
          </button>\
        </div>\
        <ul class="nav-links" id="navLinks">\
          <li><a href="' + prefix + 'index.html" data-i18n="nav.home">Accueil</a></li>\
          <li><a href="' + (isCategoryPage ? prefix + 'index.html' : '') + '#about" data-i18n="nav.about">A propos</a></li>\
          <li class="nav-dropdown">\
            <a href="#" data-i18n="nav.shop" class="nav-dropdown-trigger">Boutique</a>\
            <ul class="nav-dropdown-menu">\
              <li><a href="' + prefix + 'categories/tshirts-polos.html" data-i18n="cat.tshirts.name">T-shirts & Polos</a></li>\
              <li><a href="' + prefix + 'categories/pants-chinos.html" data-i18n="cat.pants.name">Pantalons & Chinos</a></li>\
              <li><a href="' + prefix + 'categories/jackets-coats.html" data-i18n="cat.jackets.name">Vestes & Manteaux</a></li>\
              <li><a href="' + prefix + 'categories/hoodies-sweatshirts.html" data-i18n="cat.hoodies.name">Hoodies & Sweatshirts</a></li>\
              <li><a href="' + prefix + 'categories/shirts.html" data-i18n="cat.shirts.name">Chemises</a></li>\
              <li><a href="' + prefix + 'categories/accessories.html" data-i18n="cat.accessories.name">Accessoires</a></li>\
            </ul>\
          </li>\
          <li><a href="' + (isCategoryPage ? prefix + 'index.html' : '') + '#contact" data-i18n="nav.contact">Contact</a></li>\
        </ul>\
        <button class="hamburger" id="hamburger" aria-label="Menu">\
          <span></span>\
          <span></span>\
          <span></span>\
        </button>\
      </div>\
    </nav>';
  }

  /* ── Footer ─────────────────────────────── */
  function injectFooter() {
    var mount = document.getElementById('footer-mount');
    if (!mount) return;

    mount.innerHTML = '\
    <footer class="footer">\
      <div class="container">\
        <div class="footer-grid">\
          <div class="footer-col">\
            <h3 class="footer-brand">BS<span>Store</span></h3>\
            <p data-i18n="footer.brand_desc">Pret-a-porter masculin premium, concu pour l\'homme moderne. Qualite et style depuis 2024.</p>\
          </div>\
          <div class="footer-col">\
            <h4 data-i18n="footer.quick_links">Liens Rapides</h4>\
            <ul>\
              <li><a href="' + prefix + 'index.html" data-i18n="nav.home">Accueil</a></li>\
              <li><a href="' + prefix + 'categories/tshirts-polos.html" data-i18n="cat.tshirts.name">T-shirts & Polos</a></li>\
              <li><a href="' + prefix + 'categories/pants-chinos.html" data-i18n="cat.pants.name">Pantalons & Chinos</a></li>\
              <li><a href="' + prefix + 'categories/accessories.html" data-i18n="cat.accessories.name">Accessoires</a></li>\
            </ul>\
          </div>\
          <div class="footer-col">\
            <h4 data-i18n="footer.contact">Contact</h4>\
            <ul>\
              <li><a href="tel:+21658113142">+216 58 131 142</a></li>\
              <li><a href="https://wa.me/21658113142" target="_blank" rel="noopener">WhatsApp</a></li>\
              <li><a href="https://www.instagram.com/ben_saad_store/" target="_blank" rel="noopener">Instagram</a></li>\
            </ul>\
          </div>\
        </div>\
        <div class="footer-bottom">\
          <p>&copy; 2024 BS Store. <span data-i18n="footer.rights">Tous droits reserves.</span></p>\
        </div>\
      </div>\
    </footer>';
  }

  /* ── Cart Sidebar ────────────────────────── */
  function injectCartSidebar() {
    var mount = document.getElementById('cart-mount');
    if (!mount) return;

    mount.innerHTML = '\
    <div class="cart-overlay" id="cartOverlay"></div>\
    <div class="cart-sidebar" id="cartSidebar">\
      <div class="cart-header">\
        <h3 data-i18n="cart.title">Votre Panier</h3>\
        <button class="cart-close" id="cartClose" aria-label="Close cart">\
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">\
            <path d="M18 6L6 18M6 6l12 12"/>\
          </svg>\
        </button>\
      </div>\
      <div class="cart-items" id="cartItems">\
        <p class="cart-empty" data-i18n="cart.empty">Votre panier est vide</p>\
      </div>\
      <div class="cart-summary" id="cartSummary">\
        <div class="cart-summary-row">\
          <span data-i18n="cart.subtotal">Sous-total</span>\
          <span id="cartSubtotal">0 TND</span>\
        </div>\
        <div class="cart-summary-row">\
          <span data-i18n="cart.shipping">Livraison</span>\
          <span>8 TND</span>\
        </div>\
        <div class="cart-summary-row cart-total-row">\
          <span data-i18n="cart.total">Total</span>\
          <span id="cartTotal">8 TND</span>\
        </div>\
        <button class="btn-checkout" id="btnCheckout" data-i18n="cart.checkout">Commander</button>\
      </div>\
    </div>';
  }

  /* ── Order Form Overlay ──────────────────── */
  function injectOrderFormOverlay() {
    var mount = document.getElementById('order-form-mount');
    if (!mount) return;

    /* Tunisian governorates */
    var governorates = [
      'Tunis', 'Ariana', 'Ben Arous', 'Manouba',
      'Nabeul', 'Zaghouan', 'Bizerte', 'Beja',
      'Jendouba', 'Le Kef', 'Siliana', 'Sousse',
      'Monastir', 'Mahdia', 'Sfax', 'Kairouan',
      'Kasserine', 'Sidi Bouzid', 'Gabes', 'Medenine',
      'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'
    ];

    var govOptions = '<option value="" data-i18n="form.governorate_default">Selectionnez votre gouvernorat</option>';
    governorates.forEach(function(gov) {
      govOptions += '<option value="' + gov + '">' + gov + '</option>';
    });

    mount.innerHTML = '\
    <div class="order-form-overlay" id="orderFormOverlay">\
      <div class="order-form">\
        <div class="order-form-header">\
          <h3 data-i18n="form.title">Confirmer la Commande</h3>\
          <button class="order-form-close" id="orderFormClose" aria-label="Close">\
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">\
              <path d="M18 6L6 18M6 6l12 12"/>\
            </svg>\
          </button>\
        </div>\
        <form id="orderForm" novalidate>\
          <div class="form-group">\
            <label for="orderName" data-i18n="form.name">Nom Complet</label>\
            <input type="text" id="orderName" data-i18n-attr="placeholder:form.name_placeholder" placeholder="Entrez votre nom complet" required>\
            <span class="form-error" id="errorName"></span>\
          </div>\
          <div class="form-group">\
            <label for="orderPhone" data-i18n="form.phone">Numero de Telephone</label>\
            <input type="tel" id="orderPhone" data-i18n-attr="placeholder:form.phone_placeholder" placeholder="Ex: 58113142" required>\
            <span class="form-error" id="errorPhone"></span>\
          </div>\
          <div class="form-group">\
            <label for="orderAddress" data-i18n="form.address">Adresse de Livraison</label>\
            <textarea id="orderAddress" rows="2" data-i18n-attr="placeholder:form.address_placeholder" placeholder="Entrez votre adresse complete" required></textarea>\
            <span class="form-error" id="errorAddress"></span>\
          </div>\
          <div class="form-group">\
            <label for="orderGovernorate" data-i18n="form.governorate">Gouvernorat</label>\
            <select id="orderGovernorate" required>' + govOptions + '</select>\
            <span class="form-error" id="errorGovernorate"></span>\
          </div>\
          <div class="order-summary-section">\
            <h4 data-i18n="form.order_summary">Resume de la Commande</h4>\
            <div id="orderItemsSummary"></div>\
            <div class="order-summary-totals">\
              <div class="cart-summary-row">\
                <span data-i18n="cart.subtotal">Sous-total</span>\
                <span id="orderSubtotal">0 TND</span>\
              </div>\
              <div class="cart-summary-row">\
                <span data-i18n="cart.shipping">Livraison</span>\
                <span>8 TND</span>\
              </div>\
              <div class="cart-summary-row cart-total-row">\
                <span data-i18n="cart.total">Total</span>\
                <span id="orderTotal">8 TND</span>\
              </div>\
            </div>\
          </div>\
          <button type="submit" class="btn-whatsapp" id="btnWhatsApp">\
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">\
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>\
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.4 0-4.637-.81-6.42-2.175l-.447-.355-2.796.937.937-2.796-.355-.447A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>\
            </svg>\
            <span data-i18n="form.confirm_whatsapp">Confirmer via WhatsApp</span>\
          </button>\
        </form>\
      </div>\
    </div>';
  }

  /* ── Initialize all components ───────────── */
  function initComponents() {
    injectNavbar();
    injectFooter();
    injectCartSidebar();
    injectOrderFormOverlay();
  }

  /* Run immediately (before DOMContentLoaded for navbar flash prevention) */
  initComponents();

})();
