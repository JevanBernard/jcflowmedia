import type { Metadata } from "next";
import { getMessages, href, type Locale, type PageKey, pagePaths } from "./i18n";
import { SITE_URL } from "./site";

export function pageMetadata(locale: Locale, key: PageKey): Metadata {
  const m = getMessages(locale).meta;
  const page = m[key];
  const path = pagePaths[key];
  const url = href(locale, path);
  const title = key === "home" ? { absolute: page.title } : page.title;
  return {
    title,
    description: page.description,
    alternates: {
      canonical: url,
      languages: { id: href("id", path), en: href("en", path), "x-default": href("id", path) },
    },
    openGraph: {
      type: "website",
      url,
      siteName: m.siteName,
      title: key === "home" ? page.title : `${page.title} | ${m.siteName}`,
      description: page.description,
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? "en_US" : "id_ID",
    },
    twitter: { card: "summary_large_image" },
  };
}

export const metadataBase = new URL(SITE_URL);
