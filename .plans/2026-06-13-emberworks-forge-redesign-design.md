# Emberworks — "Forged" Redesign & Rebrand — Design Spec

**Date:** 2026-06-13
**Status:** Approved direction (visual brainstorm), pending user review of this document
**Supersedes:** the visual/brand/concept portion of `.plans/2026-06-13-ember-immersive-redesign-design.md`. The **engineering foundation** from that spec remains authoritative and is explicitly reused: typed content layer, contact server action + Resend, sitemap/robots/JSON-LD, reduced-motion discipline, component boundaries, and the R3F + GSAP + Lenis + zustand stack.

## Context

The dark "Ember" immersive theme shipped, but it reads as a competent dark template, not award-tier work: a *theme* (dark + one orange + floating particles) rather than a *concept*. This redesign keeps every piece of working engineering and replaces the **concept, brand, palette, and art direction**. Nothing about the data layer, routes, contact flow, or SEO changes structurally.

## The concept — "Good software, forged with care."

**The whole page is one piece of steel moving through the forge.** Temperature rises with scroll — *first heat → working heat → peak → a white-hot flare → cooled, tempered steel*. The blacksmith reads temperature by color, and so does the page.

This is a concept with a *reason*, not a mood: heat is the visible cost of building. The blueprint/structure DNA from the earlier exploration survives — but reskinned as **glowing ember forge-marks and a measured grid**, never cold cyan. One material, one hue, fully committed. The brand name, the tagline, the section vocabulary, and the funnel goal all point the same direction.

## Brand

- **Name:** Applitechture → **Emberworks.** Wordmark `emberworks.` with a glowing ember period (the one device carried over from the old wordmark). Keeps the existing ember equity; "-works" signals a workshop that ships.
  - **Domain:** deferred (user decides later). Exact-match `.com/.io/.co/.dev/.studio` are taken and `ember.works` is parked for resale; clean & available: `emberworks.app` (recommended), `weareemberworks.com`. Buying `emberworks.com` off the Atom marketplace is the premium option.
- **Tagline:** "Good software, built with care." → **"Good software, forged with care."** ("forged" is the hottest word everywhere it appears.)
- **Voice / vocabulary:** smithy language — *"What we forge"* (services), *"From the anvil"* (work), *"Heat · Hammer · Temper"* (process), *"The smith"* (about), *"Let's forge it."* (CTA).

## Palette — the Incandescence Ramp

One hue. Not a flat orange — the real color-temperature of heated steel. This is the new single source of truth in `@theme` (`globals.css`), replacing `coal/char/char-light/warm-white/ash/ember/ember-glow/ember-dark`.

**Substrate (the dark forge, where content lives):**

| Token | Value | Role | Replaces |
| --- | --- | --- | --- |
| `forge-black` | `#0b0705` | page canvas | `coal` |
| `iron` | `#1b0f09` | cards, elevated surfaces | `char` |
| `scale` | `#2a160c` | borders, dividers, forge-grid lines | `char-light` |
| `warm-white` | `#faf3ee` | headings + body text (warmer than before) | `warm-white` |
| `ash` | `#b3a79d` | secondary text (must hold AA on `forge-black`) | `ash` |

**Incandescence ramp (heat — type, linework, glow, the scene):**

| Token | Value | ≈ Temp |
| --- | --- | --- |
| `first-heat` | `#6b1a07` | 550°C |
| `deep-ember` | `#9a3412` | 700°C |
| `ember` *(primary accent)* | `#ea580c` | 850°C |
| `amber` | `#f59e0b` | 1000°C |
| `yellow-hot` | `#fbbf24` | 1150°C |
| `forge-yellow` | `#fde047` | 1250°C |
| `white-hot` | `#fff7ed` | 1350°C |

- `ember-glow` (radial halo) stays as `rgba(234,88,12,0.15)`; add `amber-glow` `rgba(245,158,11,0.18)` for hotter moments.
- **Canvas behavior (locked: option A):** the canvas stays dark and legible the whole way; heat climbs through *type, linework, and glow*. The **CTA inverts** to a `white-hot` background with dark forged text — one blinding, screenshot-worthy climax exactly at the ask.
- shadcn form tokens re-derive for the new dark surface: `--background #0b0705`, `--card #1b0f09`, `--primary #ea580c`, `--border/-input #2a160c`, `--ring #ea580c`, `--muted #2a160c`, `--muted-foreground #b3a79d`, `--foreground #faf3ee`.
- Satori images (`icon.tsx`, `opengraph-image.tsx`) hard-code the new hexes via the existing mirror-comment convention (they render outside the CSS cascade).

