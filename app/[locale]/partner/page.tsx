import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { PartnerMark } from "@/components/PartnerStrip";
import { href } from "@/lib/i18n";
import { localeOf, resolve, type PageProps } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { PARTNERS_ENABLED, consentedPartners, getProject } from "@/lib/site";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!PARTNERS_ENABLED) return { robots: { index: false } };
  return pageMetadata(await localeOf(params), "partner");
}

/** Data dari content/partners.json; hanya partner dengan consent=true, urutan sesuai file. */
export default async function PartnerPage({ params }: PageProps) {
  if (!PARTNERS_ENABLED) notFound();
  const { locale, t } = await resolve(params);
  const p = t.partner;

  return (
    <>
      <PageHero title={p.hero.title} lead={p.hero.lead} />
      <section className="container-x pb-[var(--section)]">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {consentedPartners.map((partner, i) => (
            <li
              key={partner.id}
              id={partner.id}
              className="card flex scroll-mt-28 flex-col p-6 sm:p-8"
              data-reveal
              style={{ ["--d" as string]: i % 3 }}
            >
              <div className="grid h-52 place-items-center rounded-2xl bg-cream px-8">
                <PartnerMark partner={partner} height={136} sizes="(min-width:1024px) 280px, 60vw" priority={i < 2} className="text-lg" />
              </div>
              <h2 className="t-h3 mt-6">{partner.name}</h2>
              <p className="mt-1 text-muted">
                {partner.type[locale]}
                {partner.location ? ` · ${partner.location}` : ""}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={t.labels.does}>
                {partner.services.map((s) => (
                  <li key={s} className="tag">
                    {p.services[s]}
                  </li>
                ))}
              </ul>
              {partner.testimonial && (
                <blockquote className="mt-6 border-l-2 border-brand-orange pl-4">
                  <p className="font-medium">“{partner.testimonial.quote[locale]}”</p>
                  <footer className="mt-2 text-sm text-muted">
                    {partner.testimonial.author}
                    {partner.testimonial.role ? `, ${partner.testimonial.role}` : ""}
                  </footer>
                </blockquote>
              )}
              {(getProject(partner.id) || partner.website) && (
                <div className="mt-auto flex flex-wrap gap-x-6 pt-6">
                  {getProject(partner.id) && (
                    <Link href={href(locale, `/karya/${partner.id}`)} className="link-arrow">
                      {p.seeWork} <Icon name="arrow" />
                    </Link>
                  )}
                  {partner.website && (
                    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="link-arrow">
                      {p.visit} <Icon name="arrowUpRight" />
                      <span className="sr-only">{t.common.opensNewTab}</span>
                    </a>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
      <CtaBand title={p.final.title} lead={p.final.lead} waMessage={t.wa.messages.partner} waLabel={t.common.chatWa} locale={locale} position="final" />
    </>
  );
}
