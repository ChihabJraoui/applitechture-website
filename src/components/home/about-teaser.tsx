import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/motion/reveal";

export function AboutTeaser() {
  return (
    <section className="py-20">
      <Container className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        <Reveal>
          <div
            aria-hidden
            className="bg-char font-display text-ember flex h-28 w-28 shrink-0 items-center justify-center rounded-full text-3xl"
          >
            CJ
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-ember mb-3 text-sm font-medium tracking-widest uppercase">
            Who&apos;s behind this
          </p>
          <p className="font-display max-w-2xl text-2xl leading-snug">
            Applitechture is run by Chihab Jraoui — an engineer who&apos;d
            rather show you working software than a slide deck.
          </p>
          <div className="mt-5">
            <ButtonLink href="/about" variant="ghost">
              More about the studio →
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
