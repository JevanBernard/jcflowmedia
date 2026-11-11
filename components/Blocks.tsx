import type { ReactNode } from "react";
import { Icon, WhatsAppGlyph, type IconName } from "./Icon";
import { WaButton } from "./WaButton";
import type { Locale } from "@/lib/i18n";

/** Kurva "flow": motif garis yang menyambung di seluruh situs. */
export function FlowRibbon({ className = "", id }: { className?: string; id: string }) {
  return (
    <svg viewBox="0 0 600 140" fill="none" className={`ribbon ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F58B4A" />
          <stop offset=".55" stopColor="#E97D26" />
          <stop offset="1" stopColor="#D64F27" />
        </linearGradient>
      </defs>
      <path
        d="M4 96C80 96 92 24 170 24s94 92 172 92 86-80 156-80c46 0 72 26 94 50"
        stroke={`url(#${id})`}
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}

export function PageHero({
  title,
  lead,
  children,
  aside,
}: {
  title: string;
  lead: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="container-x grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="t-hero">
            <span className="hero-line">
              <span style={{ ["--i" as string]: 0 }}>{title}</span>
            </span>
          </h1>
          <p className="t-lead measure fade-up mt-6" style={{ ["--i" as string]: 1 }}>
            {lead}
          </p>
          {children && (
            <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ ["--i" as string]: 2 }}>
              {children}
            </div>
          )}
        </div>
        {aside && <div className="lg:col-span-4">{aside}</div>}
      </div>
      <FlowRibbon id="ribbon-hero" className="pointer-events-none absolute -right-16 top-6 hidden w-[520px] opacity-90 md:block" />
    </section>
  );
}

export function SectionHead({
  title,
  lead,
  align = "left",
  className = "",
}: {
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`} data-reveal>
      <h2 className="t-h2">{title}</h2>
      {lead && <p className={`t-lead mt-4 ${align === "center" ? "mx-auto" : ""} measure`}>{lead}</p>}
    </div>
  );
}

export function CtaBand({
  title,
  lead,
  waMessage,
  waLabel,
  locale,
  position,
  secondary,
}: {
  title: string;
  lead: string;
  waMessage: string;
  waLabel: string;
  locale: Locale;
  position: string;
  secondary?: ReactNode;
}) {
  return (
    <section className="container-x pb-[var(--section)]">
      <div className="on-dark relative overflow-hidden rounded-[32px] px-6 py-16 sm:px-12 sm:py-24" data-reveal>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full opacity-90 blur-[2px]"
          style={{ background: "radial-gradient(circle at 35% 35%, #F58B4A, #D64F27 60%, transparent 61%)" }}
        />
        <FlowRibbon id={`ribbon-${position}`} className="pointer-events-none absolute -bottom-6 left-0 w-[640px] max-w-none opacity-60" />
        <div className="relative max-w-2xl">
          <h2 className="t-hero">{title}</h2>
          <p className="t-lead mt-5 measure">{lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <WaButton message={waMessage} position={position} lang={locale} className="btn btn-grad">
              <WhatsAppGlyph /> {waLabel}
            </WaButton>
            {secondary}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceBlock({
  index,
  icon,
  name,
  title,
  problem,
  does,
  gets,
  labels,
  footer,
}: {
  index: number;
  icon: IconName;
  name: string;
  title: string;
  problem: string;
  does: string[];
  gets: string;
  labels: { problem: string; does: string; gets: string };
  footer?: ReactNode;
}) {
  return (
    <article className="grid gap-8 border-t border-line py-14 sm:py-20 lg:grid-cols-12" data-reveal>
      <div className="lg:col-span-5">
        <div className="flex items-center gap-4">
          <span className="icon-dot">
            <Icon name={icon} />
          </span>
          <span className="grad-num text-[3.5rem]">{String(index).padStart(2, "0")}</span>
          <span className="text-[0.9375rem] font-semibold text-muted">{name}</span>
        </div>
        <h3 className="t-h2 mt-6 !text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)]">{title}</h3>
      </div>
      <div className="grid gap-4 lg:col-span-7">
        <div className="rounded-[var(--radius-card)] bg-cream-2 p-6 sm:p-8">
          <p className="t-label text-muted">{labels.problem}</p>
          <p className="mt-3 text-[1.0625rem] font-medium">{problem}</p>
        </div>
        <div className="card p-6 sm:p-8">
          <p className="t-label text-muted">{labels.does}</p>
          <ul className="mt-4 grid gap-3">
            {does.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="mt-1 grid size-6 flex-none place-items-center rounded-full bg-brand-orange/15 text-brand-ink">
                  <Icon name="check" width={15} height={15} strokeWidth={2.4} />
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <hr className="rule my-6" />
          <p className="t-label text-muted">{labels.gets}</p>
          <p className="mt-3 font-semibold">{gets}</p>
        </div>
        {footer}
      </div>
    </article>
  );
}
