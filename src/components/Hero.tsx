"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language";

const DISCIPLINES = ["ux design", "product design", "visual design", "game design"];

export function Hero() {
  const { lang, setLang } = useLanguage();
  const [word, setWord] = useState(0);
  const [show, setShow] = useState(true);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [barW, setBarW] = useState<number>();

  // Crossfade without remounting: fade out, swap the text + width while
  // invisible, then fade back in. Nothing unmounts, so the word never jumps.
  useEffect(() => {
    const id = setInterval(() => {
      setShow(false); // fade the current word out
      // Swap the word (and trigger the width resize) while it's invisible,
      // then fade the new word in only after the pill has finished resizing,
      // so a longer word is never clipped mid-transition.
      window.setTimeout(() => setWord((v) => (v + 1) % DISCIPLINES.length), 300);
      window.setTimeout(() => setShow(true), 760);
    }, 2600);
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

        <div className="relative z-10 flex flex-1 items-center justify-center py-16 text-center">
          <h1 className="text-[clamp(2.3rem,10.5vw,2.6rem)] font-bold leading-[1.4] tracking-tight text-white drop-shadow-sm sm:leading-[1.18] sm:text-7xl">
            lily&rsquo;s portfolio{" "}
            <span className="whitespace-nowrap">
              of{" "}
              <span className="relative inline-flex align-middle">
                <span
                  ref={measureRef}
                  aria-hidden
                  className="invisible absolute left-0 top-0 inline-block whitespace-nowrap rounded-full px-4 text-[0.9em] font-bold sm:px-5 lg:px-7"
                >
                  {DISCIPLINES[word]}
                </span>
                <span
                  className="flex items-center justify-center overflow-hidden rounded-full bg-white/55 px-4 py-2.5 sm:px-5 sm:py-3 lg:px-7 lg:py-4"
                  style={{ width: barW, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
                >
                  <span
                    className={`block -translate-y-[0.083em] whitespace-nowrap text-[0.9em] font-bold leading-none text-[#979CD3] transition-opacity duration-300 ${
                      show ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {DISCIPLINES[word]}
                  </span>
                </span>
              </span>
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
