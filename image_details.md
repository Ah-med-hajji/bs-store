# BS Store — Image Specifications & Guidelines

## Product Images

| Spec | Detail |
|---|---|
| **Aspect ratio** | 4:5 (portrait) — set in `css/globals.css:1325` |
| **Rendered size** | up to 600x750px on desktop |
| **Recommended upload** | 800x1000px minimum, 1200x1500px ideal |
| **Format** | JPG or WebP |
| **Max file size** | Under 500KB |

### Rules
- Portrait orientation only (taller than wide)
- Subject (clothing item) should fill most of the frame
- Clean, neutral background works best (white, light grey, or cream)
- **No transparent backgrounds** — PNG transparency shows as blank brown space
- `object-fit: cover` is used — image gets cropped to fill the card, so center the subject

---

## Category Images

| Spec | Detail |
|---|---|
| **Aspect ratio** | 4:3 (landscape) — set in `css/globals.css:885` |
| **Rendered size** | up to 800x600px |
| **Recommended upload** | 1200x900px minimum |
| **Format** | JPG or WebP |
| **Max file size** | Under 500KB |

### Rules
- Landscape orientation
- Should show a lifestyle/mood shot representing the category
- `object-fit: cover` cropping applies — keep important content centered

---

## Hero Banner

| Spec | Detail |
|---|---|
| **Rendered as** | CSS `background-size: cover` on full-width section |
| **Current URL** | Unsplash photo loaded at `w=1920&h=1080` |
| **Recommended upload** | 1920x1080px (Full HD) or 2560x1440 for retina |
| **Aspect ratio** | ~16:9 |
| **Format** | JPG |
| **Max file size** | Under 1MB |

### Rules
- Must be wide/landscape
- Left half is partially covered by text (title + tagline), so the interesting part should be on the **right side** or evenly distributed
- Darker or lower-contrast images work better — there's a dark overlay on top (`hero-overlay`)
- To replace it, edit `components/storefront/HeroSection.tsx` line 22

### Changing the hero image
```tsx
// In HeroSection.tsx, line 22:
img.src = 'https://your-image-url-here.jpg';
```

You can host the image on Supabase Storage (upload via admin panel to any product, then copy the URL) or use any CDN link.

---

## Cart Thumbnails

Auto-generated from the product image at **64x80px** (`css/globals.css:1531`). No separate upload needed.

---

## Quick Reference

| Image type | Aspect ratio | Min dimensions | Ideal dimensions |
|---|---|---|---|
| **Product** | 4:5 portrait | 800x1000px | 1200x1500px |
| **Category** | 4:3 landscape | 1200x900px | 1600x1200px |
| **Hero banner** | 16:9 landscape | 1920x1080px | 2560x1440px |
