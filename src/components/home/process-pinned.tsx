"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/content/process";
import { useReducedMotion } from "@/components/motion/motion-provider";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FINE_QUERY = "(pointer: fine)";

function subscribeFine(callback: () => void) {
  const mq = window.matchMedia(FINE_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

const emptySubscribe = () => () => {};

export function ProcessPinned() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  // pinnable = mounted && (pointer:fine) && !reduced (useSyncExternalStore pattern).
  // When NOT pinnable, effectiveProgress is forced to 1 (all steps lit).
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
    if (!pinnable || !wrap.current) return;
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

  const effectiveProgress = pinnable ? progress : 1;
  const litCount = Math.min(
    processSteps.length,
    Math.floor(effectiveProgress * processSteps.length) +
      (effectiveProgress > 0.02 ? 1 : 0),
  );

  return (
    <div
      ref={wrap}
      className={pinnable ? "flex min-h-screen flex-col justify-center" : ""}
    >
      <div
        aria-hidden
        className="bg-char-light relative mb-8 hidden h-px sm:block"
      >
        <div
          className="bg-ember absolute inset-y-0 left-0 transition-[width]"
          style={{ width: `${effectiveProgress * 100}%` }}
        />
      </div>
      <ol className="grid gap-5 sm:grid-cols-3">
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            className={`bg-char rounded-2xl p-7 transition-all duration-500 ${
              i < litCount ? "opacity-100" : "opacity-35"
            }`}
          >
            <p
              aria-hidden="true"
              className={`font-display text-3xl ${
                i < litCount ? "text-ember" : "text-ash"
              }`}
            >
              {i + 1}
            </p>
            <h3 className="font-display mt-3 text-xl">{step.title}</h3>
            <p className="text-ash mt-2 text-sm">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
