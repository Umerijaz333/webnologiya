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

- **Logo**: the nav currently uses a CSS placeholder mark ("WN" in a gold
  badge, see `.logo-mark` in `styles.css`). Swap it for the real logo file
  when available.
- **WhatsApp number**: `index.html` has a placeholder `wa.me` link
  (`https://wa.me/10000000000`, marked with a `TODO` comment next to it in
  the Contact section). Replace `10000000000` with the real number.
