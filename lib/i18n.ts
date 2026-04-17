/* BS Store — Static UI Translations (FR/EN)
   Product and category names come from Supabase, not this file. */

import { Language } from './types';

type TranslationMap = Record<string, string>;

const translations: Record<Language, TranslationMap> = {
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
    'marquee.quality': 'Qualit\u00e9 Premium',
    'marquee.menswear': 'Mode Masculine',

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

    /* Category pages */
    'cat.products_count': 'articles',
    'cat.back_to_shop': 'Retour \u00e0 la Boutique',
    'cat.breadcrumb_home': 'Accueil',
    'cat.breadcrumb_shop': 'Boutique',
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
    'marquee.quality': 'Premium Quality',
    'marquee.menswear': 'Menswear',

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

    /* Category pages */
    'cat.products_count': 'items',
    'cat.back_to_shop': 'Back to Shop',
    'cat.breadcrumb_home': 'Home',
    'cat.breadcrumb_shop': 'Shop',
  },
};

export function t(key: string, lang: Language): string {
  return translations[lang]?.[key] || key;
}

export function getOtherLang(lang: Language): Language {
  return lang === 'fr' ? 'en' : 'fr';
}
