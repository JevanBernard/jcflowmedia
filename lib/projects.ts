import type { ProjectCardData } from "@/components/ProjectCard";
import { CATEGORY_ORDER } from "./categories";
import { href, type Locale, type Messages } from "./i18n";
import { allProjects, type Project } from "./site";

/** Kartu proyek dalam bahasa terpilih. */
export function toCard(p: Project, locale: Locale, t: Messages): ProjectCardData {
  const cats = CATEGORY_ORDER.filter((c) => p.categories.includes(c));
  return {
    slug: p.slug,
    href: href(locale, `/karya/${p.slug}`),
    name: p.name,
    meta: [p.type[locale], p.location].filter(Boolean).join(" · "),
    summary: p.summary[locale],
    categories: cats.map((c) => t.karya.categories[c]),
    categoryKeys: cats,
    logo: p.logo,
    cover: p.cover,
  };
}

/** Kategori yang benar-benar punya proyek, sesuai urutan tampil. */
export function usedCategories(t: Messages) {
  return CATEGORY_ORDER.filter((c) => allProjects.some((p) => p.categories.includes(c))).map((c) => ({
    key: c as string,
    label: t.karya.categories[c],
  }));
}
