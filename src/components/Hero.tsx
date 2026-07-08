"use client";

import { useEffect, useRef, useState } from "react";

const DISCIPLINES = ["ux design", "product design", "visual design", "game design"];

export function Hero() {
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
    <section className="relative mx-3 mt-1 overflow-hidden rounded-[2rem] sm:mx-6 sm:mt-1">
      <div className="gradient-mesh relative flex min-h-[620px] flex-col justify-between px-6 pb-8 pt-5 sm:px-10 sm:pb-10 sm:pt-6">
        <div className="grain-overlay" />

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
