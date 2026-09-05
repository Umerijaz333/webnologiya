# Webnologiya

Marketing site for Webnologiya — a web design studio building websites for
businesses that don't have one yet.

## Structure

```
index.html       → markup for the full site (single static page)
styles.css        → all styling, design tokens, responsive layout, animation
script.js         → scroll reveals, the hero/Work browser-frame demos, Process
                     frame, and the contact form submit handler
api/contact.js    → Vercel serverless function that handles the contact form
assets/           → logo marks (SVG), favicons — see below
```

## Deploying

1. Push this repo to GitHub (already done if you're reading this from there).
2. Import the repo into Vercel (vercel.com → New Project → import from GitHub).
3. No build step needed — it's a static HTML file + one serverless function.
   Vercel detects the `api/` folder automatically.

## Required environment variables

Set these in Vercel → Project → Settings → Environment Variables:

| Variable         | Value                                                   |
|------------------|----------------------------------------------------------|
| `RESEND_API_KEY` | API key from https://resend.com                          |
| `LEAD_EMAIL_TO`  | The email address that should receive new lead notifications |

Notes:
- You'll need to verify a sending domain in Resend before the `from` address
  in `api/contact.js` will work. Until then, Resend's sandbox sender can be
  used for testing — check Resend's dashboard for the current test address.
- Update the `from` field in `api/contact.js` once your domain is verified.

## Custom domain

Once deployed: Vercel → Project → Settings → Domains → add your domain, then
update your domain registrar's DNS to point to Vercel (A record or CNAME —
Vercel shows the exact values to use once you add the domain).

## Local development

This is plain HTML/CSS/JS with a Vercel serverless function — no framework,
no build step. To test the API route locally, use the Vercel CLI:

```
npm i -g vercel
vercel dev
```

## Still needed before this is production-ready

- **WhatsApp number**: `index.html` has a placeholder `wa.me` link
  (`https://wa.me/10000000000`, marked with a `TODO` comment next to it in
  the Contact section). Replace `10000000000` with the real number.

## Logo & favicons

The nav mark is inlined directly into `index.html` (the small gold glyph
next to the wordmark) so it renders with zero extra requests. The rest of
the brand assets live in `assets/`:

- `mark-gold.svg` / `mark-cream.svg` / `mark-maroon.svg` — the glyph alone,
  one per background it's meant to sit on.
- `lockup-horizontal-gold.svg` — glyph + wordmark, for anywhere a full
  lockup is needed instead of just the mark.
- `favicon.svg`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`
  — wired up in `index.html`'s `<head>`.
- `favicon-512.png` — not currently referenced; add it to a web app
  manifest if one gets added later.

## Photography

`assets/images/` holds the site's raster images:

- `restaurant.jpg`, `real-estate.jpg`, `interiors.jpg`, `local-service.jpg`,
  `professional-service.jpg` — hero-background photos inside their
  respective Work-section demo iframes (`script.js`, `industries` array).
- `ecommerce.jpg` — the featured product image in the Online Store demo
  (not a background — it's the product photo itself).
- `paper-texture.jpg` — a very-low-opacity (6%) grain overlay on the
  Problem and Process sections only (`styles.css`, `#problem`/`#process`).
  Maroon sections don't get it.
- `og-share.jpg` — the Open Graph / Twitter Card share image, wired up in
  `index.html`'s `<head>` (`og:image`, `twitter:image`). It's a relative
  path for now; once the site has a real domain, consider switching
  `og:image` to an absolute URL for maximum crawler compatibility.
