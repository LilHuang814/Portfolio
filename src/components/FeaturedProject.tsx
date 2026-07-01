"use client";

import { Eyebrow } from "./Eyebrow";
import { GradientGlow } from "./GradientGlow";
import { useLanguage } from "@/lib/language";

type Bilingual<T> = { en: T; zh: T };

export function FeaturedProject({
  eyebrowColor,
  title,
  description,
  tags,
  tagVariant = "plain",
  glowBias,
  children,
}: {
  eyebrowColor: "orange" | "periwinkle";
  title: string;
  description: Bilingual<string>;
  tags: Bilingual<string[]>;
  tagVariant?: "plain" | "lavender";
  glowBias: "cool" | "warm";
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();

  return (
    <section className="relative mx-3 my-6 overflow-hidden rounded-[2rem] bg-card px-6 py-14 shadow-sm sm:mx-6 sm:my-10 sm:px-10 sm:py-16 lg:px-14">
      <GradientGlow bias={glowBias} className="-left-24 -top-24 h-[420px] w-[420px]" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="flex flex-col">
          <Eyebrow label={lang === "zh" ? "精选项目" : "Featured Project"} color={eyebrowColor} />
          <h2 className="mt-6 text-5xl font-bold tracking-tight text-ink sm:text-6xl">
            {title}
          </h2>
          <div className="mt-6 h-[3px] w-40 rounded-full gradient-bar" />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted-ink">
            {description[lang]}
          </p>

          <div className="mt-8">
            <span className="text-sm font-semibold text-ink">
              {lang === "zh" ? "职责范围" : "Scope"}
            </span>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {tags[lang].map((tag) => (
                <span
                  key={tag}
                  className={
                    tagVariant === "lavender"
                      ? "rounded-full bg-[#eeeafb] px-4 py-2 text-sm text-periwinkle"
                      : "rounded-full border border-ink/5 bg-white px-4 py-2 text-sm text-ink/80 shadow-sm"
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">{children}</div>
      </div>
    </section>
  );
}
