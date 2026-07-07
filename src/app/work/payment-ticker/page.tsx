"use client";

import { useState, useEffect, useRef } from "react";
import {
  AlertCircle,
  EyeOff,
  XCircle,
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

/** Riot gold accent used for eyebrows, bullets, and the flourish. */
const GOLD = "#b1892f";

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

/** Riot Games wordmark. Drop /projects/payment/riot-logo.png to replace the text. */
function RiotLogo() {
  const { ref, failed, onError } = useImgFallback();
  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        src="/projects/payment/riot-logo.png"
        alt="Riot Games"
        onError={onError}
        className="mx-auto h-8 w-auto object-contain lg:mx-0"
      />
    );
  }
  return (
    <span className="mx-auto flex h-11 w-40 items-center justify-center gap-2 rounded-xl border border-dashed border-white/40 text-white/70 lg:mx-0">
      <ImageIcon className="h-5 w-5" strokeWidth={1.5} />
      <span className="text-xs font-medium">Riot Games logo</span>
    </span>
  );
}

const heading =
  "text-[clamp(1.35rem,6vw,1.5rem)] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[clamp(1.95rem,3.4vw,2.6rem)]";
const subheading =
  "text-[clamp(1.2rem,5vw,1.35rem)] font-semibold text-ink sm:text-[clamp(1.5rem,2.7vw,1.9rem)]";
const EB = "!text-sm !text-[#b1892f]";

