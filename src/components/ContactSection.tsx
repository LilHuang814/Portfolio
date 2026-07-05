"use client";

import { useLanguage } from "@/lib/language";

export function ContactSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative mx-3 my-6 overflow-hidden rounded-[2rem] sm:mx-6 sm:my-10">
      <div className="gradient-mesh-contact relative flex min-h-[420px] flex-col items-center justify-center gap-10 px-6 py-14 sm:px-10 sm:py-16">
        <div className="grain-overlay" />

        <h2 className="relative z-10 text-5xl font-bold tracking-tight text-white drop-shadow-sm sm:text-7xl">
          contact me
        </h2>

        <div className="relative z-10 flex flex-col items-center gap-6 text-center text-white sm:flex-row sm:items-start sm:justify-center sm:gap-16 sm:text-left">
          <div>
            <p className="eyebrow text-white/70">{lang === "zh" ? "邮箱" : "Email"}</p>
            <a href="mailto:sh835@cornell.edu" className="mt-1 block text-lg font-medium">
              sh835@cornell.edu
            </a>
          </div>
          <div>
            <p className="eyebrow text-white/70">{lang === "zh" ? "地点" : "Location"}</p>
            <p className="mt-1 text-lg font-medium">
              {lang === "zh" ? "湾区 · 上海" : "Bay Area · Shanghai"}
            </p>
          </div>
          <div>
            <p className="eyebrow text-white/70">{lang === "zh" ? "领英" : "LinkedIn"}</p>
            <a
              href="https://linkedin.com/in/lilyshiyihuang/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-lg font-medium"
            >
              linkedin.com/in/lilyshiyihuang/
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
