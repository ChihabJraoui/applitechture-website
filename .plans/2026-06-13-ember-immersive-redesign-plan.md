# Ember Immersive Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-theme the site to the dark "Ember" identity and add the immersive motion layer (persistent R3F ember scene + GSAP/Lenis scroll choreography) per `.plans/2026-06-13-ember-immersive-redesign-design.md`.

**Architecture:** Theme is a token swap in `globals.css` plus mechanical class updates. Motion is two new layers: `src/components/scene/` (fixed R3F canvas, zustand-bridged) and `src/components/motion/` (Lenis + GSAP provider and primitives). Content/copy/routes/contact flow untouched. Sections needing choreography become thin client components that still import from `src/content/`.

**Tech Stack:** Existing Next 16/React 19/Tailwind v4 + new: three, @react-three/fiber (v9), @react-three/drei, gsap (3.13+), lenis, zustand.

**Gates per task:** `npm run format && npm run build && npm run lint`. No unit tests in this project. Commit messages use Conventional Commits + trailer `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

**Ember tokens:** coal `#0c0a09`, char `#1c1917`, char-light `#292524`, warm-white `#fafaf9`, ash `#a8a29e`, ember `#ea580c`, ember-glow `rgba(234,88,12,0.15)`, terracotta-dark `#9a3412` (active/pressed only).

---

### Task 1: Ember theme swap (tokens + every component)

No new deps. Pure restyle; site must look fully dark and coherent at the end of this task, with zero motion yet.

**Files:**
- Modify: `src/app/globals.css`, `src/components/button-link.tsx`, and class-level edits to: `src/components/{header,footer,wordmark,container,section-heading,cta-band}.tsx`, `src/components/home/*.tsx`, `src/app/page.tsx` (no changes expected), `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/{page,contact-form}.tsx`, `src/app/not-found.tsx`, `src/app/icon.tsx`, `src/app/opengraph-image.tsx`, `src/app/layout.tsx` (body classes)

- [ ] **Step 1: Replace the brand `@theme` block and shadcn `:root` values in `src/app/globals.css`**

New brand block (replaces cream/sand/sand-dark/ink/stone; keeps the two font vars unchanged):

```css
@theme {
  --color-coal: #0c0a09;
  --color-char: #1c1917;
  --color-char-light: #292524;
  --color-warm-white: #fafaf9;
  --color-ash: #a8a29e;
  --color-ember: #ea580c;
  --color-ember-glow: rgba(234, 88, 12, 0.15);
  --color-terracotta-dark: #9a3412;

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-fraunces), ui-serif, Georgia, serif;
}

::selection {
  background: var(--color-ember);
  color: var(--color-coal);
}
```

Re-derive the shadcn `:root` tokens for dark surfaces (replace the light values; keep the same variable names the ui primitives consume):

```css
:root {
  --radius: 0.625rem;
  --background: #0c0a09;
  --foreground: #fafaf9;
  --card: #1c1917;
  --card-foreground: #fafaf9;
  --popover: #1c1917;
  --popover-foreground: #fafaf9;
  --primary: #ea580c;
  --primary-foreground: #fafaf9;
  --secondary: #1c1917;
  --secondary-foreground: #fafaf9;
  --muted: #292524;
  --muted-foreground: #a8a29e;
  --accent: #292524;
  --accent-foreground: #fafaf9;
  --destructive: #ef4444;
  --border: #292524;
  --input: #292524;
  --ring: #ea580c;
}
```

Add the CTA band radial helper at the end of the file:

```css
.cta-ember {
  background:
    radial-gradient(ellipse 70% 80% at 50% 100%, rgba(234, 88, 12, 0.18) 0%, transparent 65%),
    #0c0a09;
}
```

- [ ] **Step 2: Replace `src/components/button-link.tsx`**