/** Decorative gold gradient line + dots. */
function Flourish() {
  return (
    <div className="mt-5 flex items-center gap-2">
      <span className="h-[3px] w-14 rounded-full" style={{ background: "linear-gradient(90deg,#8a6b28,#c8a84c,#e6c874)" }} />
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c8a84c" }} />
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#d8b866" }} />
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#e6c874" }} />
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

/** Black diamond badge with an upright number (nods to the Riot deck). */
function NumBadge({ n }: { n: number }) {
  return (
    <span className="flex h-9 w-9 shrink-0 rotate-45 items-center justify-center rounded-[7px] bg-ink">
      <span className="-rotate-45 text-sm font-bold" style={{ color: "#e6c874" }}>
        {n}
      </span>
    </span>
  );
}

/* ------------------------------ content ------------------------------ */

const HERO = {
  title: { en: "Payment Error Optimization", zh: "支付提示系统优化" },
  subtitle: {
    en: "Improved payment error visibility to reduce player confusion and failed transactions",
    zh: "为 Riot Games 全球支付系统设计更及时、更明确的异常提示体验，降低玩家支付失败与困惑",
  },
};

const PROBLEM_STEPS: { icon: LucideIcon; title: BL; desc: BL }[] = [
  {
    icon: AlertCircle,
    title: { en: "Enter Homepage", zh: "玩家进入客户端首页" },
    desc: {
      en: "Players enter the client homepage, where the current alert lives.",
      zh: "提示不明显，玩家可能错过首页的支付异常提示",
    },
  },
  {
    icon: EyeOff,
    title: { en: "Ignore Alerts", zh: "粗略扫过信息" },
    desc: {
      en: "The payment issue alert lacks visibility and is easily overlooked on the homepage.",
      zh: "当前场景下支付异常提示不被重视，信息被略过",
    },
  },
  {
    icon: XCircle,
    title: { en: "Encounter Failure", zh: "支付失败后才意识到问题" },
    desc: {
      en: "Players discover payment issues only after completing the payment process.",
      zh: "前面的支付操作白费了，引发烦躁",
    },
  },
];

const WHY_POINTS: { title: BL; desc: BL }[] = [
  {
    title: { en: "The prompt appeared too early", zh: "提示出现得太早" },
    desc: {
      en: "The homepage is outside the payment flow, making alerts easy to miss.",
      zh: "首页并不是支付相关场景，提醒放在那里不合理",
    },
  },
  {
    title: { en: "Users easily overlook floating content", zh: "用户容易忽视悬浮内容" },
    desc: {
      en: "The alert requires no acknowledgment, making it easy to overlook.",
      zh: "提示看完以后不需要用户操作或点击，容易略过内容",
    },
  },
  {
    title: { en: "Users need to remember the prompt", zh: "用户需要记住提示内容" },
    desc: {
      en: "Alerts shown before payment are easy to forget.",
      zh: "在支付前看到信息很容易忘，等于白看",
    },
  },
  {
    title: { en: "The payment interface is missing real-time alerts", zh: "支付界面缺少即时提醒" },
    desc: {
      en: "Notifying users after a payment failure is too late.",
      zh: "支付失败后才有提示，太晚，令人烦躁",
    },
  },
];

const WHY_CALLOUT: BL = {
  en: "The problem lies in poor timing and context, causing users to ignore the information.",
  zh: "问题不在于“没有提示”，而在于提示出现的时机与场景不够相关，被动展示的信息也容易被快速略过",
};

type Option = { label: BL; name: BL; img: string; final?: boolean; adv: BL[]; dis: BL[] };
type Scenario = { title: BL; sub: BL; options: Option[] };

const SOLUTIONS: Scenario[] = [
  {
    title: { en: "Most severe case: all payment methods are unavailable", zh: "最严重的情况：所有支付方式均不可用" },
    sub: {
      en: "Users should be clearly informed when payments are unavailable to prevent further action.",
      zh: "用户需要明确意识到当前无法完成任何支付行为，并不再继续尝试支付",
    },
    options: [
      {
        label: { en: "Option 1", zh: "方案 1" },
        name: { en: "Illustrated Modal", zh: "插图式弹窗" },
        img: "/projects/payment/sol-all-modal.png",
        adv: [
          { en: "Cute illustrations can reduce user frustration", zh: "可爱的配图可以减少用户烦躁情绪" },
          { en: "A narrow design is more likely to attract attention", zh: "窄窄的设计更容易吸引注意力" },
        ],
        dis: [
          { en: "Less consistent with the existing ticker-based experience", zh: "与当前价格选择页中的 ticker 体验一致性较弱" },
          { en: "Requires more screen space and user interaction", zh: "占用更多界面空间与操作步骤" },
          { en: "Depends on additional visual assets and illustrations", zh: "需要额外视觉资源支持插画与情绪化设计元素" },
        ],
      },
      {
        label: { en: "Final Plan", zh: "最终方案" },
        name: { en: "Simple Confirmation Modal", zh: "简洁确认弹窗" },
        img: "/projects/payment/sol-all-simple.png",
        final: true,
        adv: [
          { en: "Familiar interaction pattern", zh: "更符合游戏现有的弹窗交互习惯" },
          { en: "Clear, low-effort messaging", zh: "信息直接，认知负担低" },
          { en: "Responsive to different content lengths", zh: "适配不同长度的文本" },
          { en: "Compact and highly noticeable", zh: "弹窗简短，成为视觉焦点" },
        ],
        dis: [
          { en: "May be overlooked during quick dismissal", zh: "快速关闭时仍可能忽略" },
          { en: "Readability decreases with longer content", zh: "长文本时可读性会下降一些" },
        ],
      },
      {
        label: { en: "Option 3", zh: "方案 3" },
        name: { en: "Full Banner", zh: "全款横幅提示" },
        img: "/projects/payment/sol-all-banner.png",
        adv: [
          { en: "High visual prominence and visibility", zh: "视觉冲击强，视觉存在感高" },
          { en: "Difficult to overlook critical information", zh: "用户很难略过关键文字" },
          { en: "Supports longer and more detailed messaging", zh: "更容易展示更长、更详细的信息" },
        ],
        dis: [
          { en: "Higher space usage and potential disruption", zh: "可能占用过多界面空间，并带来一定打扰感" },
          { en: "Less aligned with the existing design language", zh: "可能与现有设计元素缺乏一致性" },
          { en: "Long messages may reduce focus on critical information", zh: "弹窗内容过长时，用户注意力可能无法聚焦在核心信息上" },
        ],
      },
    ],
  },
  {
    title: { en: "More common scenario: 1+ payment methods unavailable", zh: "更常见的情况：1+ 支付方式不可用" },
    sub: {
      en: "Clearly communicate abnormal states while minimizing disruption to the experience.",
      zh: "需要在不过度打扰用户的前提下，清晰展示异常状态",
    },
    options: [
      {
        label: { en: "Final Plan", zh: "最终方案" },
        name: { en: "Grayed out + Tooltip", zh: "灰置 + Tooltip" },
        img: "/projects/payment/sol-one-grayed.png",
        final: true,
        adv: [
          { en: "Grayed-out states indicate unavailable payment methods", zh: "灰置的设计体现支付方式无法使用" },
          { en: "Tooltips provide detailed explanations for payment issues", zh: "Tooltip 提供详细的支付异常原因" },
          { en: "No additional space required on the payment page", zh: "不占用原本支付页面的额外空间" },
          { en: "Supports method-specific error messaging", zh: "可以单独展示不同支付方式的异常原因" },
        ],
        dis: [
          { en: "Hover information can be easily overlooked, leading to confusion", zh: "Hover 信息可能容易被忽略，进而造成用户困惑或挫败感" },
        ],
      },
      {
        label: { en: "Option 2", zh: "方案 2" },
        name: { en: "Highlight + Tooltip", zh: "高亮 + Tooltip" },
        img: "/projects/payment/sol-one-highlight.png",
        adv: [
          { en: "Highlighted states indicate payment issues", zh: "高亮的设计体现支付方式的异常状态" },
          { en: "Tooltips provide detailed explanations for payment exceptions", zh: "Tooltip 提供详细的支付异常原因" },
          { en: "No additional space required on the payment page", zh: "不占用原本支付页面的额外空间" },
          { en: "Supports payment method–specific error messages", zh: "可以单独展示不同支付方式的异常原因" },
        ],
        dis: [
          { en: "Strong visual emphasis may disrupt the interface hierarchy", zh: "提示颜色可能过于抢眼，影响整体界面平衡" },
          { en: "Users may overlook hover-only information", zh: "Hover 信息可能容易被忽略，进而造成用户困惑或挫败感" },
        ],
      },
      {
        label: { en: "Option 3", zh: "方案 3" },
        name: { en: "Displayed in order summary", zh: "订单汇总中展示" },
        img: "/projects/payment/sol-one-summary.png",
        adv: [
          { en: "Captures attention without requiring hover interactions", zh: "无需 hover 即可吸引用户注意" },
          { en: "Supports multiple payment exceptions in one area", zh: "一个 hover 区域即可承载多个支付异常信息" },
          { en: "Better aligned with future use cases in the new LoL client", zh: "更适合未来新版 LOL 界面中的使用场景" },
        ],
        dis: [
          { en: "Long messages may still be skimmed or ignored", zh: "如果文案很多，用户仍可能快速略过信息" },
          { en: "Top-right placement can reduce visibility", zh: "放置在右上角容易被忽略" },
          { en: "Requires significant page space", zh: "占用页面空间较多" },
        ],
      },
    ],
  },
];

type Game = { name: BL; img: string; points: BL[] };
type Result = { title: BL; games: Game[] };

const RESULTS: Result[] = [
  {
    title: { en: "All payment methods are unavailable", zh: "所有支付方式均不可用" },
    games: [
      {
        name: { en: "Valorant", zh: "Valorant 无畏契约" },
        img: "/projects/payment/result-all-valorant.png",
        points: [
          { en: "Bright neon red and sharp visuals reinforce a modern, high-tech aesthetic", zh: "亮红的荧光色与硬朗线条强化现代科技感" },
          { en: "Clean, angular UI aligns with the tactical shooter experience", zh: "简洁锋利的 UI 风格贴合 tactical shooter 氛围" },
          { en: "High-contrast warnings increase the visibility of critical issues", zh: "高对比警示信息提升异常可见性" },
        ],
      },
      {
        name: { en: "League of Legends", zh: "League of Legends 英雄联盟" },
        img: "/projects/payment/result-all-lol.png",
        points: [
          { en: "The black-and-gold palette reinforces the game's classic fantasy aesthetic", zh: "黑金配色延续经典 fantasy 风格" },
          { en: "Capitalized and serif typography enhances a sense of grandeur and tradition", zh: "大写字体与 Serif 字体强化庄重感" },
          { en: "Improves message visibility while preserving immersion", zh: "在保持沉浸感的同时提升信息触达" },
        ],
      },
      {
        name: { en: "2XKO", zh: "2XKO" },
        img: "/projects/payment/result-all-2xko.png",
        points: [
          { en: "The contrast between black and neon colors reinforces a modern aesthetic", zh: "黑色与荧光色碰撞强化现代感" },
          { en: "Bold, uppercase typography reflects the power and intensity of fighting games", zh: "粗体大写字体突出格斗游戏力量感" },
          { en: "A minimalist layout makes exception messages clearer and more direct", zh: "更极简的布局让异常信息更直接清晰" },
        ],
      },
    ],
  },
  {
    title: { en: "1+ payment methods are unavailable", zh: "1+ 支付方式不可用" },
    games: [
      {
        name: { en: "Valorant", zh: "Valorant 无畏契约" },
        img: "/projects/payment/result-one-valorant.png",
        points: [
          { en: "Embed payment issues directly into the payment flow for a clearer hierarchy", zh: "将异常状态直接融入支付流程，保持信息层级清晰" },
          { en: "Use warning-style system feedback to increase the visibility of issues", zh: "将异常提示设计为更具警示感的系统反馈" },
          { en: "Maintain a compact interface to minimize disruption during payment", zh: "保持紧凑界面节奏，减少对支付选择流程的干扰" },
        ],
      },
      {
        name: { en: "League of Legends", zh: "League of Legends 英雄联盟" },
        img: "/projects/payment/result-one-lol.png",
        points: [
          { en: "Integrates exception messaging into the game's fantasy aesthetic", zh: "将异常提示自然融入整体 fantasy 氛围" },
          { en: "Maintains visual consistency through established borders and hierarchy", zh: "利用边框与层次感保持商城风格统一" },
          { en: "Preserves high information density while staying true to LoL's UI language", zh: "保持较高信息密度，延续 LOL 传统 UI 语言" },
        ],
      },
      {
        name: { en: "2XKO", zh: "2XKO" },
        img: "/projects/payment/result-one-2xko.png",
        points: [
          { en: "Direct prompts support the fast-paced nature of fighting games", zh: "使用更直接的提示方式，贴合格斗游戏的快节奏体验" },
          { en: "Improve decision-making with stronger button contrast and fewer steps", zh: "通过更强按钮对比与更少层级提升判断效率" },
          { en: "Maintain visual impact while prioritizing clear information delivery", zh: "保留视觉冲击力，同时避免过度装饰影响信息传达" },
        ],
      },
    ],
  },
];

const REFLECTION: BL = {
  en: "During my internship at Riot, I learned how to proactively share work, collaborate across teams, and iterate through feedback. Guided by Riot's “Player First” philosophy, I grounded my design decisions in real player needs and refined solutions through research, stakeholder discussions, and continuous iteration. This experience strengthened my UX design, communication, and collaboration skills, while deepening my passion for creating meaningful user experiences.",
  zh: "在 Riot 的实习经历中，我逐渐学会了如何在协作环境中主动分享未完成的设计，并通过持续反馈不断迭代自己的方案。我也意识到，优秀的设计不仅在于界面本身，更在于如何清晰、有逻辑地讲述设计背后的思考与用户价值。整个过程中，我始终围绕 Riot “Player First” 的理念进行设计，从用户痛点出发，通过调研、设计讨论与反复优化，最终完成了真正能够影响玩家体验的解决方案。这段经历不仅让我在 UX 能力与沟通表达上成长许多，也更加坚定了我对 UX Design 的热爱。",
};

/* ------------------------------ sub-components ------------------------------ */

function BulletList({ items, lang }: { items: BL[]; lang: Lang }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((it) => (
        <li key={it.en} className="flex gap-2 text-sm leading-relaxed text-muted-ink">
          <span className="mt-[0.15em] shrink-0" style={{ color: GOLD }}>
            •
          </span>
          {t(lang, it)}
        </li>
      ))}
    </ul>
  );
}

