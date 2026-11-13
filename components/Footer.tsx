import Link from "next/link";
import { Icon, WhatsAppGlyph } from "./Icon";
import { Logo } from "./Logo";
import { WaButton } from "./WaButton";
import { href, pagePaths, type Locale, type Messages, type PageKey } from "@/lib/i18n";
import { instagramUrl, site } from "@/lib/site";

export function Footer({
  locale,
  t,
  partnersEnabled,
}: {
  locale: Locale;
  t: Messages;
  partnersEnabled: boolean;
}) {
  const links: PageKey[] = ["karya", ...(partnersEnabled ? (["partner"] as PageKey[]) : []), "tentang", "audit", "kontak"];
  const year = new Date().getFullYear();
  const linkCls = "inline-flex min-h-11 items-center font-medium text-cream/90 hover:text-brand-light";
  return (
    <footer className="on-dark relative overflow-hidden pt-20 sm:pt-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Apa itu JC Flow Media */}
          <div className="lg:col-span-4">
            <Logo variant="full" tone="white" width={140} />
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-cream/80">{t.footer.about}</p>
            <div className="mt-8">
              <WaButton message={t.wa.messages.home} position="footer" lang={locale} className="btn btn-grad">
                <WhatsAppGlyph /> {t.common.chatWa}
              </WaButton>
            </div>
          </div>

          <nav aria-label={t.footer.services} className="lg:col-span-3">
            <p className="t-label text-cream/60">{t.footer.services}</p>
            <ul className="mt-5 grid gap-5">
              {(["studio", "systems"] as const).map((k) => (
                <li key={k}>
                  <Link href={href(locale, pagePaths[k])} className="group block">
                    <span className="inline-flex items-center gap-2 text-[1.0625rem] font-semibold text-cream/95 group-hover:text-brand-light">
                      JC Flow {t.nav[k]} <Icon name="arrow" width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="mt-1 block max-w-[28ch] text-[0.9375rem] text-cream/65">{t.nav[k === "studio" ? "studioDesc" : "systemsDesc"]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.explore} className="lg:col-span-2">
            <p className="t-label text-cream/60">{t.footer.explore}</p>
            <ul className="mt-5 grid gap-1">
              {links.map((k) => (
                <li key={k}>
                  <Link href={href(locale, pagePaths[k])} className={linkCls}>
                    {t.nav[k]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="t-label text-cream/60">{t.footer.contact}</p>
            <ul className="mt-5 grid gap-1">
              <li>
                <a href={`mailto:${site.email}`} className={`${linkCls} gap-3`}>
                  <Icon name="mail" width={20} height={20} /> {site.email}
                </a>
              </li>
              <li>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={`${linkCls} gap-3`}>
                  <Icon name="instagram" width={20} height={20} /> @{site.instagram}
                  <span className="sr-only">{t.common.opensNewTab}</span>
                </a>
              </li>
            </ul>
            <p className="t-label mt-8 text-cream/60">{t.footer.area}</p>
            <p className="mt-3 flex gap-3 text-cream/90">
              <Icon name="pin" width={20} height={20} className="mt-0.5 flex-none" /> {t.footer.areaValue}
            </p>
          </div>
        </div>

        {/* Ukuran mengikuti lebar kontainer (maks 1320px), bukan lebar layar, agar selalu pas dan di tengah */}
        <p
          className="mt-20 whitespace-nowrap pb-[0.12em] text-center font-extrabold leading-[0.9] tracking-[-0.05em] [font-variation-settings:'opsz'_32]"
          style={{ fontSize: "calc(min(100vw - 2 * var(--gutter), var(--maxw)) / 11.1)" }}
        >
          <span className="text-cream/35">#</span>
          <span className="text-grad">{t.footer.hashtag.replace(/^#/, "")}</span>
        </p>

        <div className="flex flex-col gap-4 border-t border-cream/15 py-8 text-sm text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link href={href(locale, "/privasi")} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-cream hover:underline">
              {t.footer.privacy}
            </Link>
            <a href="#top" className="inline-flex min-h-11 items-center gap-2 hover:text-cream">
              {t.footer.backTop} <Icon name="arrowUp" width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