```tsx
import Link from "next/link";

const styles = {
  primary: "rounded-full bg-ember px-6 py-3 text-warm-white hover:bg-ember/90 active:bg-terracotta-dark",
  secondary:
    "rounded-full border border-char-light bg-char px-6 py-3 text-warm-white transition-colors hover:border-ember",
  ghost: "py-3 text-ember hover:underline",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof styles;
}) {
  return (
    <Link href={href} className={`inline-block text-sm font-medium transition-colors ${styles[variant]}`}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 3: Apply the class mapping to every remaining file**

Global mechanical renames (apply everywhere they appear, then do the per-file specifics below):
- `text-ink` → `text-warm-white` · `text-stone` → `text-ash` · `text-cream` → `text-warm-white` · `text-cream/70` → `text-ash`
- `text-terracotta-dark` (eyebrows) → `text-ember` · `text-terracotta` → `text-ember`
- `border-sand-dark` → `border-char-light` · `hover:border-terracotta` → `hover:border-ember`
- `bg-cream` (page/card surfaces) → see per-file · `bg-sand` → see per-file · `bg-ink` → see per-file

Per-file specifics:
- `src/app/layout.tsx` — body: `bg-coal text-warm-white flex min-h-screen flex-col font-sans antialiased`.
- `src/components/header.tsx` — header: `border-b border-char-light bg-coal`; nav links `text-ash hover:text-warm-white`; CTA pill: `rounded-full bg-ember px-4 py-2 text-sm whitespace-nowrap text-warm-white transition-colors hover:bg-ember/90 active:bg-terracotta-dark`.
- `src/components/footer.tsx` — footer: `border-t border-char-light bg-coal`; tagline/© `text-ash`; nav links `text-ash hover:text-warm-white`; mailto `text-ember`.
- `src/components/wordmark.tsx` — period span → `text-ember`. No other change.
- `src/components/section-heading.tsx` — eyebrow `text-ember`; children paragraph `text-ash`.
- `src/components/cta-band.tsx` — section: `cta-ember py-20 text-warm-white` (drop `bg-ink`); paragraph `text-ash`; `<em>` stays `text-ember`.
- `src/components/home/hero.tsx` — `<em>` `text-ember`; description `text-ash`.
- `src/components/home/services-section.tsx` — section `bg-char/30 py-20`; cards `group rounded-2xl border border-char-light bg-char p-7 transition-colors hover:border-ember` (keep `group-hover/group-focus-visible` reveal, "Learn more →" `text-ember`); summary `text-ash`.
- `src/components/home/work-section.tsx` — cards `border-char-light`; client `text-ash`; problem `text-ash`; outcome `text-ember`.
- `src/components/home/process-section.tsx` — section `bg-char/30 py-20`; cards `bg-char`; numeral `text-ember`; description `text-ash`.
- `src/components/home/about-teaser.tsx` — CJ circle `bg-char text-ember`; eyebrow `text-ember`.
- `src/app/services/page.tsx` — `<em>` `text-ember`; intro + summaries/problems `text-ash`; cards `border-char-light hover:border-ember`; "Learn more →" `text-ember`.
- `src/app/services/[slug]/page.tsx` — eyebrow h2s `text-ember`; problem `text-ash`; deliverable dashes `text-ember`; aside `bg-char` with `text-ash` client line, outcome `text-ember`.
- `src/app/about/page.tsx` — `<em>` `text-ember`; "What we believe" h2 `text-ember`; value cards `bg-char`, texts `text-ash`.
- `src/app/contact/page.tsx` — `<em>` `text-ember`; paragraphs `text-ash`; mailto `text-ember`.
- `src/app/contact/contact-form.tsx` — success panel `bg-char`, paragraph `text-ash`; error `text-ember`; submit Button `rounded-full bg-ember px-8 hover:bg-ember/90 active:bg-terracotta-dark`.
- `src/app/not-found.tsx` — `<em>` `text-ember`; paragraph `text-ash`.
- `src/app/icon.tsx` — background `#0c0a09`, color `#fafaf9`, period span `#ea580c` (keep the Satori mirror comment).
- `src/app/opengraph-image.tsx` — background `#0c0a09`, color `#fafaf9`, wordmark period `#ea580c`, description `#a8a29e` (keep comment).

After the edits: `grep -rn "cream\|sand\|text-ink\|bg-ink\|text-stone\|text-terracotta\b" src/` must return ZERO hits (only `terracotta-dark` in active: states and globals.css may remain).

- [ ] **Step 4: Gates + visual sanity**

