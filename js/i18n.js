/* ============================================
   BS Store — Internationalization (i18n)
   French (default) + English
   ============================================ */

const translations = {
  fr: {
    /* Navigation */
    'nav.home': 'Accueil',
    'nav.about': '\u00c0 propos',
    'nav.shop': 'Boutique',
    'nav.contact': 'Contact',
    'nav.cart': 'Panier',
    'nav.lang': 'EN',

    /* Hero */
    'hero.subtitle': 'Pr\u00eat-\u00e0-porter Masculin',
    'hero.title_word1': 'BS',
    'hero.title_word2': 'Store',
    'hero.tagline': '\u00c9levez votre style. Con\u00e7u pour l\u2019homme moderne.',
    'hero.cta': 'Voir la Collection',
    'hero.scroll': 'D\u00e9filer',

    /* Marquee */
    'marquee.brand': 'BS Store',
    'marquee.premium': 'Pr\u00eat-\u00e0-porter Premium',
    'marquee.tunisia': 'Tunisie',
    'marquee.established': 'Depuis 2024',

    /* About */
    'about.subtitle': 'Notre Histoire',
    'about.title': '\u00c0 propos de BS Store',
    'about.p1': 'N\u00e9 au c\u0153ur de la Tunisie, BS Store est n\u00e9 d\u2019une passion pour le style masculin accessible et de qualit\u00e9. Nous s\u00e9lectionnons chaque pi\u00e8ce avec soin, en privil\u00e9giant les coupes modernes, les tissus durables et les finitions impeccables.',
    'about.p2': 'Notre mission est simple : habiller l\u2019homme moderne avec \u00e9l\u00e9gance et confiance. Du quotidien aux occasions sp\u00e9ciales, nous offrons une collection qui parle \u00e0 ceux qui refusent les compromis sur le style.',
    'about.stat1.value': '100+',
    'about.stat1.label': 'Clients Satisfaits',
    'about.stat2.value': '50+',
    'about.stat2.label': 'Pi\u00e8ces Uniques',
    'about.stat3.value': '2024',
    'about.stat3.label': 'Fond\u00e9e',

    /* Categories section (homepage) */
    'categories.subtitle': 'Nos Cat\u00e9gories',
    'categories.title': 'Explorer la Collection',
    'categories.view_all': 'Voir tout',

    /* Category names */
    'cat.tshirts.name': 'T-shirts & Polos',
    'cat.tshirts.subtitle': 'Notre S\u00e9lection',
    'cat.tshirts.desc': 'D\u00e9couvrez notre collection de t-shirts et polos premium. Des basiques essentiels aux pi\u00e8ces tendance, chaque article est s\u00e9lectionn\u00e9 pour sa qualit\u00e9 et son style.',
    'cat.tshirts.card_desc': 'Basiques essentiels et polos premium',
    'cat.pants.name': 'Pantalons & Chinos',
    'cat.pants.subtitle': 'Notre S\u00e9lection',
    'cat.pants.desc': 'Pantalons et chinos confectionn\u00e9s pour le confort et le style. Des coupes slim aux mod\u00e8les d\u00e9contract\u00e9s, trouvez le pantalon parfait pour chaque occasion.',
    'cat.pants.card_desc': 'Coupe slim, chino et cargo',
    'cat.jackets.name': 'Vestes & Manteaux',
    'cat.jackets.subtitle': 'Notre S\u00e9lection',
    'cat.jackets.desc': 'Des vestes structur\u00e9es aux bombers classiques, notre collection de vestes allie style et fonctionnalit\u00e9. Des pi\u00e8ces intemporelles pour chaque saison.',
    'cat.jackets.card_desc': 'Bombers, vestes et overshirts',
    'cat.hoodies.name': 'Hoodies & Sweatshirts',
    'cat.hoodies.subtitle': 'Notre S\u00e9lection',
    'cat.hoodies.desc': 'Hoodies et sweatshirts premium pour un confort sans compromis. Des pi\u00e8ces polyvalentes qui vous accompagnent au quotidien.',
    'cat.hoodies.card_desc': 'Confort et style au quotidien',
    'cat.shirts.name': 'Chemises',
    'cat.shirts.subtitle': 'Notre S\u00e9lection',
    'cat.shirts.desc': 'Chemises en lin, oxford et flanelle pour un style soign\u00e9 sans effort. De la chemise classique au mod\u00e8le d\u00e9contract\u00e9.',
    'cat.shirts.card_desc': 'Lin, oxford et flanelle',
    'cat.accessories.name': 'Accessoires',
    'cat.accessories.subtitle': 'Notre S\u00e9lection',
    'cat.accessories.desc': 'Compl\u00e9tez votre look avec nos accessoires soigneusement s\u00e9lectionn\u00e9s. Ceintures, montres, casquettes et bien plus encore.',
    'cat.accessories.card_desc': 'Ceintures, montres et plus',

    /* Product names */
    'prod.classic_oversized': 'T-shirt Oversize Classique',
    'prod.essential_crew': 'T-shirt Col Rond Essentiel',
    'prod.striped_polo': 'Polo Ray\u00e9',
    'prod.vintage_wash': 'T-shirt Vintage Lavage',
    'prod.premium_heavyweight': 'T-shirt Premium Heavyweight',
    'prod.slim_chinos': 'Chinos Slim Fit',
    'prod.relaxed_cargo': 'Pantalon Cargo D\u00e9contract\u00e9',
    'prod.tailored_trousers': 'Pantalon Sur Mesure',
    'prod.stretch_joggers': 'Joggers Stretch',
    'prod.classic_chinos': 'Chinos Classique Droit',
    'prod.structured_jacket': 'Veste Structur\u00e9e',
    'prod.bomber_jacket': 'Veste Bomber',
    'prod.overshirt': 'Overshirt',
    'prod.quilted_vest': 'Gilet Matelass\u00e9',
    'prod.graphic_hoodie': 'Hoodie \u00e0 Motif',
    'prod.zip_up_hoodie': 'Hoodie \u00e0 Fermeture',
    'prod.crew_sweatshirt': 'Sweatshirt Col Rond',
    'prod.oversized_hoodie': 'Hoodie Oversize',
    'prod.linen_button_down': 'Chemise en Lin',
    'prod.oxford_shirt': 'Chemise Oxford',
    'prod.flannel_shirt': 'Chemise Flanelle',
    'prod.denim_shirt': 'Chemise en Jean',
    'prod.patterned_short_sleeve': 'Chemise Manches Courtes \u00e0 Motifs',
    'prod.leather_belt': 'Ceinture en Cuir',
    'prod.canvas_tote': 'Sac Tote en Toile',
    'prod.classic_cap': 'Casquette Classique',
    'prod.minimalist_watch': 'Montre Minimaliste',
    'prod.sunglasses': 'Lunettes de Soleil',
    'prod.knit_tie': 'Cravate Tricot\u00e9e',

    /* Badges */
    'badge.new': 'NOUVEAU',

    /* Product card */
    'product.add_to_cart': 'Ajouter au Panier',
    'product.select_size': 'Taille',

    /* Testimonials */
    'testimonials.subtitle': 'Ce que disent nos clients',
    'testimonials.title': 'Avis Clients',
    'test.1.name': 'Ahmed B.',
    'test.1.badge': 'Client V\u00e9rifi\u00e9',
    'test.1.text': 'La qualit\u00e9 du t-shirt oversize est incroyable pour le prix. Le tissu est \u00e9pais et la coupe est parfaite. Livraison tr\u00e8s rapide en Tunisie. Je recommande vivement BS Store !',
    'test.2.name': 'Youssef M.',
    'test.2.badge': 'Client Fid\u00e8le',
    'test.2.text': 'J\u2019ai command\u00e9 les joggers et la veste, et les deux ont d\u00e9pass\u00e9 mes attentes. Le tissu est confortable et la coupe est moderne. Je suis maintenant un client r\u00e9gulier.',
    'test.3.name': 'Khalil R.',
    'test.3.badge': 'Client V\u00e9rifi\u00e9',
    'test.3.text': 'La chemise en lin est exactement ce que je cherchais. Taille parfaite et tissu l\u00e9ger id\u00e9al pour l\u2019\u00e9t\u00e9. Livraison rapide et service client r\u00e9actif.',

    /* Contact */
    'contact.subtitle': 'Contactez-nous',
    'contact.title': 'Restons en Contact',
    'contact.phone_label': 'T\u00e9l\u00e9phone',
    'contact.whatsapp_label': 'WhatsApp',
    'contact.instagram_label': 'Instagram',
    'contact.cta': 'Suivez-nous sur Instagram',

    /* Footer */
    'footer.brand_desc': 'Pr\u00eat-\u00e0-porter masculin premium, con\u00e7u pour l\u2019homme moderne. Qualit\u00e9 et style depuis 2024.',
    'footer.quick_links': 'Liens Rapides',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits r\u00e9serv\u00e9s.',

    /* Cart */
    'cart.title': 'Votre Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.subtotal': 'Sous-total',
    'cart.shipping': 'Livraison',
    'cart.total': 'Total',
    'cart.checkout': 'Commander',
    'cart.remove': 'Retirer',
    'cart.qty': 'Qt\u00e9',
    'cart.added': 'Ajout\u00e9 !',

    /* Order Form */
    'form.title': 'Confirmer la Commande',
    'form.name': 'Nom Complet',
    'form.name_placeholder': 'Entrez votre nom complet',
    'form.phone': 'Num\u00e9ro de T\u00e9l\u00e9phone',
    'form.phone_placeholder': 'Ex : 58113142',
    'form.address': 'Adresse de Livraison',
    'form.address_placeholder': 'Entrez votre adresse compl\u00e8te',
    'form.governorate': 'Gouvernorat',
    'form.governorate_default': 'S\u00e9lectionnez votre gouvernorat',
    'form.order_summary': 'R\u00e9sum\u00e9 de la Commande',
    'form.item': 'Article',
    'form.shipping_note': 'Livraison forfaitaire partout en Tunisie',
    'form.confirm_whatsapp': 'Confirmer via WhatsApp',
    'form.cancel': 'Annuler',
    'form.name_required': 'Le nom est requis',
    'form.phone_required': 'Le num\u00e9ro est requis',
    'form.phone_format': 'Format invalide (8 chiffres)',
    'form.address_required': 'L\u2019adresse est requise',
    'form.gov_required': 'S\u00e9lectionnez un gouvernorat',

    /* WhatsApp message */
    'wa.order_title': 'Nouvelle Commande - BS Store',
    'wa.client': 'Client',
    'wa.phone': 'T\u00e9l\u00e9phone',
    'wa.address': 'Adresse',
    'wa.governorate': 'Gouvernorat',
    'wa.items': 'Articles',
    'wa.subtotal': 'Sous-total',
    'wa.shipping': 'Livraison',
    'wa.total': 'Total',

    /* Marquee items */
    'marquee.quality': 'Qualit\u00e9 Premium',
    'marquee.menswear': 'Mode Masculine',

    /* Product grid on category pages */
    'cat.products_count': 'articles',
    'cat.back_to_shop': 'Retour \u00e0 la Boutique',
    'cat.breadcrumb_home': 'Accueil',
    'cat.breadcrumb_shop': 'Boutique'
  },

  en: {
    /* Navigation */
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.shop': 'Shop',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',
    'nav.lang': 'FR',

    /* Hero */
    'hero.subtitle': 'Premium Menswear',
    'hero.title_word1': 'BS',
    'hero.title_word2': 'Store',
    'hero.tagline': 'Elevate your style. Designed for the modern man.',
    'hero.cta': 'View Collection',
    'hero.scroll': 'Scroll',

    /* Marquee */
    'marquee.brand': 'BS Store',
    'marquee.premium': 'Premium Menswear',
    'marquee.tunisia': 'Tunisia',
    'marquee.established': 'Est. 2024',

    /* About */
    'about.subtitle': 'Our Story',
    'about.title': 'About BS Store',
    'about.p1': 'Born in the heart of Tunisia, BS Store was founded on a passion for accessible, quality menswear. We curate each piece with care, prioritizing modern cuts, durable fabrics, and impeccable finishes.',
    'about.p2': 'Our mission is simple: to dress the modern man with elegance and confidence. From everyday wear to special occasions, we offer a collection that speaks to those who refuse to compromise on style.',
    'about.stat1.value': '100+',
    'about.stat1.label': 'Happy Clients',
    'about.stat2.value': '50+',
    'about.stat2.label': 'Unique Pieces',
    'about.stat3.value': '2024',
    'about.stat3.label': 'Established',

    /* Categories section (homepage) */
    'categories.subtitle': 'Our Categories',
    'categories.title': 'Explore the Collection',
    'categories.view_all': 'View all',

    /* Category names */
    'cat.tshirts.name': 'T-shirts & Polos',
    'cat.tshirts.subtitle': 'Our Selection',
    'cat.tshirts.desc': 'Discover our collection of premium t-shirts and polos. From essential basics to trend-forward pieces, every item is selected for quality and style.',
    'cat.tshirts.card_desc': 'Essential basics and premium polos',
    'cat.pants.name': 'Pants & Chinos',
    'cat.pants.subtitle': 'Our Selection',
    'cat.pants.desc': 'Pants and chinos crafted for comfort and style. From slim fits to relaxed models, find the perfect pair for every occasion.',
    'cat.pants.card_desc': 'Slim fit, chino and cargo',
    'cat.jackets.name': 'Jackets & Coats',
    'cat.jackets.subtitle': 'Our Selection',
    'cat.jackets.desc': 'From structured jackets to classic bombers, our jacket collection combines style and functionality. Timeless pieces for every season.',
    'cat.jackets.card_desc': 'Bombers, jackets and overshirts',
    'cat.hoodies.name': 'Hoodies & Sweatshirts',
    'cat.hoodies.subtitle': 'Our Selection',
    'cat.hoodies.desc': 'Premium hoodies and sweatshirts for uncompromising comfort. Versatile pieces that keep you company every day.',
    'cat.hoodies.card_desc': 'Comfort and style every day',
    'cat.shirts.name': 'Shirts',
    'cat.shirts.subtitle': 'Our Selection',
    'cat.shirts.desc': 'Linen, oxford and flannel shirts for effortless style. From classic to casual, find your perfect shirt.',
    'cat.shirts.card_desc': 'Linen, oxford and flannel',
    'cat.accessories.name': 'Accessories',
    'cat.accessories.subtitle': 'Our Selection',
    'cat.accessories.desc': 'Complete your look with our carefully curated accessories. Belts, watches, caps and more.',
    'cat.accessories.card_desc': 'Belts, watches and more',

    /* Product names */
    'prod.classic_oversized': 'Classic Oversized Tee',
    'prod.essential_crew': 'Essential Crew Neck Tee',
    'prod.striped_polo': 'Striped Polo',
    'prod.vintage_wash': 'Vintage Wash Tee',
    'prod.premium_heavyweight': 'Premium Heavyweight Tee',
    'prod.slim_chinos': 'Slim Fit Chinos',
    'prod.relaxed_cargo': 'Relaxed Cargo Pants',
    'prod.tailored_trousers': 'Tailored Trousers',
    'prod.stretch_joggers': 'Stretch Joggers',
    'prod.classic_chinos': 'Classic Straight Chinos',
    'prod.structured_jacket': 'Structured Jacket',
    'prod.bomber_jacket': 'Bomber Jacket',
    'prod.overshirt': 'Overshirt',
    'prod.quilted_vest': 'Quilted Vest',
    'prod.graphic_hoodie': 'Graphic Hoodie',
    'prod.zip_up_hoodie': 'Zip-Up Hoodie',
    'prod.crew_sweatshirt': 'Crew Sweatshirt',
    'prod.oversized_hoodie': 'Oversized Hoodie',
    'prod.linen_button_down': 'Linen Button-Down',
    'prod.oxford_shirt': 'Oxford Shirt',
    'prod.flannel_shirt': 'Flannel Shirt',
    'prod.denim_shirt': 'Denim Shirt',
    'prod.patterned_short_sleeve': 'Patterned Short Sleeve',
    'prod.leather_belt': 'Leather Belt',
    'prod.canvas_tote': 'Canvas Tote Bag',
    'prod.classic_cap': 'Classic Cap',
    'prod.minimalist_watch': 'Minimalist Watch',
    'prod.sunglasses': 'Sunglasses',
    'prod.knit_tie': 'Knit Tie',

    /* Badges */
    'badge.new': 'NEW',

    /* Product card */
    'product.add_to_cart': 'Add to Cart',
    'product.select_size': 'Size',

    /* Testimonials */
    'testimonials.subtitle': 'What our customers say',
    'testimonials.title': 'Customer Reviews',
    'test.1.name': 'Ahmed B.',
    'test.1.badge': 'Verified Customer',
    'test.1.text': 'The quality of the oversized tee is incredible for the price. The fabric is thick and the fit is perfect. Very fast delivery in Tunisia. Highly recommend BS Store!',
    'test.2.name': 'Youssef M.',
    'test.2.badge': 'Repeat Customer',
    'test.2.text': 'I ordered the joggers and jacket, and both exceeded my expectations. The fabric is comfortable and the cut is modern. I\'m now a regular customer.',
    'test.3.name': 'Khalil R.',
    'test.3.badge': 'Verified Customer',
    'test.3.text': 'The linen shirt is exactly what I was looking for. Perfect fit and lightweight fabric ideal for summer. Fast delivery and responsive customer service.',

    /* Contact */
    'contact.subtitle': 'Get in Touch',
    'contact.title': 'Stay Connected',
    'contact.phone_label': 'Phone',
    'contact.whatsapp_label': 'WhatsApp',
    'contact.instagram_label': 'Instagram',
    'contact.cta': 'Follow us on Instagram',

    /* Footer */
    'footer.brand_desc': 'Premium menswear, designed for the modern man. Quality and style since 2024.',
    'footer.quick_links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',

    /* Cart */
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.remove': 'Remove',
    'cart.qty': 'Qty',
    'cart.added': 'Added!',

    /* Order Form */
    'form.title': 'Confirm Order',
    'form.name': 'Full Name',
    'form.name_placeholder': 'Enter your full name',
    'form.phone': 'Phone Number',
    'form.phone_placeholder': 'e.g. 58113142',
    'form.address': 'Delivery Address',
    'form.address_placeholder': 'Enter your full address',
    'form.governorate': 'Governorate',
    'form.governorate_default': 'Select your governorate',
    'form.order_summary': 'Order Summary',
    'form.item': 'Item',
    'form.shipping_note': 'Flat rate shipping across Tunisia',
    'form.confirm_whatsapp': 'Confirm via WhatsApp',
    'form.cancel': 'Cancel',
    'form.name_required': 'Name is required',
    'form.phone_required': 'Phone number is required',
    'form.phone_format': 'Invalid format (8 digits)',
    'form.address_required': 'Address is required',
    'form.gov_required': 'Select a governorate',

    /* WhatsApp message */
    'wa.order_title': 'New Order - BS Store',
    'wa.client': 'Client',
    'wa.phone': 'Phone',
    'wa.address': 'Address',
    'wa.governorate': 'Governorate',
    'wa.items': 'Items',
    'wa.subtotal': 'Subtotal',
    'wa.shipping': 'Shipping',
    'wa.total': 'Total',

    /* Marquee items */
    'marquee.quality': 'Premium Quality',
    'marquee.menswear': 'Menswear',

    /* Product grid on category pages */
    'cat.products_count': 'items',
    'cat.back_to_shop': 'Back to Shop',
    'cat.breadcrumb_home': 'Home',
    'cat.breadcrumb_shop': 'Shop'
  }
};

