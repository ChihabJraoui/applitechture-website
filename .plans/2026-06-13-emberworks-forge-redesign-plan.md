# Emberworks "Forged" Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand Applitechture → **Emberworks** and replace the flat "Ember" dark theme with the concept-driven **"forged" experience** — one incandescence palette, a scroll that heats from first-ember to a white-hot CTA, and forge-smithy vocabulary — reusing all existing engineering.

**Architecture:** Token-first. Rewrite the `@theme` palette to the Incandescence Ramp (single source of truth), propagate the three renamed substrate tokens across components, then reframe content/scene/motion section-by-section along the forging arc. The R3F scene + zustand temperature store + GSAP/Lenis stack are **reused, not rebuilt** — the temperature store now drives real heat color.

**Tech Stack:** Next.js 16 App Router · React 19 · TypeScript strict · Tailwind v4 (`@theme`) · shadcn/ui · three + @react-three/fiber · gsap (ScrollTrigger, SplitText) · lenis · zustand · JetBrains Mono (added via `next/font/google`).

---

## Pre-flight (human/agent setup)

- **Branch:** This work must not land directly on `main`. Create a feature branch per the user's convention `feat/{TICKET-ID}-emberworks-forge-redesign` — **confirm the TICKET-ID with the user** (do not invent one). If there is genuinely no ticket, agree a branch name with the user before starting.
- **No test suite.** Quality gates are `npm run build`, `npm run lint`, `npm run format` plus visual verification on `npm run dev`. Each task ends with build+lint green, a visual check, format, and a conventional commit.
- **Reference spec:** `.plans/2026-06-13-emberworks-forge-redesign-design.md`.
- **Token rename map (used throughout):** `coal → forge-black`, `char → iron`, `char-light → scale`. `warm-white`, `ash`, `ember`, `ember-dark` keep their names (values may change). New ramp tokens: `first-heat`, `amber`, `yellow-hot`, `near-white`, `white-hot`.

---

## Task 1: Incandescence palette tokens (`globals.css`)

**Files:**
- Modify: `src/app/globals.css` (full rewrite of the brand `@theme` block, `:root`, and the special classes)

- [ ] **Step 1: Replace the file contents**

Replace the entire file with:

```css
@import "tailwindcss";
@import "shadcn/tailwind.css";

@theme {
  /* ---- Substrate: the dark forge ---- */
  --color-forge-black: #0b0705; /* page canvas (was: coal) */
  --color-iron: #1b0f09; /* cards, elevated surfaces (was: char) */
  --color-scale: #2a160c; /* borders, dividers, forge-grid (was: char-light) */
  --color-warm-white: #faf3ee; /* headings + body text */
  --color-ash: #b3a79d; /* secondary text (AA on forge-black) */

  /* ---- Incandescence ramp: heat (type, linework, glow, scene) ---- */
  --color-first-heat: #6b1a07; /* ~550°C */
  --color-ember-dark: #9a3412; /* ~700°C deep ember + pressed states */
  --color-ember: #ea580c; /* ~850°C working heat — primary accent */
  --color-amber: #f59e0b; /* ~1000°C */
  --color-yellow-hot: #fbbf24; /* ~1150°C */
  --color-near-white: #fde047; /* ~1250°C */
  --color-white-hot: #fff7ed; /* ~1350°C */

  /* ---- Glows ---- */
  --color-ember-glow: rgba(234, 88, 12, 0.15);
  --color-amber-glow: rgba(245, 158, 11, 0.18);

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-fraunces), ui-serif, Georgia, serif;
  --font-mono:
    var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, monospace;
}

::selection {
  background: var(--color-ember);
  color: var(--color-forge-black);
}

@theme inline {
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --radius: 0.625rem;
  --background: #0b0705;
  --foreground: #faf3ee;
  --card: #1b0f09;
  --card-foreground: #faf3ee;
  --popover: #1b0f09;
  --popover-foreground: #faf3ee;
  --primary: #ea580c;
  --primary-foreground: #faf3ee;
  --secondary: #1b0f09;
  --secondary-foreground: #faf3ee;
  --muted: #2a160c;
  --muted-foreground: #b3a79d;
  --accent: #2a160c;
  --accent-foreground: #faf3ee;
  --destructive: #ef4444;
  --border: #2a160c;
  --input: #2a160c;
  --ring: #ea580c;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}

/* CTA — the white-hot inversion: bright forged core, cooling to forge-black edges */
.cta-forge {
  background: radial-gradient(
    ellipse 78% 95% at 50% 50%,
    var(--color-white-hot) 0%,
    var(--color-near-white) 20%,
    var(--color-amber) 42%,
    var(--color-ember) 62%,
    var(--color-first-heat) 82%,
    var(--color-forge-black) 100%
  );
}

/* Static fallback backdrop (reduced-motion / no-WebGL) — the cold forge */
.ember-backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse 60% 50% at 70% 12%,
      rgba(234, 88, 12, 0.12) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse 55% 45% at 18% 85%,
      rgba(245, 158, 11, 0.07) 0%,
      transparent 62%
    ),
    var(--color-forge-black);
}

/* Hide split headings until GSAP takes over — only when motion is active. */
.js-motion [data-split] {
  visibility: hidden;
}

/* Heat-sweep underline: an ember→amber band drawn in on hover/focus */
.link-sweep {
  background-image: linear-gradient(
    90deg,
    var(--color-ember),
    var(--color-amber)
  );
  background-size: 0% 1px;
  background-repeat: no-repeat;
  background-position: 0 100%;
  transition: background-size 0.3s ease;
}
.link-sweep:hover,
.link-sweep:focus-visible {
  background-size: 100% 1px;
}

@media (prefers-reduced-motion: no-preference) {
  .scroll-cue > div {
    animation: cue 1.6s ease-in-out infinite;
  }
  @keyframes cue {
    0%,
    100% {
      transform: translateY(0);
      opacity: 1;
    }
    60% {
      transform: translateY(14px);
      opacity: 0.2;
    }
  }
}
```

