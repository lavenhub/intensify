# Intensify Technologies — Corporate Website

A premium, production-quality corporate website for **Intensify Technologies** —
precision industrial cleaning, engineering, and intelligent manufacturing
solutions. Built to a benchmark of minimal, confident, Apple-grade design with a
distinctive black-and-yellow engineering identity.

> **Design standard:** Minimal like Apple. Precise like engineering. Distinctive
> like Intensify Technologies.

---

## ✦ Tech Stack

| Area        | Choice                                   |
| ----------- | ---------------------------------------- |
| Framework   | React 18 + TypeScript                    |
| Build tool  | Vite 5                                    |
| Styling     | Tailwind CSS 3 (custom design tokens)    |
| Routing     | React Router 6                            |
| Animation   | Framer Motion 11 (reduced-motion aware)  |
| Icons       | lucide-react                              |
| Fonts       | Inter + Manrope (self-hosted via Fontsource) |

Self-hosted fonts mean **no external font requests** — better performance,
privacy, and offline reliability.

---

## ✦ Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Type-check only
npm run lint

# 4. Production build  →  /dist
npm run build

# 5. Preview the production build locally
npm run preview
```

Requires **Node 18+** (developed on Node 24).

---

## ✦ Project Structure

```
src/
  assets/            Authentic industrial imagery (extracted from references)
  components/        Reusable UI + section building blocks
    sections/        Page-level composed sections (Hero, …)
  data/              Centralised content — single source of truth
    site.ts          Nav, contact details, stats, social
    products.ts      Product categories & products
    industries.ts    8 industry sectors
    services.ts      6 services
  hooks/             useScrolled, usePrefersReducedMotion
  pages/             Route pages (Home, About, Products, …)
  App.tsx            Routes (lazy-loaded) + MotionConfig
  main.tsx           App bootstrap
  index.css          Design system: tokens, components, utilities
public/              favicon, OG image, robots.txt, sitemap.xml, SPA redirects
```

All marketing content lives in `src/data/*` so copy, products, industries, and
services can be edited in one place without touching components.

---

## ✦ Pages & Routes

| Route                       | Page                               |
| --------------------------- | ---------------------------------- |
| `/`                         | Home                               |
| `/about`                    | Who We Are                         |
| `/products`                 | Our Products                       |
| `/products/:slug`           | Product detail (8 products)        |
| `/services`                 | Our Services                       |
| `/industries`               | Industries Served                  |
| `/industries/:slug`         | Industry detail (8 sectors)        |
| `/contact`                  | Contact Us + enquiry form + map    |
| `/privacy`, `/terms`        | Legal (template — see below)       |
| `*`                         | 404 Not Found                      |

---

## ✦ Contact Form — how submissions work

The form has client-side **validation, loading, success, and error states**, plus
a hidden **honeypot** field for basic spam protection. It behaves honestly — it
never fakes a "sent" confirmation:

1. **If `VITE_CONTACT_ENDPOINT` is set** → the form `POST`s the enquiry as JSON and
   reports the real server response (success / error).
2. **If it is not set** (default) → the form opens the visitor's email client with
   the enquiry pre-filled to `contact@intensify.co.in`, and clearly tells the user
   that's what happened. No message is ever silently dropped or faked.

### Wiring up a real backend

Set the endpoint in `.env` (copy from `.env.example`):

```
VITE_CONTACT_ENDPOINT=https://api.intensify.co.in/contact
```

It should accept:

```
POST  <endpoint>
Content-Type: application/json
Body: { name, email, company, phone, subject, message }
→ respond with HTTP 2xx on success
```

A minimal serverless handler (e.g. Vercel / Netlify function) that emails the
enquiry via a provider such as Resend, SendGrid, or SES is all that's required.
No email credentials are bundled with this project.

---

## ✦ Deployment

The site is a static SPA — deploy `dist/` to any static host.

- **Vercel:** zero-config. `vercel.json` adds the SPA rewrite.
- **Netlify:** `public/_redirects` adds the SPA fallback. Build command
  `npm run build`, publish directory `dist`.
- **Any static host / S3 / Nginx:** serve `dist/` and route all unknown paths to
  `index.html` (SPA fallback).

Before go-live, update the production domain in:
`index.html` (canonical + OG), `src/data/site.ts` (`url`),
`public/sitemap.xml`, and `public/robots.txt` (currently `https://www.intensify.co.in`).

---

## ✦ Performance & SEO

- Semantic HTML, correct heading hierarchy, skip-to-content link, descriptive alt text.
- Per-page `<title>`, meta description, canonical, Open Graph & Twitter tags (`Seo` component).
- Organization JSON-LD structured data in `index.html`.
- `sitemap.xml`, `robots.txt`, SVG + ICO favicons, OG image.
- Route-level code splitting, lazy-loaded images, self-hosted subsetted fonts.
- Respects `prefers-reduced-motion`.

---

## ✦ Imagery & Logo

- Industrial photography was **extracted from the authentic reference material**
  supplied by the company and tonally harmonised (B&W / selective warmth).
- The logo is a faithful **vector reproduction** of the reference brand mark
  (`src/components/Logo.tsx`), scalable and crisp at any size. A reference raster
  (`src/assets/intensify-logo.png`) is also included.
- **Please supply an official high-resolution / vector logo** to replace the
  reproduction, and official product/industry photography to replace the
  reference-derived imagery where desired. Assets are isolated in `src/assets/`
  and `src/components/Logo.tsx` for easy replacement.

---

## ⚠ Items Requiring Company Confirmation

The reference material contained gaps and internal inconsistencies. The following
were resolved pragmatically and flagged — **please confirm before public launch**:

1. **Brand name spelling.** The reference logo reads *"Intensify Technology"* and
   the email is `contact@intensify.co.in` (with an "n"); the brief's title/footer
   used *"Intesify"*. We standardised on **"Intensify Technologies"** site-wide.
2. **Years of experience.** The Home reference showed *"20+ years"*; the Who We Are
   reference showed *"25+ years"*. The homepage uses the unambiguous *"over two
   decades"*; the About statistics band uses **25+**.
3. **Company statistics (unverified).** `25+ years, 1.5k+ projects, 40+ partners,
   12 patents` are shown on the About page but are **marked with an asterisk and a
   "pending confirmation" note**. Confirm or correct in `src/data/site.ts` (`stats`).
4. **Technical specifications.** No product specs were invented. Each product
   detail page shows a clearly-marked placeholder inviting a verified datasheet.
5. **Certifications / standards.** References to *ISO 16232, VDA 19, ISO 13485,
   AS9100, Mil-Spec* etc. are carried over from the reference material as
   positioning. Confirm the company's actual certification status.
6. **"German technology partnerships"** (stated in the reference) — confirm.
7. **Social media URLs.** Footer icons link to `#` placeholders
   (`src/data/site.ts` → `social`). Add real URLs or the icons can be removed.
8. **Global / 24-7 support claim.** Softened to "being finalised" on the Contact
   page — confirm the real support offering.
9. **Legal pages** (`/privacy`, `/terms`) are **templates** and must be reviewed
   by legal counsel before publication.
10. **Map pin.** The Contact map centres on the New Sangavi, Pune (411027) area;
    confirm the precise building location for an exact pin.

---

© Intensify Technologies. Built as a complete, production-ready frontend.