Run: `npm run format && npm run build && npm run lint` — all pass. `npm run dev` spot-check: every page dark, no light flashes, contrast readable.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(theme): swap to dark ember theme across all pages"
```

---

### Task 2: Motion foundation (deps + MotionProvider + Lenis)

**Files:**
- Create: `src/components/motion/motion-provider.tsx`
- Modify: `src/app/layout.tsx`, `package.json`

- [ ] **Step 1: Install deps**

```bash
npm install three @react-three/fiber @react-three/drei gsap lenis zustand
npm install -D @types/three
```

- [ ] **Step 2: Create `src/components/motion/motion-provider.tsx`**

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const ReducedMotionContext = createContext(false);
export const useReducedMotion = () => useContext(ReducedMotionContext);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) {
      document.documentElement.classList.remove("js-motion");
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    // Signals CSS that motion-enhanced initial states may apply (content is
    // never hidden without this class — no-JS and reduced-motion safe).
    document.documentElement.classList.add("js-motion");

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.killAll();
      document.documentElement.classList.remove("js-motion");
    };
  }, [reduced]);

  return <ReducedMotionContext.Provider value={reduced}>{children}</ReducedMotionContext.Provider>;
}
```

- [ ] **Step 3: Wrap the layout**

In `src/app/layout.tsx`, import `MotionProvider` and wrap the body contents (JSON-LD script stays outside or inside — keep it first):

```tsx
<body className="bg-coal text-warm-white flex min-h-screen flex-col font-sans antialiased">
  <script type="application/ld+json" ... />
  <MotionProvider>
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </MotionProvider>
</body>
```

(The layout stays a server component — MotionProvider is the client boundary.)

- [ ] **Step 4: Gates + commit**

`npm run format && npm run build && npm run lint`, verify pages still render and scrolling feels smooth in dev (Lenis active).

```bash
git add -A
git commit -m "feat(motion): add gsap/lenis motion provider foundation"
```

---

### Task 3: Persistent ember scene (R3F)

**Files:**
- Create: `src/components/scene/use-scene-store.ts`, `src/components/scene/ember-field.tsx`, `src/components/scene/scene-canvas.tsx`, `src/components/scene/scene-root.tsx`
- Modify: `src/app/layout.tsx`, `src/app/globals.css`

- [ ] **Step 1: Create `src/components/scene/use-scene-store.ts`**

```ts
import { create } from "zustand";

type SceneState = {
  /** 0..1 — scene intensity driven by scroll position (hero hot, content calm, CTA flare) */
  temperature: number;
  /** -1..1 normalized pointer, written by SceneCanvas, read per-frame */
  pointer: { x: number; y: number };
  setTemperature: (t: number) => void;
  setPointer: (x: number, y: number) => void;
};

export const useSceneStore = create<SceneState>((set) => ({
  temperature: 1,
  pointer: { x: 0, y: 0 },
  setTemperature: (temperature) => set({ temperature }),
  setPointer: (x, y) => set({ pointer: { x, y } }),
}));
```

- [ ] **Step 2: Create `src/components/scene/ember-field.tsx`**

```tsx
"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "./use-scene-store";

const BOUNDS = { x: 14, y: 9, z: 6 };

export function EmberField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const camGroup = useRef<THREE.Group>(null);

  const { positions, speeds, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const ember = new THREE.Color("#ea580c");
    const amber = new THREE.Color("#f59e0b");
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS.x * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS.y * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS.z * 2;
      speeds[i] = 0.15 + Math.random() * 0.5;
      const c = ember.clone().lerp(amber, Math.random() * 0.6);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, speeds, colors };
  }, [count]);

  useFrame((_, delta) => {
    const { temperature, pointer } = useSceneStore.getState();
    const geo = points.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position.array as Float32Array;
    const speedScale = 0.4 + temperature * 0.9;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * delta * speedScale;
      pos[i * 3] += Math.sin(pos[i * 3 + 1] * 0.5 + i) * delta * 0.06;
      if (pos[i * 3 + 1] > BOUNDS.y) pos[i * 3 + 1] = -BOUNDS.y;
    }
    geo.attributes.position.needsUpdate = true;

    const mat = points.current!.material as THREE.PointsMaterial;
    mat.opacity = 0.25 + temperature * 0.55;
    mat.size = 0.035 + temperature * 0.03;

    if (camGroup.current) {
      camGroup.current.rotation.y += (pointer.x * 0.06 - camGroup.current.rotation.y) * 0.05;
      camGroup.current.rotation.x += (-pointer.y * 0.04 - camGroup.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={camGroup}>
      <fog attach="fog" args={["#0c0a09", 6, 16]} />
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
    </group>
  );
}
```