- [ ] **Step 2: Quality gate**

Run: `npm run build && npm run lint`
Expected: build compiles (14 routes), 0 errors; lint clean. (The site will look partly unstyled until Task 2 renames the utility classes — expected; land Tasks 1–2 together.)

- [ ] **Step 3: Format & commit**

```bash
npm run format
git add src/app/globals.css
git commit -m "feat(theme): replace ember tokens with incandescence ramp"
```

---

## Task 2: Propagate substrate token renames

**Files (modify — rename utility classes only):**
`src/app/layout.tsx` · `src/app/about/page.tsx` · `src/app/contact/contact-form.tsx` · `src/app/services/page.tsx` · `src/app/services/[slug]/page.tsx` · `src/components/button-link.tsx` · `src/components/footer.tsx` · `src/components/header-chrome.tsx` · `src/components/home/about-teaser.tsx` · `src/components/home/hero.tsx` · `src/components/home/process-pinned.tsx` · `src/components/home/process-section.tsx` · `src/components/home/services-section.tsx` · `src/components/home/work-strip.tsx` · `src/components/scene/scene-canvas.tsx`

- [ ] **Step 1: Rename the three substrate tokens across `src`**

Run (order matters — rename `char-light` before `char` so the longer token isn't partially rewritten):

```bash
cd /Users/chihabjraoui/Projects/ME/applitechture-website
grep -rl 'char-light' src | xargs sed -i '' 's/char-light/scale/g'
grep -rl -e '-coal' -e '-char' src | xargs sed -i '' -e 's/-coal/-forge-black/g' -e 's/-char/-iron/g'
```

- [ ] **Step 2: Fix the hard-coded fog hex in the scene**

In `src/components/scene/scene-canvas.tsx:79`, change the fog color from old coal to forge-black:

```tsx
<fog attach="fog" args={["#0b0705", 6, 16]} />
```

- [ ] **Step 3: Verify zero stale references**

Run: `rg -n -e '\bcoal\b' -e '\bchar\b' -e 'char-light' src`
Expected: no matches (globals.css was fully rewritten in Task 1; all utilities now use `forge-black` / `iron` / `scale`).

- [ ] **Step 4: Quality gate + visual**

Run: `npm run build && npm run lint`, then `npm run dev` and open `/`.
Expected: build/lint clean; the whole site now renders on the forge palette (near-black canvas, iron cards, ember accents). Sparks still the old look — fixed in Task 5.

- [ ] **Step 5: Format & commit**

```bash
npm run format
git add -A
git commit -m "refactor(theme): rename substrate utilities to forge tokens"
```

---

## Task 3: Add JetBrains Mono (technical-label face)

**Files:**
- Modify: `src/app/layout.tsx:11-17,34`

- [ ] **Step 1: Import and configure the font**

In `src/app/layout.tsx`, update the font import line and add the loader. Change line 2 and the loader block:

```tsx
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
```

Add after the `fraunces` loader (around line 17):

```tsx
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
});
```

- [ ] **Step 2: Wire the variable onto `<html>`**

Update the `<html>` className (line 34):

```tsx
<html
  lang="en"
  className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} dark`}
