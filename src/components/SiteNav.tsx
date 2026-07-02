"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language";

/** Top nav used on interior pages: logo (links home) + language toggle + resume. */
export function SiteNav() {
  const { lang, setLang } = useLanguage();

  return (
    <nav className="relative z-10 grid grid-cols-3 items-center px-6 pt-6 sm:px-10 lg:px-14">
      <Link
        href="/"
        aria-label="Home"
        className="flex items-center justify-self-start rounded-full bg-white px-4 py-1.5 shadow-sm transition hover:bg-white/90"
      >
        <Image src="/projects/logo.png" alt="Lily Huang" width={1084} height={980} className="h-7 w-auto" />
      </Link>

      <div className="flex items-center gap-2 justify-self-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-sm">
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
        href={lang === "zh" ? "/resume.pdf" : "/resume-english.pdf"}
        download={lang === "zh" ? "Lily-Huang-简历.pdf" : "Lily-Huang-Resume.pdf"}
        className="justify-self-end rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#4a57d0] shadow-sm transition hover:bg-white/90"
      >
        {lang === "zh" ? "简历" : "Resume"}
      </a>
    </nav>
  );
}
