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