(Note: `<fog>` attaches to the scene, not the group — if R3F complains about `attach="fog"` inside a group, move `<fog attach="fog" args={["#0c0a09", 6, 16]} />` to be a direct child of `<Canvas>` in scene-canvas.tsx. Verify visually.)

- [ ] **Step 3: Create `src/components/scene/scene-canvas.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EmberField } from "./ember-field";
import { useSceneStore } from "./use-scene-store";

export default function SceneCanvas() {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setCount(coarse ? 600 : 2400);

    if (!coarse) {
      const onMove = (e: PointerEvent) => {
        useSceneStore
          .getState()
          .setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      const onVis = () => setFrameloop(document.hidden ? "never" : "always");
      document.addEventListener("visibilitychange", onVis);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("visibilitychange", onVis);
      };
    }
    const onVis = () => setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (count === 0) return null;

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: false, powerPreference: "low-power" }}
      aria-hidden
      className="pointer-events-none"
    >
      <EmberField count={count} />
    </Canvas>
  );
}
```

- [ ] **Step 4: Create `src/components/scene/scene-root.tsx`** (client boundary: lazy load, WebGL/reduced-motion fallback, error boundary)

```tsx
"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/motion-provider";

const SceneCanvas = dynamic(() => import("./scene-canvas"), { ssr: false });

class SceneErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function StaticBackdrop() {
  return <div className="ember-backdrop" aria-hidden />;
}

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function SceneRoot() {
  const reduced = useReducedMotion();
  const wantsScene = !reduced && typeof window !== "undefined" && webglAvailable();

  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      {wantsScene ? (
        <SceneErrorBoundary fallback={<StaticBackdrop />}>
          <SceneCanvas />
        </SceneErrorBoundary>
      ) : (
        <StaticBackdrop />
      )}
    </div>
  );
}
```

- [ ] **Step 5: Add the static backdrop CSS to `globals.css`**

```css
.ember-backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 70% 15%, rgba(234, 88, 12, 0.1) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 20% 80%, rgba(234, 88, 12, 0.06) 0%, transparent 60%),
    #0c0a09;
}
```

- [ ] **Step 6: Mount in layout** — inside `MotionProvider`, before `<Header />`: `<SceneRoot />`. Sections that had solid `bg-coal` (header/footer) keep it; the body keeps `bg-coal` (canvas paints over it, behind content).

- [ ] **Step 7: Gates + visual check + commit**

Build/lint/format pass. Dev check: particles drift on `/`, persist across navigation, pointer parallax on desktop, content fully readable above them. Toggle "Emulate prefers-reduced-motion" in devtools → static gradient, no canvas.

```bash
git add -A
git commit -m "feat(scene): add persistent ember particle scene with fallbacks"
```

---

### Task 4: Motion primitives + hero & header choreography

**Files:**
- Create: `src/components/motion/reveal.tsx`, `src/components/motion/split-heading.tsx`, `src/components/motion/magnetic.tsx`, `src/components/header-chrome.tsx`
- Modify: `src/components/header.tsx`, `src/components/home/hero.tsx`, `src/app/globals.css`

