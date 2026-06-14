"use client";

// Renders the case studies as a clean responsive grid (matches the Services
// grid). The outcome stat counts up the first time each card scrolls into view.
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { caseStudies } from "@/content/case-studies";
import { Reveal } from "@/components/motion/reveal";
import { useReducedMotion } from "@/components/motion/motion-provider";

function OutcomeStat({ outcome }: { outcome: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = outcome.match(/(\d+)/);
    // Reduced motion or no number to animate: leave the final text as rendered.
    if (reduced || !m) return;
    const target = Number(m[1]);
    el.textContent = outcome.replace(m[1], "0");
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          io.disconnect();
          const obj = { n: 0 };
          gsap.to(obj, {
            n: target,
            duration: 1.2,
            ease: "power1.out",
            onUpdate: () => {
              if (ref.current)
                ref.current.textContent = outcome.replace(
                  m[1],
                  String(Math.round(obj.n)),
                );
            },
          });
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [outcome, reduced]);

  return (
    <p
      ref={ref}
      className="text-amber font-display mt-auto pt-5 text-lg"
      style={{ textShadow: "0 0 22px rgba(245,158,11,0.4)" }}
    >
      {outcome}
    </p>
  );
}

function Card({ c }: { c: (typeof caseStudies)[number] }) {
  return (
    <article className="border-scale bg-iron/60 hover:border-ember/60 flex h-full flex-col rounded-2xl border p-7 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_0_50px_rgba(234,88,12,0.18)]">
      <p className="text-ash text-sm font-medium tracking-widest uppercase">
        {c.client}
      </p>
      <p className="text-ash mt-4 text-sm">{c.problem}</p>
      <p className="mt-3 text-sm">{c.solution}</p>
      <OutcomeStat outcome={c.outcome} />
    </article>
  );
}

export function WorkStrip() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {caseStudies.map((c, i) => (
        <Reveal key={c.slug} delay={i * 0.08} className="h-full">
          <Card c={c} />
        </Reveal>
      ))}
    </div>
  );
}
