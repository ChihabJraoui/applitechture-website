import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export function CtaBand() {
  return (
    <section className="cta-ember text-warm-white py-20">
      <Container className="text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl">
            Have an idea? <em className="text-ember">Let&apos;s talk.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-ash mx-auto mt-4 max-w-md">
            A free, no-obligation call about your project. Worst case, you leave
            with better questions.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8">
            <Magnetic>
              <ButtonLink href="/contact">Start a project</ButtonLink>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
