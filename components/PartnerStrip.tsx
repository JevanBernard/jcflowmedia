/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Icon } from "./Icon";
import { href, type Locale } from "@/lib/i18n";
import type { Partner } from "@/lib/site";

/** Tanda partner: logo bila sudah ada, nama bisnis bila belum. */
export function PartnerMark({ partner, className = "" }: { partner: Partner; className?: string }) {
  if (partner.logo) {
    return <img src={partner.logo} alt={partner.name} loading="lazy" className={`max-h-12 w-auto max-w-[80%] object-contain ${className}`} />;
  }
  return <span className={`text-balance text-center font-bold leading-tight tracking-[-0.01em] ${className}`}>{partner.name}</span>;
}

/**
 * Strip "Bekerja sama dengan" (PRD §5): sebaris di desktop, bisa digeser di HP.
 * Setiap logo dan tombol mengarah ke /partner.
 */
export function PartnerStrip({
  partners,
  locale,
  label,
  linkLabel,
}: {
  partners: Partner[];
  locale: Locale;
  label: string;
  linkLabel: string;
}) {
  const base = href(locale, "/partner");
  return (
    <section aria-labelledby="partner-strip" className="section-tight">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-4" data-reveal>
          <h2 id="partner-strip" className="t-h3">
            {label}
          </h2>
          <Link href={base} className="link-arrow">
            {linkLabel} <Icon name="arrow" />
          </Link>
        </div>
      </div>
      <ul
        className="container-x mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] lg:grid lg:snap-none lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        style={{ gridTemplateColumns: `repeat(${partners.length}, minmax(0, 1fr))` }}
        data-reveal
      >
        {partners.map((p) => (
          <li key={p.id} className="w-[62%] flex-none snap-start xs:w-[44%] sm:w-[30%] lg:w-auto">
            <Link
              href={`${base}#${p.id}`}
              className="card grid h-28 place-items-center px-5 transition-transform duration-300 hover:-translate-y-1"
              aria-label={p.logo ? undefined : p.name}
            >
              <PartnerMark partner={p} className="text-[0.9375rem]" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
