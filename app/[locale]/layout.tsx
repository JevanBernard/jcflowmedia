import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealObserver } from "@/components/RevealObserver";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import { metadataBase } from "@/lib/seo";
import { PARTNERS_ENABLED, SITE_URL, instagramUrl, site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).meta;
  return {
    metadataBase,
    title: { default: m.home.title, template: `%s | ${m.siteName}` },
    description: m.home.description,
    applicationName: m.siteName,
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#FFF6EF",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: site.name,
    legalName: site.legalName,
    url: SITE_URL,
    email: site.email,
    image: `${SITE_URL}/brand/jc-flow-media-logo.png`,
    logo: `${SITE_URL}/brand/jc-flow-media-logo.png`,
    description: t.meta.home.description,
    telephone: `+${site.whatsapp}`,
    address: { "@type": "PostalAddress", addressRegion: "Bali", addressCountry: "ID" },
    areaServed: site.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    sameAs: [instagramUrl],
    knowsLanguage: ["id", "en"],
  };

  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    // suppressHydrationWarning: class "js" ditambahkan skrip inline sebelum React hydrate (sengaja)
    <html lang={locale} className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Tanda JS lebih awal agar elemen reveal tidak tersembunyi tanpa JavaScript */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body id="top">
        <Header locale={locale} nav={t.nav} wa={t.wa} partnersEnabled={PARTNERS_ENABLED} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer locale={locale} t={t} partnersEnabled={PARTNERS_ENABLED} />
        <WhatsAppFloat wa={t.wa} lang={locale} />
        <RevealObserver />
        {umamiSrc && umamiId && <Script src={umamiSrc} data-website-id={umamiId} strategy="afterInteractive" />}
        {!umamiSrc && plausible && (
          <Script src="https://plausible.io/js/script.tagged-events.js" data-domain={plausible} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
