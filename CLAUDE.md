# BS Store — Landing Page

## Project Overview
BS Store (Ben Saad Store) is a Tunisian menswear clothing brand. This is a static landing page for showcasing products — no login, no payment, no e-commerce. Contact is through Instagram and phone/WhatsApp only.

## Tech Stack
- Static HTML/CSS/JS (no framework)
- Deployed on **Vercel** (zero config)
- Fonts: Playfair Display (headings) + Inter (body) via Google Fonts

## Live URL
- **Current**: https://bs-store.vercel.app/
- **Target**: https://bs-store.tn/ (custom domain — not yet connected)

## Business Info
- **Brand**: BS Store (Ben Saad Store)
- **Instagram**: https://www.instagram.com/ben_saad_store/
- **Phone / WhatsApp**: 58113142 (+21658113142)
- **Audience**: Men's clothing, Tunisia-based, prices in TND

## Design
- **Theme**: Earth tones — cream (#f5f0e8), brown (#6b5b4e), olive (#7d8471), gold (#c4a882)
- **Layout**: Mobile-first responsive, scroll fade-in animations, sticky navbar with mobile hamburger menu
- **Sections**: Hero banner → About → Product grid (6 items) → Contact (Instagram + Phone + WhatsApp) → Footer

## File Structure
```
bs-store/
├── index.html        # Main landing page
├── css/style.css     # All styles (earth tones, responsive)
├── js/main.js        # Scroll animations, mobile menu, navbar scroll effect
├── images/           # Product photos + og-banner.jpg (hero background)
├── favicon.svg       # SVG favicon with "BS" initials
├── sitemap.xml       # SEO sitemap (currently points to bsstore.tn — needs update to bs-store.tn)
├── robots.txt        # Allows all crawlers (also references bsstore.tn — needs update)
└── CLAUDE.md         # This file
```

## SEO (implemented)
- Open Graph + Twitter Card meta tags
- JSON-LD structured data (ClothingStore + LocalBusiness schema)
- Canonical URL, robots meta, keywords (including "vetements homme Tunisie")
- sitemap.xml + robots.txt
- Alt texts / aria-labels on all product cards
- SVG favicon

## Current State — TODO
- [ ] **Domain propagation pending**: Custom domain `bs-store.tn` added to Vercel. DNS check started — Vercel says 24-48 hours to confirm. **Resume after this completes.**
- [ ] **Update domain references**: Once domain is live, replace `bsstore.tn` → `bs-store.tn` in `index.html` (canonical + OG tags), `sitemap.xml`, `robots.txt`
- [ ] **Add real product photos**: Only `classic-oversized-tee.jpg` is added so far. Remaining 5 products still use color placeholders. Drop images into `images/` folder and update `<img>` tags in index.html
- [ ] **Google Search Console**: Submit sitemap after custom domain is live

## Products (6 total)
| # | Name | Price | Image |
|---|------|-------|-------|
| 1 | Classic Oversized Tee | 49 TND | `classic-oversized-tee.jpg` (done) |
| 2 | Slim Fit Chinos | 79 TND | placeholder |
| 3 | Linen Button-Down | 89 TND | placeholder |
| 4 | Cargo Joggers | 69 TND | placeholder |
| 5 | Graphic Hoodie | 99 TND | placeholder |
| 6 | Structured Jacket | 149 TND | placeholder |

## Deployment
```bash
cd bs-store && npx vercel --prod
```
Pushes to production. Same URL updates in-place.
