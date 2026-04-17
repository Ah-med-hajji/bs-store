# BS Store — Next.js + Supabase E-Commerce

## Project Overview
BS Store (Ben Saad Store) is a Tunisian menswear clothing brand. Next.js App Router application with Supabase backend, admin panel at `/admin`, shopping cart, WhatsApp ordering, and French/English translation. French is the default language. The storefront has premium scroll animations and interactions.

## Tech Stack
- **Next.js 15** (App Router) + TypeScript
- **Supabase** — Postgres database + Storage for product images
- **GSAP 3** + ScrollTrigger (CDN) — scroll animations, text reveals, counters
- **Lenis** (npm) — buttery-smooth scrolling
- **jose** — JWT signing/verification for admin auth
- Deployed on **Vercel** (auto-deploys from GitHub `master`)
- Fonts: Playfair Display (headings) + Inter (body) via `next/font/google`

## Live URL & Repo
- **Production**: https://bs-store.tn/ (custom domain, connected and live)
- **Vercel project**: ahmedhajji5401-5125s-projects/bs-store
- **GitHub**: https://github.com/Ah-med-hajji/bs-store (pushes to `master` auto-deploy)
- **GitHub owner**: Ah-med-hajji
- **Supabase project ref**: sfokgucjmrxifngcgcpk

## Business Info
- **Brand**: BS Store (Ben Saad Store)
- **Instagram**: https://www.instagram.com/ben_saad_store/
- **Phone / WhatsApp**: 58113142 (+21658113142)
- **Audience**: Men's clothing, Tunisia-based, prices in TND
- **Shipping**: 8 TND flat rate across Tunisia

