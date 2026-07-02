"use client";

import { useEffect, useRef } from "react";

/**
 * A single ambient glow that follows the cursor. It's fixed to the
 * viewport (so it never clips at content edges or causes scrollbars) and
 * sits behind every section, showing through the transparent project
 * areas and covered by the opaque hero, resume, and contact blocks.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="interactive-glow pointer-events-none fixed inset-0"
    />
  );
}
