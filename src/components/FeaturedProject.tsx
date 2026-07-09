"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { useLanguage } from "@/lib/language";

type Bilingual<T> = { en: T; zh: T };

/** Small logo beside the project title. Drop a PNG at `src` and it appears
    automatically; until then a dashed placeholder marks the spot. */
function TitleLogo({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) {
    return (
      <span
        title={src}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-dashed border-ink/20 bg-white/50 text-muted-ink sm:h-12 sm:w-12"
      >
        <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-9 w-auto shrink-0 object-contain sm:h-12"
    />
  );
}

export function FeaturedProject({
  eyebrowColor,
  title,
  logo,
  description,
  tags,
  tagVariant = "plain",
  href,
  children,
}: {
  eyebrowColor: "orange" | "periwinkle";
  title: string | Bilingual<string>;
  logo?: string;
  description: Bilingual<string>;
  tags: Bilingual<string[]>;
  tagVariant?: "plain" | "lavender";
  href?: string;
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();
  const titleText = typeof title === "string" ? title : title[lang];

  const titleRow = (
    <>
      <div className="flex items-center gap-3 sm:gap-4">
        {logo && <TitleLogo src={logo} alt={`${titleText} logo`} />}
        <h2 className="text-[clamp(2.3rem,10.5vw,2.6rem)] font-bold leading-[1.05] tracking-tight text-ink sm:text-[clamp(2.2rem,3.75vw,3.4rem)]">
          {titleText}
        </h2>
      </div>
      <div className="mt-3 h-[3px] w-full rounded-full gradient-bar" />
    </>
  );

  return (
    <section className="relative mx-3 px-6 py-14 sm:mx-6 sm:px-10 sm:py-16 lg:px-14">
      <div className="relative z-10 grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-12">
        <div className="flex flex-col">
          <Eyebrow label={lang === "zh" ? "精选项目" : "Featured Project"} color={eyebrowColor} />
          {href ? (
            <Link href={href} className="mt-3 flex w-fit flex-col items-start sm:mt-6 transition hover:opacity-80">
              {titleRow}
            </Link>
          ) : (
            <div className="mt-3 flex w-fit flex-col items-start sm:mt-6">{titleRow}</div>
          )}
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink">
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
