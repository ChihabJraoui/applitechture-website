# Ember Immersive Redesign — Design Spec

**Date:** 2026-06-13
**Status:** Approved direction, pending user review of this document
**Supersedes:** the visual-theme portion of `.plans/2026-06-12-redesign-rebrand-design.md`. Content, copy, routes, contact flow, and SEO layer from that spec remain authoritative.

## Context

The v2 "Warm & Human" light theme shipped but doesn't read as a software agency, and the site feels static. This redesign keeps everything that works — structure, copy, typed content layer, contact flow, SEO — and replaces the visual theme with a dark "Ember" identity plus an immersive motion layer (Three.js + GSAP). The user explicitly chose the **Immersive** motion level (persistent WebGL, scroll-driven scenes, section pinning) accepting the performance trade-off, and the **R3F + GSAP + Lenis** stack.

## Scope

- **Unchanged:** routes, copy, `src/content/` data layer, contact server action + Resend flow, sitemap/robots/JSON-LD, README env docs.
- **Changed:** color tokens, all component styling, header/footer treatment, icon + OG image colors, hero/section presentation, addition of scene + motion layers.
- **Removed:** nothing structural; the light theme tokens are replaced.

## Ember theme

| Token | Value | Use |
| --- | --- | --- |
| `coal` | `#0c0a09` | page background |
| `char` | `#1c1917` | cards, elevated surfaces |
| `char-light` | `#292524` | borders, dividers |
| `warm-white` | `#fafaf9` | headings, body text |
| `ash` | `#a8a29e` | secondary text (AA on coal) |
| `ember` | `#ea580c` | accent: CTAs, links, em accents, wordmark period |
| `ember-glow` | `rgba(234,88,12,0.15)` | radial glows, hover halos |
| `terracotta-dark` | `#9a3412` | pressed/active states only |

- Typography unchanged: Fraunces (normal+italic, opsz) display, Inter body. Wordmark stays `applitechture.` with ember period.
- Cards: 1px `char-light` border, faint ember glow on hover/focus instead of border-color swap alone.
- CTA band: ember-tinted radial section (no longer ink-on-light inversion).
- Implementation: replace the brand `@theme` block in `globals.css` (old names cream/sand/sand-dark/ink/stone retired); re-derive shadcn form tokens for dark surfaces. Satori images (`icon.tsx`, `opengraph-image.tsx`) update to coal/warm-white/ember hexes with the existing mirror-comment convention.

## Motion stack

- **three** + **@react-three/fiber** + **@react-three/drei** — persistent WebGL scene
- **gsap** (3.13+; SplitText et al. are free) + **ScrollTrigger** — scroll choreography
- **lenis** — smooth scroll, synced to ScrollTrigger
- **zustand** — tiny shared store bridging scroll/pointer state into the scene

## Persistent scene

One fixed full-viewport R3F canvas mounted in the root layout (`position: fixed; inset: 0; z-index: -1`), surviving route changes. Content scrolls over it.

**Ember particle field:** 2–3k instanced particles (mobile: ~600) in warm orange/amber, drifting slowly upward, with depth fog. Inputs:
- **Pointer:** gentle camera parallax (few degrees toward cursor; off on touch).
- **Scroll temperature:** per-section intensity — bright/dense at hero, calm through content, converging flare behind the CTA band. Driven by ScrollTrigger writing to the zustand store; the scene reads it per frame.

Canvas pauses when the tab is hidden (page visibility) and respects DPR cap 1.5.

## Scroll choreography (home, top→bottom)

1. **Hero** — SplitText word-stagger reveal; the italic "built with care." ignites last with an ember glow; pulsing scroll cue.
2. **Header** — transparent over hero; gains blurred coal glass background + border after scrolling past the hero.
3. **Services** — staggered rise-and-fade on enter; hover/focus = subtle 3D tilt + ember border glow.
4. **Selected work (set piece)** — section pins; the three case-study cards travel horizontally with scroll; each outcome stat counts up as its card centers.
5. **Process** — section pins; Talk → Build → Ship light up sequentially with a drawing connector line tied to scroll progress.
6. **About teaser** — light parallax drift + reveal (rest beat).
7. **CTA band** — particles converge/brighten behind the heading as it scales in.

**Inner pages** (services index/detail, about, contact): reveal vocabulary only — no pinning. **Micro-interactions:** magnetic pull on primary CTAs, underline sweep on links, ember focus glow on form fields.

## Architecture

```
src/components/scene/
  scene-canvas.tsx     client; fixed R3F Canvas, mounted once in layout; lazy-loaded
  ember-field.tsx      instanced particles + fog; reads scene store per frame
  use-scene-store.ts   zustand: scrollTemperature, pointer, sectionSignals
src/components/motion/
  motion-provider.tsx  client; Lenis init, gsap.registerPlugin, reduced-motion context
  reveal.tsx           declarative rise-and-fade wrapper
  split-heading.tsx    SplitText heading reveal
  magnetic.tsx         magnetic CTA wrapper
```

- Layout order: `<MotionProvider><SceneCanvas /><Header />{children}<Footer /></MotionProvider>`.
- Section components stay server components except those needing choreography (work strip, process), which become thin client components still importing copy from `src/content/`.
- The Three.js chunk is dynamically imported so first paint never waits on it.

## Performance & accessibility

- **`prefers-reduced-motion`:** static ember-gradient backdrop instead of the scene; no pinning, no smooth scroll, no SplitText; content immediately visible. Hard requirement.
- **Mobile:** ~600 particles, no pointer parallax, DPR ≤ 1.5; work strip falls back to vertical stack (no pinned horizontal scroll on touch); process unpins to sequential reveals.
- **No-JS/SEO:** content is server-rendered and never hidden — GSAP initial states apply only after a `js-motion` class lands on `<html>`; crawlers and JS-off users see full content.
- **Budgets:** Lighthouse mobile performance ≥ 80 (accepted cost of immersive), accessibility ≥ 95, SEO 100.

## Error handling

- WebGL unavailable/context-lost → unmount canvas, fall back to the static gradient backdrop (same path as reduced motion).
- Scene/motion errors must never block content: canvas wrapped in an error boundary that degrades to the gradient.

## Quality gates & verification

- `npm run build` + `npm run lint` + `npm run format` per task, as established.
- Final Playwright walkthrough adds: reduced-motion emulation (static backdrop, no pins, content visible), mobile viewport fallbacks (vertical work stack), no horizontal overflow during/after pinned sections, scene survives route navigation, form flow unchanged.
- Lighthouse: mobile performance ≥ 80, a11y ≥ 95, SEO 100.