function SolutionCard({ opt, lang, imgClass }: { opt: Option; lang: Lang; imgClass: string }) {
  return (
    <div
      className={`flex flex-col rounded-2xl p-5 sm:p-6 ${
        opt.final ? "bg-[#f7efda] ring-1 ring-[#e7d5a4]" : "bg-white/55"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            opt.final ? "bg-ink text-white" : "bg-ink/[0.06] text-muted-ink"
          }`}
        >
          {t(lang, opt.label)}
        </span>
        <span className="text-sm font-semibold text-ink sm:text-base">{t(lang, opt.name)}</span>
      </div>
      <Shot src={opt.img} label={opt.name.en} className={imgClass} />
      <p className="mt-5 text-sm font-semibold" style={{ color: GOLD }}>
        {lang === "zh" ? "优点" : "Advantages"}
      </p>
      <BulletList items={opt.adv} lang={lang} />
      <p className="mt-4 text-sm font-semibold" style={{ color: GOLD }}>
        {lang === "zh" ? "缺点" : "Disadvantages"}
      </p>
      <BulletList items={opt.dis} lang={lang} />
    </div>
  );
}

/* ------------------------------ page ------------------------------ */

export default function PaymentTickerPage() {
  const { lang } = useLanguage();

  return (
    <main className="relative mx-auto w-full max-w-[90rem] overflow-x-clip pb-6">
      <CursorGlow />

      <SiteNav />

      {/* Hero — dark Riot-gold card (inspired by the deck) */}
      <section className="relative mx-3 mt-4 sm:mx-6 sm:mt-6">
        <div
          className="relative overflow-hidden rounded-[2rem] lg:min-h-[700px]"
          style={{
            background:
              "linear-gradient(150deg, #0c0a07 0%, #17130b 34%, #4c3d1c 68%, #ab8a3c 100%)",
          }}
        >
          <div className="grain-overlay" />
          {/* Desktop: hero image fills the right side, full height to the card border */}
          <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
            <Shot
              src="/projects/payment/hero.png"
              label="Payment screens"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:min-h-[700px] lg:flex-col lg:justify-center lg:px-14 lg:py-16">
            <div className="text-center lg:max-w-[46%] lg:text-left">
              <RiotLogo />
              <h1 className="mt-6 text-[clamp(1.9rem,8vw,2.4rem)] font-bold leading-[1.1] tracking-tight text-white sm:mt-7 sm:text-[clamp(2.4rem,5vw,4rem)]">
                {t(lang, HERO.title)}
              </h1>
              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0">
                {t(lang, HERO.subtitle)}
              </p>
            </div>
            <Shot
              src="/projects/payment/hero.png"
              label="Payment screens"
              className="mt-8 aspect-[4/3] w-full rounded-2xl object-cover object-center lg:hidden"
            />
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <DotGrid className="absolute right-10 top-14 hidden lg:grid" />
        <Eyebrow label={lang === "zh" ? "问题" : "The Problem"} color="orange" className={EB} />
        <h2 className={`mt-6 ${heading}`}>
          {lang === "zh" ? "玩家会略过支付异常提示" : "Payment alerts are often overlooked"}
        </h2>
        <Flourish />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-ink sm:text-lg">
          {lang === "zh"
            ? "当前的支付异常提示被放置在客户端首页中，玩家往往会在真正进入购买流程前忽略或遗忘这些信息，最终在支付失败后才意识到问题的存在。项目目标是在更相关、更及时的场景中展示支付异常信息，减少玩家的困惑与失败尝试。"
            : "Payment alerts are often missed on the homepage, so players discover issues only after a failed transaction. This project introduces more timely, contextual error messaging to reduce confusion and failed payments."}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-3">
          {PROBLEM_STEPS.map(({ icon: Icon, title, desc }) => (
            <div key={title.en} className="grid grid-rows-subgrid row-span-3 mb-6 sm:mb-0">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full text-white"
                style={{ background: GOLD }}
              >
                <Icon className="h-6 w-6" />
              </span>
              <p className="text-lg font-semibold leading-snug text-ink sm:text-xl">{t(lang, title)}</p>
              <p className="max-w-[80%] text-base leading-relaxed text-muted-ink sm:max-w-none sm:text-lg">
                {t(lang, desc)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why the current design failed */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <Eyebrow
          label={lang === "zh" ? "当前设计的局限" : "Why the Current Design Failed"}
          color="orange"
          className={EB}
        />
        <h2 className={`mt-6 ${heading}`}>
          {lang === "zh" ? "当前的设计为什么效果有限" : "Why the current design is limited"}
        </h2>
        <Flourish />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
          <Shot src="/projects/payment/current-ticker.png" label="Current alert" className="w-full rounded-2xl" />
          <div className="space-y-6">
            {WHY_POINTS.map(({ title, desc }, i) => (
              <div key={title.en} className="flex gap-4">
                <NumBadge n={i + 1} />
                <div>
                  <p className="text-base font-semibold text-ink sm:text-lg">{t(lang, title)}</p>
                  <p className="mt-1 text-base leading-relaxed text-muted-ink sm:text-lg">{t(lang, desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4 rounded-2xl bg-[#f7efda] px-5 py-4 ring-1 ring-[#e7d5a4] sm:px-7 sm:py-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white">
            <AlertCircle className="h-6 w-6" />
          </span>
          <p className="text-base font-medium leading-relaxed text-ink sm:text-lg">{t(lang, WHY_CALLOUT)}</p>
        </div>
      </section>

      {/* Exploring solutions */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <Eyebrow label={lang === "zh" ? "探索方案" : "Exploring Solutions"} color="orange" className={EB} />
        <h2 className={`mt-6 ${heading}`}>{lang === "zh" ? "探索方案" : "Explore solutions"}</h2>
        <Flourish />

        <div className="mt-12 space-y-14">
          {SOLUTIONS.map((sc, si) => (
            <div key={sc.title.en}>
              <div className="flex gap-4">
                <NumBadge n={si + 1} />
                <div>
                  <h3 className={subheading}>{t(lang, sc.title)}</h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-ink sm:text-lg">
                    {t(lang, sc.sub)}
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-5 lg:gap-6">
                {sc.options.map((opt) => (
                  <SolutionCard
                    key={opt.name.en}
                    opt={opt}
                    lang={lang}
                    imgClass={
                      si === 0
                        ? "mt-7 aspect-[16/9] w-full rounded-xl object-cover"
                        : "mt-7 w-full"
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final showcase / key results */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <DotGrid className="absolute right-10 top-14 hidden lg:grid" />
        <Eyebrow label={lang === "zh" ? "结果展示" : "Final Showcase"} color="orange" className={EB} />
        <h2 className={`mt-6 ${heading}`}>{lang === "zh" ? "结果展示" : "Key results"}</h2>
        <Flourish />

        <div className="mt-12 space-y-14">
          {RESULTS.map((res, ri) => (
            <div key={res.title.en}>
              <div className="flex items-center gap-4">
                <NumBadge n={ri + 1} />
                <h3 className={subheading}>{t(lang, res.title)}</h3>
              </div>
              <div className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-8">
                {res.games.map((g) => (
                  <div key={g.name.en} className="flex flex-col">
                    <Shot src={g.img} label={g.name.en} className="w-full rounded-2xl" />
                    <p className="mt-4 text-base font-semibold text-ink sm:text-lg">{t(lang, g.name)}</p>
                    <BulletList items={g.points} lang={lang} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reflection */}
      <section className="relative mx-3 px-6 py-12 sm:mx-6 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <DotGrid className="absolute right-10 top-14 hidden lg:grid" />
        <Eyebrow label={lang === "zh" ? "心得" : "Reflection"} color="orange" className={EB} />
        <h2 className={`mt-6 ${heading}`}>{lang === "zh" ? "心得体会" : "Insights & Reflections"}</h2>
        <Flourish />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-ink sm:text-lg">{t(lang, REFLECTION)}</p>
      </section>

      <ContactSection />
    </main>
  );
}
