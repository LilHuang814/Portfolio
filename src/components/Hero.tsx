"use client";

import { useLanguage } from "@/lib/language";

export function Hero() {
  const { lang, setLang } = useLanguage();

  return (
    <section className="relative mx-3 mt-3 overflow-hidden rounded-[2rem] sm:mx-6 sm:mt-6">
      <div className="gradient-mesh relative flex min-h-[620px] flex-col justify-between px-6 py-8 sm:px-10 sm:py-10">
        <div className="grain-overlay" />

        <nav className="relative z-10 flex items-center justify-between">
          <span className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#4a57d0] shadow-sm">
            LH
          </span>

          <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-sm">
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
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#4a57d0] shadow-sm transition hover:bg-white/90"
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
