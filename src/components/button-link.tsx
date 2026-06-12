import Link from "next/link";

const styles = {
  primary:
    "rounded-full bg-terracotta px-6 py-3 text-cream hover:bg-terracotta-dark",
  secondary: "rounded-full bg-ink px-6 py-3 text-cream hover:bg-terracotta",
  ghost: "py-3 text-terracotta hover:underline",
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
