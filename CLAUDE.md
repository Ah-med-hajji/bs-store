# BS Store — Landing Page & Category Catalog

## Project Overview
BS Store (Ben Saad Store) is a Tunisian menswear clothing brand. Multi-page static site with category browsing, shopping cart, WhatsApp ordering, and French/English translation. The site is built to premium/agency quality with advanced animations and interactions.

## Tech Stack
- Static HTML/CSS/JS (no framework)
- **GSAP 3** + ScrollTrigger (CDN) — scroll animations, text reveals, counters, parallax
- **Lenis** (CDN) — buttery-smooth scrolling
- Deployed on **Vercel** (zero config, auto-deploys from GitHub)
- Fonts: Playfair Display (headings) + Inter (body) via Google Fonts
- Images: Unsplash free stock photos (placeholder URLs, replaceable)

## Live URL & Repo
- **Production**: https://bs-store.tn/ (custom domain, connected and live)
- **Vercel project**: ahmedhajji5401-5125s-projects/bs-store
- **GitHub**: https://github.com/Ah-med-hajji/bs-store (pushes to `master` auto-deploy)
- **GitHub owner**: Ah-med-hajji

## Business Info
- **Brand**: BS Store (Ben Saad Store)
- **Instagram**: https://www.instagram.com/ben_saad_store/
- **Phone / WhatsApp**: 58113142 (+21658113142)
- **Audience**: Men's clothing, Tunisia-based, prices in TND
- **Shipping**: 8 TND flat rate across Tunisia

## Design
- **Theme**: Earth tones — cream (#f5f0e8), brown (#6b5b4e), olive (#7d8471), gold (#c4a882)
- **Layout**: Mobile-first responsive, premium scroll animations, frosted-glass navbar
- **Sections**: Hero → Marquee banner → About → Category grid (6 categories) → Testimonials → Contact → Footer
- **CSS Variables**: All colors/fonts/shadows defined in `:root` in style.css

## Architecture

### Component Injection
Shared UI components (navbar, footer, cart sidebar, order form) are injected by `js/components.js` into placeholder `<div>` elements on every page. This avoids duplicating HTML across 7 pages.

### i18n System
Translation uses `data-i18n="key"` attributes. The `js/i18n.js` file contains a `translations` object with `fr` (default) and `en` keys. `applyLanguage()` swaps all text on load. Language preference saved to localStorage.

### Cart System
Cart uses localStorage (key: `bs-store-cart`). Products are added from category pages, managed in a slide-in sidebar, and orders are confirmed via WhatsApp message to +21658113142.

### Product Data
Centralized in `js/products.js` as the single source of truth. Category pages read `data-category` from `<body>` and render dynamically.

## File Structure
```
bs-store/
├── index.html                    # Homepage with category grid
├── categories/
│   ├── tshirts-polos.html        # T-shirts & Polos (5 products)
│   ├── pants-chinos.html         # Pants & Chinos (5 products)
│   ├── jackets-coats.html        # Jackets & Coats (4 products)
│   ├── hoodies-sweatshirts.html  # Hoodies & Sweatshirts (4 products)
│   ├── shirts.html               # Shirts (5 products)
│   └── accessories.html          # Accessories (6 products)
├── css/
│   ├── style.css                 # Main styles + category grid + nav actions
│   └── categories.css            # Category pages, cart sidebar, order form
├── js/
│   ├── products.js               # Centralized product data (Unsplash images)
│   ├── i18n.js                   # FR/EN translation system
│   ├── components.js             # Shared navbar/footer/cart/form injection
│   ├── cart.js                   # Cart logic, order form, WhatsApp integration
│   ├── category.js               # Category page rendering + animations
│   └── main.js                   # Homepage animations (GSAP, Lenis, cursor, etc.)
├── favicon.svg                   # SVG favicon with "BS" initials
├── sitemap.xml                   # SEO sitemap (bs-store.tn)
├── robots.txt                    # Allows all crawlers (bs-store.tn)
└── CLAUDE.md                     # This file
```

## Categories & Products

| Category | Products | Prices (TND) |
|----------|----------|-------------|
| T-shirts & Polos | Classic Oversized Tee, Essential Crew Neck, Striped Polo, Vintage Wash Tee, Premium Heavyweight Tee | 39-59 |
| Pants & Chinos | Slim Fit Chinos, Relaxed Cargo Pants, Tailored Trousers, Stretch Joggers, Classic Straight Chinos | 69-99 |
| Jackets & Coats | Structured Jacket, Bomber Jacket, Overshirt, Quilted Vest | 109-169 |
| Hoodies & Sweatshirts | Graphic Hoodie, Zip-Up Hoodie, Crew Sweatshirt, Oversized Hoodie | 79-119 |
| Shirts | Linen Button-Down, Oxford Shirt, Flannel Shirt, Denim Shirt, Patterned Short Sleeve | 69-99 |
| Accessories | Leather Belt, Canvas Tote Bag, Classic Cap, Minimalist Watch, Sunglasses, Knit Tie | 35-89 |

## Script Loading Order
```html
<!-- Shared across all pages -->
<script src="gsap.min.js"></script>
<script src="ScrollTrigger.min.js"></script>
<script src="lenis.min.js"></script>
<script src="js/products.js"></script>      <!-- Product data -->
<script src="js/i18n.js"></script>           <!-- Translation system -->
<script src="js/components.js"></script>     <!-- Injects navbar/footer/cart -->
<script src="js/cart.js"></script>           <!-- Cart logic -->
<!-- Page-specific: -->
<script src="js/main.js"></script>           <!-- Homepage only -->
<script src="js/category.js"></script>       <!-- Category pages only -->
```

## Key Code Patterns

### Adding a new product
1. Add entry to `PRODUCTS` object in `js/products.js`
2. Add name translations to `translations` object in `js/i18n.js` (both `fr` and `en`)
3. Product renders automatically on its category page

### Adding a new category
1. Add category key to `PRODUCTS` in `js/products.js`
2. Add category metadata to `CATEGORIES_META`
3. Add translations to `js/i18n.js`
4. Create new HTML file in `categories/` following existing pattern
5. Add link in `components.js` navbar and footer
6. Add category card in `index.html`

### i18n
- Add `data-i18n="key"` attribute to any text element
- Add translations for both `fr` and `en` keys in `js/i18n.js`
- For attributes (placeholder), use `data-i18n-attr="placeholder:key"`

### Cart
- Add `data-product-id`, image, nameKey, price to any product card
- Cart.addItem() handles the rest
- Order form validates and sends WhatsApp message

## WhatsApp Message Format
```
*Nouvelle Commande - BS Store*

*Client:* [name]
*Telephone:* [phone]
*Adresse:* [address]
*Gouvernorat:* [governorate]

*Articles:*
- Product Name (Size) xQty = Price TND

*Sous-total:* XX TND
*Livraison:* 8 TND
*Total:* XX TND
```

## Deployment
```bash
cd bs-store && npx vercel --prod
```
Or just push to GitHub `master` — Vercel auto-deploys.

## Current State — TODO
- [ ] **Replace placeholder images**: All product images use Unsplash stock photos. Replace with real product photos by updating URLs in `js/products.js`
- [ ] **Google Search Console**: Submit sitemap after verifying custom domain
