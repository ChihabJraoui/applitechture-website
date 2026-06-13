import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { WorkStrip } from "@/components/home/work-strip";

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
        <WorkStrip />
      </Container>
    </section>
  );
}
