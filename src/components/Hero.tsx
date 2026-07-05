"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language";

const DISCIPLINES = ["ux design", "product design", "visual design", "game design"];

export function Hero() {
  const { lang, setLang } = useLanguage();
  const [word, setWord] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWord((v) => (v + 1) % DISCIPLINES.length), 2200);
    return () => clearInterval(id);
  }, []);

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

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 py-16 text-center sm:gap-7">
          <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-sm sm:text-7xl">
            lily&rsquo;s portfolio of
          </h1>
          <div className="inline-grid rounded-full bg-white px-6 py-2 shadow-md sm:px-9 sm:py-3">
            {DISCIPLINES.map((d, i) => (
              <span
                key={d}
                aria-hidden={i !== word}
                className={`col-start-1 row-start-1 whitespace-nowrap text-center text-3xl font-bold text-[#4a57d0] transition-opacity duration-500 sm:text-5xl ${
                  i === word ? "opacity-100" : "opacity-0"
                }`}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
