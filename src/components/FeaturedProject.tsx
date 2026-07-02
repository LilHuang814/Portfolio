"use client";

import { useRef } from "react";
import { Eyebrow } from "./Eyebrow";
import { useLanguage } from "@/lib/language";

type Bilingual<T> = { en: T; zh: T };

// The interactive glow div is inset by this many px on every side so the
// radial can bleed past the section edges into the page background.
const GLOW_INSET = 160;

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
  const glowRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const el = glowRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left + GLOW_INSET}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top + GLOW_INSET}px`);
  }

  return (
    <section
      onMouseMove={handleMove}
      className="relative mx-3 px-6 py-14 sm:mx-6 sm:px-10 sm:py-16 lg:px-14"
    >
      <div
        ref={glowRef}
        aria-hidden
        className="interactive-glow pointer-events-none absolute -inset-40"
      />

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
            <div className="mt-3 flex max-w-sm flex-wrap gap-2.5">
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
