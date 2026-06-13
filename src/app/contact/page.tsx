import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/content/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project — we reply within one business day.",
};

export default function ContactPage() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div>
              <h1 className="font-display text-4xl sm:text-5xl">
                Let&apos;s <em className="text-ember">talk.</em>
              </h1>
              <p className="text-ash mt-5">
                A few sentences about your business and what&apos;s in the way.
                No preparation needed — plain language welcome.
              </p>
              <p className="text-ash mt-5 text-sm">
                Prefer email?{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-ember hover:underline"
                >
                  {site.email}
                </a>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
