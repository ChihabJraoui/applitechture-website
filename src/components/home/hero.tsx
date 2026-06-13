import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SplitHeading>
          <h1
            data-split
            className="font-display max-w-3xl text-5xl leading-tight sm:text-6xl"
          >
            Good software, <em className="text-ember">built with care.</em>
          </h1>
        </SplitHeading>
        <Reveal delay={0.5}>
          <p className="text-ash mt-6 max-w-xl text-lg">{site.description}</p>
        </Reveal>
        <Reveal delay={0.65}>
          <div className="mt-9 flex items-center gap-6">
            <Magnetic>
              <ButtonLink href="/contact">Start a project</ButtonLink>
            </Magnetic>
            <ButtonLink href="/services" variant="ghost">
              See what we do →
            </ButtonLink>
          </div>
        </Reveal>
        <div aria-hidden className="mt-20 flex justify-center">
          <div className="scroll-cue border-char-light h-10 w-6 rounded-full border">
            <div className="bg-ember mx-auto mt-2 h-2 w-1 rounded-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
