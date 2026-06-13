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
            className="bg-iron border-ember/40 font-display text-ember flex h-28 w-28 shrink-0 items-center justify-center rounded-full border text-3xl"
            style={{ boxShadow: "0 0 40px rgba(234,88,12,0.25)" }}
          >
            CJ
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-ember mb-3 font-mono text-xs font-medium tracking-[0.2em] uppercase">
            The smith
          </p>
          <p className="font-display max-w-2xl text-2xl leading-snug">
            Emberworks is run by Chihab Jraoui — an engineer who&apos;d rather
            show you working software than a slide deck.
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
