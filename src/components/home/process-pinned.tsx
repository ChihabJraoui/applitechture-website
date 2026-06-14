"use client";

// Renders the process steps as a clean responsive grid (matches Services/Work).
// Each step burns a little hotter than the last; a gradient heat-line sits above.
import { processSteps } from "@/content/process";
import { Reveal } from "@/components/motion/reveal";

const HEAT = ["text-ember-dark", "text-ember", "text-amber"];

export function ProcessPinned() {
  return (
    <div>
      <div aria-hidden className="bg-scale relative mb-8 hidden h-px sm:block">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, #9a3412, #ea580c, #f59e0b)",
            boxShadow: "0 0 12px rgba(245,158,11,0.5)",
          }}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {processSteps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.1} className="h-full">
            <div
              className="bg-iron flex h-full flex-col rounded-2xl p-7"
              style={{
                boxShadow: `0 0 ${20 + i * 16}px rgba(234,88,12,${0.1 + i * 0.05})`,
              }}
            >
              <p
                aria-hidden="true"
                className={`font-display text-3xl ${HEAT[i] ?? "text-amber"}`}
              >
                {i + 1}
              </p>
              <h3 className="font-display mt-3 text-xl">{step.title}</h3>
              <p className="text-ash mt-2 text-sm">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
