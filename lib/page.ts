import { notFound } from "next/navigation";
import { getMessages, isLocale, type Locale } from "./i18n";

export type PageProps = { params: Promise<{ locale: string }> };

export async function resolve(params: PageProps["params"]): Promise<{ locale: Locale; t: ReturnType<typeof getMessages> }> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale, t: getMessages(locale) };
}

export async function localeOf(params: PageProps["params"]): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : "id";
}
