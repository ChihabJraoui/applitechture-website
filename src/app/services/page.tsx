import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom apps, product design, AI & automation, and digital strategy for small businesses and startups.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-20">
        <Container>
          <Reveal>
            <h1 className="font-display max-w-2xl text-4xl sm:text-5xl">
              What we <em className="text-ember">do.</em>
            </h1>
            <p className="text-ash mt-5 max-w-xl">
              Four services, one rule: the work has to pay for itself. If we
              don&apos;t think it will, we&apos;ll say so on the first call.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="group border-scale hover:border-ember flex h-full flex-col rounded-2xl border p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(245,158,11,0.18)]"
                >
                  <h2 className="font-display text-2xl">{s.title}</h2>
                  <p className="text-ash mt-3 text-sm">{s.summary}</p>
                  <p className="text-ash mt-4 text-sm">{s.problem}</p>
                  <p className="text-ember mt-5 text-sm font-medium">
                    Learn more →
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
