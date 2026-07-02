"use client";

import { Target, MapPin, Briefcase, Mail, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language";

const META = [
  {
    icon: Target,
    label: { en: "Focus", zh: "专注方向" },
    value: { en: "AI product design, 0→1, user research", zh: "AI 产品设计、0→1、用户研究" },
  },
  {
    icon: MapPin,
    label: { en: "Location", zh: "所在地" },
    value: { en: "Bay Area, Shanghai", zh: "湾区、上海" },
  },
  {
    icon: Briefcase,
    label: { en: "Experience", zh: "经历" },
    value: { en: "Riot Games, JPMorgan Chase, WisdomPlan", zh: "Riot Games、JPMorgan Chase、WisdomPlan" },
  },
  {
    icon: Mail,
    label: { en: "Contact", zh: "联系方式" },
    value: { en: "sh835@cornell.edu", zh: "sh835@cornell.edu" },
  },
] as const;

export function ResumeCard() {
  const { lang } = useLanguage();

  return (
    <section className="relative mx-3 my-6 overflow-hidden rounded-[2rem] bg-card px-6 py-10 shadow-sm sm:mx-6 sm:my-10 sm:px-10 sm:py-12 lg:px-14">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-orange" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#c9c6c0]" />
        <span className="h-2.5 w-2.5 rounded-full bg-lavender" />
        <div
          className="ml-4 h-px flex-1"
          style={{ background: "linear-gradient(90deg, var(--periwinkle), var(--peach), var(--orange))" }}
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1px_1fr] lg:items-start">
        <div>
          <h2 className="text-5xl font-bold tracking-tight text-ink">Lily Huang</h2>
          <p className="eyebrow mt-4 text-muted-ink">
            {lang === "zh" ? "产品设计师" : "Product Designer"}
          </p>
          <p
            className="mt-6 max-w-lg border-l-2 border-transparent pl-4 text-lg leading-relaxed text-ink/90"
            style={{ borderImage: "linear-gradient(180deg, var(--periwinkle), var(--peach), var(--orange)) 1" }}
          >
            {lang === "zh"
              ? "在 AI、产品策略与以人为本的设计交汇处，打造有温度、有思考的数字体验。"
              : "Designing thoughtful digital experiences at the intersection of AI, product strategy, and human-centered design."}
          </p>
        </div>

        <div className="hidden bg-ink/10 lg:block" />

        <div>
          <p className="eyebrow text-muted-ink">{lang === "zh" ? "教育背景" : "Education"}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-orange/40 text-[10px] font-bold text-orange">
              CU
            </div>
            <div>
              <p className="text-lg font-semibold text-ink">
                {lang === "zh" ? "康奈尔大学" : "Cornell University"}
              </p>
              <p className="text-sm text-muted-ink">B.A. + M.P.S.</p>
              <p className="text-sm text-muted-ink">
                {lang === "zh" ? "信息科学" : "in Information Science"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 border-t border-ink/5 pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {META.map(({ label, icon: Icon, value }) => (
          <div key={label.en}>
            <div className="eyebrow flex items-center gap-2 text-muted-ink">
              <Icon className="h-3.5 w-3.5" />
              {label[lang]}
              <span className="h-1 w-1 rounded-full bg-orange" />
            </div>
            <p className="mt-2 text-sm text-ink/90">{value[lang]}</p>
          </div>
        ))}
      </div>

      <div className="gradient-pill relative mt-10 flex items-center justify-between overflow-hidden rounded-full px-6 py-4 sm:px-8">
        <div className="grain-overlay" />
        <p className="relative z-10 flex items-center gap-2 text-sm font-medium text-white sm:text-base">
          <span aria-hidden>✦</span>
          {lang === "zh"
            ? "用户同理心。策略清晰度。可衡量的影响。"
            : "User empathy. Strategic clarity. Measurable impact."}
        </p>
        <ArrowUpRight className="relative z-10 h-5 w-5 text-white" />
      </div>
    </section>
  );
}
