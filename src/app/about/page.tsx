import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Emberworks is a software studio run by Chihab Jraoui, building apps for small businesses and startups.",
};

const values = [
  {
    title: "Plain language",
    text: "If we can't explain it without jargon, we don't understand it well enough to build it.",
  },
  {
    title: "Working software, weekly",
    text: "You never wait months to see progress. Demos every week, from week one.",
  },
  {
    title: "You own everything",
    text: "Code, accounts, infrastructure, roadmap. No lock-in, no hostage situations.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <h1 className="font-display text-4xl sm:text-5xl">
                A small studio, <em className="text-ember">on purpose.</em>
              </h1>
              <div className="mt-8 space-y-4 text-lg">
                <p>
                  Emberworks is run by Chihab Jraoui, a software engineer who
                  kept watching good businesses struggle with bad software —
                  tools that almost fit, agencies that overpromised, projects
                  that quietly died.
                </p>
                <p>
                  So this studio works differently: small by design, honest
                  about what&apos;s worth building, and measured on one thing —
                  whether the software pays for itself.
                </p>
              </div>
            </Reveal>

            <h2 className="text-ember mt-14 mb-6 text-sm font-medium tracking-widest uppercase">
              What we believe
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.08} className="h-full">
                  <div className="bg-iron h-full rounded-2xl p-6">
                    <h3 className="font-display text-lg">{v.title}</h3>
                    <p className="text-ash mt-2 text-sm">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