- [ ] **Step 1: Create `src/components/motion/reveal.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./motion-provider";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 36,
        autoAlpha: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, [reduced, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/motion/split-heading.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useReducedMotion } from "./motion-provider";

export function SplitHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    gsap.registerPlugin(SplitText);
    const split = new SplitText(ref.current.querySelector("[data-split]"), { type: "words" });
    const em = ref.current.querySelector("em");
    const tl = gsap.timeline();
    tl.from(split.words, { yPercent: 60, autoAlpha: 0, stagger: 0.06, duration: 0.8, ease: "power3.out" });
    if (em) {
      tl.fromTo(
        em,
        { textShadow: "0 0 0px rgba(234,88,12,0)" },
        { textShadow: "0 0 24px rgba(234,88,12,0.55)", duration: 0.6, ease: "power2.out" },
        "-=0.2",
      ).to(em, { textShadow: "0 0 12px rgba(234,88,12,0.3)", duration: 1.2 });
    }
    return () => {
      tl.kill();
      split.revert();
    };
  }, [reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/motion/magnetic.tsx`**

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./motion-provider";

export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.25,
      y: (e.clientY - r.top - r.height / 2) * 0.25,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="inline-block">
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Create `src/components/header-chrome.tsx`** (glass-on-scroll wrapper) and update `header.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";

export function HeaderChrome({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-char-light bg-coal/75 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      {children}
    </header>
  );
}
```

`header.tsx` (stays server, nav data unchanged): replace its `<header className="border-b border-char-light bg-coal">` wrapper with `<HeaderChrome>` around the existing `<Container>...</Container>`, and wrap the "Start a project" pill in `<Magnetic>`.

- [ ] **Step 5: Hero choreography** — in `src/components/home/hero.tsx`: wrap the `<h1>` in `<SplitHeading>` with `data-split` on the h1; wrap the description + buttons row each in `<Reveal delay={0.5}>` / `<Reveal delay={0.65}>`; wrap the primary ButtonLink in `<Magnetic>`. Add the scroll cue at the section bottom:

```tsx
<div aria-hidden className="mt-20 flex justify-center">
  <div className="scroll-cue h-10 w-6 rounded-full border border-char-light">
    <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-ember" />
  </div>
</div>
```

with CSS in globals.css (respects reduced motion via media query):

```css
@media (prefers-reduced-motion: no-preference) {
  .scroll-cue > div {
    animation: cue 1.6s ease-in-out infinite;
  }
  @keyframes cue {
    0%, 100% { transform: translateY(0); opacity: 1; }
    60% { transform: translateY(14px); opacity: 0.2; }
  }
}
```

- [ ] **Step 6: Gates + dev check** (hero words stagger in, em glows, header turns glassy after scrolling, magnetic CTA pulls) **+ commit**

```bash
git add -A
git commit -m "feat(motion): hero split reveal, glass header, magnetic cta"
```

---

### Task 5: Home section choreography (services, work pin, process pin, about, CTA)

**Files:**
- Create: `src/components/home/work-strip.tsx`, `src/components/home/process-pinned.tsx`
- Modify: `src/components/home/services-section.tsx` (wrap cards), `src/components/home/work-section.tsx` (delegate), `src/components/home/process-section.tsx` (delegate), `src/components/home/about-teaser.tsx`, `src/components/cta-band.tsx`, `src/app/page.tsx` (only if imports change)

- [ ] **Step 1: Services stagger + tilt** — `services-section.tsx` stays server; wrap the grid in a single `<Reveal>` is NOT enough (we want per-card stagger), so wrap each card `Link` in `<Reveal delay={index * 0.08}>`. Add a CSS tilt on hover (no JS): on the card Link add `transition-transform duration-300 hover:-translate-y-1`, and strengthen the glow: `hover:shadow-[0_0_40px_rgba(234,88,12,0.15)]`. (Import Reveal — the section file itself can stay a server component since Reveal is the client leaf.)

- [ ] **Step 2: Create `src/components/home/work-strip.tsx`** (client; pinned horizontal scroll on fine pointers, vertical stack on touch/reduced)

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies } from "@/content/case-studies";
import { useReducedMotion } from "@/components/motion/motion-provider";

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
        if (ref.current) ref.current.textContent = outcome.replace(String(target), String(Math.round(obj.n)));
      },
    });
  }, [active, outcome]);

  return (
    <p ref={ref} className="mt-auto pt-5 font-display text-lg text-ember">
      {outcome}
    </p>
  );
}