## Typography

- **Display:** Fraunces (kept) — high-contrast soft-serif, optical sizing, gorgeous italic; reads as elegant hot metal. Used **viewport-scale and kinetic**, not timid: the hero is the artwork, not a 60px headline.
- **Technical layer (new):** a monospace for forge-marks — temperatures, spec-tags (`SVC.01`), coordinates, measurements. Proposed **JetBrains Mono** via `next/font/google`, one weight (500), subset latin. This is the surviving "blueprint precision," in ember.
- **Body:** Inter (kept).

## The persistent scene (R3F) — reframed, not rebuilt

> **Update (post-launch, per user feedback):** the WebGL spark field was removed — it read as a generic particle effect. The background is now the static `.ember-backdrop` forge gradient; `three`/`@react-three/fiber`/`zustand` were uninstalled. The heat narrative now lives entirely in the type, palette, and the white-hot CTA inversion.

The existing `ember-field` + `use-scene-store` (`temperature`, `pointer`) get *meaning*:

- Embers become **forge sparks**. The scene reads `temperature` per frame and maps it onto the **incandescence ramp** — color, density, drift speed, opacity/size all climb with heat.
- `TemperatureDriver` + ScrollTrigger writes per-section temperature (see choreography). Sparks **converge and flare** at the white-hot CTA.
- Fallback chain unchanged: `prefers-reduced-motion` → no-WebGL → context-loss → **static dark-forge gradient** (`.ember-backdrop` retoned to forge-black + ember radial glows). DPR cap 1.5; pause on tab hidden; error boundary degrades to the gradient. Scene/motion errors never block content.

## Scroll choreography (home, top → bottom)

1. **Hero — First Heat (≈550°C).** Asymmetric, left-weighted, massive Fraunces; faint ember forge-grid behind; first sparks. **Signature:** the headline *forges in* — a heat-wipe sweeps left→right igniting the letters dark-iron → incandescent; "forged" settles hottest, then breathes. Wordmark, tagline, primary CTA + ghost link.
2. **Header.** Transparent over hero; gains blurred `forge-black` glass + `scale` border after scroll (existing `HeaderChrome`, retoned).
3. **Services — "What we forge" (≈700°C).** The four disciplines as **labelled modules on the measured forge-grid**, mono spec-tags. **Signature:** reveal = temperature rising in; **hover = heat bloom** (ember border → amber glow, subtle lift).
4. **Work — "From the anvil" (≈850°C).** Case studies are **pieces pulled from the fire**. Horizontal pin retained (pointer:fine + non-reduced). **Signature:** the centered piece is at peak glow; its outcome stat **ignites and counts up** as it "cools" into final form. *(Content stays the 3 DRAFT placeholders.)*
5. **Process — "Heat · Hammer · Temper" (≈1000°C, peak).** The hot zone; pinned sequence. Talk→**Heat**, Build→**Hammer**, Ship→**Temper**. **Signature:** each step **ignites hotter** than the last along a glowing heat-line connector tied to scroll progress.
6. **About — "The smith" (≈900°C).** Rest beat. The `CJ` monogram becomes a **glowing maker's stamp / forge-mark**; gentle parallax; the stamp **pulses warm once** on reveal. *(Founder photo = launch item.)*
7. **CTA — the inversion (≈1350°C).** Section **flips to white-hot**, dark forged text: **"Have an idea? Let's forge it."** **Signature:** sparks converge & flare; magnetic CTA carries the **spark-strike** (cursor throws sparks; reserved for this one moment).
8. **Footer — cooled, tempered steel.** Back to dark; wordmark, nav, email — quiet and resolved.

**Inner pages** (services index/detail, about, contact): reveal vocabulary only ("heat-in" reveals), **no pinning**. **Micro-interactions:** magnetic primary CTAs, heat-sweep underline on links, ember focus-glow on form fields.

