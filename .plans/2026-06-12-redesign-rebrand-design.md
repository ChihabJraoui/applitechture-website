# Applitechture Website Redesign & Rebrand — Design Spec

**Date:** 2026-06-12
**Status:** Approved direction, pending user review of this document

## Context

The current site is v1 of the Applitechture startup website — a template-derived Next.js 15 dark-theme marketing site with placeholder content (lorem ipsum blog, generic copy, unused auth/pricing pages). It is treated as disposable. This project replaces it with a rebranded, redesigned, content-optimized site whose single job is **lead generation**: convincing SMB owners and startup founders to start a conversation.

## Brand

- **Name:** Applitechture (final). Wordmark only, no symbol: lowercase `applitechture.` set in Inter semi-bold with a terracotta period.
- **Visual direction:** Warm & Human editorial. Light, warm neutrals, serif display type, boutique-studio feel. Explicitly not the dark/gradient/WebGL "tech agency" look.
- **Palette:**
  - Cream `#FAF6F1` — page backgrounds
  - Sand `#F0E9DF` — cards, alternating sections
  - Ink `#1C1917` — text, footer, primary buttons
  - Stone `#78716C` — secondary text
  - Terracotta `#C2410C` — accent: CTAs, links, wordmark period
- **Typography:** Fraunces (display serif) for headlines, Inter for body/UI. Loaded via `next/font`.
- **Voice:** plain, warm, first-person plural. Short sentences, concrete claims, benefits before features. Banned: "cutting-edge", "synergy", "elevate", lorem ipsum, stock jargon. Occasional italic serif flourish for warmth.
- **Audience:** SMBs/local businesses + startup founders. International, English only.

## Site architecture

Six routes; every page's primary CTA funnels to `/contact`.

```
/                      Home
/services              Services index
/services/[slug]       4 detail pages
/about                 About
/contact               Contact (form)
```

Cut from v1: blog, blog-details, blog-sidebar, signin, signup, error page, pricing component, video section.

**Homepage flow (top→bottom):**
1. Hero — serif headline + one-sentence promise + CTA. Calm; no WebGL, at most a subtle texture/illustration.
2. Services — 4 cards linking to detail pages.
3. Selected work — 2–3 anonymized case studies with outcome stats.
4. How we work — 3-step process (talk → build → ship) for non-technical buyers.
5. About teaser — founder, photo, one paragraph → /about.
6. CTA band (ink background) — "Have an idea? Let's talk." → /contact.
7. Footer — wordmark, nav, email, socials.

**Other pages:**
- `/services` — intro + the 4 offers expanded.
- `/services/[slug]` — problem → what we do → deliverables → mini case study → CTA.
- `/about` — story, values, founder; personal, real photos.
- `/contact` — short form: name, email, project description, optional budget range. Plus a direct email link.

## Content & messaging

**Services (consolidated from v1's six to four):**
1. **Custom Web & Mobile Apps** — core offer (merges Custom Software Development + Application Development)
2. **Product & UX Design** — standalone design/prototyping offer
3. **AI & Automation** — automate repetitive work, add AI features
4. **Digital Strategy & Consulting** — for SMBs that know something's wrong but not what to build

Dropped: "Fully Customizable" (a feature claim, not a service).

**Messaging spine:**
- Hero headline: "Good software, built with care."
- Subline: "Applitechture is a software studio helping small businesses and startups design, build, and ship apps that pay for themselves." (workable draft, refine during build)

**Proof:** 2–3 anonymized case studies, each shaped as *client type + problem → what we built → measurable outcome*. Drafted as realistic placeholders in data files; the user supplies real project stories to replace them before launch.

**User-supplied content needed before launch:** 2–3 real project stories to anonymize, about-page paragraph, founder photo.

## Tech stack

Full re-scaffold in this same repo (git history and Vercel link preserved; current code replaced).

- **Next.js 16** App Router, **TypeScript strict mode on**, Node 24, deployed on Vercel.
- **Tailwind CSS v4** — brand tokens as CSS variables in `@theme` (globals.css), single source of truth for the palette.
- **shadcn/ui** for form primitives only (input, textarea, button, label); marketing sections are bespoke components.
- **Fonts:** Fraunces + Inter via `next/font` (self-hosted).
- **No dark mode** — one warm light theme; `next-themes` removed; root layout is a server component.
- **Content as typed data files** in `src/content/` (services, case studies, process steps, nav). No CMS; dead Sanity image config dropped.
- **Contact form:** server action → **Resend** email to the founder. Honeypot anti-spam field, inline success/error states. Env var `RESEND_API_KEY` (Vercel env, never committed).
- **SEO:** per-page `metadata`, `sitemap.ts`, `robots.ts`, OG image, Organization structured data.
- **No animation libraries** — CSS transitions + small scroll-reveal only. Removed deps: framer-motion, motion, ogl, cobe, @splinetool/react-spline, next-themes, react-intersection-observer, sass.

## Error handling

- Contact form: client + server validation (required name/email/description, email format); server action returns typed success/error; failure shows inline message with the direct email address as fallback.
- Custom `not-found.tsx` in brand style.
- Unknown service slugs → 404 via `generateStaticParams` + `notFound()`.

## Quality gates & verification

- ESLint + Prettier (prettier-plugin-tailwindcss); `npm run build` must pass with strict TS.
- No unit-test suite (content site). Verification: production build + manual Playwright walkthrough of all six routes, the form happy path (Resend test mode), the form error path, and mobile viewport checks.
- Lighthouse sanity check on Home (target: 90+ performance/SEO/accessibility — realistic given no heavy JS).