>
```

- [ ] **Step 3: Quality gate**

Run: `npm run build && npm run lint`
Expected: clean. `font-mono` utilities now resolve to JetBrains Mono (used from Task 7 onward).

- [ ] **Step 4: Format & commit**

```bash
npm run format
git add src/app/layout.tsx
git commit -m "feat(type): add jetbrains mono for forge-mark labels"
```

---

## Task 4: Core rebrand — name, tagline, wordmark, process vocabulary

**Files:**
- Modify: `src/content/site.ts`
- Modify: `src/components/wordmark.tsx`
- Modify: `src/content/process.ts`

- [ ] **Step 1: Update site identity**

Replace `src/content/site.ts` with (keep `url`/`email` as launch-checklist items — do not invent a domain):

```ts
export const site = {
  name: "Emberworks",
  url: "https://emberworks.app", // PLACEHOLDER domain — confirm/replace at launch
  email: "chihabajraoui@gmail.com", // swap for a branded address when available
  tagline: "Good software, forged with care.",
  description:
    "Emberworks is a software studio helping small businesses and startups design, build, and ship apps that pay for themselves.",
} as const;
```

- [ ] **Step 2: Update the wordmark to `emberworks.` with a glowing period**

Replace `src/components/wordmark.tsx`:

```tsx
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`text-xl font-semibold tracking-tight ${className}`}>
      emberworks
      <span
        className="text-ember"
        style={{ textShadow: "0 0 10px rgba(251,146,60,0.85)" }}
      >
        .
      </span>
    </span>
  );
}
```

- [ ] **Step 3: Reframe process steps to Heat · Hammer · Temper**

Replace `src/content/process.ts` (keeps the substance, bridges the metaphor):

```ts
import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    title: "Heat",
    description:
      "A free call about your business, not your tech stack — because you can't shape cold metal. We figure out together whether software can move your numbers, and tell you honestly if it can't.",
  },
  {
    title: "Hammer",
    description:
      "Fixed scope, agreed in writing. You see working software every week and can change course while the metal's still soft and it's cheap to do so.",
  },
  {
    title: "Temper",
    description:
      "We launch it, harden it, train your team, and stick around. You own the code, the accounts, and the roadmap.",
  },
];
```

- [ ] **Step 4: Quality gate + visual**

Run: `npm run build && npm run lint`, then check `/` on `npm run dev`.
Expected: header/footer read `emberworks.` with a glowing period; process section now reads Heat/Hammer/Temper; `<title>` shows "Emberworks — Good software, forged with care."

- [ ] **Step 5: Format & commit**

```bash
npm run format
git add src/content/site.ts src/components/wordmark.tsx src/content/process.ts
git commit -m "feat(brand): rename to emberworks, forge vocabulary"
```

---

## Task 5: Reframe the scene as incandescent forge sparks

**Files:**
- Modify: `src/components/scene/ember-field.tsx` (full rewrite)

- [ ] **Step 1: Replace the component**

The key change: drop per-particle `vertexColors`; instead lerp a single material color along the heat ramp by `temperature` (cheap, and makes color literally = heat). Brightness, size, and drift speed all climb with heat.

```tsx
"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "./use-scene-store";

const BOUNDS = { x: 14, y: 9, z: 6 };

// Deterministic PRNG (mulberry32) — keeps the buffer-building memo pure and the
// field stable for a given particle count.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Heat ramp endpoints — deep ember → amber → white-hot.
const COOL = new THREE.Color("#9a3412");
const MID = new THREE.Color("#f59e0b");
const HOT = new THREE.Color("#fff7ed");
const scratch = new THREE.Color();

