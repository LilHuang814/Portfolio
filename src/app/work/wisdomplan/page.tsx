"use client";

import { useState, useEffect, useRef } from "react";
import {
  Users,
  Globe,
  TrendingUp,
  Layers,
  BadgeCheck,
  MessageCircle,
  Gauge,
  Target,
  Search,
  BookOpen,
  Network,
  Sparkles,
  Check,
  ImageIcon,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { SiteNav } from "@/components/SiteNav";
import { CursorGlow } from "@/components/CursorGlow";
import { ContactSection } from "@/components/ContactSection";
import { useLanguage, type Lang } from "@/lib/language";

type BL = { en: string; zh: string };
const t = (lang: Lang, v: BL) => v[lang];

/** Tracks whether an image loaded — robust to errors that fire before
    hydration (checks naturalWidth on mount). */
function useImgFallback() {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  return { ref, failed, onError: () => setFailed(true) };
}

/** Product screenshot. Drop a PNG at the given path and it appears automatically;
    until then it shows a labelled placeholder. */
function Shot({ src, label, className }: { src: string; label: string; className?: string }) {
  const { ref, failed, onError } = useImgFallback();
  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img ref={ref} src={src} alt={label} onError={onError} className={className ?? "w-full rounded-2xl"} />
    );
  }
  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-dashed border-ink/20 bg-white/50">
      <div className="flex flex-col items-center gap-2 text-center text-muted-ink">
        <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
        <span className="text-sm font-medium text-ink/70">{label}</span>
        <span className="text-xs text-muted-ink/70">{src}</span>
      </div>
    </div>
  );
}

/** WisdomPlan wordmark. Drop /projects/wisdomplan/logo.png and it replaces
    the text; until then the text wordmark shows. */
function LogoTitle() {
  const { ref, failed, onError } = useImgFallback();
  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        src="/projects/wisdomplan/logo.png"
        alt="WisdomPlan"
        onError={onError}
        className="mx-auto mt-2 h-6 w-auto sm:mt-6 sm:h-7 lg:mx-0 lg:h-8"
      />
    );
  }
  return (
    <div className="mt-6 flex h-14 w-44 items-center justify-center rounded-xl border border-dashed border-ink/20 bg-white/50">
      <div className="flex items-center gap-2 text-muted-ink">
        <ImageIcon className="h-5 w-5" strokeWidth={1.5} />
        <span className="text-xs font-medium text-ink/70">Logo</span>
      </div>
    </div>
  );
}

const heading = "text-[clamp(1.35rem,6vw,1.5rem)] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[clamp(1.95rem,3.4vw,2.6rem)]";

/** Decorative gradient line + dots — the home page's accent motif. */
function Flourish() {
  return (
    <div className="mt-5 flex items-center gap-2">
      <span className="h-[3px] w-14 rounded-full gradient-bar" />
      <span className="h-1.5 w-1.5 rounded-full bg-periwinkle" />
      <span className="h-1.5 w-1.5 rounded-full bg-peach" />
      <span className="h-1.5 w-1.5 rounded-full bg-orange" />
    </div>
  );
}

