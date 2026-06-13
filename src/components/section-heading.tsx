export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="text-ember mb-3 text-sm font-medium tracking-widest uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
      {children ? <p className="text-ash mt-4">{children}</p> : null}
    </div>
  );
}
