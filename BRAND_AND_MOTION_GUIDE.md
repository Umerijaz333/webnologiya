# Webnologiya — Brand & Motion Reference

Written for anyone (human or another Claude session) building video, animation,
or other brand-adjacent work for Webnologiya, so it stays consistent with the
actual production website rather than a guess. Everything below reflects what
is really shipped in this repo (`index.html`, `styles.css`, `script.js`),
not aspirational or planned design.

## What Webnologiya is

A web design studio that builds websites for businesses that don't have one
yet. The tone throughout the site is confident, editorial, a little formal —
closer to a boutique architecture firm than a typical "fun startup" agency.
No slang, no exclamation-point energy, no emoji.

**Content rules that are load-bearing, not stylistic:**
- Never use "small business" / "small businesses" — the word "small" was
  explicitly stripped site-wide (including meta tags). Just "business" /
  "businesses."
- No references to alcohol-adjacent business types (e.g. "wine bar") in any
  copy or demo content — a deliberate, personal constraint from the studio's
  owner, not a copywriting choice. Treat it as permanent.

## Design tokens (exact values — do not approximate)

```css
--maroon:        #3D0F1D   /* primary dark surface */
--maroon-deep:    #2A0A14   /* darkest, used for gradients/scrims */
--maroon-surface: #4A1826   /* raised card surface on maroon sections */
--ivory:          #F4EFE6   /* primary light surface */
--ivory-surface:  #EAE2D4   /* raised card surface on ivory sections */
--gold:           #C9A04B   /* primary accent */
--gold-bright:    #E0BD6E   /* hover/active accent */
--text-on-maroon:       #F2ECE0
--text-on-maroon-muted: #C9B4B2
--text-on-ivory:        #2A0A14
--text-on-ivory-muted:  #6B5548
--border-on-maroon: rgba(201,160,75,0.25)
--border-on-ivory:  rgba(42,10,20,0.12)
```

Typography:
- Headlines: **Playfair Display** (serif) — `--font-head`
- Body/UI: **Inter** (sans) — `--font-body`
- Fallback stacks: `Georgia, "Times New Roman", serif` / `-apple-system,
  BlinkMacSystemFont, "Segoe UI", sans-serif`

