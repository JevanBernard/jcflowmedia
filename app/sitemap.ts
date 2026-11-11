import type { MetadataRoute } from "next";
import { href, pagePaths, type PageKey } from "@/lib/i18n";
import { PARTNERS_ENABLED, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = (Object.keys(pagePaths) as PageKey[]).filter((k) => k !== "partner" || PARTNERS_ENABLED);
  return keys.flatMap((k) =>
    (["id", "en"] as const).map((l) => ({
      url: `${SITE_URL}${href(l, pagePaths[k])}`,
      changeFrequency: "monthly" as const,
      priority: k === "home" ? 1 : k === "privasi" ? 0.3 : 0.8,
      alternates: {
        languages: {
          id: `${SITE_URL}${href("id", pagePaths[k])}`,
          en: `${SITE_URL}${href("en", pagePaths[k])}`,
        },
      },
    })),
  );
}
