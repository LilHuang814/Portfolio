import { Eyebrow } from "./Eyebrow";
import { PillTag } from "./PillTag";
import { GradientGlow } from "./GradientGlow";

export function FeaturedProject({
  eyebrowColor,
  title,
  description,
  tags,
  glowBias,
  children,
}: {
  eyebrowColor: "orange" | "periwinkle";
  title: string;
  description: string;
  tags: string[];
  glowBias: "cool" | "warm";
  children: React.ReactNode;
}) {
  return (
    <section className="relative mx-3 my-6 overflow-hidden rounded-[2rem] bg-card px-6 py-14 shadow-sm sm:mx-6 sm:my-10 sm:px-10 sm:py-16 lg:px-14">
      <GradientGlow bias={glowBias} className="-left-24 -top-24 h-[420px] w-[420px]" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <div className="flex flex-col gap-5">
          <Eyebrow label="Featured Project" color={eyebrowColor} />
          <h2 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </h2>
          <div className="h-12 w-1 rounded-full gradient-bar" />
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-ink">
            {description}
          </p>

          <div className="mt-2">
            <span className="eyebrow text-muted-ink">Scope</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <PillTag key={tag}>{tag}</PillTag>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">{children}</div>
      </div>
    </section>
  );
}
