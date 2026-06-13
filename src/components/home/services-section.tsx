import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <section className="bg-char/30 py-20">
      <Container>
        <SectionHeading eyebrow="Services" title="Four ways we help">
          Whether you need an app built, a product designed, work automated, or
          just a straight answer about what to build.
        </SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link
                href={`/services/${s.slug}`}
                className="group border-char-light bg-char hover:border-ember rounded-2xl border p-7 transition-[color,transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(234,88,12,0.15)]"
              >
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="text-ash mt-2 text-sm">{s.summary}</p>
                <p className="text-ember mt-4 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  Learn more →
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
