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
    const split = new SplitText(target, { type: "words", tag: "span" });
    const ctx = gsap.context(() => {
      const em = ref.current!.querySelector("em");
      const tl = gsap.timeline();
      tl.from(split.words, {
        yPercent: 60,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: "power3.out",
      });
      if (em) {
        tl.fromTo(
          em,
          { textShadow: "0 0 0px rgba(234,88,12,0)" },
          {
            textShadow: "0 0 24px rgba(234,88,12,0.55)",
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2",
        ).to(em, { textShadow: "0 0 12px rgba(234,88,12,0.3)", duration: 1.2 });
      }
    }, ref);
    return () => {
      ctx.revert();
      split.revert();
    };
  }, [reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