export function EmberField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const camGroup = useRef<THREE.Group>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const rand = mulberry32(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * BOUNDS.x * 2;
      positions[i * 3 + 1] = (rand() - 0.5) * BOUNDS.y * 2;
      positions[i * 3 + 2] = (rand() - 0.5) * BOUNDS.z * 2;
      speeds[i] = 0.15 + rand() * 0.5;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const { temperature, pointer } = useSceneStore.getState();
    const geo = points.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position.array as Float32Array;
    const speedScale = 0.4 + temperature * 1.0;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * dt * speedScale;
      pos[i * 3] += Math.sin(pos[i * 3 + 1] * 0.5 + i) * dt * 0.06;
      if (pos[i * 3 + 1] > BOUNDS.y) pos[i * 3 + 1] = -BOUNDS.y;
    }
    geo.attributes.position.needsUpdate = true;

    // Color = temperature: red-ember → amber → white-hot, two-stage lerp.
    const t = temperature;
    if (t < 0.5) scratch.copy(COOL).lerp(MID, t * 2);
    else scratch.copy(MID).lerp(HOT, (t - 0.5) * 2);

    const mat = points.current!.material as THREE.PointsMaterial;
    mat.color.copy(scratch);
    mat.opacity = 0.2 + temperature * 0.6;
    mat.size = 0.03 + temperature * 0.05;

    if (camGroup.current) {
      camGroup.current.rotation.y +=
        (pointer.x * 0.06 - camGroup.current.rotation.y) * 0.05;
      camGroup.current.rotation.x +=
        (-pointer.y * 0.04 - camGroup.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={camGroup}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
```

- [ ] **Step 2: Quality gate + visual**

Run: `npm run build && npm run lint`, then `npm run dev`.
Expected: clean build; sparks now read as a coherent heat color that **brightens and quickens as you scroll toward the CTA** and cools near the top. No per-particle rainbow.

- [ ] **Step 3: Format & commit**

```bash
npm run format
git add src/components/scene/ember-field.tsx
git commit -m "feat(scene): reframe ember field as incandescent forge sparks"
```

---

## Task 6: Drive scene temperature along the forging arc

**Files:**
- Modify: `src/components/motion/temperature-driver.tsx` (full rewrite)

- [ ] **Step 1: Replace the component**

Replaces the crude two-zone curve with the section-by-section forging arc (hero first-heat → work working-heat → process peak → about steady → CTA white-hot flare). Inner pages hold a calm steady heat.

```tsx
"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useSceneStore } from "@/components/scene/use-scene-store";
import { useReducedMotion } from "./motion-provider";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// The forging arc over scroll progress p (0..1).
function tempForProgress(p: number): number {
  let t: number;
  if (p < 0.12)
    t = 0.4 + p * 0.8; // hero — first heat, gently rising
  else if (p < 0.3)
    t = 0.5 + (p - 0.12) * 0.9; // services — up to heat
  else if (p < 0.5)
    t = 0.66 + (p - 0.3) * 0.6; // work — working heat
  else if (p < 0.72)
    t = 0.85 + (p - 0.5) * 0.25; // process — peak
  else if (p < 0.85)
    t = 0.78; // about — steady rest beat
  else t = 0.8 + (p - 0.85) * 1.4; // CTA — white-hot flare
  return Math.max(0.2, Math.min(1, t));
}

export function TemperatureDriver() {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const set = useSceneStore.getState().setTemperature;
    if (reduced) return;

    // Inner pages: no forging arc — hold a calm steady heat.
    if (pathname !== "/") {
      set(0.5);
      return;
    }

    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => set(tempForProgress(self.progress)),
    });
    return () => st.kill();
  }, [reduced, pathname]);

  return null;
}
```

- [ ] **Step 2: Quality gate + visual**

Run: `npm run build && npm run lint`, then scroll `/` on `npm run dev`.
Expected: the scene is dim/cool at the hero, clearly brightest/hottest through Process and into the CTA, then the page transitions to inner routes at a steady mid-heat.

- [ ] **Step 3: Format & commit**

```bash
npm run format
git add src/components/motion/temperature-driver.tsx
git commit -m "feat(motion): drive scene temperature along the forging arc"
```

---

## Task 7: Hero — First Heat (heat-wipe headline forge-in)

**Files:**
- Modify: `src/components/motion/split-heading.tsx` (full rewrite — char-level heat-wipe)
- Modify: `src/components/home/hero.tsx` (full rewrite — copy, mono label, forge-grid, scale)

- [ ] **Step 1: Rewrite SplitHeading as a heat-wipe**

Splits by **chars** and ignites them dark-iron → warm-white left-to-right; the `<em>` ("forged") settles hottest then breathes. Keeps the mandatory fail-open guard.

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useReducedMotion } from "./motion-provider";

if (typeof window !== "undefined") gsap.registerPlugin(SplitText);

export function SplitHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const target = ref.current.querySelector("[data-split]");
    if (!target) return;
    let split: SplitText | undefined;
    let ctx: gsap.Context | undefined;
    try {
      split = new SplitText(target, { type: "chars", tag: "span" });
      ctx = gsap.context(() => {
        const em = ref.current!.querySelector("em");
        const tl = gsap.timeline();
        // Heat-wipe: letters ignite from cold iron to warm-white, left → right.
        tl.from(split!.chars, {
          color: "#3a241a",
          yPercent: 40,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: { each: 0.025, from: "start" },
        });
        if (em) {
          tl.fromTo(
            em,
            { textShadow: "0 0 0px rgba(245,158,11,0)" },
            {
              textShadow:
                "0 0 28px rgba(245,158,11,0.7), 0 0 6px rgba(255,247,237,0.5)",
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.25",
          ).to(em, {
            textShadow: "0 0 14px rgba(234,88,12,0.4)",
            duration: 1.4,
            ease: "sine.inOut",
          });
        }
      }, ref);
    } catch {
      gsap.set(target, { autoAlpha: 1, visibility: "visible" });
      return;
    }
    return () => {
      ctx?.revert();
      split?.revert();
    };
  }, [reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Rewrite the hero**

```tsx
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Faint ember forge-grid — the surviving blueprint, in heat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 47px, rgba(234,88,12,0.05) 47px 48px), repeating-linear-gradient(90deg, transparent 0 47px, rgba(234,88,12,0.05) 47px 48px)",
          maskImage:
            "radial-gradient(120% 90% at 18% 38%, #000 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 18% 38%, #000 0%, transparent 72%)",
        }}
      />
      <Container className="relative">
        <p className="text-ember font-mono mb-6 text-xs tracking-[0.2em] uppercase">
          01 · First heat — ≈550°C
        </p>
        <SplitHeading>
          <h1
            data-split
            className="font-display max-w-4xl text-6xl leading-[1.04] tracking-tight sm:text-7xl lg:text-8xl"
          >
            Good software,{" "}
            <em className="text-ember not-italic">forged</em> with care.
          </h1>
        </SplitHeading>
        <Reveal delay={0.5}>
          <p className="text-ash mt-8 max-w-xl text-lg">{site.description}</p>
        </Reveal>
        <Reveal delay={0.65}>
          <div className="mt-10 flex items-center gap-6">
            <Magnetic>
              <ButtonLink href="/contact">Start a project</ButtonLink>
            </Magnetic>
            <ButtonLink href="/services" variant="ghost">
              See what we forge →
            </ButtonLink>
          </div>
        </Reveal>
        <div aria-hidden className="mt-20 flex justify-center">
          <div className="scroll-cue border-scale h-10 w-6 rounded-full border">
            <div className="bg-ember mx-auto mt-2 h-2 w-1 rounded-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Quality gate + visual + reduced-motion check**