/* Get current language from localStorage or default to French */
function getCurrentLang() {
  return localStorage.getItem('bs-store-lang') || 'fr';
}

/* Get translated string by key */
function t(key) {
  const lang = getCurrentLang();
  return (translations[lang] && translations[lang][key]) || key;
}

/* Apply translations to all elements with data-i18n attributes */
function applyLanguage(lang) {
  if (!lang) lang = getCurrentLang();

  /* Set HTML lang attribute */
  document.documentElement.lang = lang;

  /* Translate text content */
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  /* Translate attributes (e.g. placeholder) */
  document.querySelectorAll('[data-i18n-attr]').forEach(function(el) {
    var attrSpecs = el.getAttribute('data-i18n-attr').split(',');
    attrSpecs.forEach(function(spec) {
      var parts = spec.trim().split(':');
      if (parts.length === 2) {
        var attrName = parts[0].trim();
        var key = parts[1].trim();
        if (translations[lang] && translations[lang][key]) {
          el.setAttribute(attrName, translations[lang][key]);
        }
      }
    });
  });

  /* Update language toggle button text */
  var toggleBtns = document.querySelectorAll('.nav-lang-toggle');
  var otherLang = lang === 'fr' ? 'EN' : 'FR';
  toggleBtns.forEach(function(btn) {
    btn.textContent = otherLang;
  });
}

/* Toggle language between FR and EN */
function toggleLanguage() {
  var current = getCurrentLang();
  var next = current === 'fr' ? 'en' : 'fr';
  localStorage.setItem('bs-store-lang', next);
  applyLanguage(next);

  /* Re-render dynamic content if on a category page */
  if (typeof renderProductGrid === 'function') {
    renderProductGrid();
  }
  /* Re-render cart sidebar items */
  if (typeof Cart !== 'undefined' && Cart.renderSidebar) {
    Cart.renderSidebar();
  }
}
