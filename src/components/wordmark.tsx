export function Wordmark({ className = "text-xl" }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-tight ${className}`}>
      applitechture<span className="text-terracotta">.</span>
    </span>
  );
}
