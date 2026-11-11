import site from "@/content/site.json";
import works from "@/content/works.json";
import partners from "@/content/partners.json";
import type { Locale } from "./i18n";

export { site };

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, "");

export type WorkCategory = "villa" | "interior" | "video" | "web";
export type IllustrationKind = "villa" | "villa2" | "interior" | "interior2" | "video" | "web";

export type Work = {
  id: string;
  client: string;
  location: string;
  category: WorkCategory;
  illustration: IllustrationKind;
  image: string | null;
  video?: string | null;
  title: Record<Locale, string>;
  alt: Record<Locale, string>;
};

export const allWorks = works.items as Work[];

export type ServiceKey =
  | "social" | "photo" | "propertyShoot" | "ota" | "design" | "gbp" | "onboarding"
  | "restaurantOnboarding" | "website" | "booking" | "menu" | "ordering" | "redesign";
export type Partner = {
  id: string;
  consent: boolean;
  name: string;
  type: Record<Locale, string>;
  location: string | null;
  logo: string | null;
  services: ServiceKey[];
  workId: string | null;
  website: string | null;
  testimonial: null | { quote: Record<Locale, string>; author: string; role?: string };
};

/** Hanya partner dengan izin tertulis. */
export const consentedPartners = (partners.items as Partner[]).filter((p) => p.consent);
/** Halaman, menu, dan strip partner aktif selama ada partner berizin. */
export const PARTNERS_ENABLED = consentedPartners.length > 0;

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const instagramUrl = `https://instagram.com/${site.instagram}`;