## Copy reframes (the words that ship)

- **Tagline** → "Good software, forged with care." (`site.ts`, hero, all surfaces).
- **Section headings** → Services: "What we forge"; Work: "From the anvil"; About: "The smith"; CTA: "Have an idea? Let's forge it."
- **Process step titles** (`process.ts`) → **Heat / Hammer / Temper**, with descriptions lightly bridged to the metaphor while keeping the substance (Heat = "you can't shape cold metal" / the honest free call; Hammer = working software every week, change while cheap; Temper = launch, harden, you own it).
- **Service titles & summaries unchanged** (they're strong) — only the section framing changes.
- **Case studies stay DRAFT** and flagged.

## Architecture (file-level overview)

- `globals.css` — replace `@theme` tokens with substrate + incandescence ramp; re-derive shadcn dark tokens; retone `.ember-backdrop` (forge gradient) and the CTA inversion surface; heat-sweep link util; keep the `js-motion [data-split]{visibility:hidden}` pre-JS hide.
- `content/site.ts` — name + tagline. `content/process.ts` — step titles/descriptions.
- `components/wordmark.tsx` — `emberworks.` `components/scene/ember-field.tsx` — forge sparks + ramp mapping (`use-scene-store.ts` unchanged in shape). `components/motion/` — `split-heading` gains the fail-open heat-wipe; `reveal` → heat-in; `magnetic` kept; add **spark-strike** (CTA only); `temperature-driver` per-section temps.
- Section components — `hero`, `services-section`, `work-strip`, `process-pinned` (Heat/Hammer/Temper), `about-teaser` (stamp), `cta-band` (white-hot inversion), `header-chrome`, `footer`, `button-link`, `section-heading`, `container`.
- `icon.tsx`, `opengraph-image.tsx` — forge palette + `emberworks` wordmark, mirror-comment hexes.
- Add JetBrains Mono via `next/font/google` in the root layout font setup.

## Performance & accessibility (budgets hold)

- Lighthouse **mobile performance ≥ 80, accessibility ≥ 95, SEO 100** (accepted cost of the immersive layer).
- **White-hot CTA contrast:** dark text (`#1a0e08`/`forge-black`) on `white-hot #fff7ed` — verify AA in the build walkthrough (expected ~17:1, comfortable).
- **`prefers-reduced-motion`:** static forge gradient instead of the scene; no heat-wipe, no pinning, no smooth scroll; content immediately visible.
- **Mobile:** ~600 sparks, no pointer parallax, DPR ≤ 1.5; work strip → vertical stack; process → sequential reveals.
- **Fail-open is mandatory** (carry the existing SplitText guard): if the heat-wipe constructor throws, the headline reverts to fully visible — it must never be stuck invisible.
- **No content gated behind JS;** crawlers + JS-off users see full content.

## Error handling

WebGL unavailable/context-lost → unmount canvas → static forge gradient (same path as reduced motion). Canvas wrapped in an error boundary. Never call `ScrollTrigger.killAll()`; every animating component scopes triggers in `gsap.context()` and reverts on cleanup.

## Quality gates & verification

- `npm run build` + `npm run lint` + `npm run format` per task (the established gates; no test suite).
- Final Playwright walkthrough: reduced-motion (static backdrop, no pins, content visible), mobile fallbacks (vertical work stack, sequential process), no horizontal overflow during/after pins, scene survives route navigation, **white-hot CTA passes AA**, contact form flow unchanged, heat-wipe fail-open verified.
- Lighthouse against the budgets above.

## Out of scope / launch checklist (user actions)

- Replace the 3 DRAFT case studies with real client stories.
- Founder photo for "The smith."
- **Decide the domain**, then verify the Resend sending domain + set a branded email; update `site.ts` `url`/`email`. The rename also ripples to OG, any external references, and analytics.

## Open notes

- Mono font: **JetBrains Mono** proposed — swap if a different technical face is preferred (Geist Mono, IBM Plex Mono).
- `ember-field.tsx` keeps its filename (reframed internally) to minimize import churn; rename to `forge-field.tsx` only if we want conceptual cleanliness.
