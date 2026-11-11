"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icon";
import { WorkMedia } from "./WorkMedia";
import { track } from "@/lib/analytics";
import type { Locale, Messages } from "@/lib/i18n";
import type { Work, WorkCategory } from "@/lib/site";

type Filter = "all" | WorkCategory;

export function Gallery({ works, locale, k, illustration }: { works: Work[]; locale: Locale; k: Messages["karya"]; illustration: string }) {

  const [filter, setFilter] = useState<Filter>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const cats = useMemo(() => {
    const present = new Set(works.map((w) => w.category));
    return (["all", "villa", "interior", "video", "web"] as Filter[]).filter((c) => c === "all" || present.has(c));
  }, [works]);

  const list = useMemo(() => (filter === "all" ? works : works.filter((w) => w.category === filter)), [works, filter]);
  const current = openIdx === null ? null : list[openIdx];

  const open = useCallback(
    (i: number, trigger?: HTMLButtonElement | null) => {
      lastTrigger.current = trigger ?? null;
      setOpenIdx(i);
      track("gallery_open", { category: list[i].category });
    },
    [list],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (openIdx !== null && !d.open) d.showModal();
    if (openIdx === null && d.open) d.close();
  }, [openIdx]);

  // Tautan dalam: /karya#id membuka karya tersebut
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const i = works.findIndex((w) => w.id === id);
    if (i >= 0) {
      document.getElementById(id)?.scrollIntoView({ block: "center" });
      open(i);
    }
    // hanya saat pertama dimuat
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = (dir: 1 | -1) => setOpenIdx((v) => (v === null ? v : (v + dir + list.length) % list.length));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={k.filterLabel} className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} type="button" className="filter-btn" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {k.filters[c]}
            </button>
          ))}
        </div>
        <p className="text-sm font-medium text-muted" aria-live="polite">
          {list.length} {k.count}
        </p>
      </div>

      {list.length === 0 ? (
        <p className="mt-12 rounded-[var(--radius-card)] bg-cream-2 p-10 text-center text-muted">{k.empty}</p>
      ) : (
        <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          {list.map((w, i) => (
            <li key={w.id} id={w.id} className="break-inside-avoid">
              <button
                type="button"
                className="work-tile scrim group block w-full text-left"
                onClick={(e) => open(i, e.currentTarget)}
                aria-haspopup="dialog"
                aria-label={`${k.open}: ${w.client}, ${w.title[locale]}`}
              >
                <div className={`relative ${i % 3 === 1 ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
                  <WorkMedia work={w} locale={locale} label={illustration} />
                  {w.category === "video" && (
                    <span className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white text-charcoal">
                      <Icon name="play" width={18} height={18} fill="currentColor" />
                    </span>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 text-cream">
                  <div>
                    <p className="t-label text-cream/80">
                      {k.filters[w.category]} · {w.location}
                    </p>
                    <p className="mt-1 text-lg font-semibold">{w.client}</p>
                    <p className="text-sm text-cream/85">{w.title[locale]}</p>
                  </div>
                  <span className="grid size-11 flex-none place-items-center rounded-full bg-white text-charcoal transition-transform duration-500 group-hover:scale-110">
                    <Icon name="arrowUpRight" width={20} height={20} />
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={k.lightbox.label}
        onClose={() => {
          setOpenIdx(null);
          lastTrigger.current?.focus();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="container-x flex h-[var(--header-h)] flex-none items-center justify-between gap-4">
              <p className="min-w-0 truncate text-sm font-medium text-cream/80">
                <span className="font-semibold text-cream">{current.client}</span> · {current.title[locale]}
              </p>
              <button
                type="button"
                className="grid size-11 flex-none place-items-center rounded-full bg-cream text-charcoal"
                onClick={() => dialogRef.current?.close()}
                aria-label={k.lightbox.close}
                autoFocus
              >
                <Icon name="close" width={22} height={22} />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
              <div className="relative aspect-[4/5] h-full max-h-[78vh] max-w-full overflow-hidden rounded-[var(--radius-card)] bg-charcoal-2">
                {current.video ? (
                  <video src={current.video} controls playsInline className="h-full w-full object-cover" aria-label={current.alt[locale]} />
                ) : (
                  <WorkMedia work={current} locale={locale} label={illustration} sizes="90vw" />
                )}
              </div>
              {list.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute bottom-8 left-4 grid size-12 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:bottom-auto sm:left-6"
                    aria-label={k.lightbox.prev}
                  >
                    <Icon name="chevronL" width={22} height={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute bottom-8 right-4 grid size-12 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:bottom-auto sm:right-6"
                    aria-label={k.lightbox.next}
                  >
                    <Icon name="chevronR" width={22} height={22} />
                  </button>
                </>
              )}
            </div>
            <p className="pb-6 text-center text-sm text-cream/60" aria-live="polite">
              {(openIdx ?? 0) + 1} / {list.length}
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
