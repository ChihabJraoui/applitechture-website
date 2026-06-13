import Link from "next/link";

const styles = {
  primary:
    "rounded-full bg-ember px-6 py-3 text-warm-white hover:bg-ember/90 active:bg-ember-dark",
  secondary:
    "rounded-full border border-char-light bg-char px-6 py-3 text-warm-white transition-colors hover:border-ember",
  ghost: "py-3 text-ember link-sweep",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof styles;
}) {
  return (
    <Link
      href={href}
      className={`inline-block text-sm font-medium transition-colors ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
