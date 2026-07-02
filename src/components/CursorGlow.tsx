"use client";

import { useEffect, useRef } from "react";

/**
 * A single ambient glow that follows the cursor across the whole page.
 * It sits behind every section, so it only shows through the transparent
 * areas (the project sections and the background), and is covered by the
 * opaque hero, resume, and contact blocks.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="interactive-glow pointer-events-none absolute inset-0"
    />
  );
}
