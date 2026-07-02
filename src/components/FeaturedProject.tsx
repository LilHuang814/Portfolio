"use client";

import { Eyebrow } from "./Eyebrow";
import { useLanguage } from "@/lib/language";

type Bilingual<T> = { en: T; zh: T };

export function FeaturedProject({
  eyebrowColor,
  title,
  description,
  tags,
  tagVariant = "plain",
  children,
}: {
  eyebrowColor: "orange" | "periwinkle";
  title: string;
  description: Bilingual<string>;
  tags: Bilingual<string[]>;
  tagVariant?: "plain" | "lavender";
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();

  return (
    <section className="relative mx-3 px-6 py-14 sm:mx-6 sm:px-10 sm:py-16 lg:px-14">
      <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-12">
        <div className="flex flex-col">
          <Eyebrow label={lang === "zh" ? "精选项目" : "Featured Project"} color={eyebrowColor} />
          <div className="mt-6 flex w-fit flex-col items-start">
            <h2 className="text-[clamp(1.9rem,3.75vw,3.4rem)] font-bold leading-[1.05] tracking-tight text-ink">{title}</h2>
            <div className="mt-3 h-[3px] w-full rounded-full gradient-bar" />
          </div>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted-ink">
            {description[lang]}
          </p>

          <div className="mt-8">
            <span className="text-sm font-semibold text-ink">
              {lang === "zh" ? "职责范围" : "Scope of responsibilities"}
            </span>
            <div className="mt-3 flex flex-wrap gap-2.5 lg:max-w-sm">
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
