"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language";

export function Hero() {
  const { lang, setLang } = useLanguage();

  return (
    <section className="relative mx-3 mt-3 overflow-hidden rounded-[2rem] sm:mx-6 sm:mt-6">
      <div className="gradient-mesh relative flex min-h-[620px] flex-col justify-between px-6 pb-8 pt-5 sm:px-10 sm:pb-10 sm:pt-6">
        <div className="grain-overlay" />

        <nav className="relative z-10 grid grid-cols-3 items-center">
          <span className="flex items-center justify-self-start rounded-full bg-white px-4 py-1.5 shadow-sm">
            <Image
              src="/projects/logo.png"
              alt="Lily Huang"
              width={1084}
              height={980}
              priority
              className="h-7 w-auto"
            />
          </span>

          <div className="flex items-center gap-2 justify-self-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-sm">
            <button
              type="button"
              onClick={() => setLang("zh")}
              className={lang === "zh" ? "text-[#4a57d0]" : "text-ink/60"}
            >
              中文
            </button>
            <span className="text-ink/25">|</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={lang === "en" ? "text-[#4a57d0]" : "text-ink/60"}
            >
              English
            </button>
          </div>

          <a
            href="/resume"
            className="justify-self-end rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#4a57d0] shadow-sm transition hover:bg-white/90"
          >
            {lang === "zh" ? "简历" : "Resume"}
          </a>
        </nav>

        <div className="relative z-10 flex flex-1 items-center justify-center py-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-sm sm:text-7xl">
            lily&rsquo;s portfolio
          </h1>
        </div>
      </div>
    </section>
  );
}
