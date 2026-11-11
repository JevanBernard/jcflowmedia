import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Blocks";
import { Gallery } from "@/components/Gallery";
import { localeOf, resolve, type PageProps } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { allWorks } from "@/lib/site";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return pageMetadata(await localeOf(params), "karya");
}

export default async function KaryaPage({ params }: PageProps) {
  const { locale, t } = await resolve(params);
  const k = t.karya;
  return (
    <>
      <PageHero title={k.hero.title} lead={k.hero.lead} />
      <section className="container-x pb-16">
        <Gallery works={allWorks} locale={locale} k={k} illustration={t.common.illustration} />
        <p className="mt-10 max-w-2xl text-muted">{k.note}</p>
      </section>
      <div className="h-[calc(var(--section)*0.5)]" aria-hidden="true" />
      <CtaBand
        title={k.final.title}
        lead={k.final.lead}
        waMessage={t.wa.messages.karya}
        waLabel={t.common.chatWa}
        locale={locale}
        position="final"
      />
    </>
  );
}
