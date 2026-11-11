import type { Metadata } from "next";
import { PageHero, SectionHead } from "@/components/Blocks";
import { Icon, type IconName } from "@/components/Icon";
import { LeadForm } from "@/components/LeadForm";
import { format } from "@/lib/i18n";
import { localeOf, resolve, type PageProps } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return pageMetadata(await localeOf(params), "audit");
}

export default async function AuditPage({ params }: PageProps) {
  const { locale, t } = await resolve(params);
  const a = t.audit;
  const n = site.auditQuotaPerWeek;
  const facts: { icon: IconName; k: string; v: string }[] = [
    { icon: "calendar", k: a.facts.quota, v: format(a.facts.quotaValue, { n }) },
    { icon: "clock", k: a.facts.time, v: site.auditTurnaround[locale] },
    { icon: "file", k: a.facts.result, v: a.facts.resultValue },
    { icon: "gift", k: a.facts.cost, v: a.facts.costValue },
  ];

  return (
    <>
      <PageHero title={a.hero.title} lead={a.hero.lead}>
        <a href="#daftar" className="btn btn-primary">
          {t.forms.submitAudit} <Icon name="arrow" className="arrow" />
        </a>
      </PageHero>

      <section className="container-x">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-line lg:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.k} className="flex flex-col gap-3 bg-white p-5 sm:p-7" data-reveal style={{ ["--d" as string]: i }}>
              <Icon name={f.icon} width={24} height={24} className="text-brand-ink" />
              <dt className="t-label text-muted">{f.k}</dt>
              <dd className="text-[1.0625rem] font-semibold leading-snug sm:text-lg">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead title={a.aspects.title} />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {a.aspects.items.map((it, i) => (
              <li key={it.title} className="card flex flex-col p-6" data-reveal style={{ ["--d" as string]: i }}>
                <span className="grad-num text-[4rem]" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="t-h3 mt-4 !text-[1.1875rem]">{it.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{it.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-tight bg-cream-2/60">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div data-reveal>
            <h2 className="t-h2">{a.receive.title}</h2>
            <ul className="mt-8 grid gap-3">
              {a.receive.items.map((r) => (
                <li key={r} className="flex gap-3 rounded-2xl bg-white p-4 font-medium">
                  <span className="grid size-7 flex-none place-items-center rounded-full bg-brand-orange/15 text-brand-ink">
                    <Icon name="check" width={16} height={16} strokeWidth={2.4} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ ["--d" as string]: 1 }}>
            <h2 className="t-h2">{a.how.title}</h2>
            <ol className="mt-8 grid gap-3">
              {a.how.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-4 rounded-2xl bg-white p-4 font-medium">
                  <span className="grad-num w-10 flex-none text-center text-[2.25rem]" aria-hidden="true">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="daftar" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="t-h2">{a.formTitle}</h2>
            <p className="t-lead mt-3">{a.formLead}</p>
            <p className="mt-8 flex gap-3 rounded-2xl bg-cream-2 p-5 text-[0.9375rem]">
              <Icon name="calendar" width={22} height={22} className="mt-0.5 flex-none text-brand-ink" />
              {format(a.quotaNote, { n })}
            </p>
          </div>
          <div className="card p-6 sm:p-10 lg:col-span-7 lg:col-start-6">
            <LeadForm kind="audit" locale={locale} f={t.forms} waMessage={t.wa.messages.audit} />
          </div>
        </div>
      </section>
    </>
  );
}
