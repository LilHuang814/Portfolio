"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language";

/** Top nav used on interior pages: logo (links home) + language toggle + resume.
    `accent` tints the active language + resume text to the page's color scheme.
    `flush` drops the nav's own padding so it can sit inside an already-padded
    hero (matching the home page, where the nav lives inside the hero card). */
export function SiteNav({ accent = "#4a57d0", flush = false }: { accent?: string; flush?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <nav className={`relative z-10 grid grid-cols-3 items-center${flush ? "" : " px-6 pt-6 sm:px-10 lg:px-14"}`}>
      <Link
        href="/"
        aria-label="Home"
        className="flex h-9 items-center justify-self-start rounded-full bg-white px-3 shadow-sm transition hover:bg-white/90 sm:h-11 sm:px-4"
      >
        <Image src="/projects/logo.png" alt="Lily Huang" width={1084} height={980} className="h-5 w-auto sm:h-6" />
      </Link>

      <div className="flex h-9 items-center gap-1.5 justify-self-center whitespace-nowrap rounded-full bg-white px-3 text-xs font-semibold shadow-sm sm:h-11 sm:gap-2 sm:px-5 sm:text-sm">
        <button
          type="button"
          onClick={() => setLang("zh")}
          className={lang === "zh" ? "" : "text-ink/60"}
          style={lang === "zh" ? { color: accent } : undefined}
        >
          中文
        </button>
        <span className="text-ink/25">|</span>
        <button
          type="button"
          onClick={() => setLang("en")}
          className={lang === "en" ? "" : "text-ink/60"}
          style={lang === "en" ? { color: accent } : undefined}
        >
          English
        </button>
      </div>

      <a
        href={lang === "zh" ? "/resume.pdf" : "/resume-english.pdf"}
        download={lang === "zh" ? "Lily-Huang-简历.pdf" : "Lily-Huang-Resume.pdf"}
        className="flex h-9 items-center justify-self-end whitespace-nowrap rounded-full bg-white px-3 text-xs font-semibold shadow-sm transition hover:bg-white/90 sm:h-11 sm:px-5 sm:text-sm"
        style={{ color: accent }}
      >
        {lang === "zh" ? "简历" : "Resume"}
      </a>
    </nav>
  );
}
