export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`text-xl font-semibold tracking-tight ${className}`}>
      applitechture<span className="text-ember">.</span>
    </span>
  );
}