Run: `npm run build && npm run lint`, then `npm run dev`.
Expected: hero headline is viewport-scale and **ignites letter-by-letter** on load with "forged" glowing; a mono "01 · First heat" label sits above it; faint grid fades in from the left. Then emulate reduced motion (DevTools → Rendering → prefers-reduced-motion: reduce) and reload: headline is **immediately fully visible** (fail-open / `[data-split]` not hidden).

- [ ] **Step 4: Format & commit**

```bash
npm run format
git add src/components/motion/split-heading.tsx src/components/home/hero.tsx
git commit -m "feat(hero): first-heat headline forge-in"
```

---

## Task 8: Services — "What we forge" with hover-to-heat modules

**Files:**
- Modify: `src/components/home/services-section.tsx` (full rewrite)

- [ ] **Step 1: Replace the component**

Reframes the heading, adds mono spec-tags (`SVC.01`…), and upgrades hover to an amber heat-bloom.

```tsx
import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <section className="bg-iron/30 py-20">
      <Container>
        <SectionHeading eyebrow="Services" title="What we forge">
          Whether you need an app built, a product designed, work automated, or
          just a straight answer about what to build.
        </SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08} className="h-full">
              <Link
                href={`/services/${s.slug}`}
                className="group border-scale bg-iron hover:border-ember relative h-full rounded-2xl border p-7 transition-[color,transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(245,158,11,0.18)]"
              >
                <span className="text-ash/70 font-mono absolute top-5 right-6 text-xs tracking-widest">
                  SVC.0{i + 1}
                </span>
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="text-ash mt-2 text-sm">{s.summary}</p>
                <p className="text-ember mt-4 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  Forge it →
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Quality gate + visual**

Run: `npm run build && npm run lint`, then check `/`.
Expected: heading reads "What we forge"; each card shows a `SVC.0n` mono tag; hovering blooms an amber glow + lift; "Forge it →" appears.

- [ ] **Step 3: Format & commit**

```bash
npm run format
git add src/components/home/services-section.tsx
git commit -m "feat(services): forge-grid modules with hover heat"
```

---

## Task 9: Work — "From the anvil" with igniting outcome stats

**Files:**
- Modify: `src/components/home/work-section.tsx` (heading)
- Modify: `src/components/home/work-strip.tsx` (active-card glow + stat ignite)

- [ ] **Step 1: Reframe the section heading**

Replace `src/components/home/work-section.tsx`:

```tsx
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { WorkStrip } from "@/components/home/work-strip";

export function WorkSection() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="From the anvil"
        >
          Client names are confidential — the problems and the numbers are real.
          (These three are anonymized DRAFT placeholders pending real stories.)
        </SectionHeading>
        <WorkStrip />
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Give the active (centered) card peak glow and ignite its stat**

In `src/components/home/work-strip.tsx`, replace the `OutcomeStat` and `Card` components (lines 21-76) with:

