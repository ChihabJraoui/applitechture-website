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
    set(tempForProgress(st.progress));
    return () => st.kill();
  }, [reduced, pathname]);

  return null;
}
