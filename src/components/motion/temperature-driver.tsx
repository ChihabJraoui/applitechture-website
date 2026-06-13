"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useSceneStore } from "@/components/scene/use-scene-store";
import { useReducedMotion } from "./motion-provider";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function TemperatureDriver() {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;
    const set = useSceneStore.getState().setTemperature;
    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        const p = self.progress;
        const t =
          p < 0.25 ? 1 - p * 2.6 : p > 0.85 ? 0.35 + (p - 0.85) * 4.3 : 0.35;
        set(Math.max(0.2, Math.min(1, t)));
      },
    });
    return () => st.kill();
  }, [reduced, pathname]);

  return null;
}
