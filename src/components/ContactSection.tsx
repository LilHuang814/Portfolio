"use client";

import { useLanguage } from "@/lib/language";

export function ContactSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative mx-3 my-6 overflow-hidden rounded-[2rem] sm:mx-6 sm:my-10">
      <div className="gradient-mesh-contact relative flex min-h-[420px] flex-col justify-between px-6 py-8 sm:px-10 sm:py-10">
        <div className="grain-overlay" />

        <div className="relative z-10 flex flex-1 items-center justify-center py-16 text-center">
          <h2 className="text-5xl font-bold tracking-tight text-white drop-shadow-sm sm:text-7xl">
            {lang === "zh" ? "联系我" : "contact me"}
          </h2>
        </div>

        <div className="relative z-10 flex flex-col gap-6 text-white sm:flex-row sm:items-end sm:justify-start sm:gap-16">
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
            <p className="eyebrow text-white/70">{lang === "zh" ? "状态" : "Currently"}</p>
            <p className="mt-1 text-lg font-medium">
              {lang === "zh" ? "开放产品设计机会" : "Open to product design roles"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