```tsx
function OutcomeStat({ outcome, active }: { outcome: string; active: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (!active || done.current || !ref.current) return;
    done.current = true;
    const m = outcome.match(/(\d+)/);
    if (!m) return;
    const target = Number(m[1]);
    const obj = { n: 0 };
    gsap.to(obj, {
      n: target,
      duration: 1.2,
      ease: "power1.out",
      onUpdate: () => {
        if (ref.current)
          ref.current.textContent = outcome.replace(
            String(target),
            String(Math.round(obj.n)),
          );
      },
    });
  }, [active, outcome]);

  return (
    <p
      ref={ref}
      className={`font-display mt-auto pt-5 text-lg transition-colors duration-500 ${
        active ? "text-amber" : "text-ember/70"
      }`}
      style={active ? { textShadow: "0 0 22px rgba(245,158,11,0.55)" } : undefined}
    >
      {outcome}
    </p>
  );
}

function Card({
  c,
  active,
}: {
  c: (typeof caseStudies)[number];
  active: boolean;
}) {
  return (
    <article
      className={`border-scale bg-iron/60 flex w-[85vw] max-w-md shrink-0 flex-col rounded-2xl border p-7 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 lg:w-[32rem] ${
        active
          ? "border-ember/60 shadow-[0_0_60px_rgba(234,88,12,0.22)]"
          : ""
      }`}
    >
      <p className="text-ash text-sm font-medium tracking-widest uppercase">
        {c.client}
      </p>
      <p className="text-ash mt-4 text-sm">{c.problem}</p>
      <p className="mt-3 text-sm">{c.solution}</p>
      <OutcomeStat outcome={c.outcome} active={active} />
    </article>
  );
}
```

- [ ] **Step 3: Quality gate + visual (desktop + touch fallback)**

Run: `npm run build && npm run lint`, then `/` on desktop and a mobile viewport.
Expected: heading "From the anvil"; on desktop the pinned horizontal strip lights the centered piece (ember ring + glow) and its stat ignites amber as it centers; on touch/reduced it falls back to the vertical stack (all cards `active`).

- [ ] **Step 4: Format & commit**

```bash
npm run format
git add src/components/home/work-section.tsx src/components/home/work-strip.tsx
git commit -m "feat(work): forged pieces pulled from the fire"
```

---

## Task 10: Process — "Heat · Hammer · Temper" igniting hotter

**Files:**
- Modify: `src/components/home/process-section.tsx` (heading)
- Modify: `src/components/home/process-pinned.tsx` (per-step heat ramp + heat-line)

- [ ] **Step 1: Reframe the section heading**

Replace `src/components/home/process-section.tsx`:

```tsx
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ProcessPinned } from "@/components/home/process-pinned";

export function ProcessSection() {
  return (
    <section className="bg-iron/30 py-20">
      <Container>
        <SectionHeading eyebrow="How we work" title="Heat · Hammer · Temper" />
        <ProcessPinned />
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Make each lit step burn hotter than the last**

In `src/components/home/process-pinned.tsx`, replace the connector `<div>` and the `<ol>` block (lines 67-96) with a per-index heat ramp (deep-ember → ember → amber) and a gradient heat-line:

```tsx
      <div
        aria-hidden
        className="bg-scale relative mb-8 hidden h-px sm:block"
      >
        <div
          className="absolute inset-y-0 left-0 transition-[width]"
          style={{
            width: `${effectiveProgress * 100}%`,
            background: "linear-gradient(90deg, #9a3412, #ea580c, #f59e0b)",
            boxShadow: "0 0 12px rgba(245,158,11,0.5)",
          }}
        />
      </div>
      <ol className="grid gap-5 sm:grid-cols-3">
        {processSteps.map((step, i) => {
          const lit = i < litCount;
          // Each step burns hotter than the one before it.
          const heat = ["text-ember-dark", "text-ember", "text-amber"][i] ?? "text-amber";
          return (
            <li
              key={step.title}
              className={`bg-iron rounded-2xl p-7 transition-all duration-500 ${
                lit ? "opacity-100" : "opacity-35"
              }`}
              style={
                lit
                  ? { boxShadow: `0 0 ${20 + i * 16}px rgba(234,88,12,${0.12 + i * 0.06})` }
                  : undefined
              }
            >
              <p
                aria-hidden="true"
                className={`font-display text-3xl ${lit ? heat : "text-ash"}`}
              >
                {i + 1}
              </p>
              <h3 className="font-display mt-3 text-xl">{step.title}</h3>
              <p className="text-ash mt-2 text-sm">{step.description}</p>
            </li>
          );
        })}
      </ol>
```

- [ ] **Step 3: Quality gate + visual**

Run: `npm run build && npm run lint`, then scroll `/`.
Expected: heading "Heat · Hammer · Temper"; the pinned sequence lights steps in turn, each glowing hotter (deep-ember → ember → amber) along a glowing gradient heat-line; touch/reduced falls back to all-lit stacked steps.

- [ ] **Step 4: Format & commit**

```bash
npm run format
git add src/components/home/process-section.tsx src/components/home/process-pinned.tsx
git commit -m "feat(process): heat-hammer-temper sequence burns hotter"
```

---

## Task 11: About — "The smith" with a glowing maker's stamp

**Files:**
- Modify: `src/components/home/about-teaser.tsx` (full rewrite)

- [ ] **Step 1: Replace the component**

```tsx
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/motion/reveal";

