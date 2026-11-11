"use client";

import { useEffect, useRef } from "react";

type Step = { title: string; desc: string };

/**
 * Momen khas situs: satu garis "flow" yang tergambar mengikuti scroll,
 * menyalakan empat langkah kerja satu per satu.
 * Reduced motion: garis langsung utuh, semua langkah menyala (lihat CSS .flow).
 */
export function FlowSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".flow-step"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    let thresholds: number[] = [];
    let raf = 0;

    const measure = () => {
      if (wide.matches) {
        thresholds = items.map((_, i) => (i + 0.5) / items.length - 0.06);
      } else {
        // Titik setiap langkah ada di tepi atas <li>; offsetTop relatif ke <ol> (posisi 0 di root)
        const h = root.offsetHeight || 1;
        thresholds = items.map((el) => Math.max(0, el.offsetTop / h - 0.01));
      }
    };

    const update = () => {
      raf = 0;
      if (reduce.matches) {
        root.style.setProperty("--p", "1");
        items.forEach((el) => (el.dataset.on = "true"));
        return;
      }
      const r = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.82;
      const span = r.height + vh * (wide.matches ? 0.12 : -0.2);
      const p = Math.min(1, Math.max(0, (start - r.top) / Math.max(span, 1)));
      root.style.setProperty("--p", p.toFixed(4));
      items.forEach((el, i) => (el.dataset.on = String(p >= thresholds[i])));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    wide.addEventListener("change", onResize);
    reduce.addEventListener("change", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      wide.removeEventListener("change", onResize);
      reduce.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <div ref={ref} className="flow relative">
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F58B4A" />
            <stop offset=".55" stopColor="#E97D26" />
            <stop offset="1" stopColor="#D64F27" />
          </linearGradient>
        </defs>
      </svg>

      {/* Desktop: gelombang horizontal melewati 4 titik */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[120px] w-full lg:block"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="flow-path-bg"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          d="M0 60 C50 60 80 60 125 60 C200 0 300 120 375 60 C450 0 550 120 625 60 C700 0 800 120 875 60 C920 60 950 60 1000 60"
        />
        <path
          className="flow-path"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          d="M0 60 C50 60 80 60 125 60 C200 0 300 120 375 60 C450 0 550 120 625 60 C700 0 800 120 875 60 C920 60 950 60 1000 60"
        />
      </svg>

      {/* Mobile/tablet: garis vertikal */}
      <svg
        className="pointer-events-none absolute bottom-0 left-[8px] top-[9px] w-[4px] lg:hidden"
        viewBox="0 0 4 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        style={{ height: "calc(100% - 9px)" }}
      >
        <path className="flow-path-bg" pathLength={1} vectorEffect="non-scaling-stroke" d="M2 0V1000" />
        <path className="flow-path" pathLength={1} vectorEffect="non-scaling-stroke" d="M2 0V1000" />
      </svg>

      <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
        {steps.map((s, i) => (
          <li key={s.title} className="flow-step relative pl-12 lg:pl-0 lg:pt-[51px] lg:text-center" data-on="false">
            <span className="flow-node absolute left-0 top-0 block lg:left-1/2 lg:-translate-x-1/2 lg:[top:51px]" aria-hidden="true" />
            <div className="lg:mt-12">
              <span className="grad-num block text-[4.5rem] sm:text-[5.5rem]" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flow-copy">
                <h3 className="t-h3 mt-3">
                  <span className="sr-only">{i + 1}. </span>
                  {s.title}
                </h3>
                <p className="mt-2 text-muted lg:mx-auto lg:max-w-[26ch]">{s.desc}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
