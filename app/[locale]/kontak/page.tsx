import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import { Icon, WhatsAppGlyph } from "@/components/Icon";
import { LeadForm } from "@/components/LeadForm";
import { WaButton } from "@/components/WaButton";
import { localeOf, resolve, type PageProps } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { instagramUrl, site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return pageMetadata(await localeOf(params), "kontak");
}

export default async function KontakPage({ params }: PageProps) {
  const { locale, t } = await resolve(params);
  const k = t.kontak;
  const c = k.channels;

  return (
    <>
      <PageHero title={k.hero.title} lead={k.hero.lead} />
      <section className="container-x pb-[var(--section)]">
        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="grid content-start gap-4 lg:col-span-4" aria-label={c.label}>
            <div className="on-dark rounded-[var(--radius-card)] p-6 sm:p-8">
              <p className="t-label eyebrow">{c.whatsapp}</p>
              <p className="t-h3 mt-3">{c.whatsappDesc}</p>
              <WaButton message={t.wa.messages.kontak} position="contact_card" lang={locale} className="btn btn-grad mt-6 w-full">
                <WhatsAppGlyph /> {t.common.chatWa}
              </WaButton>
            </div>
            <a href={`mailto:${site.email}`} className="card group flex items-center gap-4 p-5 sm:p-6">
              <span className="icon-dot">
                <Icon name="mail" />
              </span>
              <span className="min-w-0">
                <span className="t-label block text-muted">{c.email}</span>
                <span className="block truncate font-semibold group-hover:text-brand-ink">{site.email}</span>
              </span>
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="card group flex items-center gap-4 p-5 sm:p-6">
              <span className="icon-dot">
                <Icon name="instagram" />
              </span>
              <span>
                <span className="t-label block text-muted">{c.instagram}</span>
                <span className="block font-semibold group-hover:text-brand-ink">@{site.instagram}</span>
                <span className="sr-only">{t.common.opensNewTab}</span>
              </span>
            </a>
            <div className="card flex items-start gap-4 p-5 sm:p-6">
              <span className="icon-dot">
                <Icon name="pin" />
              </span>
              <span>
                <span className="t-label block text-muted">{c.area}</span>
                <span className="block font-semibold">{t.footer.areaValue}</span>
                <span className="mt-1 block text-sm text-muted">{t.tentang.area.expansion}</span>
              </span>
            </div>
          </aside>

          <div className="card p-6 sm:p-10 lg:col-span-8">
            <h2 className="t-h2">{k.formTitle}</h2>
            <p className="t-lead mt-2">{k.formLead}</p>
            <div className="mt-8">
              <LeadForm kind="contact" locale={locale} f={t.forms} waMessage={t.wa.messages.kontak} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
