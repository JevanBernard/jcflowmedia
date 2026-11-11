"use client";

import { useEffect, useState } from "react";

/** Kata berganti: villa → restoran → kafe → usaha lokal. Berhenti bila reduced motion. */
export function HeroRotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => window.clearInterval(id);
  }, [words.length]);
  return (
    <span className="rotator" aria-hidden="true">
      {words.map((w, k) => (
        <span key={w} data-active={k === i} data-past={k < i} className="text-grad">
          {w}
        </span>
      ))}
    </span>
  );
}
