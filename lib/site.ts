import site from "@/content/site.json";
import projects from "@/content/projects.json";
import type { CategoryKey } from "./categories";
import partners from "@/content/partners.json";
import type { Locale } from "./i18n";

export { site };

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, "");

export type IllustrationKind = "villa" | "villa2" | "interior" | "interior2" | "video" | "web";

/** Satu foto/video di halaman detail proyek. image null = ilustrasi berlabel "Ilustrasi". */
export type MediaItem = {
  id: string;
  illustration: IllustrationKind;
  image: string | null;
  video?: string | null;
  title: Record<Locale, string>;
  alt: Record<Locale, string>;
};

export type ServiceKey =
  | "social" | "photo" | "propertyShoot" | "ota" | "design" | "gbp" | "onboarding"
  | "restaurantOnboarding" | "website" | "booking" | "menu" | "ordering" | "redesign" | "branding";
export type Partner = {
  id: string;
  consent: boolean;
  name: string;
  type: Record<Locale, string>;
  location: string | null;
  logo: string | null;
  services: ServiceKey[];
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

export type Project = {
  slug: string;
  partnerId: string | null;
  name: string;
  type: Record<Locale, string>;
  location: string | null;
  logo: string | null;
  cover: string | null;
  website: string | null;
  categories: CategoryKey[];
  services: ServiceKey[];
  summary: Record<Locale, string>;
  about: Record<Locale, string[]>;
  scope: Partial<Record<CategoryKey, Record<Locale, string>>>;
  media: MediaItem[];
};

/**
 * Proyek yang boleh tampil: karya JC Flow Media sendiri, atau proyek partner yang consent=true.
 * Logo diambil dari data partner bila tidak diisi di proyek.
 */
export const allProjects: Project[] = (projects.items as unknown as Project[])
  .filter((pr) => !pr.partnerId || consentedPartners.some((pa) => pa.id === pr.partnerId))
  .map((pr) => ({ ...pr, logo: pr.logo ?? consentedPartners.find((pa) => pa.id === pr.partnerId)?.logo ?? null }));

export const getProject = (slug: string) => allProjects.find((pr) => pr.slug === slug);
