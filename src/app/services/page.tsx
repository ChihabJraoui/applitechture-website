import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
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
          <h1 className="font-display max-w-2xl text-4xl sm:text-5xl">
            What we <em className="text-ember">do.</em>
          </h1>
          <p className="text-ash mt-5 max-w-xl">
            Four services, one rule: the work has to pay for itself. If we
            don&apos;t think it will, we&apos;ll say so on the first call.
          </p>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="border-char-light hover:border-ember rounded-2xl border p-7 transition-colors"
              >
                <h2 className="font-display text-2xl">{s.title}</h2>
                <p className="text-ash mt-3 text-sm">{s.summary}</p>
                <p className="text-ash mt-4 text-sm">{s.problem}</p>
                <p className="text-ember mt-5 text-sm font-medium">
                  Learn more →
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