export function AboutTeaser() {
  return (
    <section className="py-20">
      <Container className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        <Reveal>
          <div
            aria-hidden
            className="bg-iron border-ember/40 font-display text-ember flex h-28 w-28 shrink-0 items-center justify-center rounded-full border text-3xl"
            style={{ boxShadow: "0 0 40px rgba(234,88,12,0.25)" }}
          >
            CJ
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-ember font-mono mb-3 text-xs font-medium tracking-[0.2em] uppercase">
            The smith
          </p>
          <p className="font-display max-w-2xl text-2xl leading-snug">
            Emberworks is run by Chihab Jraoui — an engineer who&apos;d rather
            show you working software than a slide deck.
          </p>
          <div className="mt-5">
            <ButtonLink href="/about" variant="ghost">
              More about the studio →
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Quality gate + visual**

Run: `npm run build && npm run lint`, then check `/`.
Expected: the monogram reads as a glowing forge-mark (ember ring + halo); eyebrow is a mono "The smith"; copy references Emberworks.

- [ ] **Step 3: Format & commit**

```bash
npm run format
git add src/components/home/about-teaser.tsx
git commit -m "feat(about): the smith maker's-stamp teaser"
```

---

## Task 12: CTA — the white-hot inversion + spark-strike

**Files:**
- Create: `src/components/motion/spark-strike.tsx`
- Modify: `src/components/cta-band.tsx` (full rewrite)

- [ ] **Step 1: Create the spark-strike wrapper**

A self-contained, reduced-motion-aware burst: pointer-down on the wrapped element throws a few GSAP-animated sparks that clean themselves up.

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./motion-provider";

export function SparkStrike({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const strike = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const host = ref.current;
    const rect = host.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("span");
      s.style.cssText =
        "position:absolute;width:3px;height:3px;border-radius:50%;background:#fde047;box-shadow:0 0 8px #fb923c;pointer-events:none;";
      s.style.left = `${x}px`;
      s.style.top = `${y}px`;
      host.appendChild(s);
      const ang = (Math.PI * 2 * i) / 12 + Math.random();
      const dist = 26 + Math.random() * 36;
      gsap.to(s, {
        x: Math.cos(ang) * dist,
        y: Math.sin(ang) * dist - 10,
        opacity: 0,
        duration: 0.5 + Math.random() * 0.3,
        ease: "power2.out",
        onComplete: () => s.remove(),
      });
    }
  };

  return (
    <span ref={ref} onPointerDown={strike} className="relative inline-block">
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Rewrite the CTA band as the white-hot inversion**

```tsx
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { SparkStrike } from "@/components/motion/spark-strike";

export function CtaBand() {
  return (
    <section className="cta-forge py-28">
      <Container className="text-center">
        <Reveal>
          <h2 className="font-display text-forge-black text-3xl sm:text-5xl">
            Have an idea? <em className="not-italic">Let&apos;s forge it.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-forge-black/75 mx-auto mt-4 max-w-md">
            A free, no-obligation call about your project. Worst case, you leave
            with better questions.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8">
            <Magnetic>
              <SparkStrike>
                <ButtonLink href="/contact" variant="onHot">
                  Start a project
                </ButtonLink>
              </SparkStrike>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Add the `onHot` button variant (dark on white-hot)**

In `src/components/button-link.tsx`, add an `onHot` entry to the `styles` map (the primary CTA button needs dark-on-hot contrast inside the inverted section):

```tsx
const styles = {
  primary:
    "rounded-full bg-ember px-6 py-3 text-warm-white hover:bg-ember/90 active:bg-ember-dark",
  secondary:
    "rounded-full border border-scale bg-iron px-6 py-3 text-warm-white transition-colors hover:border-ember",
  ghost: "py-3 text-ember link-sweep",
  onHot:
    "rounded-full bg-forge-black px-6 py-3 text-white-hot hover:bg-iron active:bg-ember-dark",
} as const;
```

- [ ] **Step 4: Quality gate + visual + contrast check**

Run: `npm run build && npm run lint`, then `/`.
Expected: the CTA section **inverts to a white-hot bloom** with dark forged text; the "Start a project" button is dark-on-hot; clicking it throws a spark shower. Use DevTools to confirm the dark heading text on the bright core passes **AA (≥4.5:1)**; emulate reduced motion and confirm no sparks fire and content is intact.

- [ ] **Step 5: Format & commit**

```bash
npm run format
git add src/components/motion/spark-strike.tsx src/components/cta-band.tsx src/components/button-link.tsx
git commit -m "feat(cta): white-hot inversion with spark-strike"
```

---

## Task 13: Satori images — icon + OG in the forge palette

**Files:**
- Modify: `src/app/icon.tsx` (full rewrite)
- Modify: `src/app/opengraph-image.tsx` (full rewrite)

- [ ] **Step 1: Rewrite the favicon**

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          // Hex values mirror the brand tokens in globals.css — Satori can't resolve CSS variables.
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0705",
          color: "#faf3ee",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        e<span style={{ color: "#ea580c" }}>.</span>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 2: Rewrite the OG image**

```tsx
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          // Hex values mirror the brand tokens in globals.css — Satori can't resolve CSS variables.
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0b0705",
          color: "#faf3ee",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 600, display: "flex" }}>
          emberworks<span style={{ color: "#ea580c" }}>.</span>
        </div>
        <div style={{ fontSize: 72, marginTop: 32, fontWeight: 500 }}>
          {site.tagline}
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 24,
            color: "#b3a79d",
            maxWidth: 800,
          }}
        >
          {site.description}
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 3: Quality gate + visual**

