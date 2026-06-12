# Applitechture Redesign & Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the v1 template site with a rebranded, lead-gen-focused marketing site per `.plans/2026-06-12-redesign-rebrand-design.md`.

**Architecture:** Full re-scaffold in this repo: Next.js 16 App Router (strict TS), Tailwind CSS v4 with brand tokens in `@theme`, content in typed data files under `src/content/`, contact form via server action + Resend. Six routes (`/`, `/services`, `/services/[slug]` ×4, `/about`, `/contact`), one warm light theme, no animation libraries, no dark mode.

**Tech Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4, shadcn/ui (form primitives only), Resend, lucide-react.

**Verification model:** This is a content site with no unit-test suite (per spec). Every task's gate is: `npm run build` passes (strict TS) + `npm run lint` clean. Final task adds a manual Playwright walkthrough.

**Brand tokens (used throughout):** cream `#FAF6F1` (bg), sand `#F0E9DF` (cards), sand-dark `#E7DDD0` (borders), ink `#1C1917` (text/buttons), stone `#78716C` (secondary text), terracotta `#C2410C` (accent). Fonts: Fraunces (display), Inter (body).

---

### Task 1: Clean slate + Next.js 16 scaffold

Replace the v1 codebase with a fresh create-next-app scaffold, keeping git history, LICENSE, README, CLAUDE.md, and `.plans/`.

