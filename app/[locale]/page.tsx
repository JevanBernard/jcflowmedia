import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand, FlowRibbon, SectionHead } from "@/components/Blocks";
import { FlowSteps } from "@/components/FlowSteps";
import { HeroRotator } from "@/components/HeroRotator";
import { Icon, WhatsAppGlyph, type IconName } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { WaButton } from "@/components/WaButton";
import { WorkMedia } from "@/components/WorkMedia";
import { href } from "@/lib/i18n";
import { localeOf, resolve, type PageProps } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { PartnerStrip } from "@/components/PartnerStrip";
import { ProjectCard } from "@/components/ProjectCard";
import { toCard } from "@/lib/projects";
import { PARTNERS_ENABLED, allProjects, consentedPartners } from "@/lib/site";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return pageMetadata(await localeOf(params), "home");
}

const studioIcons: IconName[] = ["camera", "social", "design", "brand"];
const systemsIcons: IconName[] = ["web", "seo", "calendar", "bag"];

export default async function Home({ params }: PageProps) {
  const { locale, t } = await resolve(params);
  const h = t.home;
  // Visual hero: media pertama proyek yang punya media (ilustrasi berlabel sampai foto asli tersedia)
  const heroProject = allProjects.find((p) => p.media.length > 0);
  const heroWork = heroProject?.media[0];
  const preview = allProjects.slice(0, 3);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden pb-16 pt-8 sm:pt-14 lg:pb-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="t-hero">
              <span className="hero-line">
                <span style={{ ["--i" as string]: 0 }}>
                  {h.hero.titleA} <span className="text-grad">+</span>
                </span>
              </span>
              <span className="hero-line">
                <span style={{ ["--i" as string]: 1 }}>{h.hero.titleB}</span>
              </span>
            </h1>
            <p className="fade-up mt-4 text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] font-semibold tracking-[-0.02em]" style={{ ["--i" as string]: 1 }}>
              <span aria-hidden="true">
                {h.hero.rotatePrefix} <HeroRotator words={h.hero.rotate} />
              </span>
              <span className="sr-only">
                {h.hero.rotatePrefix} {h.hero.rotate.join(", ")}
              </span>
            </p>
            <p className="t-lead measure fade-up mt-6" style={{ ["--i" as string]: 2 }}>
              {h.hero.sub}
            </p>
            <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ ["--i" as string]: 3 }}>
              <WaButton message={t.wa.messages.home} position="hero" lang={locale} className="btn btn-primary">
                <WhatsAppGlyph /> {t.common.chatWa}
              </WaButton>
              <Link href={href(locale, "/audit")} className="btn btn-ghost">
                {h.hero.ctaAudit} <Icon name="arrow" className="arrow" />
              </Link>
            </div>
          </div>

          {/* Komposisi visual */}
          <div className="relative mx-auto w-full max-w-[480px] lg:col-span-5 lg:max-w-none">
            <div className="fade-up relative aspect-[4/5] overflow-hidden rounded-[32px] bg-cream-2" style={{ ["--i" as string]: 1 }}>
              {heroWork && <WorkMedia work={heroWork} locale={locale} label={t.common.illustration} priority sizes="(min-width:1024px) 40vw, 90vw" />}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                {/* PRD: di atas foto, logo diletakkan di badge putih membulat */}
                <span className="logo-badge !p-[7px]">
                  <Logo variant="mark" tone="color" width={44} />
                </span>
                <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-charcoal backdrop-blur">
                  {heroProject?.name} · {heroProject?.location}
                </span>
              </div>
            </div>

            <div
              className="fade-up card absolute -left-4 top-20 hidden w-[220px] p-4 sm:block lg:-left-16"
              style={{ ["--i" as string]: 3 }}
            >
              <div className="flex items-center gap-3">
                <span className="icon-dot !size-10">
                  <Icon name="camera" width={20} height={20} />
                </span>
                <div>
                  <p className="t-label text-brand-ink">{h.hero.chipStudio}</p>
                  <p className="text-sm font-semibold leading-snug">{t.home.divisions.studio.desc}</p>
                </div>
              </div>
            </div>
            <div
              className="fade-up on-dark absolute -right-3 bottom-24 hidden w-[210px] rounded-[20px] p-4 shadow-[0_18px_40px_-20px_rgb(31_27_24/0.6)] sm:block lg:-right-8"
              style={{ ["--i" as string]: 4 }}
            >
              <div className="flex items-center gap-3">
                <span className="icon-dot !size-10">
                  <Icon name="web" width={20} height={20} />
                </span>
                <div>
                  <p className="t-label eyebrow">{h.hero.chipSystems}</p>
                  <p className="text-sm font-semibold leading-snug">{t.home.divisions.systems.desc}</p>
                </div>
              </div>
            </div>
            <FlowRibbon id="ribbon-home" className="pointer-events-none absolute -bottom-24 -left-24 -z-10 w-[560px] max-w-none" />
          </div>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <section aria-label={h.divisions.title} className="border-y border-line bg-white/60 py-6">
        <div className="marquee">
          {[0, 1].map((dup) => (
            <ul key={dup} className="marquee__track" aria-hidden={dup === 1}>
              {h.marquee.map((m) => (
                <li key={m} className="flex items-center gap-10 whitespace-nowrap text-[clamp(1.25rem,1rem+1.2vw,2rem)] font-extrabold tracking-[-0.03em]">
                  {m}
                  <span className="size-3 rounded-full" style={{ background: "var(--grad)" }} aria-hidden="true" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* ---------------- DUA DIVISI ---------------- */}
      <section className="section">
        <div className="container-x">
          <SectionHead title={h.divisions.title} />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <article className="card flex flex-col p-7 sm:p-10" data-reveal>
              <h3 className="t-h2">{h.divisions.studio.name}</h3>
              <p className="t-lead mt-3">{h.divisions.studio.desc}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {h.divisions.studio.items.map((it, i) => (
                  <li key={it} className="flex items-center gap-3 rounded-2xl bg-cream p-3 pr-4 font-medium">
                    <span className="icon-dot !size-10">
                      <Icon name={studioIcons[i]} width={20} height={20} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                <Link href={href(locale, "/studio")} className="link-arrow">
                  {h.divisions.studio.link} <Icon name="arrow" />
                </Link>
                <span className="text-grad text-2xl font-extrabold tracking-[-0.03em]" aria-hidden="true">
                  {h.divisions.studio.kicker}.
                </span>
              </div>
            </article>
            <article className="on-dark flex flex-col rounded-[var(--radius-card)] p-7 sm:p-10" data-reveal style={{ ["--d" as string]: 1 }}>
              <h3 className="t-h2">{h.divisions.systems.name}</h3>
              <p className="t-lead mt-3">{h.divisions.systems.desc}</p>
              <ul className="mt-8 grid gap-3">
                {h.divisions.systems.items.map((it, i) => (
                  <li key={it} className="flex items-center gap-3 rounded-2xl bg-charcoal-2 p-3 pr-4 font-medium">
                    <span className="icon-dot !size-10">
                      <Icon name={systemsIcons[i]} width={20} height={20} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                <Link href={href(locale, "/systems")} className="link-arrow">
                  {h.divisions.systems.link} <Icon name="arrow" />
                </Link>
                <span className="text-grad text-2xl font-extrabold tracking-[-0.03em]" aria-hidden="true">
                  {h.divisions.systems.kicker}.
                </span>
              </div>
            </article>
          </div>
          <p className="t-h2 mx-auto mt-20 max-w-4xl text-center !font-bold" data-reveal>
            {t.common.divider.split("+").map((part, i, arr) => (
              <span key={i}>
                {part.trim()}
                {i < arr.length - 1 && <span className="text-grad"> + </span>}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ---------------- CUPLIKAN KARYA ---------------- */}
      <section className="section-tight bg-cream-2/60">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead title={h.works.title} lead={h.works.lead} />
            <Link href={href(locale, "/karya")} className="btn btn-ghost" data-reveal>
              {t.common.seeAll} <Icon name="arrow" className="arrow" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((p, i) => (
              <li key={p.slug} data-reveal style={{ ["--d" as string]: i }}>
                <ProjectCard p={toCard(p, locale, t)} cta={t.karya.viewProject} sizes="(min-width:1024px) 420px, (min-width:640px) 50vw, 100vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- PARTNER (PRD §5: di bawah cuplikan karya) ---------------- */}
      {PARTNERS_ENABLED && (
        <PartnerStrip partners={consentedPartners} locale={locale} label={h.partners.label} linkLabel={h.partners.link} />
      )}

      {/* ---------------- CARA KERJA (momen khas) ---------------- */}
      <section className="section">
        <div className="container-x">
          <SectionHead title={h.process.title} lead={h.process.lead} />
          <div className="mt-16">
            <FlowSteps steps={h.process.steps} />
          </div>
          <div className="mt-14 flex justify-start lg:justify-center" data-reveal>
            <WaButton message={t.wa.messages.home} position="process" lang={locale} className="btn btn-primary">
              <WhatsAppGlyph /> {h.process.end}
            </WaButton>
          </div>
        </div>
      </section>

      {/* ---------------- AUDIT ---------------- */}
      <section className="container-x">
        <div className="on-dark grid gap-12 overflow-hidden rounded-[32px] px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-5">
            <h2 className="t-h2">{h.audit.title}</h2>
            <p className="t-lead mt-4">{h.audit.lead}</p>
            <Link href={href(locale, "/audit")} className="btn btn-grad mt-9">
              {h.audit.cta} <Icon name="arrow" className="arrow" />
            </Link>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-cream/10 lg:col-span-6 lg:col-start-7">
            {t.audit.aspects.items.map((a, i) => (
              <li key={a.title} className="flex items-center gap-5 bg-charcoal px-5 py-4 sm:px-6">
                <span className="grad-num w-14 flex-none text-[2.5rem]" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-semibold">{a.title}</span>
                  <span className="block text-sm text-cream/70">{a.desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="h-[var(--section)]" aria-hidden="true" />

      <CtaBand
        title={h.final.title}
        lead={h.final.lead}
        waMessage={t.wa.messages.home}
        waLabel={t.common.chatWa}
        locale={locale}
        position="final"
        secondary={
          <Link href={href(locale, "/kontak")} className="btn btn-ghost">
            {h.final.secondary} <Icon name="arrow" className="arrow" />
          </Link>
        }
      />
    </>
  );
}
