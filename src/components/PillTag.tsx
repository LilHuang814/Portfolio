export function PillTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#efeae0] px-4 py-2 text-sm text-ink/80">
      {children}
    </span>
  );
}
