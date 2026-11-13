"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { WorkMedia } from "./WorkMedia";
import { track } from "@/lib/analytics";
import type { Locale, Messages } from "@/lib/i18n";
import type { MediaItem } from "@/lib/site";

/** Galeri foto/video satu proyek dengan lightbox (panah kiri/kanan, Esc, fokus kembali ke pemicu). */
export function MediaGallery({
  items,
  locale,
  lb,
  illustration,
  category,
}: {
  items: MediaItem[];
  locale: Locale;
  lb: Messages["karya"]["lightbox"];
  illustration: string;
  category: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const current = openIdx === null ? null : items[openIdx];

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (openIdx !== null && !d.open) d.showModal();
    if (openIdx === null && d.open) d.close();
  }, [openIdx]);

  const open = (i: number, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger;
    setOpenIdx(i);
    track("gallery_open", { category });
  };
  const step = (dir: 1 | -1) => setOpenIdx((v) => (v === null ? v : (v + dir + items.length) % items.length));

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m, i) => (
          <li key={m.id}>
            <button
              type="button"
              className="work-tile scrim group block w-full text-left"
              onClick={(e) => open(i, e.currentTarget)}
              aria-haspopup="dialog"
              aria-label={`${lb.open}: ${m.title[locale]}`}
            >
              <div className="relative aspect-[4/5]">
                <WorkMedia work={m} locale={locale} label={illustration} />
                {m.video !== undefined && (
                  <span className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white text-charcoal">
                    <Icon name="play" width={18} height={18} fill="currentColor" />
                  </span>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 text-cream">
                <p className="text-base font-semibold">{m.title[locale]}</p>
                <span className="grid size-10 flex-none place-items-center rounded-full bg-white text-charcoal transition-transform duration-500 group-hover:scale-110">
                  <Icon name="arrowUpRight" width={18} height={18} />
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={lb.label}
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
              <p className="min-w-0 truncate text-sm font-semibold text-cream">{current.title[locale]}</p>
              <button
                type="button"
                className="grid size-11 flex-none place-items-center rounded-full bg-cream text-charcoal"
                onClick={() => dialogRef.current?.close()}
                aria-label={lb.close}
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
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute bottom-8 left-4 grid size-12 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:bottom-auto sm:left-6"
                    aria-label={lb.prev}
                  >
                    <Icon name="chevronL" width={22} height={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute bottom-8 right-4 grid size-12 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:bottom-auto sm:right-6"
                    aria-label={lb.next}
                  >
                    <Icon name="chevronR" width={22} height={22} />
                  </button>
                </>
              )}
            </div>
            <p className="pb-6 text-center text-sm text-cream/60" aria-live="polite">
              {(openIdx ?? 0) + 1} / {items.length}
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
