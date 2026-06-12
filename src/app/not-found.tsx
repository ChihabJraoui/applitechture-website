import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="py-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-display text-5xl">
            Page not <em className="text-terracotta">found.</em>
          </h1>
          <p className="text-stone mt-4">
            This page doesn&apos;t exist — but the studio does.
          </p>
          <div className="mt-8">
            <ButtonLink href="/">Back home</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
