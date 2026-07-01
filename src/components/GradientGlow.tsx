export function GradientGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`glow-periwinkle-cream pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}
