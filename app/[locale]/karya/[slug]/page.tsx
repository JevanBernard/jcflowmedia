import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand, FlowRibbon } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { MediaGallery } from "@/components/MediaGallery";
import { ProjectCard } from "@/components/ProjectCard";
import { CATEGORY_ICON, CATEGORY_ORDER } from "@/lib/categories";
import { format, getMessages, href, isLocale, locales, type Locale } from "@/lib/i18n";
import { toCard } from "@/lib/projects";
import { metadataBase } from "@/lib/seo";
import { allProjects, getProject } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => allProjects.map((p) => ({ locale, slug: p.slug })));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const t = getMessages(locale);
  const path = `/karya/${slug}`;
  const title = `${project.name}: ${t.karya.categories[project.categories[0]]}`;
  return {
    metadataBase,
    title,
    description: project.summary[locale],
    alternates: {
      canonical: href(locale, path),
      languages: { id: href("id", path), en: href("en", path), "x-default": href("id", path) },
    },
    openGraph: { type: "article", url: href(locale, path), title: `${title} | ${t.meta.siteName}`, description: project.summary[locale] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale: l, slug } = await params;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const project = getProject(slug);
  if (!project) notFound();

  const t = getMessages(locale);
  const d = t.karya.detail;
  const cats = CATEGORY_ORDER.filter((c) => project.categories.includes(c));
  const idx = allProjects.findIndex((p) => p.slug === slug);
  const next = allProjects[(idx + 1) % allProjects.length];
  const meta = [project.type[locale], project.location].filter(Boolean).join(" · ");
  const backHref = href(locale, "/karya");

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-12">
        <div className="container-x">
          <Link href={backHref} className="link-arrow !text-muted">
            <Icon name="chevronL" /> {d.back}
          </Link>
          <div className="mt-6 grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="t-hero">
                <span className="hero-line">
                  <span style={{ ["--i" as string]: 0 }}>{project.name}</span>
                </span>
              </h1>
              <p className="mt-4 text-lg font-semibold text-muted fade-up" style={{ ["--i" as string]: 1 }}>
                {meta}
              </p>
              <p className="t-lead measure fade-up mt-6" style={{ ["--i" as string]: 2 }}>
                {project.summary[locale]}
              </p>
            </div>
            {project.logo && (
              <div className="fade-up hidden lg:col-span-4 lg:block" style={{ ["--i" as string]: 3 }}>
                <div className="relative grid aspect-[4/3] place-items-center rounded-[var(--radius-card)] bg-white p-10 shadow-[0_18px_40px_-28px_rgb(31_27_24/0.25)]">
                  <span className="relative block h-full w-full">
                    <Image src={project.logo} alt={project.name} fill sizes="320px" className="object-contain" priority />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <FlowRibbon id="ribbon-project" className="pointer-events-none absolute -right-24 top-4 hidden w-[520px] opacity-80 md:block" />
      </section>

      <section className="container-x pb-[var(--section)]">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Fakta singkat */}
          <aside className="lg:col-span-4">
            <dl className="card grid gap-6 p-6 sm:p-8 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
              <div>
                <dt className="t-label text-muted">{d.client}</dt>
                <dd className="mt-1 font-semibold">{project.name}</dd>
              </div>
              <div>
                <dt className="t-label text-muted">{d.type}</dt>
                <dd className="mt-1 font-semibold">{project.type[locale]}</dd>
              </div>
              {project.location && (
                <div>
                  <dt className="t-label text-muted">{d.location}</dt>
                  <dd className="mt-1 font-semibold">{project.location}</dd>
                </div>
              )}
              <div>
                <dt className="t-label text-muted">{d.categories}</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {cats.map((c) => (
                    <Link key={c} href={`${backHref}?kategori=${c}`} className="tag min-h-9 hover:border-charcoal">
                      {t.karya.categories[c]}
                    </Link>
                  ))}
                </dd>
              </div>
              {project.website && (
                <div>
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="link-arrow">
                    {d.website} <Icon name="arrowUpRight" />
                    <span className="sr-only">{t.common.opensNewTab}</span>
                  </a>
                </div>
              )}
            </dl>
          </aside>

          <div className="lg:col-span-8">
            <div data-reveal>
              <h2 className="t-h2">{d.about}</h2>
              <div className="measure mt-5 grid gap-4 text-[1.0625rem]">
                {project.about[locale].map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </div>

            <div className="mt-16" data-reveal>
              <h2 className="t-h2">{d.scope}</h2>
              <ul className="mt-8 grid gap-3">
                {cats.map((c) => (
                  <li key={c} className="card flex gap-5 p-5 sm:p-6">
                    <span className="icon-dot">
                      <Icon name={CATEGORY_ICON[c]} />
                    </span>
                    <div>
                      <h3 className="t-h3">{t.karya.categories[c]}</h3>
                      <p className="mt-1 text-muted">{project.scope[c]?.[locale]}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {project.media.length > 0 && (
              <div className="mt-16" data-reveal>
                <h2 className="t-h2">{d.gallery}</h2>
                <div className="mt-8">
                  <MediaGallery items={project.media} locale={locale} lb={t.karya.lightbox} illustration={t.common.illustration} category={cats[0]} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {allProjects.length > 1 && (
        <section className="bg-cream-2/60 section-tight">
          <div className="container-x grid items-center gap-8 lg:grid-cols-12">
            <h2 className="t-h2 lg:col-span-5">{d.next}</h2>
            <div className="lg:col-span-6 lg:col-start-7 lg:max-w-[460px] lg:justify-self-end">
              <ProjectCard p={toCard(next, locale, t)} cta={t.karya.viewProject} sizes="(min-width:1024px) 520px, 100vw" />
            </div>
          </div>
        </section>
      )}

      <div className="h-[var(--section)]" aria-hidden="true" />
      <CtaBand
        title={t.karya.final.title}
        lead={t.karya.final.lead}
        waMessage={format(t.wa.projectMessage, { name: project.name })}
        waLabel={t.common.chatWa}
        locale={locale}
        position="project"
      />
    </>
  );
}
