import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { SparkStrike } from "@/components/motion/spark-strike";

export function CtaBand() {
  return (
    <section className="cta-forge py-28">
      <Container className="text-center">
        <Reveal>
          <h2 className="font-display text-forge-black text-3xl sm:text-5xl">
            Have an idea? <em className="not-italic">Let&apos;s forge it.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-forge-black/75 mx-auto mt-4 max-w-md">
            A free, no-obligation call about your project. Worst case, you leave
            with better questions.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8">
            <Magnetic>
              <SparkStrike>
                <ButtonLink href="/contact" variant="onHot">
                  Start a project
                </ButtonLink>
              </SparkStrike>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
