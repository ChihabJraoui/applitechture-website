import Link from "next/link";
import { Container } from "@/components/container";
import { HeaderChrome } from "@/components/header-chrome";
import { Magnetic } from "@/components/motion/magnetic";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/content/site";

const nav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export function Header() {
  return (
    <HeaderChrome>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={`${site.name} home`}>
          <Wordmark />
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-7">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ash hover:text-warm-white text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Magnetic>
            <Link
              href="/contact"
              className="bg-ember text-warm-white hover:bg-ember/90 active:bg-ember-dark hidden rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors sm:inline-block"
            >
              Start a project
            </Link>
          </Magnetic>
        </nav>
      </Container>
    </HeaderChrome>
  );
}
