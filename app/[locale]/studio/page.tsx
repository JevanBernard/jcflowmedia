import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand, PageHero, ServiceBlock } from "@/components/Blocks";
import { Icon, WhatsAppGlyph, type IconName } from "@/components/Icon";
import { WaButton } from "@/components/WaButton";
import { href } from "@/lib/i18n";
import { localeOf, resolve, type PageProps } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return pageMetadata(await localeOf(params), "studio");
}

const icons: IconName[] = ["camera", "social", "design"];

export default async function StudioPage({ params }: PageProps) {
  const { locale, t } = await resolve(params);
  const s = t.studio;
  const b = s.branding;
  const index = [...s.services.map((x) => ({ id: x.id, chip: x.chip })), { id: "branding", chip: b.chip }];

  return (
    <>
      <PageHero title={s.hero.title} lead={s.hero.lead}>
        <WaButton message={t.wa.messages.studio} position="hero" lang={locale} className="btn btn-primary">
          <WhatsAppGlyph /> {s.cta}
        </WaButton>
      </PageHero>

      <nav aria-label={s.indexLabel} className="container-x">
        <ul className="flex flex-wrap gap-2">
          {index.map((x, i) => (
            <li key={x.id}>
              <a href={`#${x.id}`} className="tag min-h-11 gap-2 !px-4 hover:border-charcoal">
                <span className="text-brand-ink">{String(i + 1).padStart(2, "0")}</span> {x.chip}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-x mt-12">
        {s.services.map((svc, i) => (
          <div key={svc.id} id={svc.id}>
            <ServiceBlock
              index={i + 1}
              icon={icons[i]}
              name={svc.chip}
              title={svc.title}
              problem={svc.problem}
              does={svc.does}
              gets={svc.gets}
              labels={t.labels}
            />
          </div>
        ))}
      </div>

      {/* Branding & Logo: bagian tersendiri, CTA "BRANDING" */}
      <section id="branding" className="container-x mt-6 pb-[var(--section)]">
        <div className="on-dark relative overflow-hidden rounded-[32px] px-6 py-14 sm:px-12 sm:py-20" data-reveal>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -right-40 size-[520px] rounded-full opacity-25"
            style={{ background: "var(--grad)" }}
          />
          <div className="relative grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-4">
                <span className="icon-dot">
                  <Icon name="brand" />
                </span>
                <span className="grad-num text-[3.5rem]">04</span>
                <span className="text-[0.9375rem] font-semibold text-cream/70">{b.chip}</span>
              </div>
              <h2 className="t-h2 mt-6">{b.title}</h2>
              <p className="t-lead mt-4">{b.lead}</p>
              <WaButton message={t.wa.messages.branding} position="branding" lang={locale} className="btn btn-grad mt-9">
                <WhatsAppGlyph /> {b.cta}
              </WaButton>
            </div>
            <div className="grid gap-4 lg:col-span-6">
              <div className="rounded-[var(--radius-card)] bg-charcoal-2 p-6 sm:p-8">
                <p className="t-label text-cream/60">{t.labels.does}</p>
                <ul className="mt-4 grid gap-3">
                  {b.does.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="mt-1 grid size-6 flex-none place-items-center rounded-full bg-brand-light/20 text-brand-light">
                        <Icon name="check" width={15} height={15} strokeWidth={2.4} />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
                <hr className="rule my-6" />
                <p className="t-label text-cream/60">{t.labels.gets}</p>
                <p className="mt-3 font-semibold">{b.gets}</p>
              </div>
              <div className="rounded-[var(--radius-card)] bg-charcoal-2 p-6 sm:p-8">
                <p className="t-label text-cream/60">{t.labels.process}</p>
                <ol className="mt-5 flex flex-wrap items-center gap-2">
                  {b.process.map((p, i) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-cream/10 px-4 font-semibold">
                        <span className="text-brand-light">{i + 1}</span> {p}
                      </span>
                      {i < b.process.length - 1 && <Icon name="arrow" width={18} height={18} className="text-cream/50" />}
                    </li>
                  ))}
                </ol>
                <p className="mt-6 text-sm text-cream/70">{b.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={s.final.title}
        lead={s.final.lead}
        waMessage={t.wa.messages.studio}
        waLabel={s.cta}
        locale={locale}
        position="final"
        secondary={
          <Link href={href(locale, "/karya")} className="btn btn-ghost">
            {t.common.seeAll} <Icon name="arrow" className="arrow" />
          </Link>
        }
      />
    </>
  );
}
