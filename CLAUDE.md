# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for Applitechture software studio. Dark "Ember" immersive redesign completed per `.plans/2026-06-13-ember-immersive-redesign-design.md` (latest; supersedes the visual-theme portion of the prior v2 spec). Goal is lead generation funneling to `/contact`. Case studies in `src/content/case-studies.ts` are DRAFT placeholders — three anonymised entries pending real client stories before going public.

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
- **Styling:** Tailwind CSS v4; ember tokens declared in `@theme` in `src/app/globals.css`
- **UI primitives:** shadcn/ui form components in `src/components/ui` (dark surface; `dark` class on `<html>`)
- **Email:** Resend via server action
- **Deployment:** Vercel
- **Motion:** three + @react-three/fiber + @react-three/drei (persistent WebGL scene), gsap + ScrollTrigger + SplitText, lenis smooth scroll, zustand

**Ember brand tokens** (`@theme` in `globals.css`):

| Token        | Value                  | Role                                 |
| ------------ | ---------------------- | ------------------------------------ |
| `coal`       | `#0c0a09`              | page background                      |
| `char`       | `#1c1917`              | cards, elevated surfaces             |
| `char-light` | `#292524`              | borders, dividers                    |
| `warm-white` | `#fafaf9`              | headings + body text                 |
| `ash`        | `#a8a29e`              | secondary text (AA on coal)          |
| `ember`      | `#ea580c`              | accent: CTAs, links, wordmark period |
| `ember-glow` | `rgba(234,88,12,0.15)` | radial glows, hover halos            |
| `ember-dark` | `#9a3412`              | pressed/active states only           |

Fonts: `font-display` → Fraunces (normal + italic, opsz), `font-sans` → Inter.

Routes: `/` `/services` `/services/[slug]` (SSG ×4) `/about` `/contact` + `sitemap.xml` `robots.txt` `icon` `og-image` `not-found`.

## Architecture

**Content-as-typed-data.** All copy lives in `src/content/` (`site.ts`, `types.ts`, `services.ts` [4 services], `case-studies.ts` [3 DRAFT], `process.ts`). Pages import and map over these; no CMS, no MDX.

**Brand tokens — single source of truth.** Colors and fonts are declared once in `@theme` in `src/app/globals.css`. Change a value there and it propagates everywhere via Tailwind utilities.

**Satori-generated images** (`icon`, `og-image`) hard-code the token hex values in comments because Satori renders outside the CSS cascade and cannot read CSS custom properties.

**Container component.** Fixed `max-w-6xl`. Sections that need narrower content add an inner `max-w-*` div inside. Pass extra classes via `className` — they are additive, not replacements.

**Contact flow.** Browser form → `useActionState` → `src/app/contact/actions.ts` (server action) → Resend API. Errors surfaced inline; `mailto:` fallback provided. The action is non-throwing — all failures return a typed error state. Honeypot field and length caps guard against abuse. `RESEND_API_KEY` must be set in Vercel env vars (all environments) and locally in `.env.local`.

**SEO / structured data.** Root layout injects Organization JSON-LD. Content is server-rendered; no content is ever gated behind JS.

### Motion architecture

**`src/components/motion/motion-provider.tsx`** — client boundary that owns:

- Lenis smooth scroll instance (created once, destroyed on unmount).
- Reduced-motion context: `useReducedMotion` hook, hydration-safe via `useSyncExternalStore`.
- GSAP plugin registration (`gsap.registerPlugin(...)`) at module scope — runs once.
- ScrollTrigger refresh after fonts load.
- Teardown rule: **never call `ScrollTrigger.killAll()`**. Every animating component scopes its triggers inside `gsap.context()` and reverts on cleanup. The provider only tears down what it owns.

**`src/components/scene/`** — persistent R3F ember particle field:

- `scene-canvas.tsx`: fixed full-viewport canvas (`position: fixed; inset: 0; z-index: -10`), mounted once in the root layout, survives route changes. Dynamically imported so first paint never waits on the Three.js chunk.
- `ember-field.tsx`: 2–3k instanced particles (mobile: ~600) in warm orange/amber with depth fog. Reads scene store per frame.
- `use-scene-store.ts`: zustand store (`scrollTemperature`, `pointer`, `sectionSignals`). Scene reads via `getState()` only — no per-frame React re-renders.
- **Fallback chain:** `prefers-reduced-motion` → no-WebGL capability → WebGL context-loss → `.ember-backdrop` static gradient. The canvas is wrapped in an error boundary that degrades to the gradient; scene/motion errors never block content.

**Motion primitives** in `src/components/motion/`: `Reveal`, `SplitHeading`, `Magnetic`, `TemperatureDriver`. All consume `useReducedMotion` and no-op when reduced motion is active.

**Pinned sections** (`home/work-strip.tsx` horizontal scroll, `home/process-pinned.tsx` sequential) require `(pointer: fine)` + non-reduced-motion; they fall back to static stacked layouts on touch/reduced. Use `invalidateOnRefresh: true` and functional `start`/`end` callbacks for resize safety.

**Progressive enhancement.** Content is server-rendered and never hidden pre-JS. A `js-motion` class on `<html>` (applied client-side) gates the only pre-animation hide: `.js-motion [data-split] { opacity: 0 }`. Crawlers and JS-off users see full content.

**Performance budget.** Mobile Lighthouse: performance ≥ 80 (accepted cost of immersive layer), accessibility ≥ 95, SEO 100. DPR capped at 1.5; canvas pauses on page visibility hidden.
