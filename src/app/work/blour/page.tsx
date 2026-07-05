"use client";

import { useState, useEffect, useRef } from "react";
import {
  Layers,
  BookOpen,
  Clock,
  Bell,
  Settings,
  Home,
  Mic,
  DollarSign,
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

/** Blour's brand blue, used for icon fills and accents. */
const BLUE = "#4E7FE8";
/** Eyebrow overrides so section labels read in Blour blue. */
const EB = "!text-sm !text-[#6f86ec]";

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

/** Blour wordmark. Drop /projects/blour/logo.png and it replaces the placeholder. */
function LogoTitle() {
  const { ref, failed, onError } = useImgFallback();
  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        src="/projects/blour/logo.png"
        alt="Blour"
        onError={onError}
        className="mt-6 h-6 w-auto sm:h-7 lg:h-8"
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

const heading = "text-[clamp(1.95rem,3.4vw,2.6rem)] font-semibold leading-[1.15] tracking-tight text-ink";
const subheading = "text-[clamp(1.5rem,2.7vw,1.9rem)] font-semibold text-ink";

/** Decorative gradient line + dots — the site's accent motif. */
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

const CHALLENGES: { icon: LucideIcon; title: BL; desc: BL }[] = [
  {
    icon: Layers,
    title: { en: "Too many sources", zh: "信息来源过多" },
    desc: {
      en: "Constantly switching between news, email, calendar, and to-dos.",
      zh: "用户需要在新闻、邮件、日历与待办事项之间来回切换。",
    },
  },
  {
    icon: BookOpen,
    title: { en: "Long reads are tiring", zh: "长篇内容阅读很累" },
    desc: {
      en: "Information fatigue and scattered attention make it hard to keep going.",
      zh: "容易产生信息疲劳与注意力分散，难以坚持。",
    },
  },
  {
    icon: Clock,
    title: { en: "Wasted spare moments", zh: "无法利用碎片时间" },
    desc: {
      en: "Commutes and breaks are hard to turn into useful catch-up time.",
      zh: "通勤或休息时间无法轻松获取重点信息。",
    },
  },
  {
    icon: Bell,
    title: { en: "Tasks slip away", zh: "难以想起重要任务" },
    desc: {
      en: "Urgent emails and tasks get buried and forgotten.",
      zh: "需要马上处理的邮件和任务容易被掩埋和忽略。",
    },
  },
];

const PROBLEMS: { img: string; label: string; title: BL; points: BL[] }[] = [
  {
    img: "/projects/blour/problem-notebooklm.png",
    label: "NotebookLM",
    title: { en: "AI doc-to-podcast tools", zh: "AI 文档转播客工具（如 NotebookLM）" },
    points: [
      { en: "High-effort uploads and a study focus; weak at everyday info management.", zh: "上传成本高、偏向备考，缺少日常信息管理能力。" },
    ],
  },
  {
    img: "/projects/blour/problem-particle.png",
    label: "Particle News",
    title: { en: "News AI podcast products", zh: "新闻类 AI Podcast 产品（如 Particle News）" },
    points: [
      { en: "Trending-news focused, with limited personalization and passive listening.", zh: "以热门新闻为主，个性化有限，只能被动收听。" },
    ],
  },
  {
    img: "/projects/blour/problem-meco.png",
    label: "Meco",
    title: { en: "Newsletter aggregators", zh: "邮件订阅聚合工具（如 Meco）" },
    points: [
      { en: "Narrow subscription sources, with no uploads or multi-source integration.", zh: "来源局限于订阅邮件，无法上传或跨源整合。" },
    ],
  },
];

const PERSONAS: { title: BL; desc: BL }[] = [
  {
    title: { en: "High-density readers", zh: "高信息密度人群" },
    desc: {
      en: "Juggling heavy news, study material, and to-dos, and prone to overload and scattered focus.",
      zh: "需要同时处理大量新闻、学习资料与待办事项，容易陷入信息过载与注意力分散。",
    },
  },
  {
    title: { en: "Audio-content consumers", zh: "音频内容消费用户" },
    desc: {
      en: "Prefer podcasts, video, or audio, and want to absorb content during commutes and workouts.",
      zh: "习惯通过播客、视频或音频获取信息，希望在通勤、运动等碎片时间高效接收内容。",
    },
  },
  {
    title: { en: "Efficiency & growth seekers", zh: "注重效率与自我成长的人群" },
    desc: {
      en: "Focused on learning, news, and self-management, and eager to turn information into action.",
      zh: "持续关注学习、资讯与个人管理，希望更轻松地整理信息并快速转化为行动。",
    },
  },
];

const FEATURES: { icon: LucideIcon; title: BL; shot: { src: string; label: string }; points: BL[] }[] = [
  {
    icon: Settings,
    title: { en: "Content preference setup", zh: "内容偏好设置" },
    shot: { src: "/projects/blour/preferences.png", label: "Content preferences" },
    points: [
      { en: "Swipe onboarding quickly captures preferences, lowering the barrier to start.", zh: "通过 swipe onboarding 快速建立用户内容偏好，降低初次使用门槛。" },
      { en: "AI recommends content and integrates sources like Gmail for a personalized feed.", zh: "AI 自动推荐感兴趣内容，并整合 Gmail 等信息来源生成个性化体验。" },
      { en: "Card layouts, soft gradients, and clear CTAs make browsing efficient and relaxed.", zh: "运用卡片式布局、柔和渐变与清晰 CTA，提升浏览效率与轻松感。" },
    ],
  },
  {
    icon: Home,
    title: { en: "A daily podcast on the home screen", zh: "首页的每日播客" },
    shot: { src: "/projects/blour/podcast.png", label: "Daily podcast" },
    points: [
      { en: "News, uploads, and a daily podcast live on the home screen for one seamless flow.", zh: "将新闻、上传内容与 Daily Podcast 整合至首页，打造连续的一站式音频体验。" },
      { en: "Upload files, links, and YouTube to freely generate personalized podcast content.", zh: "支持文件、链接与 YouTube 内容上传，让用户自由生成个性化播客内容。" },
      { en: "Soft gradients and an immersive player build a warm, companionable mood.", zh: "运用柔和渐变、沉浸式播放器与轻量化布局，强化陪伴感与收听氛围。" },
    ],
  },
  {
    icon: Bell,
    title: { en: "Reminders and task handling", zh: "待办提醒和处理" },
    shot: { src: "/projects/blour/reminders.png", label: "Reminders" },
    points: [
      { en: "Email, to-dos, and an AI assistant unite in one flow, cutting app-switching.", zh: "将邮件、待办与 AI 助手整合到统一流程中，减少用户在不同应用之间切换。" },
      { en: "AI drafts replies, organizes tasks, and handles subscriptions for daily efficiency.", zh: "支持 AI 自动生成邮件回复、整理任务与处理订阅，提升日常效率体验。" },
      { en: "Lightweight cards and a voice entry make task management intuitive and natural.", zh: "运用轻量化卡片布局与语音交互入口，让任务管理流程更加直观自然。" },
    ],
  },
  {
    icon: Mic,
    title: { en: "Personalized podcast generation", zh: "个性化播客生成" },
    shot: { src: "/projects/blour/generate.png", label: "Podcast generation" },
    points: [
      { en: "Upload files, links, and YouTube to generate a personalized AI podcast in one tap.", zh: "支持上传文件、链接与 YouTube 内容，一键生成个性化 AI Podcast。" },
      { en: "Pods, favorites, notes, and topics give a space to collect and organize information.", zh: "提供播客、收藏、笔记与主题等内容管理空间，帮助用户沉淀与整理信息。" },
      { en: "Blends information intake with a personal knowledge space for a lasting companion.", zh: "将“信息获取”与“个人知识空间”结合，强化长期陪伴式内容体验。" },
    ],
  },
  {
    icon: DollarSign,
    title: { en: "Membership and settings", zh: "会员订阅服务和设置" },
    shot: { src: "/projects/blour/membership.png", label: "Membership & settings" },
    points: [
      { en: "Contextual upgrade prompts appear at limits to convey the value of paying.", zh: "当用户触及收藏、Notes 或收听时长等限制时，自动触发对应的会员提示，引导用户理解付费价值。" },
      { en: "Users can retune content preferences and interest weights anytime for more control.", zh: "用户可随时调整内容偏好与兴趣权重，让推荐结果更加个性化与可控。" },
      { en: "Upgrade to Premium directly in Settings, with clear benefits and plans.", zh: "支持在 Settings 中直接升级 Premium，并清晰展示会员专属权益与订阅方案。" },
    ],
  },
];

/* ------------------------------ page ------------------------------ */

export default function BlourPage() {
  const { lang } = useLanguage();

  return (
    <main className="relative mx-auto w-full max-w-[90rem] overflow-x-clip pb-6">
      <CursorGlow />

      <SiteNav />

      {/* Hero */}
      <section className="relative mx-3 mt-6 rounded-[2rem] px-6 py-12 sm:mx-6 sm:px-10 sm:py-16 lg:px-14">
        {/* Large radial halo behind the hero — a self-contained glow that fades
            fully back to the background (#F4F0E8) around its whole edge. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[calc(50%-420px)] -z-10 h-[1600px] w-[2600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, #F4F0E8 0%, #FFF0E3 16%, #D6EFFF 34%, #F4F0E8 56%)",
          }}
        />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div>
            <LogoTitle />
            <p className={`mt-5 ${heading}`}>
              {lang === "zh" ? "重新定义信息消费方式" : "Redefining information consumption"}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-ink">
              {lang === "zh"
                ? "Blour 是一款 AI 个性化音频平台，能够将新闻、日程与用户上传内容自动整理成音频简报，帮助用户更轻松地获取信息、管理任务与提升效率。"
                : "Blour is an AI-powered personalized audio platform that turns news, schedules, and your own uploads into audio briefings, so getting informed, managing tasks, and staying efficient feels effortless."}
            </p>
          </div>

          <Shot
            src="/projects/blour/hero.png"
            label="Blour product"
            className="mx-auto max-h-[520px] w-auto rounded-2xl object-contain"
          />
        </div>
      </section>

      {/* User challenges */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <DotGrid className="absolute right-10 top-14 hidden lg:grid" />
        <Eyebrow label={lang === "zh" ? "用户挑战" : "User Challenges"} color="periwinkle" className={EB} />
        <h2 className={`mt-6 ${heading}`}>
          {lang === "zh" ? "信息过载的代价" : "The cost of information overload"}
        </h2>
        <Flourish />

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {CHALLENGES.map(({ icon: Icon, title, desc }) => (
            <div key={title.en} className="grid grid-rows-subgrid row-span-3 mb-6 sm:mb-8 lg:mb-0">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full text-white"
                style={{ background: BLUE }}
              >
                <Icon className="h-6 w-6" />
              </span>
              <p className="text-lg font-semibold leading-snug text-ink sm:text-xl">{t(lang, title)}</p>
              <p className="text-base leading-relaxed text-muted-ink">{t(lang, desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our opportunity */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-white/55 px-8 py-14 sm:px-14 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-140px] top-[-140px] h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(120,150,240,0.5) 0%, rgba(243,193,159,0.28) 45%, rgba(244,240,232,0) 72%)",
            }}
          />
          <DotGrid className="absolute bottom-10 right-12 hidden lg:grid" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
                style={{ background: BLUE }}
              >
                <Sparkles className="h-6 w-6" />
              </span>
              <Eyebrow label={lang === "zh" ? "我们的机会" : "Our opportunity"} color="periwinkle" className={EB} />
            </div>
            <h2 className={`mt-6 ${heading}`}>
              {lang === "zh" ? "用音频重塑信息体验" : "Reshaping information with audio"}
            </h2>
            <Flourish />
            <p className="mt-6 text-base leading-relaxed text-muted-ink">
              {lang === "zh"
                ? "在信息过载与注意力碎片化的环境下，用户越来越难高效地获取真正重要的内容。Blour 希望通过 AI 自动整合新闻、邮件、日程与用户上传内容，并转化为个性化音频简报，让用户能够更轻松地获取信息、管理任务，并减少信息负担。"
                : "Amid information overload and fragmented attention, it's increasingly hard to reach what truly matters. Blour uses AI to pull together news, email, schedules, and uploads, turning them into personalized audio briefings, so getting informed and managing tasks feels lighter."}
            </p>
          </div>
        </div>
      </section>

      {/* Competitor analysis */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <h3 className={subheading}>{lang === "zh" ? "竞品调研" : "Competitor analysis"}</h3>

        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {PROBLEMS.map(({ img, label, title, points }) => (
            <div key={label} className="flex flex-col items-center">
              <Shot src={img} label={label} className="mx-auto w-full max-w-[280px] rounded-2xl" />
              <p className="mt-7 max-w-xs text-center text-lg font-semibold text-ink sm:text-xl">{t(lang, title)}</p>
              <div className="mt-3 max-w-xs space-y-1.5 text-center">
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
            <h3 className={subheading}>{lang === "zh" ? "目标用户" : "Target users"}</h3>
            <div className="mt-8 space-y-8">
              {PERSONAS.map((persona) => (
                <div key={persona.title.en}>
                  <p className="text-lg font-semibold text-ink sm:text-xl">
                    {t(lang, persona.title)}
                  </p>
                  <p className="mt-1.5 max-w-md text-base leading-relaxed text-muted-ink">
                    {t(lang, persona.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Shot src="/projects/blour/target-users.png" label="Target users" className="w-full rounded-2xl" />
        </div>
      </section>

      {/* From information to action */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <DotGrid className="absolute right-10 top-14 hidden lg:grid" />
        <Eyebrow
          label={lang === "zh" ? "从信息到行动" : "From Information to Action"}
          color="periwinkle"
          className={EB}
        />
        <h2 className={`mt-6 ${heading}`}>{lang === "zh" ? "从信息获取到行动处理" : "From getting informed to taking action"}</h2>
        <Flourish />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-ink">
          {lang === "zh"
            ? "Blour 将信息获取转化为行动，贯穿五个环节：用户设置内容偏好，在首页收听每日播客，获得待办提醒与处理，从上传内容一键生成个性化播客，并通过会员订阅解锁更多能力。"
            : "Blour turns information into action across five connected stages: users set their content preferences, receive a daily podcast on the home screen, get reminders and handling for their to-dos, generate personalized podcasts from their own uploads, and unlock more through a membership subscription."}
        </p>
      </section>

      {/* Feature deep-dives */}
      {FEATURES.map(({ icon: Icon, title, shot, points }, idx) => (
        <section key={title.en} className="relative mx-3 px-6 py-10 sm:mx-6 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="flex items-center justify-start gap-4 text-left lg:justify-center lg:text-center">
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white"
              style={{ background: BLUE }}
            >
              <Icon className="h-7 w-7" />
            </span>
            <h3 className={subheading}>{t(lang, title)}</h3>
          </div>

          <div
            className={`mt-10 grid items-center gap-10 lg:gap-16 ${
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
                <li key={p.en} className="flex gap-3 text-base leading-relaxed text-muted-ink">
                  <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: BLUE }} />
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
        <Eyebrow label={lang === "zh" ? "心得" : "Reflection"} color="periwinkle" className={EB} />
        <h2 className={`mt-6 ${heading}`}>{lang === "zh" ? "心得体会" : "Reflection"}</h2>
        <Flourish />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-ink">
          {lang === "zh"
            ? "在设计 Blour 的过程中，我重新思考了“信息获取”与“效率工具”之间的关系。相比传统的信息平台只负责提供内容，我更希望 Blour 能够帮助用户真正理解、整理并处理信息，让“获取信息”不再是一种负担，而是一种更轻松、更自然地融入日常生活的体验。在这个项目中，我不仅关注了 AI 功能本身，也更加注重陪伴感、低压力的交互氛围，以及如何通过音频化与自动化设计减少用户在高信息密度环境下的认知负担。"
            : "Designing Blour, I rethought the relationship between “getting information” and “efficiency tools.” Rather than a platform that just serves content, I wanted Blour to help people truly understand, organize, and act on information, so staying informed feels lighter and folds naturally into daily life. Beyond the AI features, I focused on a sense of companionship, a low-pressure interaction mood, and how audio and automation can reduce cognitive load in high-density information environments."}
        </p>
      </section>

      <ContactSection />
    </main>
  );
}
