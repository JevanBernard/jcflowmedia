import type { MetadataRoute } from "next";
import { href, pagePaths, type PageKey } from "@/lib/i18n";
import { PARTNERS_ENABLED, SITE_URL, allProjects } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = (Object.keys(pagePaths) as PageKey[]).filter((k) => k !== "partner" || PARTNERS_ENABLED);
  const projectEntries = allProjects.flatMap((p) =>
    (["id", "en"] as const).map((l) => ({
      url: `${SITE_URL}${href(l, `/karya/${p.slug}`)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          id: `${SITE_URL}${href("id", `/karya/${p.slug}`)}`,
          en: `${SITE_URL}${href("en", `/karya/${p.slug}`)}`,
        },
      },
    })),
  );
  const pageEntries = keys.flatMap((k) =>
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
  return [...pageEntries, ...projectEntries];
}
