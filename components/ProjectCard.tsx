import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";

/** Data kartu yang sudah diterjemahkan di server (ringan dikirim ke klien). */
export type ProjectCardData = {
  slug: string;
  href: string;
  name: string;
  meta: string;
  summary: string;
  categories: string[];
  categoryKeys: string[];
  logo: string | null;
  cover: string | null;
};

/**
 * Kartu proyek: sampul (foto bila ada, logo klien bila belum), nama, jenis bisnis,
 * kategori, ringkasan. Seluruh kartu adalah satu tautan ke halaman detail.
 */
export function ProjectCard({ p, cta, sizes, priority = false }: { p: ProjectCardData; cta: string; sizes: string; priority?: boolean }) {
  return (
    <Link href={p.href} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_1px_0_rgb(31_27_24/0.04),0_18px_40px_-28px_rgb(31_27_24/0.25)] transition-transform duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-2">
        {p.cover ? (
          <Image src={p.cover} alt="" fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-[1100ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]" />
        ) : (
          <>
            <div aria-hidden="true" className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(120% 90% at 50% 0%, #fff 0%, transparent 70%)" }} />
            {p.logo && (
              <div className="absolute inset-0 grid place-items-center p-10 sm:p-12">
                <span className="relative block h-full w-full">
                  <Image src={p.logo} alt="" fill sizes={sizes} priority={priority} className="object-contain transition-transform duration-[900ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.05]" />
                </span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="t-h3">{p.name}</h3>
        <p className="mt-1 text-sm text-muted">{p.meta}</p>
        <p className="mt-4 text-[0.9375rem] text-charcoal/80">{p.summary}</p>
        <p className="mt-5 text-[0.8125rem] font-semibold text-brand-ink">{p.categories.join(" · ")}</p>
        <span className="link-arrow mt-auto pt-4">
          {cta} <Icon name="arrow" />
        </span>
      </div>
    </Link>
  );
}
