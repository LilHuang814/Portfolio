"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language";

/** Sticky top nav used on interior pages: logo (links home) + language toggle
    + resume. `accent` tints the active language + resume text to the page's
    color scheme. Transparent at the top of the page; once scrolled it fades in
    a frosted-white bar that spans the full screen width. */
export function SiteNav({ accent = "#4a57d0" }: { accent?: string }) {
  const { lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 px-6 py-4 sm:px-10 sm:py-5 lg:px-14">
      {/* Full-bleed frosted background that fades in on scroll. It spans the
          viewport width (w-screen, centered) so it reaches the screen edges
          even though the nav content stays within the page width. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-0 h-full w-screen -translate-x-1/2 border-b border-black/5 backdrop-blur-md transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "rgba(255,255,255,0.45)" }}
      />

      <div className="relative z-10 grid grid-cols-3 items-center">
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
      </div>
    </nav>
  );
}
