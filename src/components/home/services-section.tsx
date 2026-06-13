import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <section className="bg-iron/30 py-20">
      <Container>
        <SectionHeading eyebrow="Services" title="What we forge">
          Whether you need an app built, a product designed, work automated, or
          just a straight answer about what to build.
        </SectionHeading>
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08} className="h-full">
              <Link
                href={`/services/${s.slug}`}
                className="group border-scale bg-iron hover:border-ember relative h-full rounded-2xl border p-7 transition-[color,transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(245,158,11,0.18)]"
              >
                <span
                  aria-hidden="true"
                  className="text-ash/70 absolute top-5 right-6 font-mono text-xs tracking-widest"
                >
                  SVC.0{i + 1}
                </span>
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="text-ash mt-2 text-sm">{s.summary}</p>
                <p className="text-ember mt-4 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  Forge it →
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