function Card({ c, active }: { c: (typeof caseStudies)[number]; active: boolean }) {
  return (
    <article className="flex w-[85vw] max-w-md shrink-0 flex-col rounded-2xl border border-char-light bg-char/60 p-7 backdrop-blur-sm lg:w-[32rem]">
      <p className="text-sm font-medium tracking-widest text-ash uppercase">{c.client}</p>
      <p className="mt-4 text-sm text-ash">{c.problem}</p>
      <p className="mt-3 text-sm">{c.solution}</p>
      <OutcomeStat outcome={c.outcome} active={active} />
    </article>
  );
}

export function WorkStrip() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pinnable, setPinnable] = useState(false);
  const [activeIdx, setActiveIdx] = useState(reduced ? caseStudies.length - 1 : -1);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) {
      setPinnable(false);
      setActiveIdx(caseStudies.length - 1); // stats render final values
      return;
    }
    setPinnable(true);
  }, [reduced]);

  useEffect(() => {
    if (!pinnable || !wrap.current || !track.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const distance = track.current!.scrollWidth - wrap.current!.clientWidth;
      gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => setActiveIdx(Math.min(caseStudies.length - 1, Math.floor(self.progress * caseStudies.length))),
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, [pinnable]);

  if (!pinnable) {
    return (
      <div className="grid gap-5 lg:grid-cols-3">
        {caseStudies.map((c) => (
          <Card key={c.slug} c={c} active />
        ))}
      </div>
    );
  }

  return (
    <div ref={wrap} className="flex min-h-screen items-center overflow-hidden">
      <div ref={track} className="flex gap-6 pl-2">
        {caseStudies.map((c, i) => (
          <Card key={c.slug} c={c} active={i <= activeIdx} />
        ))}
      </div>
    </div>
  );
}
```

`work-section.tsx` keeps the SectionHeading (server) and renders `<WorkStrip />` instead of the inline grid.

- [ ] **Step 3: Create `src/components/home/process-pinned.tsx`** (client; sequential light-up; unpinned fallback)

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/content/process";
import { useReducedMotion } from "@/components/motion/motion-provider";

export function ProcessPinned() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [pinnable, setPinnable] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) {
      setProgress(1);
      return;
    }
    setPinnable(true);
  }, [reduced]);

  useEffect(() => {
    if (!pinnable || !wrap.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrap.current,
        start: "top top",
        end: "+=140%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => setProgress(self.progress),
      });
    }, wrap);
    return () => ctx.revert();
  }, [pinnable]);

  const litCount = Math.min(processSteps.length, Math.floor(progress * processSteps.length) + (progress > 0.02 ? 1 : 0));

  return (
    <div ref={wrap} className={pinnable ? "flex min-h-screen flex-col justify-center" : ""}>
      <div aria-hidden className="relative mb-8 hidden h-px bg-char-light sm:block">
        <div className="absolute inset-y-0 left-0 bg-ember transition-[width]" style={{ width: `${progress * 100}%` }} />
      </div>
      <ol className="grid gap-5 sm:grid-cols-3">
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            className={`rounded-2xl bg-char p-7 transition-all duration-500 ${
              i < litCount ? "opacity-100" : "opacity-35"
            }`}
          >
            <p aria-hidden="true" className={`font-display text-3xl ${i < litCount ? "text-ember" : "text-ash"}`}>
              {i + 1}
            </p>
            <h3 className="mt-3 font-display text-xl">{step.title}</h3>
            <p className="mt-2 text-sm text-ash">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

`process-section.tsx` keeps SectionHeading and renders `<ProcessPinned />` instead of the inline `<ol>`.

- [ ] **Step 4: About parallax + CTA temperature** —
  - `about-teaser.tsx`: wrap the CJ circle in `<Reveal>` and the text block in `<Reveal delay={0.15}>`.
  - `cta-band.tsx`: wrap heading/paragraph/button in `<Reveal>`s; wrap the ButtonLink in `<Magnetic>`.
  - **Scroll temperature driver:** create `src/components/motion/temperature-driver.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useSceneStore } from "@/components/scene/use-scene-store";
import { useReducedMotion } from "./motion-provider";

