import type { IconName } from "@/components/Icon";

/**
 * Kategori portofolio (urutan tampil). Nama ID/EN ada di content/messages/*.json → karya.categories.
 * Untuk mengubah daftar kategori: ubah di sini, di CategoryKey (lib/site.ts), dan di file pesan.
 */
export const CATEGORY_ORDER = ["photography", "content", "branding", "design", "website", "social", "operations"] as const;
export type CategoryKey = (typeof CATEGORY_ORDER)[number];

export const CATEGORY_ICON: Record<CategoryKey, IconName> = {
  photography: "camera",
  content: "play",
  branding: "brand",
  design: "design",
  website: "web",
  social: "social",
  operations: "layers",
};
