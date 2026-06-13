import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { WorkStrip } from "@/components/home/work-strip";

export function WorkSection() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Selected work" title="From the anvil">
          Client names are confidential — the problems and the numbers are real.
          (These three are anonymized DRAFT placeholders pending real stories.)
        </SectionHeading>
        <WorkStrip />
      </Container>
    </section>
  );
}
