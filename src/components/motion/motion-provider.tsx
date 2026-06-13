"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register once at module scope so any consumer that imports later can rely on
// ScrollTrigger being available without a separate registerPlugin call.
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const ReducedMotionContext = createContext(false);
export const useReducedMotion = () => useContext(ReducedMotionContext);

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false, // server snapshot — keeps SSR and hydration consistent
  );

  useEffect(() => {
    if (reduced) {
      document.documentElement.classList.remove("js-motion");
      return;
    }

    // Signals CSS that motion-enhanced initial states may apply (content is
    // never hidden without this class — no-JS and reduced-motion safe).
    document.documentElement.classList.add("js-motion");

    const lenis = new Lenis({ anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      // Restore GSAP's default lag-smoothing after tearing down the raf hook.
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      // Children own their own ScrollTriggers (gsap.context + revert) — never killAll here.
      document.documentElement.classList.remove("js-motion");
    };
  }, [reduced]);

  return (
    <ReducedMotionContext.Provider value={reduced}>
      {children}
    </ReducedMotionContext.Provider>
  );
}
