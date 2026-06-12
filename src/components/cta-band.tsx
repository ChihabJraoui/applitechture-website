import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";

export function CtaBand() {
  return (
    <section className="bg-ink text-cream py-20">
      <Container className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl">
          Have an idea? <em className="text-terracotta">Let&apos;s talk.</em>
        </h2>
        <p className="text-cream/70 mx-auto mt-4 max-w-md">
          A free, no-obligation call about your project. Worst case, you leave
          with better questions.
        </p>
        <div className="mt-8">
          <ButtonLink href="/contact">Start a project</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
