"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language";

const DISCIPLINES = ["ux design", "product design", "visual design", "game design"];

export function Hero() {
  const { lang, setLang } = useLanguage();
  const [word, setWord] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [barW, setBarW] = useState<number>();

  useEffect(() => {
    const id = setInterval(() => setWord((v) => (v + 1) % DISCIPLINES.length), 2400);
    return () => clearInterval(id);
  }, []);

  // Measure the current word (with padding) so the pill can smoothly resize to it.
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const update = () => setBarW(el.offsetWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [word]);

  return (
    <section className="relative mx-3 mt-3 overflow-hidden rounded-[2rem] sm:mx-6 sm:mt-6">
      <div className="gradient-mesh relative flex min-h-[620px] flex-col justify-between px-6 pb-8 pt-5 sm:px-10 sm:pb-10 sm:pt-6">
        <div className="grain-overlay" />

        <nav className="relative z-10 grid grid-cols-3 items-center">
          <span className="flex h-9 items-center justify-self-start rounded-full bg-white px-3 shadow-sm sm:h-11 sm:px-4">
            <Image
              src="/projects/logo.png"
              alt="Lily Huang"
              width={1084}
              height={980}
              priority
              className="h-5 w-auto sm:h-6"
            />
          </span>

          <div className="flex h-9 items-center gap-1.5 justify-self-center whitespace-nowrap rounded-full bg-white px-3 text-xs font-semibold shadow-sm sm:h-11 sm:gap-2 sm:px-5 sm:text-sm">
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
            className="flex h-9 items-center justify-self-end whitespace-nowrap rounded-full bg-white px-3 text-xs font-semibold text-[#4a57d0] shadow-sm transition hover:bg-white/90 sm:h-11 sm:px-5 sm:text-sm"
          >
            {lang === "zh" ? "简历" : "Resume"}
          </a>
        </nav>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 py-16 text-center sm:gap-7 lg:flex-row lg:flex-wrap lg:gap-6">
          <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-sm sm:text-7xl">
            lily&rsquo;s portfolio of
          </h1>
          <div className="relative">
            <span
              ref={measureRef}
              aria-hidden
              className="invisible absolute left-0 top-0 inline-block whitespace-nowrap rounded-full px-5 py-4 text-3xl font-bold sm:px-7 sm:py-5 sm:text-5xl"
            >
              {DISCIPLINES[word]}
            </span>
            <div
              className="flex items-center justify-center overflow-hidden rounded-full bg-white/55 px-5 py-4 sm:px-7 sm:py-5"
              style={{ width: barW, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
            >
              <span
                key={DISCIPLINES[word]}
                style={{ animation: "wordSwap 0.55s ease-out" }}
                className="block whitespace-nowrap text-3xl font-bold text-[#979CD3] sm:text-5xl"
              >
                {DISCIPLINES[word]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
