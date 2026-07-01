import { FileText, Check, Sparkles, Smartphone } from "lucide-react";

function ConceptCard({
  badge,
  title,
  description,
  icon,
}: {
  badge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-6 rounded-2xl border border-ink/5 bg-[#f7f6fb] p-6">
      <span className="w-fit rounded-full bg-periwinkle px-4 py-1.5 text-xs font-semibold text-white">
        {badge}
      </span>

      <div className="flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-periwinkle/15 to-lavender/25">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
          {icon}
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold text-ink">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-ink">{description}</p>
      </div>
    </div>
  );
}

export function JPMorganCards() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-6">
      <ConceptCard
        badge="Requestor"
        title="Streamlined Intake"
        description="Standardized request forms and workflows reduce back-and-forth communication and speed up kickoff."
        icon={
          <div className="relative">
            <FileText className="h-7 w-7 text-periwinkle" />
            <Check className="absolute -right-2 -top-2 h-3.5 w-3.5 rounded-full bg-periwinkle p-0.5 text-white" />
          </div>
        }
      />
      <ConceptCard
        badge="Heuristics"
        title="Smart Guidance"
        description="Contextual suggestions and documentation help teams submit complete, high-quality requests with ease."
        icon={
          <div className="relative">
            <Smartphone className="h-7 w-7 text-periwinkle" />
            <Sparkles className="absolute -right-2 -top-2 h-3.5 w-3.5 rounded-full bg-lavender p-0.5 text-white" />
          </div>
        }
      />
    </div>
  );
}