**Files:**
- Delete: `src/`, `public/`, `tailwind.config.js`, `postcss.config.js`, `next.config.js`, `jsconfig.json`, `components.json`, `next-env.d.ts`, `tsconfig.json`, `package.json`, `package-lock.json`
- Create (copied from scaffold): `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `public/`

- [ ] **Step 1: Remove v1 code**

```bash
cd /Users/chihabjraoui/Projects/ME/applitechture-website
git rm -r src public tailwind.config.js postcss.config.js next.config.js jsconfig.json components.json next-env.d.ts tsconfig.json package.json package-lock.json
rm -rf node_modules .next
```

- [ ] **Step 2: Generate a fresh scaffold in a temp dir**

```bash
cd /tmp && rm -rf applitechture-scaffold
npx create-next-app@latest applitechture-scaffold --ts --eslint --app --src-dir --tailwind --turbopack --use-npm --import-alias "@/*" --yes
```

Expected: scaffold created with Next 16, Tailwind v4, ESLint 9 flat config.

- [ ] **Step 3: Copy scaffold into the repo (don't overwrite repo's .gitignore, README, LICENSE)**

```bash
cd /tmp/applitechture-scaffold
cp package.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs /Users/chihabjraoui/Projects/ME/applitechture-website/
cp -R src public /Users/chihabjraoui/Projects/ME/applitechture-website/
cd /Users/chihabjraoui/Projects/ME/applitechture-website
rm -f public/*.svg   # drop scaffold sample icons
```

- [ ] **Step 4: Set identity in package.json**

Edit `package.json`: `"name": "applitechture-website"`, `"version": "2.0.0"`. Verify `tsconfig.json` has `"strict": true` (create-next-app default) — if not, set it.

- [ ] **Step 5: Install and verify build**

```bash
npm install
npm run build && npm run lint
```

Expected: build succeeds, lint clean.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: re-scaffold on next 16 + tailwind v4 with strict typescript"
```

---

### Task 2: Brand theme, fonts, header, footer

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Create: `src/components/wordmark.tsx`, `src/components/header.tsx`, `src/components/footer.tsx`, `src/components/container.tsx`, `src/content/site.ts`

- [ ] **Step 1: Replace `src/app/globals.css` with brand tokens**

```css
@import "tailwindcss";

@theme {
  --color-cream: #faf6f1;
  --color-sand: #f0e9df;
  --color-sand-dark: #e7ddd0;
  --color-ink: #1c1917;
  --color-stone: #78716c;
  --color-terracotta: #c2410c;
  --color-terracotta-dark: #9a3412;

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-fraunces), ui-serif, Georgia, serif;
}

::selection {
  background: var(--color-terracotta);
  color: var(--color-cream);
}
```

(Remove all other scaffold CSS — dark-mode media queries included.)

- [ ] **Step 2: Create `src/content/site.ts`**

```ts
export const site = {
  name: "Applitechture",
  url: "https://applitechture.com", // adjust if the production domain differs
  email: "chihabajraoui@gmail.com", // swap for a branded address when available
  tagline: "Good software, built with care.",
  description:
    "Applitechture is a software studio helping small businesses and startups design, build, and ship apps that pay for themselves.",
} as const;
```

- [ ] **Step 3: Create `src/components/container.tsx`**

```tsx
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}
```

- [ ] **Step 4: Create `src/components/wordmark.tsx`**

```tsx
export function Wordmark({ className = "text-xl" }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-tight ${className}`}>
      applitechture<span className="text-terracotta">.</span>
    </span>
  );
}
```

- [ ] **Step 5: Create `src/components/header.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/container";
import { Wordmark } from "@/components/wordmark";

const nav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export function Header() {
  return (
    <header className="border-b border-sand-dark bg-cream">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Applitechture home">
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-4 sm:gap-7">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-stone transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-ink px-4 py-2 text-sm text-cream transition-colors hover:bg-terracotta"
          >
            Start a project
          </Link>
        </nav>
      </Container>
    </header>
  );
}
```

- [ ] **Step 6: Create `src/components/footer.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/container";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-sand-dark bg-cream">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Wordmark />
          <p className="mt-2 max-w-xs text-sm text-stone">{site.tagline}</p>
        </div>
        <nav className="flex gap-6 text-sm text-stone">
          <Link href="/services" className="hover:text-ink">Services</Link>
          <Link href="/about" className="hover:text-ink">About</Link>
          <Link href="/contact" className="hover:text-ink">Contact</Link>
        </nav>
        <div className="text-sm text-stone">
          <a href={`mailto:${site.email}`} className="text-terracotta hover:underline">{site.email}</a>
          <p className="mt-1">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 7: Replace `src/app/layout.tsx`** (server component — no `"use client"`)

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/content/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-cream font-sans text-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 8: Replace `src/app/page.tsx` with a temporary stub** (real home built in Task 4)

```tsx
export default function Home() {
  return <h1 className="p-10 font-display text-4xl">Applitechture</h1>;
}
```

- [ ] **Step 9: Build, lint, visually sanity-check**

```bash
npm run build && npm run lint
```

Expected: pass. Optionally `npm run dev` and confirm header/footer render with cream background and wordmark.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat(ui): add brand theme, fonts, header and footer"
```

---

### Task 3: Content layer (types + all copy)

All copy lives here. Case studies are **realistic anonymized drafts** — flagged for the user to replace details with real project stories before launch.

**Files:**
- Create: `src/content/types.ts`, `src/content/services.ts`, `src/content/case-studies.ts`, `src/content/process.ts`

- [ ] **Step 1: Create `src/content/types.ts`**

```ts
export type Service = {
  slug: string;
  title: string;
  summary: string;       // card text (~1 sentence)
  problem: string;       // detail page: the situation
  whatWeDo: string[];    // detail page: paragraphs
  deliverables: string[];
  caseStudySlug?: string;
};

export type CaseStudy = {
  slug: string;
  client: string;        // anonymized descriptor
  problem: string;
  solution: string;
  outcome: string;       // measurable result, short
};

export type ProcessStep = {
  title: string;
  description: string;
};
```

- [ ] **Step 2: Create `src/content/services.ts`**

```ts
import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "custom-apps",
    title: "Custom Web & Mobile Apps",
    summary: "The app your business actually needs — designed, built, and shipped end to end.",
    problem:
      "Off-the-shelf tools almost fit, spreadsheets are doing jobs they were never meant to do, and your team works around the software instead of with it.",
    whatWeDo: [
      "We start with how your business runs today, then design and build a web or mobile app around it — not the other way round.",
      "You see working software every week. Scope is fixed in writing before we start, and we ship something usable early so value lands before the final release.",
    ],
    deliverables: [
      "A production web or mobile app, deployed and documented",
      "Clean, tested code you own outright",
      "Training for your team and a handover you can build on",
    ],
    caseStudySlug: "logistics-dispatch",
  },
  {
    slug: "product-design",
    title: "Product & UX Design",
    summary: "Interfaces your customers understand on first use — prototyped and validated before a line of code.",
    problem:
      "You have the idea (or the app) but users get lost, drop off, or need hand-holding. Or you need a credible prototype before committing a dev budget.",
    whatWeDo: [
      "We map the user journeys that matter, design the screens around them, and put a clickable prototype in real users' hands before anything is built.",
      "If you already have a product, we audit where users struggle and redesign the flows that cost you customers.",
    ],
    deliverables: [
      "Clickable prototype tested with real users",
      "Full UI design system, ready for any dev team",
      "A prioritized list of UX fixes with expected impact",
    ],
    caseStudySlug: "clinic-booking",
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    summary: "Hand the repetitive work to software — from document processing to AI features inside your product.",
    problem:
      "Your team spends hours on work a machine should do: re-typing documents, triaging emails, answering the same questions, moving data between tools.",
    whatWeDo: [
      "We find the tasks where automation pays for itself fastest, then build it — workflow automation, document extraction, AI assistants trained on your business.",
      "We're honest about what AI can't do reliably yet. If a simple script beats a model, you get the script.",
    ],
    deliverables: [
      "Working automations integrated with your existing tools",
      "AI features with measurable accuracy, not demos",
      "A clear account of hours saved per week",
    ],
    caseStudySlug: "retail-inventory",
  },
  {
    slug: "strategy-consulting",
    title: "Digital Strategy & Consulting",
    summary: "Know what to build before you spend — a concrete technical roadmap, not a slide deck.",
    problem:
      "Something's holding the business back and software is probably the answer — but you don't know what to build, what it should cost, or who to trust.",
    whatWeDo: [
      "We spend focused time inside your operation, find where software moves the numbers, and give you a concrete plan: what to build, in what order, at what cost.",
      "The plan is yours. Build it with us, with someone else, or in-house — it's written to be executed, not to sell you a project.",
    ],
    deliverables: [
      "A technical roadmap with priorities, costs, and timelines",
      "Vendor-neutral build/buy recommendations",
      "A scoped first project you can start immediately",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
```

- [ ] **Step 3: Create `src/content/case-studies.ts`**

```ts
import type { CaseStudy } from "./types";

// DRAFT CONTENT: realistic anonymized placeholders.
// Replace problem/solution/outcome with real project details before launch.
export const caseStudies: CaseStudy[] = [
  {
    slug: "logistics-dispatch",
    client: "A regional logistics company",
    problem: "Deliveries tracked across three spreadsheets and a whiteboard; dispatch errors were costing client relationships.",
    solution: "A dispatch and delivery-tracking app the whole team uses from one screen, with driver updates from their phones.",
    outcome: "Dispatch errors down 60% in the first quarter.",
  },
  {
    slug: "clinic-booking",
    client: "A healthcare clinic network",
    problem: "Phone-only appointment booking meant lost bookings after hours and a front desk drowning in calls.",
    solution: "An online booking platform with automated reminders, integrated with their existing patient records.",
    outcome: "No-shows down 35%; a third of bookings now happen outside office hours.",
  },
  {
    slug: "retail-inventory",
    client: "A specialty retail business",
    problem: "Manual stock counts and gut-feel reordering led to stockouts of bestsellers and cash tied up in slow movers.",
    solution: "Inventory automation with AI-assisted demand forecasting, plugged into their point of sale.",
    outcome: "Stockouts down 40%; reordering now takes one hour a week instead of a day.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
```

- [ ] **Step 4: Create `src/content/process.ts`**

```ts
import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    title: "Talk",
    description:
      "A free call about your business, not your tech stack. We figure out together whether software can move your numbers — and tell you honestly if it can't.",
  },
  {
    title: "Build",
    description:
      "Fixed scope, agreed in writing. You see working software every week and can change course while it's cheap to do so.",
  },
  {
    title: "Ship",
    description:
      "We launch it, train your team, and stick around. You own the code, the accounts, and the roadmap.",
  },
];
```

- [ ] **Step 5: Build + lint, commit**

```bash
npm run build && npm run lint
git add src/content
git commit -m "feat(content): add typed content layer with services, case studies, process"
```

---

### Task 4: Homepage

**Files:**
- Create: `src/components/section-heading.tsx`, `src/components/button-link.tsx`, `src/components/home/hero.tsx`, `src/components/home/services-section.tsx`, `src/components/home/work-section.tsx`, `src/components/home/process-section.tsx`, `src/components/home/about-teaser.tsx`, `src/components/cta-band.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/button-link.tsx`**

```tsx
import Link from "next/link";

const styles = {
  primary: "rounded-full bg-terracotta px-6 py-3 text-cream hover:bg-terracotta-dark",
  secondary: "rounded-full bg-ink px-6 py-3 text-cream hover:bg-terracotta",
  ghost: "py-3 text-terracotta hover:underline",
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

- [ ] **Step 2: Create `src/components/section-heading.tsx`**

```tsx
export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 text-sm font-medium tracking-widest text-terracotta uppercase">{eyebrow}</p>
      <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
      {children ? <p className="mt-4 text-stone">{children}</p> : null}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/home/hero.tsx`**

```tsx
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <h1 className="max-w-3xl font-display text-5xl leading-tight sm:text-6xl">
          Good software, <em className="text-terracotta">built with care.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-stone">{site.description}</p>
        <div className="mt-9 flex items-center gap-6">
          <ButtonLink href="/contact">Start a project</ButtonLink>
          <ButtonLink href="/services" variant="ghost">See what we do →</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Create `src/components/home/services-section.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <section className="bg-sand py-20">
      <Container>
        <SectionHeading eyebrow="Services" title="Four ways we help">
          Whether you need an app built, a product designed, work automated, or just a straight answer about what to build.
        </SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-sand-dark bg-cream p-7 transition-colors hover:border-terracotta"
            >
              <h3 className="font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-stone">{s.summary}</p>
              <p className="mt-4 text-sm font-medium text-terracotta opacity-0 transition-opacity group-hover:opacity-100">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Create `src/components/home/work-section.tsx`**

```tsx
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { caseStudies } from "@/content/case-studies";

export function WorkSection() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Selected work" title="Real problems, measurable outcomes">
          Client names are confidential — the problems and the numbers are real.
        </SectionHeading>
        <div className="grid gap-5 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <article key={c.slug} className="flex flex-col rounded-2xl border border-sand-dark p-7">
              <p className="text-sm font-medium tracking-widest text-stone uppercase">{c.client}</p>
              <p className="mt-4 text-sm text-stone">{c.problem}</p>
              <p className="mt-3 text-sm">{c.solution}</p>
              <p className="mt-auto pt-5 font-display text-lg text-terracotta">{c.outcome}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: Create `src/components/home/process-section.tsx`**

```tsx
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { processSteps } from "@/content/process";

export function ProcessSection() {
  return (
    <section className="bg-sand py-20">
      <Container>
        <SectionHeading eyebrow="How we work" title="No mystery, no jargon" />
        <ol className="grid gap-5 sm:grid-cols-3">
          {processSteps.map((step, i) => (
            <li key={step.title} className="rounded-2xl bg-cream p-7">
              <p className="font-display text-3xl text-terracotta">{i + 1}</p>
              <h3 className="mt-3 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-stone">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
```

- [ ] **Step 7: Create `src/components/home/about-teaser.tsx`**

```tsx
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";

export function AboutTeaser() {
  return (
    <section className="py-20">
      <Container className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        <div
          aria-hidden
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-sand font-display text-3xl text-terracotta"
        >
          CJ
        </div>
        <div>
          <p className="mb-3 text-sm font-medium tracking-widest text-terracotta uppercase">Who's behind this</p>
          <p className="max-w-2xl font-display text-2xl leading-snug">
            Applitechture is run by Chihab Jraoui — an engineer who'd rather show you working software than a slide deck.
          </p>
          <div className="mt-5">
            <ButtonLink href="/about" variant="ghost">More about the studio →</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

(The `CJ` circle is a placeholder until the user provides a founder photo — then swap for `next/image`.)

- [ ] **Step 8: Create `src/components/cta-band.tsx`** (shared: home, services, about)

```tsx
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";

export function CtaBand() {
  return (
    <section className="bg-ink py-20 text-cream">
      <Container className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl">
          Have an idea? <em className="text-terracotta">Let's talk.</em>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-cream/70">
          A free, no-obligation call about your project. Worst case, you leave with better questions.
        </p>
        <div className="mt-8">
          <ButtonLink href="/contact">Start a project</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 9: Replace `src/app/page.tsx`**

```tsx
import { Hero } from "@/components/home/hero";
import { ServicesSection } from "@/components/home/services-section";
import { WorkSection } from "@/components/home/work-section";
import { ProcessSection } from "@/components/home/process-section";
import { AboutTeaser } from "@/components/home/about-teaser";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <AboutTeaser />
      <CtaBand />
    </>
  );
}
```

- [ ] **Step 10: Build, lint, visual check, commit**

```bash
npm run build && npm run lint
git add -A
git commit -m "feat(home): build homepage sections"
```

---

### Task 5: Services index + detail pages

**Files:**
- Create: `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`

- [ ] **Step 1: Create `src/app/services/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Custom apps, product design, AI & automation, and digital strategy for small businesses and startups.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-20">
        <Container>
          <h1 className="max-w-2xl font-display text-4xl sm:text-5xl">
            What we <em className="text-terracotta">do.</em>
          </h1>
          <p className="mt-5 max-w-xl text-stone">
            Four services, one rule: the work has to pay for itself. If we don't think it will, we'll say so on the first call.
          </p>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-2xl border border-sand-dark p-7 transition-colors hover:border-terracotta"
              >
                <h2 className="font-display text-2xl">{s.title}</h2>
                <p className="mt-3 text-sm text-stone">{s.summary}</p>
                <p className="mt-4 text-sm text-stone">{s.problem}</p>
                <p className="mt-5 text-sm font-medium text-terracotta">Learn more →</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
```

- [ ] **Step 2: Create `src/app/services/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { services, getService } from "@/content/services";
import { getCaseStudy } from "@/content/case-studies";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const caseStudy = service.caseStudySlug ? getCaseStudy(service.caseStudySlug) : undefined;

  return (
    <>
      <article className="py-20">
        <Container className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl">{service.title}</h1>

          <h2 className="mt-12 text-sm font-medium tracking-widest text-terracotta uppercase">Sound familiar?</h2>
          <p className="mt-3 text-lg text-stone">{service.problem}</p>

          <h2 className="mt-10 text-sm font-medium tracking-widest text-terracotta uppercase">What we do</h2>
          {service.whatWeDo.map((p) => (
            <p key={p} className="mt-3">{p}</p>
          ))}

          <h2 className="mt-10 text-sm font-medium tracking-widest text-terracotta uppercase">What you get</h2>
          <ul className="mt-3 space-y-2">
            {service.deliverables.map((d) => (
              <li key={d} className="flex gap-3">
                <span aria-hidden className="text-terracotta">—</span>
                {d}
              </li>
            ))}
          </ul>

          {caseStudy ? (
            <aside className="mt-12 rounded-2xl bg-sand p-7">
              <p className="text-sm font-medium tracking-widest text-stone uppercase">{caseStudy.client}</p>
              <p className="mt-3 text-sm">{caseStudy.solution}</p>
              <p className="mt-3 font-display text-lg text-terracotta">{caseStudy.outcome}</p>
            </aside>
          ) : null}
        </Container>
      </article>
      <CtaBand />
    </>
  );
}
```

- [ ] **Step 3: Build, lint, verify all four slugs render and an unknown slug 404s**

```bash
npm run build && npm run lint
```

Expected: build output lists `/services/custom-apps`, `/services/product-design`, `/services/ai-automation`, `/services/strategy-consulting` as static (SSG). In dev, `/services/nope` returns 404.

- [ ] **Step 4: Commit**

```bash
git add src/app/services
git commit -m "feat(services): add services index and detail pages"
```

---

### Task 6: About page

Draft copy — the user reviews/edits the story and supplies a photo later.

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create `src/app/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About",
  description: "Applitechture is a software studio run by Chihab Jraoui, building apps for small businesses and startups.",
};

const values = [
  { title: "Plain language", text: "If we can't explain it without jargon, we don't understand it well enough to build it." },
  { title: "Working software, weekly", text: "You never wait months to see progress. Demos every week, from week one." },
  { title: "You own everything", text: "Code, accounts, infrastructure, roadmap. No lock-in, no hostage situations." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-20">
        <Container className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl">
            A small studio, <em className="text-terracotta">on purpose.</em>
          </h1>
          <div className="mt-8 space-y-4 text-lg">
            <p>
              Applitechture is run by Chihab Jraoui, a software engineer who kept watching good businesses struggle
              with bad software — tools that almost fit, agencies that overpromised, projects that quietly died.
            </p>
            <p>
              So this studio works differently: small by design, honest about what's worth building, and measured
              on one thing — whether the software pays for itself.
            </p>
          </div>

          <h2 className="mt-14 mb-6 text-sm font-medium tracking-widest text-terracotta uppercase">What we believe</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-sand p-6">
                <h3 className="font-display text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-stone">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
```

- [ ] **Step 2: Build, lint, commit**

```bash
npm run build && npm run lint
git add src/app/about
git commit -m "feat(about): add about page"
```

---

### Task 7: Contact page with server action + Resend

**Files:**
- Create: `src/app/contact/page.tsx`, `src/app/contact/contact-form.tsx`, `src/app/contact/actions.ts`
- Run: shadcn init + add form primitives (creates `src/components/ui/*`, `src/lib/utils.ts`, `components.json`)

- [ ] **Step 1: Install Resend and shadcn primitives**

```bash
npm install resend
npx shadcn@latest init --base-color neutral --yes
npx shadcn@latest add button input textarea label --yes
npm run build
```

Expected: `src/components/ui/{button,input,textarea,label}.tsx` and `src/lib/utils.ts` created; build still passes. If shadcn init modified `globals.css`, verify the `@theme` brand tokens from Task 2 are still present (re-add them above shadcn's additions if displaced).

- [ ] **Step 2: Create `src/app/contact/actions.ts`**

```ts
"use server";

import { Resend } from "resend";
import { site } from "@/content/site";

export type InquiryState = { status: "success" } | { status: "error"; message: string } | null;

export async function sendInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  // Honeypot: bots fill the hidden "website" field; pretend success.
  if (formData.get("website")) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email, and a few words about the project." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email address doesn't look right — mind checking it?" };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      // onboarding@resend.dev works without domain verification;
      // switch to a verified applitechture.com sender when the domain is set up in Resend.
      from: "Applitechture website <onboarding@resend.dev>",
      to: site.email,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nBudget: ${budget || "not specified"}\n\n${message}`,
    });
    return { status: "success" };
  } catch {
    return { status: "error", message: `Something went wrong sending your message. Email us directly at ${site.email}.` };
  }
}
```

- [ ] **Step 3: Create `src/app/contact/contact-form.tsx`** (client component)

```tsx
"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendInquiry, type InquiryState } from "./actions";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<InquiryState, FormData>(sendInquiry, null);

  if (state?.status === "success") {
    return (
      <div className="rounded-2xl bg-sand p-8">
        <h2 className="font-display text-2xl">Thank you — message received.</h2>
        <p className="mt-2 text-stone">We read every inquiry personally and reply within one business day.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="space-y-2">
        <Label htmlFor="name">Your name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Budget range (optional)</Label>
        <Input id="budget" name="budget" placeholder="e.g. $5k–15k, or 'no idea yet'" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">What are you trying to build or fix?</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>
      {state?.status === "error" ? <p className="text-sm text-terracotta">{state.message}</p> : null}
      <Button type="submit" disabled={pending} className="rounded-full bg-terracotta px-8 hover:bg-terracotta-dark">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 4: Create `src/app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { site } from "@/content/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project — we reply within one business day.",
};

export default function ContactPage() {
  return (
    <section className="py-20">
      <Container className="grid max-w-4xl gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl">
            Let's <em className="text-terracotta">talk.</em>
          </h1>
          <p className="mt-5 text-stone">
            A few sentences about your business and what's in the way. No preparation needed — plain language welcome.
          </p>
          <p className="mt-5 text-sm text-stone">
            Prefer email? <a href={`mailto:${site.email}`} className="text-terracotta hover:underline">{site.email}</a>
          </p>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Set up the env var locally and document it**

```bash
echo 'RESEND_API_KEY="re_test_placeholder"' > .env.local
grep -q "env" .gitignore && echo "gitignore already covers env files"
```

Add to `README.md` (replacing its empty content):

```markdown
# Applitechture Website

Marketing site for Applitechture — applitechture.com.

## Develop

    npm install
    npm run dev

## Environment

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key for the contact form. Set in Vercel project settings; locally in `.env.local`. |
```

- [ ] **Step 6: Verify form behavior in dev**

Run `npm run dev`. On `/contact`: submitting empty → browser validation; bad email → inline error; valid submission with a real Resend test key → success panel (with the placeholder key, expect the inline error path with the fallback email address — that's the error state working).

- [ ] **Step 7: Build, lint, commit**

```bash
npm run build && npm run lint
git add -A
git commit -m "feat(contact): add contact form with server action and resend"
```

---

### Task 8: SEO, icons, 404

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/icon.tsx`, `src/app/opengraph-image.tsx`, `src/app/not-found.tsx`
- Modify: `src/app/layout.tsx` (JSON-LD)

- [ ] **Step 1: Create `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
  const serviceRoutes = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...serviceRoutes];
}
```

- [ ] **Step 2: Create `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Create `src/app/icon.tsx`** (favicon: terracotta "a." on cream)

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf6f1",
          color: "#1c1917",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        a<span style={{ color: "#c2410c" }}>.</span>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 4: Create `src/app/opengraph-image.tsx`**

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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#faf6f1",
          color: "#1c1917",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 600 }}>
          applitechture<span style={{ color: "#c2410c" }}>.</span>
        </div>
        <div style={{ fontSize: 72, marginTop: 32, fontWeight: 500 }}>{site.tagline}</div>
        <div style={{ fontSize: 28, marginTop: 24, color: "#78716c", maxWidth: 800 }}>{site.description}</div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 5: Create `src/app/not-found.tsx`**

```tsx
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="py-28">
      <Container className="max-w-xl text-center">
        <h1 className="font-display text-5xl">
          Page not <em className="text-terracotta">found.</em>
        </h1>
        <p className="mt-4 text-stone">This page doesn't exist — but the studio does.</p>
        <div className="mt-8">
          <ButtonLink href="/">Back home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: Add Organization JSON-LD to `src/app/layout.tsx`**

Inside `<body>`, before `<Header />`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.email,
      description: site.description,
    }),
  }}
/>
```

- [ ] **Step 7: Build, lint, commit**

```bash
npm run build && npm run lint
git add -A
git commit -m "feat(seo): add sitemap, robots, icons, og image, 404, structured data"
```

---

### Task 9: Docs update + final verification

**Files:**
- Modify: `CLAUDE.md` (stack section is now wrong), `README.md` (done in Task 7 — verify)

- [ ] **Step 1: Rewrite CLAUDE.md "Stack" and "Architecture" sections** to match reality: Next 16, Tailwind v4 (`@theme` tokens in `globals.css`), strict TS, server-component layout, content in `src/content/`, contact via server action + Resend (`RESEND_API_KEY`), no dark mode, the six routes, removed v1 notes (Sanity leftover, client layout quirk, WebGL components). Keep the Commands and Project sections; update the Project section to say the redesign shipped.

- [ ] **Step 2: Full production verification**

```bash
npm run build && npm run lint
npm run start &
```

With Playwright (or a browser), walk through: `/`, `/services`, all four `/services/[slug]`, `/about`, `/contact`, `/nonexistent` (404). Check: fonts load (serif headlines), terracotta CTAs, mobile viewport (375px) for header wrap and section stacking, form error path, `/sitemap.xml` and `/robots.txt` respond.

- [ ] **Step 3: Lighthouse sanity check on `/`**

Target 90+ on performance, SEO, accessibility. With no client JS beyond the contact form, this should pass; investigate if not.

- [ ] **Step 4: Commit docs**

```bash
git add CLAUDE.md README.md
git commit -m "docs: update CLAUDE.md and README for v2 stack"
```

- [ ] **Step 5: Report remaining user actions** (do not do these — they're the user's):
  - Replace the three draft case studies in `src/content/case-studies.ts` with real project details
  - Review/edit about-page story; provide a founder photo (swap the `CJ` circle in `about-teaser.tsx` for `next/image`)
  - Create a Resend account, set the real `RESEND_API_KEY` in Vercel env, and later verify the applitechture.com sending domain (then change `from:` in `src/app/contact/actions.ts`)
  - Confirm the production domain in `src/content/site.ts`
  - Push / deploy when ready
