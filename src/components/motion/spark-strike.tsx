"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./motion-provider";

export function SparkStrike({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const tweens = useRef<gsap.core.Tween[]>([]);
  const reduced = useReducedMotion();

  useEffect(
    () => () => {
      tweens.current.forEach((t) => t.kill());
    },
    [],
  );

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
      const tween = gsap.to(s, {
        x: Math.cos(ang) * dist,
        y: Math.sin(ang) * dist - 10,
        opacity: 0,
        duration: 0.5 + Math.random() * 0.3,
        ease: "power2.out",
        onComplete: () => s.remove(),
      });
      tweens.current.push(tween);
    }
  };

  return (
    <span ref={ref} onPointerDown={strike} className="relative inline-block">
      {children}
    </span>
  );
}
