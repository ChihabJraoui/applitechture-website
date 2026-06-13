export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`text-xl font-semibold tracking-tight ${className}`}>
      emberworks
      <span
        className="text-ember"
        style={{ textShadow: "0 0 10px rgba(251,146,60,0.85)" }}
      >
        .
      </span>
    </span>
  );
}
