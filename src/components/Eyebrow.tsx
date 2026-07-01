const DOT_COLOR = {
  orange: "bg-orange",
  periwinkle: "bg-periwinkle",
} as const;

export function Eyebrow({
  label,
  color = "orange",
  className = "",
}: {
  label: string;
  color?: keyof typeof DOT_COLOR;
  className?: string;
}) {
  return (
    <div className={`eyebrow flex items-center gap-2 text-muted-ink ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_COLOR[color]}`} />
      {label}
    </div>
  );
}
