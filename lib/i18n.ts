import id from "@/content/messages/id.json";
import en from "@/content/messages/en.json";

export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export type Messages = typeof id;

const dictionaries: Record<Locale, Messages> = { id, en: en as Messages };

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

export type PageKey =
  | "home" | "studio" | "systems" | "karya" | "partner"
  | "tentang" | "audit" | "kontak" | "privasi";

export const pagePaths: Record<PageKey, string> = {
  home: "/",
  studio: "/studio",
  systems: "/systems",
  karya: "/karya",
  partner: "/partner",
  tentang: "/tentang",
  audit: "/audit",
  kontak: "/kontak",
  privasi: "/privasi",
};

/** Path lokal: ID tanpa prefiks, EN dengan /en. */
export function href(locale: Locale, path: string): string {
  if (locale === "id") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** Ubah path di browser menjadi path padanan bahasa lain (F4). */
export function switchPath(pathname: string, to: Locale): string {
  const bare = pathname === "/en" ? "/" : pathname.replace(/^\/en(?=\/)/, "");
  return href(to, bare || "/");
}

/** Kunci halaman dari pathname browser (untuk pesan WA & analitik). */
export function pageKeyFromPath(pathname: string): PageKey | "notFound" {
  const bare = pathname === "/en" ? "/" : pathname.replace(/^\/en(?=\/)/, "");
  const found = (Object.entries(pagePaths) as [PageKey, string][]).find(([, p]) => p === bare);
  if (found) return found[0];
  // Halaman detail proyek (/karya/slug) dihitung sebagai Karya
  return bare.startsWith("/karya/") ? "karya" : "notFound";
}

export function format(str: string, vars: Record<string, string | number>) {
  return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}
