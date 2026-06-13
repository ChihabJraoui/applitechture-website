import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ProcessPinned } from "@/components/home/process-pinned";

export function ProcessSection() {
  return (
    <section className="bg-iron/30 py-20">
      <Container>
        <SectionHeading eyebrow="How we work" title="Heat · Hammer · Temper" />
        <ProcessPinned />
      </Container>
    </section>
  );
}
