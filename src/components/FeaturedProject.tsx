"use client";

import Link from "next/link";
import { Eyebrow } from "./Eyebrow";
import { useLanguage } from "@/lib/language";

type Bilingual<T> = { en: T; zh: T };

export function FeaturedProject({
  eyebrowColor,
  title,
  description,
  tags,
  tagVariant = "plain",
  href,
  children,
}: {
  eyebrowColor: "orange" | "periwinkle";
  title: string;
  description: Bilingual<string>;
  tags: Bilingual<string[]>;
  tagVariant?: "plain" | "lavender";
  href?: string;
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();

  return (
    <section className="relative mx-3 px-6 py-14 sm:mx-6 sm:px-10 sm:py-16 lg:px-14">
      <div className="relative z-10 grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-12">
        <div className="flex flex-col">
          <Eyebrow label={lang === "zh" ? "精选项目" : "Featured Project"} color={eyebrowColor} />
          {href ? (
            <Link href={href} className="mt-3 flex w-fit flex-col items-start sm:mt-6 transition hover:opacity-80">
              <h2 className="text-[clamp(1.95rem,9vw,2.15rem)] font-bold leading-[1.05] tracking-tight text-ink sm:text-[clamp(2.2rem,3.75vw,3.4rem)]">{title}</h2>
              <div className="mt-3 h-[3px] w-full rounded-full gradient-bar" />
            </Link>
          ) : (
            <div className="mt-3 flex w-fit flex-col items-start sm:mt-6">
              <h2 className="text-[clamp(1.95rem,9vw,2.15rem)] font-bold leading-[1.05] tracking-tight text-ink sm:text-[clamp(2.2rem,3.75vw,3.4rem)]">{title}</h2>
              <div className="mt-3 h-[3px] w-full rounded-full gradient-bar" />
            </div>
          )}
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted-ink">
            {description[lang]}
          </p>

          <div className="mt-4 sm:mt-5">
            <span className="text-sm font-semibold text-ink">
              {lang === "zh" ? "职责范围" : "Scope of responsibilities"}
            </span>
            <div className="mt-3 flex flex-wrap gap-x-2 gap-y-2 lg:max-w-md">
              {tags[lang].map((tag) => (
                <span
                  key={tag}
                  className={
                    tagVariant === "lavender"
                      ? "whitespace-nowrap rounded-full bg-[#eeeafb] px-3.5 py-1.5 text-sm leading-none text-periwinkle"
                      : "whitespace-nowrap rounded-full border border-ink/5 bg-white/45 px-3.5 py-1.5 text-sm leading-none text-ink/80"
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          {href ? (
            <Link href={href} className="block w-full transition hover:opacity-95">
              {children}
            </Link>
          ) : (
            children
          )}
        </div>
      </div>
    </section>
  );
}
