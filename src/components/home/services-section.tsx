import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <section className="bg-sand py-20">
      <Container>
        <SectionHeading eyebrow="Services" title="Four ways we help">
          Whether you need an app built, a product designed, work automated, or
          just a straight answer about what to build.
        </SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group border-sand-dark bg-cream hover:border-terracotta rounded-2xl border p-7 transition-colors"
            >
              <h3 className="font-display text-xl">{s.title}</h3>
              <p className="text-stone mt-2 text-sm">{s.summary}</p>
              <p className="text-terracotta mt-4 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
