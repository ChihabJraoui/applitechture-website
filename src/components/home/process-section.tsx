import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { processSteps } from "@/content/process";

export function ProcessSection() {
  return (
    <section className="bg-sand py-20">
      <Container>
        <SectionHeading eyebrow="How we work" title="No mystery, no jargon" />
        <ol className="grid gap-5 sm:grid-cols-3">
          {processSteps.map((step, i) => (
            <li key={step.title} className="bg-cream rounded-2xl p-7">
              <p className="font-display text-terracotta text-3xl">{i + 1}</p>
              <h3 className="font-display mt-3 text-xl">{step.title}</h3>
              <p className="text-stone mt-2 text-sm">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
