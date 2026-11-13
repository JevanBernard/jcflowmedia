import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";

export const metadata = { title: "404", robots: { index: false } };
export const dynamicParams = false;

/** Static export: hanya /404 yang dibuat; scripts/finalize-export.mjs menjadikannya 404.html (bilingual). */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale, rest: ["404"] }));
}

export default function CatchAll() {
  notFound();
}
