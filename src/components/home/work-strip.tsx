"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies } from "@/content/case-studies";
import { useReducedMotion } from "@/components/motion/motion-provider";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FINE_QUERY = "(pointer: fine)";

function subscribeFine(callback: () => void) {
  const mq = window.matchMedia(FINE_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

const emptySubscribe = () => () => {};

function OutcomeStat({
  outcome,
  active,
}: {
  outcome: string;
  active: boolean;
}) {
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
    <p ref={ref} className="text-ember font-display mt-auto pt-5 text-lg">
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
    <article className="border-char-light bg-char/60 flex w-[85vw] max-w-md shrink-0 flex-col rounded-2xl border p-7 backdrop-blur-sm lg:w-[32rem]">
      <p className="text-ash text-sm font-medium tracking-widest uppercase">
        {c.client}
      </p>
      <p className="text-ash mt-4 text-sm">{c.problem}</p>
      <p className="mt-3 text-sm">{c.solution}</p>
      <OutcomeStat outcome={c.outcome} active={active} />
    </article>
  );
}

export function WorkStrip() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(-1);

  // Decide pinnable after mount: pointer:fine AND not reduced-motion.
  // useSyncExternalStore keeps SSR/hydration consistent (server snapshot false).
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const fine = useSyncExternalStore(
    subscribeFine,
    () => window.matchMedia(FINE_QUERY).matches,
    () => false,
  );
  const pinnable = mounted && fine && !reduced;

  useEffect(() => {
    if (!pinnable || !wrap.current || !track.current) return;
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
          onUpdate: (self) =>
            setActiveIdx(
              Math.min(
                caseStudies.length - 1,
                Math.floor(self.progress * caseStudies.length),
              ),
            ),
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