## Design
- **Theme**: Earth tones — cream (#f5f0e8), brown (#6b5b4e), olive (#7d8471), gold (#c4a882)
- **Layout**: Mobile-first responsive, premium scroll animations, solid navbar (no backdrop-filter)
- **Sections**: Hero → Marquee banner → About → Category grid → Testimonials → Contact → Footer
- **CSS Variables**: All colors/fonts/shadows defined in `:root` in `css/globals.css`

## Architecture

### Route Structure
```
app/
├── layout.tsx                 # Root layout: <html>, <body>, fonts, GSAP scripts, globals.css
├── (storefront)/
│   ├── layout.tsx             # LanguageProvider + StorefrontShell (Navbar, Footer, Cart, etc.)
│   ├── page.tsx               # Homepage (dynamic, fetches categories from Supabase)
│   └── categories/[slug]/
│       └── page.tsx           # Category page (dynamic, fetches category + products)
├── admin/
│   ├── layout.tsx             # Admin sidebar shell
│   ├── login/page.tsx         # Password login form
│   ├── page.tsx               # Dashboard
│   ├── categories/page.tsx    # Category CRUD
│   └── products/page.tsx      # Product CRUD with image upload
├── api/
│   ├── auth/{login,logout}/route.ts
│   ├── categories/[id]/route.ts
│   ├── products/[id]/route.ts
│   └── upload/route.ts
├── sitemap.ts, robots.ts
└── not-found.tsx
```

### Authentication
- Admin password stored as `ADMIN_PASSWORD` env variable
- `POST /api/auth/login` verifies password → signs JWT → sets HTTP-only cookie (`bs-admin-session`, 24h expiry)
- JWT signed with HS256 using `JWT_SECRET` env variable
- `middleware.ts` protects `/admin/*` and `/api/*` routes — verifies JWT using **Web Crypto API** (Edge Runtime compatible, NOT jose)
- Admin panel at `/admin`, login at `/admin/login`

### Data Model (Supabase)
**`categories` table**: id (UUID), slug, name_fr, name_en, subtitle_fr, subtitle_en, card_desc_fr, card_desc_en, desc_fr, desc_en, image_url, sort_order, created_at

**`products` table**: id (UUID), category_id (FK → categories), slug, name_fr, name_en, price, badge, image_url, sizes (TEXT[]), sort_order, created_at

- Product/category names stored as `name_fr`/`name_en` columns (editable by admin, not translation keys)
- Static UI text (nav, hero, about, etc.) kept in `lib/i18n.ts`
- RLS enabled: public SELECT on both tables, admin operations use service_role key

### Storefront Components
All in `components/storefront/`. Client Components using React hooks:
- `StorefrontShell` — orchestrates Navbar, Footer, Cart, Preloader, Cursor, etc.
- `Navbar` — fixed, scroll state, hamburger for mobile, shop dropdown from Supabase categories
- `CartSidebar` + `OrderForm` — slide-in cart, WhatsApp message builder
- `ProductCard` — size selector, add-to-cart with feedback
- `HeroSection`, `AboutSection`, `CategoryGrid`, `TestimonialsSection`, `ContactSection` — GSAP animated
- `Preloader`, `CustomCursor`, `ScrollProgress`, `BackToTop`, `MarqueeBanner` — UI utilities

### React Hooks
- `useLanguage` — FR/EN state via React Context + localStorage (`bs-store-lang`)
- `useCart(lang)` — full cart logic (localStorage `bs-store-cart`), WhatsApp message builder
- `useGSAP` — registers ScrollTrigger plugin
- `useLenis` — smooth scroll init with GSAP ticker integration

### i18n System
Static UI text in `lib/i18n.ts` with `t(key, lang)` function. Product/category names come from Supabase. Language state shared via `LanguageProvider` context. Old cart items using `nameKey` format are automatically cleared on load.

### Cart System
Cart uses localStorage (key: `bs-store-cart`). Cart items store `name_fr`/`name_en` directly. Orders confirmed via WhatsApp message to +21658113142. Order form validates phone as 8 digits, includes 24 Tunisian governorates dropdown.

### Navbar (no backdrop-filter)
**CRITICAL: Never add `backdrop-filter` to `.navbar`.** It creates a CSS containing block that breaks `position: fixed` children (mobile nav overlay). The scrolled navbar uses `rgba(245, 240, 232, 0.97)` background with no blur. `backdrop-filter` is safe on `.nav-dropdown-menu` and the mobile `.nav-links` overlay itself.

## File Structure
```
bs-store/
├── app/                          # Next.js App Router pages + API routes
├── components/
│   ├── storefront/               # 15 storefront React components
│   └── admin/                    # AdminSidebar, ImageUpload
├── hooks/                        # useCart, useLanguage, useGSAP, useLenis
├── lib/
│   ├── supabase/client.ts        # Browser Supabase client (anon key)
│   ├── supabase/server.ts        # Server Supabase client (service_role key)
│   ├── auth.ts                   # JWT helpers using jose (Node.js runtime only)
│   ├── i18n.ts                   # Static UI translations (FR/EN)
│   ├── types.ts                  # TypeScript interfaces
│   └── constants.ts              # SHIPPING, WHATSAPP_NUMBER, GOVERNORATES
├── css/globals.css               # All styles merged (style.css + categories.css + admin styles)
├── middleware.ts                  # Auth middleware (Web Crypto API, Edge Runtime compatible)
├── next.config.ts                # Image domains, old URL redirects
├── supabase/
│   ├── migrations/001_initial.sql # Database schema + RLS + storage bucket
│   └── seed.ts                   # Seeds 6 categories + 29 products
├── public/favicon.svg
├── _legacy/                      # Old static HTML/CSS/JS files (kept for reference)
├── package.json, tsconfig.json
└── CLAUDE.md
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

## Key Code Patterns

### Adding a new product (via Admin Panel)
1. Go to `/admin/products`, click "Add Product"
2. Fill in FR/EN names, price, category, sizes, upload image
3. Done — product appears on the category page immediately

### Adding a new product (via code)
1. Insert row into Supabase `products` table with `category_id`, `name_fr`, `name_en`, etc.

### Adding a new category (via Admin Panel)
1. Go to `/admin/categories`, click "Add Category"
2. Fill in FR/EN names, subtitles, descriptions, upload image
3. Category appears in navbar dropdown and homepage grid

### Adding a new category (via code)
1. Insert row into Supabase `categories` table
2. Category auto-appears in navbar (fetched dynamically) and homepage grid

### i18n (static UI text only)
- Use `t(key, lang)` from `lib/i18n.ts`
- Add translations for both `fr` and `en` keys in the `translations` object
- Product/category names are NOT in i18n — they come from Supabase `name_fr`/`name_en`

## Environment Variables
Set in `.env.local` (local) and Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service_role key (server-side only)
- `ADMIN_PASSWORD` — Password for admin login
- `JWT_SECRET` — Secret for signing admin JWT tokens

## Deployment
Push to GitHub `master` — Vercel auto-deploys.

## WhatsApp Message Format
```
*Nouvelle Commande - BS Store*

*Client:* [name]
*Téléphone:* [phone]
*Adresse:* [address]
*Gouvernorat:* [governorate]

*Articles:*
- Product Name (Size) xQty = Price TND

*Sous-total:* XX TND
*Livraison:* 8 TND
*Total:* XX TND
```

## SEO
- Dynamic `sitemap.ts` (fetches category slugs from Supabase)
- Dynamic `robots.ts` allowing all crawlers
- Open Graph + Twitter Card meta tags
- Canonical URLs pointing to `bs-store.tn`
- Old URL redirects: `/categories/X.html` → `/categories/X` (301, preserves SEO)
- Semantic HTML with proper heading hierarchy

## Current State — TODO
- [ ] **Replace placeholder images**: All product images use Unsplash stock photos. Replace with real product photos via admin panel image upload.
- [ ] **Google Search Console**: Submit sitemap after verifying custom domain
- [ ] **Unstable Unsplash URLs**: Some Unsplash photo URLs may stop loading. Replace via admin panel.
- [ ] **Legacy cleanup**: Old static files (index.html, categories/, js/, css/style.css, css/categories.css) still in repo. Can be removed or moved to `_legacy/`.

## Gotchas & Lessons Learned
- **Never use `backdrop-filter` on `.navbar`**: Creates a CSS containing block that breaks `position: fixed` children (mobile nav overlay).
- **Middleware must use Web Crypto API**: Vercel Edge Runtime doesn't support `jose` (Node.js APIs). The `middleware.ts` uses `crypto.subtle.verify` for JWT verification instead.
- **Root layout must have `<html>` and `<body>`**: Next.js requires these in `app/layout.tsx`. Route group layouts (`(storefront)/layout.tsx`, `admin/layout.tsx`) must NOT have their own `<html>` tags.
- **Mobile dropdown transform override**: Desktop hover rule applies `translateX(-50%)` — must override to `none` inside 768px breakpoint.
- **Unsplash URLs can break**: Photo IDs may be removed. Replace via admin panel.
- **Old cart format migration**: Cart items from the old static site used `nameKey` — new format stores `name_fr`/`name_en`. Old items are auto-cleared.
- **Supabase server client**: `createServerClient()` throws if env vars aren't set. Pages use try/catch and `dynamic = 'force-dynamic'` to handle missing config gracefully.
