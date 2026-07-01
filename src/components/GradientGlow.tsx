export function GradientGlow({
  bias = "cool",
  className = "",
}: {
  bias?: "cool" | "warm";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${
        bias === "cool" ? "glow-cool" : "glow-warm"
      } ${className}`}
    >
      <div className="grain-overlay" />
    </div>
  );
}