/** Small grid of muted dots — a quiet editorial background accent. */
function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none grid grid-cols-5 gap-2.5 ${className}`}>
      {Array.from({ length: 25 }).map((_, i) => (
        <span key={i} className="h-1 w-1 rounded-full bg-ink/15" />
      ))}
    </div>
  );
}

/* ------------------------------ content ------------------------------ */

const STATS: { icon: LucideIcon; value: string; label: BL }[] = [
  { icon: Users, value: "10K+", label: { en: "Global Learners", zh: "全球学习者" } },
  { icon: Globe, value: "100+", label: { en: "Countries", zh: "国家与地区" } },
  { icon: TrendingUp, value: "70%+", label: { en: "Learning Efficiency", zh: "学习效率提升" } },
];

const CHALLENGES: { icon: LucideIcon; title: BL; desc: BL }[] = [
  {
    icon: Layers,
    title: { en: "Scattered resources", zh: "学习资源分散" },
    desc: {
      en: "Hunting across many platforms is tiring and inefficient.",
      zh: "在多个平台之间搜寻的过程令人疲惫。",
    },
  },
  {
    icon: BadgeCheck,
    title: { en: "Uneven quality", zh: "资源质量参差不齐" },
    desc: {
      en: "Hard to tell which content is good and right for you.",
      zh: "难以快速判断哪些内容优质、靠谱、适合自己。",
    },
  },
  {
    icon: MessageCircle,
    title: { en: "Questions go unanswered", zh: "疑问无法快速解决" },
    desc: {
      en: "No quick, in-context answers, so it only gets more confusing.",
      zh: "没法根据内容快速得到问题的解答，越学越混乱。",
    },
  },
  {
    icon: Gauge,
    title: { en: "No effective assessment", zh: "缺乏有效的评估" },
    desc: {
      en: "Hard to gauge your current level against your learning goal.",
      zh: "难以判断当前能力水平与学习目标的差距。",
    },
  },
];

const PROBLEMS: { img: string; label: string; title: BL; points: BL[] }[] = [
  {
    img: "/projects/wisdomplan/problem-forums.png",
    label: "Forums / online courses",
    title: { en: "Forums / online courses", zh: "网络论坛 / 网课" },
    points: [
      { en: "High search cost, with uneven relevance.", zh: "搜索成本高，结果未必符合需求。" },
      { en: "Users must filter the quality themselves.", zh: "质量不稳定，需要自己筛选。" },
    ],
  },
  {
    img: "/projects/wisdomplan/problem-ai.png",
    label: "General AI like ChatGPT",
    title: { en: "General AI like ChatGPT", zh: "ChatGPT 等通用 AI" },
    points: [
      { en: "No context; users supply it manually.", zh: "缺乏上下文，需用户手动提供。" },
      { en: "No progress tracking or guidance.", zh: "无法追踪进度或引导学习。" },
    ],
  },
  {
    img: "/projects/wisdomplan/problem-tutor.png",
    label: "Private tutors / mentors",
    title: { en: "Private tutors / mentors", zh: "私教 / 导师" },
    points: [
      { en: "High cost and time barriers.", zh: "成本与时间门槛高。" },
      { en: "Feedback lacks immediacy.", zh: "学习体验缺乏及时性。" },
    ],
  },
];

const PERSONAS: { img: string; title: BL; desc: BL }[] = [
  {
    img: "/projects/wisdomplan/career-switcher.png",
    title: { en: "Career switchers", zh: "转行探索者" },
    desc: {
      en: "Entering a new field; needs a clear path and the skills that matter.",
      zh: "转行进入新领域，需要清晰的路径与关键技能。",
    },
  },
  {
    img: "/projects/wisdomplan/working-learners.png",
    title: { en: "Working learners", zh: "在职学习者" },
    desc: {
      en: "Upskilling on the job; needs flexible methods and trusted resources.",
      zh: "在职提升技能，需要灵活的方式与可靠的资源。",
    },
  },
  {
    img: "/projects/wisdomplan/student.png",
    title: { en: "Students & job seekers", zh: "大学求职者" },
    desc: {
      en: "Facing job and study pressure; needs a clear, focused path.",
      zh: "面对求职与学习压力，需要清晰、专注的路径。",
    },
  },
];

const FEATURES: { icon: LucideIcon; title: BL; shot: { src: string; label: string }; points: BL[] }[] = [
  {
    icon: Target,
    title: { en: "Set goals & assess level", zh: "设定目标，了解用户水平" },
    shot: { src: "/projects/wisdomplan/goal.png", label: "Set goals" },
    points: [
      { en: "AI analyzes the user's current level and goals to generate a personalized path.", zh: "AI 分析用户当前水平与学习目标，生成个性化学习路径。" },
      { en: "Breaks long-term goals into clearer, actionable milestones.", zh: "将长期学习目标拆解为更清晰、可执行的阶段任务。" },
      { en: "Low-friction guided interaction reduces the overwhelm of starting.", zh: "通过低门槛引导式交互，降低用户开始学习时的迷茫感。" },
    ],
  },
  {
    icon: Search,
    title: { en: "Personalized course picks", zh: "寻找并推荐个性化课程" },
    shot: { src: "/projects/wisdomplan/courses.png", label: "Course recommendations" },
    points: [
      { en: "AI aggregates relevant courses, exercises, and resources, cutting manual search.", zh: "AI 自动聚合相关课程、练习与学习资源，减少用户手动搜索与筛选成本。" },
      { en: "Content, AI answers, and the path live in one place for a continuous, immersive flow.", zh: "将学习内容、AI 解答与学习路径整合在同一界面中，保持连续沉浸的学习体验。" },
      { en: "Context-aware support tied to the current lesson aids understanding.", zh: "基于当前课程内容提供上下文关联支持，帮助用户更高效地理解与吸收知识。" },
    ],
  },
  {
    icon: BookOpen,
    title: { en: "Real-time AI guidance", zh: "实时 AI 解答与引导" },
    shot: { src: "/projects/wisdomplan/tutor.png", label: "AI tutor" },
    points: [
      { en: "AI understands the current lesson and context without the user re-explaining.", zh: "AI 自动理解当前课程内容与学习上下文，无需用户重复提供背景信息。" },
      { en: "Proactively suggests directions and study methods to lower the barrier to ask.", zh: "主动推荐提问方向与学习方式，降低用户主动提问门槛。" },
      { en: "A collapsible AI assistant keeps the view clean and the experience immersive.", zh: "可折叠式 AI 助手设计，减少视觉干扰并保持沉浸式学习体验。" },
    ],
  },
  {
    icon: MessageCircle,
    title: { en: "Staged quizzes & feedback", zh: "阶段测验与反馈" },
    shot: { src: "/projects/wisdomplan/quiz.png", label: "Quizzes & feedback" },
    points: [
      { en: "Staged quizzes and instant feedback confirm how well material is understood.", zh: "通过阶段测验与即时反馈，帮助用户确认知识掌握程度。" },
      { en: "AI generates explanations and study suggestions, cutting review effort.", zh: "AI 自动生成解析与学习建议，降低用户复盘与总结成本。" },
      { en: "Encouraging feedback and progress cues sustain long-term motivation.", zh: "结合鼓励式反馈与进度引导，提升长期学习动力与持续性。" },
    ],
  },
  {
    icon: Network,
    title: { en: "Connect & review knowledge", zh: "知识串联与复盘" },
    shot: { src: "/projects/wisdomplan/review.png", label: "Knowledge map" },
    points: [
      { en: "A visual path and node relationships build a clearer knowledge structure.", zh: "通过可视化学习路径与节点关系，帮助用户建立更清晰的知识结构。" },
      { en: "AI links courses and resources by progress into a continuous experience.", zh: "AI 根据学习进度动态串联课程与资源，形成连续的学习体验。" },
      { en: "Breaking complex content into modules lowers long-term cognitive load.", zh: "将复杂学习内容拆解为阶段模块，降低长期学习中的认知负担。" },
    ],
  },
];

/* ------------------------------ page ------------------------------ */

export default function WisdomPlanPage() {
  const { lang } = useLanguage();

  return (
    <main className="relative mx-auto w-full max-w-[90rem] overflow-x-clip pb-6">
      <CursorGlow />

      {/* Big radial halo, anchored off the top-right; the hero floats above it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-160px] top-[-320px] h-[900px] w-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, #ACAFFF 0%, #F2CEFF 30%, #FFE4D9 48%, #F4F0E8 74%)",
        }}
      />

      <SiteNav />

      {/* Hero */}
      <section className="relative mx-3 mt-4 rounded-[2rem] bg-white/55 px-6 pb-12 pt-6 sm:mx-6 sm:mt-6 sm:px-10 sm:py-16 lg:px-14">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div className="text-center lg:text-left">
            <LogoTitle />
            {/* On narrow widths the image sits between the logo and the title */}
            <Shot
              src="/projects/wisdomplan/hero.png"
              label="WisdomPlan product"
              className="mx-auto mt-6 max-h-[380px] w-auto rounded-2xl object-contain lg:hidden"
            />
            <p className="mt-8 text-[clamp(1.5rem,7.5vw,1.7rem)] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[clamp(1.95rem,3.4vw,2.6rem)] lg:mt-5">
              {lang === "zh" ? "在 AI 时代，重新定义学习" : "Redefining learning in the age of AI"}
            </p>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-ink sm:text-lg lg:mx-0">
              {lang === "zh"
                ? "WisdomPlan 通过 AI 推荐、学习路径与实时辅助，构建更智能、更有陪伴感的成长体验。"
                : "WisdomPlan uses AI recommendations, learning paths, and real-time assistance to build a smarter, more supportive growth experience."}
            </p>

            <div
              className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full py-2.5 pl-5 pr-11 lg:mx-0"
              style={{ background: "linear-gradient(90deg, #646FD9, #B79ED1, #E0AC9F)" }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                <Sparkles className="h-6 w-6" />
              </span>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold uppercase tracking-wide text-white sm:text-sm">
                  {lang === "zh" ? "#1 本月最佳产品" : "#1 Product of the Month"}
                </p>
                <p className="text-base font-semibold text-white sm:text-lg">{lang === "zh" ? "教育品类" : "Education"}</p>
              </div>
            </div>

          </div>

          <Shot
            src="/projects/wisdomplan/hero.png"
            label="WisdomPlan product"
            className="mx-auto hidden max-h-[520px] w-auto rounded-2xl object-contain lg:block"
          />
        </div>
      </section>

      {/* Impact stats */}
      <section className="relative mx-3 px-6 pb-8 pt-12 sm:mx-6 sm:px-10 sm:pb-14 sm:pt-20 lg:px-14 lg:pt-28">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
          {STATS.map(({ value, label }) => (
            <div key={value} className="text-center">
              <p className="text-[clamp(3.25rem,8vw,5.5rem)] font-bold leading-none text-[#B6A9E8]">
                {value}
              </p>
              <p className="mt-4 text-lg font-semibold sm:text-xl text-ink">{t(lang, label)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* User challenges */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <DotGrid className="absolute right-10 top-14 hidden lg:grid" />
        <Eyebrow label={lang === "zh" ? "用户挑战" : "User Challenges"} color="orange" className="!text-sm" />
        <h2 className={`mt-6 ${heading}`}>
          {lang === "zh" ? "学习时真正的困难，不只是学习本身" : "The real difficulty in learning isn't the learning itself"}
        </h2>
        <Flourish />

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-20">
          {CHALLENGES.map(({ icon: Icon, title, desc }) => (
            <div key={title.en} className="grid grid-rows-subgrid row-span-3 mb-6 sm:mb-8 lg:mb-0">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#787BD7] text-white">
                <Icon className="h-6 w-6" />
              </span>
              <p className="text-lg font-semibold sm:text-xl leading-snug text-ink">{t(lang, title)}</p>
              <p className="text-base leading-relaxed text-muted-ink">{t(lang, desc)}</p>
            </div>
          ))}
        </div>

      </section>

      {/* Our opportunity */}
      <section className="relative mx-3 px-6 py-6 sm:mx-6 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-white/55 px-8 py-10 sm:px-14 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-140px] top-[-140px] h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(182,169,232,0.55) 0%, rgba(243,193,159,0.28) 45%, rgba(239,234,251,0) 72%)",
            }}
          />
          <DotGrid className="absolute bottom-10 right-12 hidden lg:grid" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-periwinkle text-white">
                <Sparkles className="h-6 w-6" />
              </span>
              <Eyebrow label={lang === "zh" ? "我们的机会" : "Our opportunity"} color="periwinkle" className="!text-sm" />
            </div>
            <h2 className={`mt-6 ${heading}`}>
              {lang === "zh" ? "AI 驱动的机会" : "An AI-driven opportunity"}
            </h2>
            <Flourish />
            <p className="mt-6 text-base leading-relaxed text-muted-ink">
              {lang === "zh"
                ? "AI 与数据分析能缓解这些问题：结合用户目标、当前水平与学习内容，系统推荐下一步该学什么、快速解答疑问、设定合理目标并持续反馈进度，让学习更清晰、更高效。"
                : "AI and data analytics can ease these problems. By combining the user's goals, level, and learning content, the system recommends what to learn next, answers questions quickly, sets sensible goals, and reflects progress continuously."}
            </p>
          </div>
        </div>
      </section>

      {/* Problems in today's learning experience */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <h3 className="text-[clamp(1.2rem,5vw,1.35rem)] font-semibold text-ink sm:text-[clamp(1.5rem,2.7vw,1.9rem)]">
          {lang === "zh" ? "现有学习体验中的问题" : "Problems in today's learning experience"}
        </h3>

        <div className="mt-6 grid gap-10 sm:mt-12 sm:grid-cols-3 sm:gap-8">
          {PROBLEMS.map(({ img, label, title, points }) => (
            <div key={label} className="flex flex-col items-center">
              <Shot src={img} label={label} className="mx-auto w-full max-w-[280px] rounded-2xl" />
              <p className="mt-3 text-lg font-semibold sm:mt-7 sm:text-xl text-ink">{t(lang, title)}</p>
              <div className="mt-2 max-w-xs text-center">
                {points.map((p) => (
                  <p key={p.en} className="text-base leading-snug text-muted-ink">
                    {t(lang, p)}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Target users */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.45fr)] lg:items-center lg:gap-8">
          <div>
            <h3 className="text-[clamp(1.2rem,5vw,1.35rem)] font-semibold text-ink sm:text-[clamp(1.5rem,2.7vw,1.9rem)]">
              {lang === "zh" ? "目标用户" : "Target users"}
            </h3>
            <div className="mt-8 space-y-8">
              {PERSONAS.map((persona) => (
                <div key={persona.title.en}>
                  <p className="text-lg font-semibold sm:text-xl text-ink">{t(lang, persona.title)}</p>
                  <p className="mt-1.5 max-w-md text-base leading-relaxed text-muted-ink">
                    {t(lang, persona.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Shot src="/projects/wisdomplan/target-users.png" label="Target users" className="-mx-6 mt-2 w-[calc(100%+3rem)] max-w-none rounded-2xl sm:mx-0 sm:mt-0 sm:w-full" />
        </div>
      </section>

      {/* AI-driven flow */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <DotGrid className="absolute right-10 top-14 hidden lg:grid" />
        <Eyebrow label={lang === "zh" ? "AI 学习体验" : "AI Learning Experience"} color="periwinkle" className="!text-sm" />
        <h2 className={`mt-6 ${heading}`}>{lang === "zh" ? "AI 驱动的学习流程" : "An AI-driven learning flow"}</h2>
        <Flourish />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-ink">
          {lang === "zh"
            ? "WisdomPlan 将学习拆解为五个环环相扣的阶段：先帮助用户设定清晰目标并评估当前水平，再由 AI 推荐个性化课程，在学习过程中提供实时解答与引导，通过阶段测验与反馈检验掌握程度，最后帮助用户复盘并串联知识，形成持久的知识结构。"
            : "WisdomPlan guides learners through five connected stages: it helps them set clear goals and gauge their level, then AI recommends personalized courses, offers real-time guidance as they learn, checks understanding with staged quizzes and feedback, and finally helps them review and connect knowledge into a lasting structure."}
        </p>
      </section>

      {/* Feature deep-dives */}
      {FEATURES.map(({ icon: Icon, title, shot, points }, idx) => (
        <section key={title.en} className="relative mx-3 px-6 py-10 sm:mx-6 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="flex items-center justify-start gap-4 text-left lg:justify-center lg:text-center">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#787BD7] text-white">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="text-[clamp(1.2rem,5vw,1.35rem)] font-semibold text-ink sm:text-[clamp(1.5rem,2.7vw,1.9rem)]">{t(lang, title)}</h3>
          </div>

          <div
            className={`mt-6 grid items-center gap-6 sm:mt-10 sm:gap-10 lg:gap-16 ${
              idx % 2 === 1
                ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]"
                : "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
            }`}
          >
            <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
              <Shot src={shot.src} label={shot.label} />
            </div>
            <ul className={`space-y-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
              {points.map((p) => (
                <li key={p.en} className="flex gap-3 text-base leading-relaxed text-ink">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-periwinkle" />
                  {t(lang, p)}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* Reflection */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <DotGrid className="absolute right-10 top-14 hidden lg:grid" />
        <Eyebrow label={lang === "zh" ? "心得" : "Reflection"} color="orange" className="!text-sm" />
        <h2 className={`mt-6 ${heading}`}>{lang === "zh" ? "心得体会" : "Reflection"}</h2>
        <Flourish />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-ink">
          {lang === "zh"
            ? "设计 WisdomPlan 的过程中，我重新思考了 AI 在学习体验中的角色。学习的困难往往不仅来自内容本身，更来自缺乏方向感、持续反馈与长期陪伴。因此，我希望通过 AI 主动引导、上下文理解与连续性的学习支持，帮助用户降低学习门槛，建立更持续、更轻松的学习体验。"
            : "Designing WisdomPlan, I rethought AI's role in the learning experience. The difficulty often comes not from the content itself but from a lack of direction, ongoing feedback, and long-term companionship. So I set out to use AI-driven guidance, contextual understanding, and continuous support to lower the barrier to learning and build a more sustainable, relaxed experience."}
        </p>
      </section>

      <ContactSection />
    </main>
  );
}
