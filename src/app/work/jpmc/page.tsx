"use client";

import { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  MessagesSquare,
  CalendarClock,
  FolderPlus,
  Search,
  Inbox,
  Sparkles,
  Check,
  Minus,
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

const PERI = "#5b62cf";

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
    <div
      className={`flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-ink/20 bg-white/50 ${
        className ?? "w-full"
      }`}
    >
      <div className="flex flex-col items-center gap-2 text-center text-muted-ink">
        <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
        <span className="text-sm font-medium text-ink/70">{label}</span>
        <span className="text-xs text-muted-ink/70">{src}</span>
      </div>
    </div>
  );
}

const heading =
  "text-[clamp(1.35rem,6vw,1.5rem)] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[clamp(1.95rem,3.4vw,2.6rem)]";
const subheading =
  "text-[clamp(1.2rem,5vw,1.35rem)] font-semibold text-ink sm:text-[clamp(1.5rem,2.7vw,1.9rem)]";

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

/** Pros / cons list with a colored marker. */
function ProsCons({ heading, items, tone }: { heading: string; items: BL[]; tone: "pro" | "con" }) {
  const { lang } = useLanguage();
  return (
    <div>
      <p className="text-lg font-semibold text-ink">{heading}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((it) => (
          <li key={it.en} className="flex gap-2.5 text-base leading-relaxed text-ink sm:text-lg">
            {tone === "pro" ? (
              <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: PERI }} />
            ) : (
              <Minus className="mt-1 h-4 w-4 shrink-0 text-ink/30" />
            )}
            {t(lang, it)}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ content ------------------------------ */

const CHALLENGES: { icon: LucideIcon; title: BL; desc: BL }[] = [
  {
    icon: Briefcase,
    title: { en: "Vague Requirements", zh: "模糊且不统一的需求提交" },
    desc: {
      en: "Lack of standardized submissions made requirements difficult to understand.",
      zh: "不同团队提交需求的方式与内容缺乏统一标准，导致设计团队难以快速理解项目背景与实际需求",
    },
  },
  {
    icon: MessagesSquare,
    title: { en: "Repetitive communication", zh: "大量低效的重复性沟通" },
    desc: {
      en: "Designers spend too much time on coordination instead of design work.",
      zh: "设计师需要频繁补充遗漏信息、确认资源与同步进度，耗费大量非设计时间",
    },
  },
  {
    icon: CalendarClock,
    title: { en: "Lack of visualization", zh: "Deadline 与任务状态缺乏可视化" },
    desc: {
      en: "Without a unified tracking system, priorities, progress, and deadlines were difficult to manage.",
      zh: "项目缺少统一的追踪机制，团队难以及时了解任务优先级、当前进度与截止时间，容易出现遗漏",
    },
  },
];

const SOLUTIONS: { icon: LucideIcon; title: BL; pros: BL[]; cons: BL[] }[] = [
  {
    icon: MessagesSquare,
    title: { en: "Communicate via email", zh: "通过邮件沟通" },
    pros: [
      { en: "Real-time notifications and seamless communication", zh: "通知及时，沟通便捷" },
      { en: "Familiar and easy for teams to adopt", zh: "使用门槛低，团队普遍熟悉" },
      { en: "Easy record-keeping and information retrieval", zh: "方便保留记录与后续检索" },
    ],
    cons: [
      { en: "Difficult to manage and categorize requirements consistently", zh: "难以统一管理与分类需求" },
      { en: "Back-and-forth communication and repeated confirmations", zh: "容易出现反复确认与来回沟通" },
      { en: "Slow response and coordination times", zh: "响应速度较慢" },
    ],
  },
  {
    icon: Inbox,
    title: { en: "Jira Collaboration", zh: "Jira 协作" },
    pros: [
      { en: "Clear visibility into task workflows", zh: "便于可视化任务流程" },
      { en: "Familiar and widely adopted by product teams", zh: "产品团队普遍熟悉 Jira" },
      { en: "Supports requirement management and progress tracking", zh: "支持需求管理与进度追踪" },
    ],
    cons: [
      { en: "Inconsistent processes across teams", zh: "不同团队流程缺乏统一标准" },
      { en: "Cumbersome ticket creation workflow", zh: "创建 Ticket 流程繁琐" },
      { en: "Non-standardized task status definitions", zh: "任务状态命名不一致" },
    ],
  },
];

const WORKSHOP_GOALS: { icon: LucideIcon; title: BL }[] = [
  { icon: FolderPlus, title: { en: "Streamline Requirements", zh: "优化需求流程" } },
  { icon: Search, title: { en: "Create Requirement Traceability", zh: "创建需求追踪" } },
  { icon: Inbox, title: { en: "Establish Resource Management", zh: "建立资源管理" } },
];

const FEATURES: { icon: LucideIcon; title: BL; shot: { src: string; label: string }; points: BL[] }[] = [
  {
    icon: FolderPlus,
    title: { en: "Streamline the Requirements Process", zh: "优化需求流程" },
    shot: { src: "/projects/jpmc/feature-form.png", label: "Design request form" },
    points: [
      {
        en: "Auto-surface required materials and guidelines to reduce omissions.",
        zh: "根据不同设计需求，自动提示所需材料与申请规范，减少遗漏与反复沟通",
      },
      { en: "Enable collaborative form completion and file uploads.", zh: "支持多人协作填写表单，可转交相关成员补充信息与文件" },
      {
        en: "Use embedded guidance to improve readability and review efficiency.",
        zh: "优化无障碍阅读体验，在表单关键位置嵌入材料提醒，方便页面朗读与快速浏览",
      },
    ],
  },
  {
    icon: Search,
    title: { en: "Create Requirement Traceability", zh: "创建需求追踪" },
    shot: { src: "/projects/jpmc/feature-traceability.png", label: "Requirement tracking dashboard" },
    points: [
      { en: "Centralized view of all design requests for easier tracking.", zh: "集中展示所有进行中的设计需求，方便统一追踪任务状态与优先级" },
      {
        en: "Real-time updates on status, materials, and feedback reduce repetitive communication.",
        zh: "支持实时更新需求状态、补充材料与跨团队反馈，减少重复沟通",
      },
      {
        en: "Unified interface for requirements, assets, and status tracking to improve collaboration transparency.",
        zh: "将需求详情、提交材料与状态管理整合在同一界面，提升协作透明度",
      },
    ],
  },
  {
    icon: Inbox,
    title: { en: "Establish Resource Management", zh: "建立资源管理" },
    shot: { src: "/projects/jpmc/feature-resource.png", label: "Active requests workspace" },
    points: [
      {
        en: "Centralized view of ongoing design requests for quick access to status, assignees, and deadlines.",
        zh: "集中展示所有进行中的设计需求，方便快速查看状态、负责人与截止时间",
      },
      { en: "Filter tasks by deadline, status, and product type.", zh: "支持按截止日期、需求状态与产品类型筛选任务，提升需求管理效率" },
      { en: "Unified workspace for updates, files, and completed requests.", zh: "将更新通知、提交文件与已关闭需求整合至统一工作台，减少信息分散问题" },
    ],
  },
];

/* ------------------------------ page ------------------------------ */

export default function JpmcPage() {
  const { lang } = useLanguage();

  return (
    <main className="relative mx-auto w-full max-w-[90rem] overflow-x-clip pb-6">
      <CursorGlow />

      {/* Hero — desktop: title over one 6-panel strip; mobile: 3 panels, title, 3 panels */}
      <section className="relative mx-3 mt-3 px-6 pb-8 pt-5 sm:mx-6 sm:mt-6 sm:px-10 sm:pb-8 sm:pt-6 lg:px-14 lg:pb-10 lg:pt-6">
        <SiteNav accent={PERI} flush />
        {/* mobile top panels */}
        <Shot
          src="/projects/jpmc/hero-top.png"
          label="Illustration panels (top)"
          className="mt-8 w-full rounded-2xl lg:hidden"
        />

        <div className="py-8 text-center lg:py-0 lg:pt-6">
          <h1 className="text-[clamp(2rem,9vw,2.4rem)] font-bold tracking-tight text-ink sm:text-[clamp(2.6rem,5vw,3.8rem)]">
            Design Intake Platform
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-lg leading-relaxed text-ink sm:mt-2.5 sm:text-xl">
            {lang === "zh" ? "让设计需求管理变得更直观、更高效" : "Streamline design requirement workflows"}
          </p>
        </div>

        {/* desktop full strip */}
        <Shot
          src="/projects/jpmc/hero-strip.png"
          label="Illustration panels"
          className="mt-8 hidden w-full rounded-2xl lg:block"
        />

        {/* mobile bottom panels */}
        <Shot
          src="/projects/jpmc/hero-bottom.png"
          label="Illustration panels (bottom)"
          className="mt-8 w-full rounded-2xl lg:hidden"
        />
      </section>

      {/* User challenges */}
      <section className="relative mx-3 px-6 pb-8 pt-14 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <DotGrid className="absolute right-10 top-14 hidden lg:grid" />
        <Eyebrow label={lang === "zh" ? "用户挑战" : "User Challenges"} color="periwinkle" className="!text-sm" />
        <h2 className={`mt-6 ${heading}`}>
          {lang === "zh" ? "设计协作，不该困在重复沟通里" : "Repetitive communication in collaboration"}
        </h2>
        <Flourish />

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-3 lg:gap-x-16">
          {CHALLENGES.map(({ icon: Icon, title, desc }) => (
            <div key={title.en} className="row-span-3 mb-6 grid grid-rows-subgrid gap-3 sm:mb-0">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#90AFFF] text-white">
                <Icon className="h-6 w-6" />
              </span>
              <p className="text-lg font-semibold leading-snug text-ink sm:text-xl">{t(lang, title)}</p>
              <p className="max-w-[80%] text-base leading-relaxed text-ink sm:max-w-none sm:text-lg">
                {t(lang, desc)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Project objectives — same card treatment as WisdomPlan's "Our opportunity" */}
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
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#90AFFF] text-white">
                <Sparkles className="h-6 w-6" />
              </span>
              <Eyebrow label={lang === "zh" ? "项目目标" : "Project Objectives"} color="periwinkle" className="!text-sm" />
            </div>
            <h2 className={`mt-6 ${heading}`}>
              {lang === "zh" ? "建立统一的协作平台" : "A unified collaboration platform"}
            </h2>
            <Flourish />
            <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">
              {lang === "zh"
                ? "随着设计团队与合作部门规模扩大，依赖消息沟通与人工同步的流程已难以支撑高频协作。因此，本项目希望通过建立统一、透明且可追踪的协作平台，减少沟通摩擦，提升需求提交、任务管理与设计交付效率"
                : "As teams scaled, message-based communication and manual coordination became inefficient. This project introduced a unified collaboration platform to improve requirement management, task tracking, and design delivery efficiency."}
            </p>
          </div>
        </div>
      </section>

      {/* Existing solutions */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <h3 className={subheading}>{lang === "zh" ? "现有方案分析" : "Existing Solutions"}</h3>
        <Flourish />

        <div
          className={`mt-10 grid gap-10 ${
            lang === "zh"
              ? "lg:grid-cols-[auto_auto] lg:justify-start lg:gap-x-24"
              : "lg:grid-cols-2 lg:gap-16"
          }`}
        >
          {SOLUTIONS.map(({ icon: Icon, title, pros, cons }) => (
            <div key={title.en}>
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#90AFFF] text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="text-xl font-semibold text-ink">{t(lang, title)}</p>
              </div>
              <div className="mt-6 space-y-6">
                <ProsCons heading={lang === "zh" ? "优势" : "Pros"} items={pros} tone="pro" />
                <ProsCons heading={lang === "zh" ? "劣势" : "Cons"} items={cons} tone="con" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research workshop */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <DotGrid className="absolute right-10 top-14 hidden lg:grid" />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <Eyebrow label={lang === "zh" ? "调研工作坊" : "Research Workshop"} color="periwinkle" className="!text-sm" />
            <h2 className={`mt-6 ${heading}`}>{lang === "zh" ? "核心用户调研" : "Core User Research"}</h2>
            <Flourish />
            <p className="mt-6 text-base leading-relaxed text-ink sm:text-lg">
              {lang === "zh"
                ? "为了更深入理解设计需求流程中的协作问题，我组织了一场跨团队 Workshop，邀请产品、设计与相关合作团队共同参与，收集他们在 Design Intake Process 中的真实痛点、协作挑战，以及对未来流程的期待"
                : "I facilitated a cross-functional workshop with product, design, and partner teams to identify collaboration pain points and align on future process improvements."}
            </p>
            <div className="mt-10 space-y-6">
              {WORKSHOP_GOALS.map(({ icon: Icon, title }) => (
                <div key={title.en} className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#90AFFF] text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-lg font-semibold leading-snug text-ink">{t(lang, title)}</p>
                </div>
              ))}
            </div>
          </div>
          <Shot
            src="/projects/jpmc/workshop-flow.png"
            label="Research workshop"
            className="mx-auto max-h-[360px] w-auto object-contain lg:max-h-[520px]"
          />
        </div>
      </section>

      {/* Feature deep-dives */}
      {FEATURES.map(({ icon: Icon, title, shot, points }, idx) => (
        <section key={title.en} className="relative mx-3 px-6 py-10 sm:mx-6 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="flex items-center justify-start gap-4 text-left lg:justify-center lg:text-center">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#90AFFF] text-white">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className={subheading}>{t(lang, title)}</h3>
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
                <li key={p.en} className="flex gap-3 text-base leading-relaxed text-ink sm:text-lg">
                  <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: PERI }} />
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
        <h2 className={`mt-6 ${heading}`}>{lang === "zh" ? "心得体会" : "Insights & Reflections"}</h2>
        <Flourish />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          {lang === "zh"
            ? "这段实习经历让我收获很多，我也很感谢能独立负责整个设计流程。虽然因为项目时间只有一个月，还有很多地方可以继续完善，比如尝试更多设计迭代、做用户测试，以及完善更多平台功能，但我依然很为这次项目感到自豪。我特别重视无障碍体验，因此在设计中加入了支持屏幕朗读的结构，帮助视觉障碍用户更顺畅地使用平台。我也第一次组织了 Research Workshop，在经理的指导下学到了很多。整体来说，这是一次非常难忘、也非常有成长感的经历"
            : "Leading this project end-to-end was a valuable learning experience. Beyond delivering the final solution, I explored accessibility through screen reader–friendly design and facilitated my first research workshop. Despite the project's short timeline, it strengthened my design, research, and collaboration skills and remains one of the most meaningful experiences of my internship."}
        </p>
      </section>

      <ContactSection />
    </main>
  );
}
