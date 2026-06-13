import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { caseStudies } from "@/content/case-studies";

export function WorkSection() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Real problems, measurable outcomes"
        >
          Client names are confidential — the problems and the numbers are real.
        </SectionHeading>
        <div className="grid gap-5 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <article
              key={c.slug}
              className="border-char-light flex flex-col rounded-2xl border p-7"
            >
              <p className="text-ash text-sm font-medium tracking-widest uppercase">
                {c.client}
              </p>
              <p className="text-ash mt-4 text-sm">{c.problem}</p>
              <p className="mt-3 text-sm">{c.solution}</p>
              <p className="font-display text-ember mt-auto pt-5 text-lg">
                {c.outcome}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