export function TemperatureDriver() {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const set = useSceneStore.getState().setTemperature;
    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        const p = self.progress;
        // hot at top (1), calm in the middle (~0.35), flare at the bottom (1.2 clamped in scene)
        const t = p < 0.25 ? 1 - p * 2.6 : p > 0.85 ? 0.35 + (p - 0.85) * 4.3 : 0.35;
        set(Math.max(0.2, Math.min(1, t)));
      },
    });
    return () => st.kill();
  }, [reduced, pathname]);

  return null;
}
```

  Mount `<TemperatureDriver />` inside MotionProvider in the layout (after SceneRoot).

- [ ] **Step 5: Gates + dev check + commit**

Check: cards stagger in; work section pins and scrolls horizontally on desktop, stacks on narrow/touch emulation; stats count up; process steps light sequentially; CTA flares (particles brighten near page bottom). `npm run format && npm run build && npm run lint`.

```bash
git add -A
git commit -m "feat(motion): scroll choreography for home sections"
```

---

### Task 6: Inner pages + micro-interactions

**Files:**
- Modify: `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Reveals on inner pages** — wrap with `<Reveal>` (server files importing the client Reveal leaf is fine):
  - services index: h1 block in `<Reveal>`, each card in `<Reveal delay={i * 0.06}>`
  - service detail: each of the four content blocks (h1, problem, whatWeDo, deliverables, aside) in `<Reveal>`
  - about: story block, then each value card with stagger
  - contact: left column and form in separate `<Reveal>`s

- [ ] **Step 2: Link underline sweep + form focus glow** in `globals.css`:

```css
.link-sweep {
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-repeat: no-repeat;
  background-position: 0 100%;
  transition: background-size 0.3s ease;
}
.link-sweep:hover,
.link-sweep:focus-visible {
  background-size: 100% 1px;
}
```

Apply `link-sweep` to footer nav links and the "Learn more →" labels (replace `hover:underline` on ghost ButtonLink with `link-sweep`). Form focus glow — in contact-form, add to Input/Textarea className: `focus-visible:ring-ember focus-visible:shadow-[0_0_24px_rgba(234,88,12,0.2)]`.

- [ ] **Step 3: Gates + commit**

```bash
git add -A
git commit -m "feat(motion): inner page reveals and micro-interactions"
```

---

### Task 7: Verification, docs, cleanup

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update CLAUDE.md** — Stack section adds the motion stack (three/R3F/drei, gsap+ScrollTrigger, lenis, zustand); Architecture section adds: scene layer (`src/components/scene/`, zustand store bridges scroll→scene), motion layer (`src/components/motion/`, MotionProvider owns Lenis + reduced-motion context — all motion components must consume `useReducedMotion`), fallback chain (reduced-motion/no-WebGL → `.ember-backdrop` gradient), and the rule that pinned sections require `(pointer: fine)` and degrade on touch. Note new perf budget (mobile perf ≥ 80).

- [ ] **Step 2: Full Playwright walkthrough** (production build, `npm run start`):
  - Desktop 1280×800: all 6 routes render dark; hero stagger plays; header gains glass after scroll; work section pins + horizontal travel + count-up; process lights sequentially; CTA flare; form error path still works; scene persists across navigation; console clean (WebGL warnings about low-power acceptable).
  - Reduced motion (CDP emulation): static gradient (no canvas), no pinning, all content immediately visible, no SplitText hiding.
  - Mobile 375×812 (touch): work cards stacked vertically, process unpinned, no horizontal overflow anywhere, header usable.
  - Keyboard: tab order unaffected by pins; service cards still reveal "Learn more" on focus.
- [ ] **Step 3: Lighthouse** on `/` (mobile emulation): performance ≥ 80, a11y ≥ 95, SEO 100. If performance < 80: first lever is particle count / DPR cap, second is deferring the scene chunk until after LCP (dynamic import with `requestIdleCallback`).
- [ ] **Step 4: Commit docs**

```bash
git add CLAUDE.md
git commit -m "docs: document motion architecture and budgets"
```

- [ ] **Step 5: Report remaining user actions** — unchanged from v2 (case studies, founder photo, Resend key/domain, site.email/domain) — plus: review the live motion feel in `npm run dev` and tune particle density/speeds to taste.
