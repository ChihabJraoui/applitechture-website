import Link from "next/link";
import { Container } from "@/components/container";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/content/site";

const nav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export function Header() {
  return (
    <header className="border-char-light bg-coal border-b">
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
          <Link
            href="/contact"
            className="bg-ember text-warm-white hover:bg-ember/90 active:bg-terracotta-dark rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors"
          >
            Start a project
          </Link>
        </nav>
      </Container>
    </header>
  );
}