Motion timing tokens (reuse these, don't invent new ones):
```css
--dur-micro:    200ms   /* hover, small state changes */
--dur-entrance: 450ms   /* an element arriving on screen */
--dur-section:  600ms   /* larger section-level transitions */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)
```

Layout: `--container-w: 1180px`, `--radius: 14px` (cards/frames), `--radius-sm: 8px`.

Sections alternate background between maroon and ivory (`.section--maroon`,
`.section--ivory`), each with its own scoped `--surface`/`--border`/
`--text-muted` custom properties so components don't need light/dark variants
hardcoded — they just inherit whichever section they're in.

## Logo

The nav mark is a small gold glyph inlined directly in the HTML. Three
color variants exist for different backgrounds: `assets/mark-gold.svg`,
`assets/mark-cream.svg`, `assets/mark-maroon.svg`, plus a full lockup
`assets/lockup-horizontal-gold.svg` (glyph + wordmark). A chroma-keyed,
true-alpha-transparency PNG of the logo (background removed against the
exact `#3D0F1D` maroon) also exists at
`/home/user/webnologiya-reel/public/logo-transparent.png` if that's easier
to drop into a video composition than converting the SVG.

## Page structure (7 sections, in order)

1. **Nav** — fixed, transparent-to-solid on scroll (a real, shipped
   micro-interaction: nav gains a solid background + border once the page
   scrolls past the hero).
2. **Hero** — headline + subhead + CTA, with a "browser frame" mockup
   (`#shared-frame`) that is the visual anchor of the whole page: it starts
   in the hero showing a restaurant demo, then physically flies down and
   docks into the Work section using the **FLIP technique**
   (`getBoundingClientRect` before/after + `element.animate()`) — same DOM
   node, not a fade/cut. This is the single most distinctive animation on
   the site and the most natural thing to echo in video form (a browser
   window that travels/morphs rather than cutting).
3. **Problem** — a two-card comparison: a business *without* a proper
   website vs. one *with* one. The "without" card is desaturated
   (`filter: grayscale(85%)`), tagged "Not found," and separated from the
   "good" card by a gold "VS" badge sitting at the boundary between them.
   This card-vs-card, good-vs-bad framing is the core persuasion device of
   the whole site and a strong candidate for a "before/after" video beat.
4. **Work** — the browser-frame demo picker. Six fake industry mini-sites,
   swappable via tabs, each a fully self-contained `<iframe srcdoc>` mockup:
   - Restaurant → *Amara Kitchen* (warm terracotta accent `#B5502E`)
   - Real Estate → *Harbor & Stone* (navy accent `#2C3E55`)
   - Architecture/Interiors → *Norr Studio*
   - Local Service → *Fade House*
   - E-commerce → *Wren & Co.*
   - Professional Services → *Calder Legal*
   Switching tabs cross-fades the iframe content (a brief opacity dip, not a
   hard cut). Each demo has its own accent color, so if a demo ever appears
   in a video, keep it in its own accent rather than forcing brand
   maroon/gold onto it — the contrast between "generic demo palette" and
   "Webnologiya's own maroon/gold" is intentional and reinforces "this is a
   site we built for someone else."
5. **Real Work** — two actual, real, live client sites (not demos): **Al-Qalam
   Language Center** and **Watt & Watts**. These are proof, distinct from the
   six mockups above. If a video needs a "real results" beat, this is the
   section to draw from — don't blend it visually with the industry demos.
6. **Process** — a 4-step numbered list, each step's number pulses briefly
   (`numPulse` animation, ~800ms) when it becomes the active step, alongside
   a small preview frame (`.process-frame` with 4 stacked `.process-layer`s)
   that changes per step. This pulsing-number-as-progress-indicator is the
   *one* named exception to the site's otherwise strict "no glow/no pulse"
   rule — everywhere else, pulse/glow effects were explicitly rejected.
7. **Services** + **Contact** — a services rail, then a contact form (name /
   business / need / email-or-WhatsApp / message) posting to a Vercel
   serverless function that emails the lead via Resend.

## Animation philosophy (the actual constraints shipped, not suggestions)

These were explicit, hard requirements from the brief and are worth carrying
into any video/motion work so it feels like the same brand:

- **Animate only `transform`, `opacity`, and (one exception) `filter` /
  `color`.** No layout-affecting properties. In video terms: think
  scale/position/fade/color-shift, not deforming or reflowing content.
- **No parallax. No particle effects. No decorative gradients-as-motion. No
  glow-pulse**, except the one named exception above (Process step numbers).
  This is a deliberately restrained, editorial motion language — closer to
  a print/architecture portfolio coming to life than a flashy tech-startup
  reel. Resist the urge to add ambient glow, floating particles, or
  parallax drift just because video allows it more easily than CSS did.
- **`prefers-reduced-motion: reduce` is honored everywhere on the site**,
  with a genuine static fallback (not just "shorter duration"). Not directly
  applicable to a rendered video file, but it signals the studio's overall
  restraint: motion should read as *confident and purposeful*, not
  attention-grabbing for its own sake.
- **Scroll-reveal**: content fades/slides up into place once, the first time
  it enters the viewport, with a small per-element stagger (a CSS custom
  property `--d` sets each child's delay). If a video needs an "elements
  building up on screen" beat, replicate this stagger pattern rather than
  having everything appear simultaneously or in a bouncy/elastic way.
- **Self-test used throughout the brief**: "if you covered the effect up,
  would the page feel worse, or just quieter?" Every animation earns its
  place by answering "worse." Apply the same bar to video motion — cut
  anything that's decoration rather than communication.
- The site explicitly avoids glassmorphism, drop shadows as a primary
  effect, and heavy gradients. Depth comes from the maroon/ivory section
  contrast and a very subtle (6% opacity) paper-texture grain overlay on
  Problem/Process sections only (`assets/images/paper-texture.jpg`) — maroon
  sections never get the grain.

## Photography / imagery already in the brand

All real, already-shot assets — reuse rather than regenerate if a video
needs stock-style B-roll:
- `assets/images/restaurant.jpg`, `real-estate.jpg`, `interiors.jpg`,
  `local-service.jpg`, `professional-service.jpg` — hero backgrounds inside
  their respective Work-section demo mockups.
- `assets/images/ecommerce.jpg` — a product photo (not a background).
- `assets/images/hero-bg.jpg` — the real site hero's background texture,
  always shown under a maroon gradient scrim
  (`linear-gradient(rgba(61,15,29,0.75), rgba(42,10,20,0.9))`) for text
  contrast — reuse that exact scrim formula over any dark background photo.
- `assets/images/problem-good-example.jpg` — the "proper website" mockup
  shown in the Problem section's good-example card.
- `assets/images/og-share.jpg` (1200×630) — the site's official share image.

## Prior video work (for continuity, not to re-derive)

A separate Remotion-based 1080×1920 "Before/After" video reel was already
built in `/home/user/webnologiya-reel` (not part of this git repo) using this
same maroon/gold/Playfair Display system: real audio-envelope-driven
amplitude effects (actual RMS analysis of the VO track, not estimated),
beat-punches keyed to exact timestamps, breathing glow, and a seeded particle
field. If more videos are wanted in that same series, that project's
`src/theme.ts`, `src/audio-hooks.ts`, and scene files are the right starting
point for shared code — not a rebuild from scratch.
