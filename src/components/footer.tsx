import Link from "next/link";
import { Container } from "@/components/container";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-scale bg-forge-black border-t">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Wordmark />
          <p className="text-ash mt-2 max-w-xs text-sm">{site.tagline}</p>
        </div>
        <nav aria-label="Footer" className="text-ash flex gap-6 text-sm">
          <Link href="/services" className="link-sweep hover:text-warm-white">
            Services
          </Link>
          <Link href="/about" className="link-sweep hover:text-warm-white">
            About
          </Link>
          <Link href="/contact" className="link-sweep hover:text-warm-white">
            Contact
          </Link>
        </nav>
        <div className="text-ash text-sm">
          <a
            href={`mailto:${site.email}`}
            className="text-ember hover:underline"
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
