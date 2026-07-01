export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-[420px] w-[210px] flex-col overflow-hidden rounded-[2rem] border-8 border-ink/90 bg-white shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
