"use client";

import Image from "next/image";
import { Target, MapPin, Briefcase, Mail } from "lucide-react";
import { useLanguage } from "@/lib/language";

const META = [
  {
    icon: Target,
    label: { en: "Focus", zh: "专注方向" },
    value: { en: "AI product design, 0→1, user research", zh: "AI 产品设计、孵化新品、用户研究" },
  },
  {
    icon: MapPin,
    label: { en: "Location", zh: "所在地" },
    value: { en: "Bay Area, Shanghai", zh: "湾区、上海" },
  },
  {
    icon: Briefcase,
    label: { en: "Experience", zh: "经历" },
    value: {
      en: "WisdomPlan, Riot Games, JPMorgan Chase, NetEase Games",
      zh: "WisdomPlan、拳头游戏、摩根大通银行、网易游戏",
    },
  },
  {
    icon: Mail,
    label: { en: "Contact", zh: "联系方式" },
    value: {
      en: "sh835@cornell.edu\n607-262-5141",
      zh: "sh835@cornell.edu\n+86 189-0189-9696",
    },
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

      <div className="mt-12">
        <h2 className="text-[clamp(1.9rem,3.75vw,3.4rem)] font-bold leading-[1.05] tracking-tight text-ink">hi, i&rsquo;m lily</h2>

        <div className="mt-6 grid gap-10 lg:grid-cols-[2fr_1px_1fr] lg:items-start">
          <div>
            <p className="eyebrow text-muted-ink">
              {lang === "zh" ? "产品设计师" : "Product Designer"}
            </p>
            <p
              className="mt-6 max-w-lg border-l-2 border-transparent pl-4 text-lg leading-relaxed text-ink"
              style={{ borderImage: "linear-gradient(180deg, var(--periwinkle), var(--peach), var(--orange)) 1" }}
            >
              {lang === "zh"
                ? "深耕 AI 原生产品与人机交互设计，擅长以用户研究为根基重构完整任务流程，把复杂的 AI 能力转化为自然流畅、落地可行的产品体验。"
                : "Designing thoughtful digital experiences at the intersection of AI, product strategy, and human-centered design."}
            </p>
          </div>

          <div className="hidden bg-ink/10 lg:block" />

          <div>
            <p className="eyebrow text-muted-ink">{lang === "zh" ? "教育背景" : "Education"}</p>
            <div className="mt-6 flex items-start gap-4">
              <Image
                src="/projects/cornell.png"
                alt="Cornell University"
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 object-contain"
              />
              <div>
                <p className="text-lg font-semibold text-ink">
                  {lang === "zh" ? "康奈尔大学" : "Cornell University"}
                </p>
                <p className="text-base text-muted-ink">B.A. + M.P.S.</p>
                <p className="text-base text-muted-ink">
                  {lang === "zh" ? "信息科学" : "in Information Science"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-8 border-t border-ink/5 pt-6 sm:mt-12 sm:grid-cols-2 sm:pt-8 lg:grid-cols-4 lg:gap-x-16">
        {META.map(({ label, icon: Icon, value }) => (
          <div key={label.en}>
            <div className="eyebrow flex items-center gap-2 text-muted-ink">
              <Icon className="h-3.5 w-3.5" />
              {label[lang]}
              <span className="h-1 w-1 rounded-full bg-orange" />
            </div>
            <p className="mt-2 whitespace-pre-line text-base text-muted-ink">{value[lang]}</p>
          </div>
        ))}
      </div>

      <div className="gradient-pill relative mt-10 flex items-center justify-between overflow-hidden rounded-full px-6 py-4 sm:px-8">
        <div className="grain-overlay" />
        <p className="relative z-10 flex items-center gap-2 text-sm font-medium text-white">
          <span aria-hidden>✦</span>
          {lang === "zh"
            ? "以用户洞察锚定真实痛点，以系统化设计策略打造流畅体验，以产品长期正向改变定义设计价值。"
            : "Curious by research. Strategic by design. Driven by impact."}
        </p>
      </div>
    </section>
  );
}
