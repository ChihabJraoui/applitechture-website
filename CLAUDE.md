# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for Applitechture software studio. v2 redesign/rebrand completed per `.plans/2026-06-12-redesign-rebrand-design.md`. Goal is lead generation funneling to `/contact`. Case studies in `src/content/case-studies.ts` are DRAFT placeholders — three anonymized entries pending real client stories before going public.

## Commands

```bash
npm run dev     # start dev server
npm run build   # production build (quality gate)
npm run lint    # ESLint flat config — eslint.config.mjs (quality gate)
npm run format  # Prettier with tailwind class-sorting plugin
```

No test suite — build + lint are the quality gates.

## Stack

- **Framework:** Next.js 16 App Router, React 19
- **Language:** TypeScript strict mode
- **Styling:** Tailwind CSS v4, brand tokens declared in `@theme` in `src/app/globals.css`
- **UI primitives:** shadcn/ui form components in `src/components/ui`
- **Email:** Resend via server action
- **Deployment:** Vercel

Brand tokens: `cream`, `sand`, `sand-dark`, `ink`, `stone`, `terracotta`, `terracotta-dark`. Fonts: `font-sans` → Inter, `font-display` → Fraunces.

Routes: `/` `/services` `/services/[slug]` (SSG ×4) `/about` `/contact` + `sitemap.xml` `robots.txt` `icon` `og-image` `not-found`.

## Architecture

**Content-as-typed-data.** All copy lives in `src/content` (`site.ts`, `types.ts`, `services.ts` [4 services], `case-studies.ts` [3 DRAFT], `process.ts`). Pages import and map over these; no CMS, no MDX.

**Brand tokens — single source of truth.** Colors and fonts are declared once in `@theme` in `src/app/globals.css`. Change colors or fonts there and they propagate everywhere via Tailwind utilities.

**Satori-generated images** (`icon`, `og-image`) hard-code the token hex values in comments because Satori renders outside the CSS cascade and cannot read CSS custom properties.

**Container component.** Fixed `max-w-6xl`. Sections that need narrower content add an inner `max-w-*` div inside. Pass extra classes via `className` — they are additive, not replacements.

**Contact flow.** Browser form → `useActionState` → `src/app/contact/actions.ts` (server action) → Resend API. Errors are surfaced inline; the UI provides a `mailto:` fallback. The action is non-throwing — all failures return a typed error state. Honeypot field and length caps guard against abuse.

**`RESEND_API_KEY`** must be set in Vercel project environment variables (all environments) and locally in `.env.local`. The sender address is `onboarding@resend.dev` until the domain is verified with Resend.

**SEO / structured data.** Root layout (`src/app/layout.tsx`) injects Organization JSON-LD. No dark mode. No animation libraries.
