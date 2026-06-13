import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Faint ember forge-grid — the surviving blueprint, in heat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 47px, rgba(234,88,12,0.05) 47px 48px), repeating-linear-gradient(90deg, transparent 0 47px, rgba(234,88,12,0.05) 47px 48px)",
          maskImage:
            "radial-gradient(120% 90% at 18% 38%, #000 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 18% 38%, #000 0%, transparent 72%)",
        }}
      />
      <Container className="relative">
        <p
          aria-hidden="true"
          className="text-ember mb-6 font-mono text-xs tracking-[0.2em] uppercase"
        >
          01 · First heat — ≈550°C
        </p>
        <SplitHeading>
          <h1
            data-split
            className="font-display max-w-4xl text-6xl leading-[1.04] tracking-tight sm:text-7xl lg:text-8xl"
          >
            Good software, <em className="text-ember not-italic">forged</em>{" "}
            with care.
          </h1>
        </SplitHeading>
        <Reveal delay={0.5}>
          <p className="text-ash mt-8 max-w-xl text-lg">{site.description}</p>
        </Reveal>
        <Reveal delay={0.65}>
          <div className="mt-10 flex items-center gap-6">
            <Magnetic>
              <ButtonLink href="/contact">Start a project</ButtonLink>
            </Magnetic>
            <ButtonLink href="/services" variant="ghost">
              See what we forge →
            </ButtonLink>
          </div>
        </Reveal>
        <div aria-hidden className="mt-20 flex justify-center">
          <div className="scroll-cue border-scale h-10 w-6 rounded-full border">
            <div className="bg-ember mx-auto mt-2 h-2 w-1 rounded-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
