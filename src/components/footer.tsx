import Link from "next/link";
import { Container } from "@/components/container";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-sand-dark bg-cream border-t">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Wordmark />
          <p className="text-stone mt-2 max-w-xs text-sm">{site.tagline}</p>
        </div>
        <nav aria-label="Footer" className="text-stone flex gap-6 text-sm">
          <Link href="/services" className="hover:text-ink">
            Services
          </Link>
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
          <Link href="/contact" className="hover:text-ink">
            Contact
          </Link>
        </nav>
        <div className="text-stone text-sm">
          <a
            href={`mailto:${site.email}`}
            className="text-terracotta hover:underline"
          >
            {site.email}
          </a>
          <p className="mt-1">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
