/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/Blocks";
import { Icon, type IconName } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { href } from "@/lib/i18n";
import { localeOf, resolve, type PageProps } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { asset, site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return pageMetadata(await localeOf(params), "tentang");
}

const valueIcons: IconName[] = ["heart", "eye", "layers", "compass"];

/** Peta Bali Selatan yang disederhanakan: empat kabupaten/kota Sarbagita. */
function SarbagitaMap({ labels }: { labels: string[] }) {
  const regions = [
    { name: labels[1], d: "M120 70 L190 60 L215 120 L200 230 L170 300 L140 330 L125 260 L110 170 Z", lx: 160, ly: 150 },
    { name: labels[0], d: "M200 230 L215 120 L255 130 L262 215 L240 262 Z", lx: 234, ly: 196 },
    { name: labels[2], d: "M215 120 L190 60 L260 40 L320 70 L330 170 L290 230 L262 215 L255 130 Z", lx: 270, ly: 120 },
    { name: labels[3], d: "M30 90 L120 70 L110 170 L125 260 L80 250 L20 190 Z", lx: 72, ly: 165 },
  ];
  return (
    <svg viewBox="0 0 360 360" className="h-auto w-full" role="img" aria-label={labels.join(", ")}>
      <defs>
        <linearGradient id="mapg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F58B4A" />
          <stop offset="1" stopColor="#D64F27" />
        </linearGradient>
      </defs>
      {regions.map((r, i) => (
        <g key={r.name}>
          <path d={r.d} fill={i === 1 ? "url(#mapg)" : "#fff"} stroke="#1F1B18" strokeOpacity=".7" strokeWidth="2" strokeLinejoin="round" />
          <text x={r.lx} y={r.ly} textAnchor="middle" fontSize="13" fontWeight="600" fill="#1F1B18">
            {r.name}
          </text>
        </g>
      ))}
      <circle cx="226" cy="242" r="5" fill="#1F1B18" />
    </svg>
  );
}

export default async function TentangPage({ params }: PageProps) {
  const { locale, t } = await resolve(params);
  const a = t.tentang;

  return (
    <>
      <PageHero title={a.hero.title} lead={a.hero.lead}>
        <Link href={href(locale, "/kontak")} className="btn btn-primary">
          {a.cta} <Icon name="arrow" className="arrow" />
        </Link>
      </PageHero>

      <section className="section-tight">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead title={a.who.title} />
          </div>
          <div className="grid gap-5 text-[1.0625rem] lg:col-span-6 lg:col-start-7" data-reveal>
            {a.who.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Profil pendiri */}
      <section className="container-x">
        <div className="grid items-center gap-8 overflow-hidden rounded-[32px] bg-white p-6 sm:p-10 lg:grid-cols-12" data-reveal>
          <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-[var(--radius-card)] bg-cream-2 lg:col-span-4">
            {site.founder.photo ? (
              <img src={asset(site.founder.photo)} alt={site.founder.name || a.founder.role} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="grid h-full w-full place-items-center" style={{ background: "var(--grad)" }}>
                <Logo variant="full" tone="white" width={150} />
              </div>
            )}
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {site.founder.name && <h2 className="t-h2">{site.founder.name}</h2>}
            <p className={`font-semibold ${site.founder.name ? "mt-1 text-muted" : "t-h2 mt-3"}`}>{a.founder.role}</p>
            <p className="t-lead mt-5 measure">{a.founder.bio}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead title={a.values.title} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.items.map((v, i) => (
              <li key={v.title} className="card p-6 sm:p-7" data-reveal style={{ ["--d" as string]: i }}>
                <span className="icon-dot">
                  <Icon name={valueIcons[i]} />
                </span>
                <h3 className="t-h3 mt-6">{v.title}</h3>
                <p className="mt-2 text-muted">{v.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x pb-[var(--section)]">
        <div className="grid items-center gap-10 rounded-[32px] bg-cream-2 p-6 sm:p-12 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-6">
            <h2 className="t-h2">{a.area.title}</h2>
            <p className="t-lead mt-4">{a.area.lead}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.areaServed.map((r) => (
                <li key={r} className="tag !bg-white">
                  <Icon name="pin" width={16} height={16} className="mr-1.5 text-brand-ink" /> {r}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-sm font-medium text-muted">
              <span className="size-2 rounded-full" style={{ background: "var(--grad)" }} aria-hidden="true" />
              {a.area.expansion}
            </p>
          </div>
          <div className="mx-auto w-full max-w-[420px] lg:col-span-5 lg:col-start-8">
            <SarbagitaMap labels={site.areaServed} />
          </div>
        </div>
      </section>

      <CtaBand title={a.final.title} lead={a.final.lead} waMessage={t.wa.messages.tentang} waLabel={t.common.chatWa} locale={locale} position="final" />
    </>
  );
}
