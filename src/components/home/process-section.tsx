import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { processSteps } from "@/content/process";

export function ProcessSection() {
  return (
    <section className="bg-char/30 py-20">
      <Container>
        <SectionHeading eyebrow="How we work" title="No mystery, no jargon" />
        <ol className="grid gap-5 sm:grid-cols-3">
          {processSteps.map((step, i) => (
            <li key={step.title} className="bg-char rounded-2xl p-7">
              <p
                className="font-display text-ember text-3xl"
                aria-hidden="true"
              >
                {i + 1}
              </p>
              <h3 className="font-display mt-3 text-xl">{step.title}</h3>
              <p className="text-ash mt-2 text-sm">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