Run: `npm run build && npm run lint`, then visit `/icon` and `/opengraph-image` on `npm run dev`.
Expected: favicon is `e.` on forge-black with ember period; OG shows `emberworks.` + "Good software, forged with care." in the forge palette.

- [ ] **Step 4: Format & commit**

```bash
npm run format
git add src/app/icon.tsx src/app/opengraph-image.tsx
git commit -m "feat(seo): forge-palette icon and og image"
```

---

## Task 14: Micro-interaction polish (inner pages)

**Files:**
- Modify: `src/app/services/page.tsx` (services index card hover heat — token already renamed in Task 2; upgrade glow)

- [ ] **Step 1: Upgrade the services-index card hover to amber heat**

In `src/app/services/page.tsx:33`, the card class currently ends with `hover:border-ember transition-colors`. Add a heat-bloom shadow and lift to match the home cards:

```tsx
className="group border-scale hover:border-ember h-full rounded-2xl border p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(245,158,11,0.18)]"
```

- [ ] **Step 2: Quality gate + visual sweep of every route**

Run: `npm run build && npm run lint`, then walk `/`, `/services`, `/services/custom-apps`, `/about`, `/contact` on `npm run dev`.
Expected: consistent forge palette across all routes; links underline-sweep ember→amber (the `.link-sweep` from Task 1); form fields keep their ember focus-glow (already present); services-index cards bloom on hover.

- [ ] **Step 3: Format & commit**

```bash
npm run format
git add src/app/services/page.tsx
git commit -m "feat(ui): consistent hover heat on services index"
```

---

## Task 15: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Clean build + lint + format**

Run: `npm run build && npm run lint && npm run format`
Expected: 14 routes compile, 0 errors; lint clean; no formatting changes (everything already formatted).

- [ ] **Step 2: Stale-brand grep**

Run: `rg -in -e 'applitechture' -e '\bcoal\b' -e '\bchar\b' -e 'char-light' -e 'built with care' src`
Expected: **no matches** (every reference rebranded; only `.plans/` docs may mention the old name).

- [ ] **Step 3: Reduced-motion walkthrough**

In Chrome DevTools → Rendering → emulate `prefers-reduced-motion: reduce`, reload `/`:
Expected: static `.ember-backdrop` forge gradient (no WebGL spin-up), hero headline fully visible (no wipe), no pinning on Work/Process (stacked), content fully present.

- [ ] **Step 4: Mobile + overflow walkthrough**

At a 390px viewport: Work strip is a vertical stack (no horizontal pin), Process is sequential, and there is **no horizontal scrollbar** anywhere. Scroll the full page and confirm no overflow during/after the pinned sections on desktop too.

- [ ] **Step 5: Scene survives navigation + CTA contrast**

Navigate `/` → `/services` → `/` and confirm the canvas persists (no remount flash) and inner pages hold a steady mid-heat. On the CTA, confirm dark heading text on the white-hot core passes **AA** (DevTools contrast inspector, ≥4.5:1).

- [ ] **Step 6: Lighthouse (mobile)**

Run a mobile Lighthouse on a production build (`npm run build && npm start`, then Lighthouse on `/`):
Expected: **performance ≥ 80, accessibility ≥ 95, SEO 100**. Record the numbers; if accessibility < 95, the likeliest culprit is CTA/stat contrast — re-check the `onHot` and amber-on-iron pairings.

- [ ] **Step 7: Final commit (if any verification fixes were needed)**

```bash
npm run format
git add -A
git commit -m "fix(theme): verification adjustments for forge redesign"
```

---

## Notes for the executor

- **Reuse, don't rebuild:** the scene canvas, error-boundary fallback chain, `use-scene-store`, Lenis/ScrollTrigger wiring, and pin/reduced-motion guards are correct — only their *values and meaning* change. Never call `ScrollTrigger.killAll()`; every animating component already scopes triggers in `gsap.context()`.
- **Fail-open is mandatory:** the SplitHeading `try/catch` that reveals the headline must survive every edit (Task 7).
- **DRAFT case studies stay flagged** until the user supplies real stories (noted in the Work heading).
- **Launch checklist (out of scope, user actions):** confirm domain + set `site.url`, verify Resend sending domain + branded `site.email`, add a founder photo to `/about`, replace the three DRAFT case studies.
