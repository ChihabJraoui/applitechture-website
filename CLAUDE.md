# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for the Applitechture startup (software/app development agency). This is the initial version; a redesign, rebrand, and content optimization is planned.

## Commands

```bash
npm run dev     # start dev server (next dev)
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint via next lint
```

There is no test suite. Formatting is Prettier with `prettier-plugin-tailwindcss` (class sorting).

## Stack

- Next.js 15 (App Router) + React 19, TypeScript (`strict: false` in tsconfig)
- Tailwind CSS 3 with shadcn/ui-style CSS variables; global stylesheet is SCSS at `src/styles/index.scss` (imported once in the root layout)
- shadcn/ui is configured (`components.json`, new-york style, lucide icons) but no `src/components/ui/` components have been generated yet
- Dark mode via `next-themes` (`attribute="class"`, dark by default, system theme disabled) — provider lives in `src/app/providers.tsx`
- Path alias `@/*` → `src/*`

## Architecture

- **Routes** live in `src/app/` — all are static marketing pages (home, about, services, blog, contact, signin/signup, etc.). The home page (`src/app/page.tsx`) composes section components in order: Hero → Services → Video → Brands → Testimonials → Blog → Contact.
- **`src/app/layout.tsx` is a client component** (`"use client"`) that wraps every page with Header, Footer, and ScrollToTop. Page-level `metadata` exports still work because pages are server components.
- **Content is hard-coded data files, not a CMS.** Each section component has a sibling `*Data.tsx` file (`src/components/Blog/blogData.tsx`, `Brands/brandsData.tsx`, `Features/featuresData.tsx`, `Header/menuData.tsx`) plus `src/_data/services.tsx`. Their shapes are typed in `src/types/`. Blog content is placeholder lorem ipsum. The `cdn.sanity.io` entry in `next.config.js` is a leftover — no Sanity integration exists.
- **Components** in `src/components/` follow a folder-per-component pattern with `index.tsx`. Decorative/animated components: `Threads` and `Orb` (WebGL via `ogl`), `magicui/globe` (cobe), `magicui/aurora-text`, plus `framer-motion` and Spline (`@splinetool/react-spline`) usage.
- **Services detail pages** are individual routes under `src/app/services/` (currently only `application-development/`); the services grid pulls from `src/_data/services.tsx`.
- Static assets are under `public/images/` grouped by section (hero, blog, brands, testimonials, …).