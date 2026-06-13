import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <h1 className="font-display max-w-3xl text-5xl leading-tight sm:text-6xl">
          Good software, <em className="text-ember">built with care.</em>
        </h1>
        <p className="text-ash mt-6 max-w-xl text-lg">{site.description}</p>
        <div className="mt-9 flex items-center gap-6">
          <ButtonLink href="/contact">Start a project</ButtonLink>
          <ButtonLink href="/services" variant="ghost">
            See what we do →
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
