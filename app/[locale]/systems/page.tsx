import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead, ServiceBlock } from "@/components/Blocks";
import { Icon, WhatsAppGlyph, type IconName } from "@/components/Icon";
import { WaButton } from "@/components/WaButton";
import { WorkMedia } from "@/components/WorkMedia";
import { href } from "@/lib/i18n";
import { localeOf, resolve, type PageProps } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { getProject } from "@/lib/site";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return pageMetadata(await localeOf(params), "systems");
}

const whyIcons: IconName[] = ["mail", "eye", "seo", "heart"];
const svcIcons: IconName[] = ["web", "seo"];
const opsIcons: IconName[] = ["calendar", "building", "pin", "bag"];
const typeIcons: IconName[] = ["layers", "building", "calendar", "design"];

export default async function SystemsPage({ params }: PageProps) {
  const { locale, t } = await resolve(params);
  const s = t.systems;
  const project = getProject("casa-roca-canggu");
  const proof = project?.media.find((m) => m.id === "casa-roca-website");

  return (
    <>
      <PageHero title={s.hero.title} lead={s.hero.lead}>
        <WaButton message={t.wa.messages.systems} position="hero" lang={locale} className="btn btn-primary">
          <WhatsAppGlyph /> {s.cta}
        </WaButton>
      </PageHero>

      <section className="section-tight bg-cream-2/60">
        <div className="container-x">
          <SectionHead title={s.why.title} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.why.items.map((w, i) => (
              <li key={w.title} className="card p-6 sm:p-7" data-reveal style={{ ["--d" as string]: i }}>
                <span className="icon-dot">
                  <Icon name={whyIcons[i]} />
                </span>
                <h3 className="t-h3 mt-6">{w.title}</h3>
                <p className="mt-2 text-muted">{w.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Jenis website: bukan hanya booking villa */}
      <section id="jenis-website" className="section-tight">
        <div className="container-x">
          <SectionHead title={s.types.title} lead={s.types.lead} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.types.items.map((ty, i) => (
              <li key={ty.title} className="card flex flex-col p-6 sm:p-7" data-reveal style={{ ["--d" as string]: i }}>
                <span className="icon-dot">
                  <Icon name={typeIcons[i]} />
                </span>
                <h3 className="t-h3 mt-6">{ty.title}</h3>
                <p className="mt-2 text-muted">{ty.desc}</p>
                <p className="mt-auto pt-5 text-sm font-semibold text-brand-ink">{ty.for}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10" data-reveal>
            <WaButton message={t.wa.messages.systems} position="website_types" lang={locale} className="btn btn-primary">
              <WhatsAppGlyph /> {s.cta}
            </WaButton>
          </div>
        </div>
      </section>

      <div className="container-x">
        {s.services.map((svc, i) => (
          <div key={svc.id} id={svc.id}>
            <ServiceBlock
              index={i + 1}
              icon={svcIcons[i]}
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

      {/* Layanan operasional (PRD §5), di bawah website booking dan SEO */}
      <section id="operasional" className="container-x pb-[var(--section)] pt-6">
        <div className="on-dark overflow-hidden rounded-[32px] px-6 py-14 sm:px-12 sm:py-20" data-reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="grad-num block text-[3.5rem]" aria-hidden="true">03</span>
              <h2 className="t-h2 mt-6">{s.ops.title}</h2>
              <p className="t-lead mt-4 measure">{s.ops.lead}</p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <WaButton message={t.wa.messages.operasional} position="operations" lang={locale} className="btn btn-grad">
                <WhatsAppGlyph /> {s.ops.cta}
              </WaButton>
            </div>
          </div>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {s.ops.items.map((o, i) => (
              <li key={o.id} id={o.id} className="flex gap-5 rounded-[var(--radius-card)] bg-charcoal-2 p-6 sm:p-7">
                <span className="icon-dot">
                  <Icon name={opsIcons[i]} />
                </span>
                <div>
                  <h3 className="t-h3">{o.title}</h3>
                  <p className="mt-1 font-semibold text-brand-light">{o.line}</p>
                  <p className="mt-2 text-cream/75">{o.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {proof && (
        <section className="container-x pb-[var(--section)] pt-6">
          <div className="grid items-center gap-10 overflow-hidden rounded-[32px] bg-white p-4 sm:p-6 lg:grid-cols-12 lg:p-8" data-reveal>
            <div className="work-tile relative aspect-[4/3] lg:col-span-7">
              <WorkMedia work={proof} locale={locale} label={t.common.illustration} sizes="(min-width:1024px) 55vw, 100vw" />
            </div>
            <div className="px-2 pb-4 lg:col-span-5 lg:px-4">
              <h2 className="t-h2">{s.proof.title}</h2>
              <p className="t-lead mt-4">{s.proof.desc}</p>
              <Link href={href(locale, "/karya/casa-roca-canggu")} className="link-arrow mt-6">
                {s.proof.link} <Icon name="arrow" />
              </Link>
              <p className="mt-8 flex items-center gap-3 rounded-2xl bg-cream p-4 text-sm font-medium">
                <span className="grid size-9 flex-none place-items-center rounded-full bg-charcoal text-cream">
                  <Icon name="web" width={18} height={18} />
                </span>
                {s.meta}
              </p>
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={s.final.title}
        lead={s.final.lead}
        waMessage={t.wa.messages.systems}
        waLabel={s.cta}
        locale={locale}
        position="final"
        secondary={
          <Link href={href(locale, "/kontak")} className="btn btn-ghost">
            {t.home.final.secondary} <Icon name="arrow" className="arrow" />
          </Link>
        }
      />
    </>
  );
}
