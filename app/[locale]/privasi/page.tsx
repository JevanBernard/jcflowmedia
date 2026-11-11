import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import { localeOf, resolve, type PageProps } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return pageMetadata(await localeOf(params), "privasi");
}

export default async function PrivasiPage({ params }: PageProps) {
  const { t } = await resolve(params);
  const p = t.privasi;
  return (
    <>
      <PageHero title={p.hero.title} lead={p.hero.lead} />
      <section className="container-x pb-[var(--section)]">
        <div className="grid gap-10 lg:grid-cols-12">
          <nav aria-label={p.hero.title} className="lg:col-span-3">
            <ol className="sticky top-[calc(var(--header-h)+24px)] grid gap-1 text-[0.9375rem]">
              {p.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#s${i + 1}`} className="flex min-h-11 items-center gap-3 rounded-xl px-3 font-medium text-muted hover:bg-white hover:text-charcoal">
                    <span className="text-brand-ink">{String(i + 1).padStart(2, "0")}</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="card p-6 sm:p-12 lg:col-span-9">
            <p className="text-sm font-medium text-muted">{p.updated}</p>
            {p.sections.map((s, i) => (
              <section key={s.title} id={`s${i + 1}`} className="border-t border-line pt-8 mt-8 first-of-type:mt-6">
                <h2 className="t-h3">
                  <span className="text-grad mr-2">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <div className="mt-4 grid gap-3 measure">
                  {s.body.map((b) => (
                    <p key={b}>{b}</p>
                  ))}
                </div>
              </section>
            ))}
            <p className="mt-10 rounded-2xl bg-cream p-5 text-sm text-muted">
              {site.legalName} · <a className="font-semibold text-brand-ink underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
