import Image from "next/image";
import { Illustration } from "./Illustration";
import type { Locale } from "@/lib/i18n";
import type { MediaItem } from "@/lib/site";

/** Foto asli bila tersedia; bila belum, ilustrasi berlabel "Ilustrasi". */
export function WorkMedia({
  work,
  locale,
  label,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  work: Pick<MediaItem, "id" | "illustration" | "image" | "alt">;
  locale: Locale;
  label: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (work.image) {
    return (
      <Image
        src={work.image}
        alt={work.alt[locale]}
        fill
        sizes={sizes}
        priority={priority}
        className="media object-cover"
      />
    );
  }
  return (
    <div className="media absolute inset-0" role="img" aria-label={`${label}: ${work.alt[locale]}`}>
      <Illustration kind={work.illustration} uid={work.id} />
      <span className="chip chip-white absolute left-3 top-3 !py-1 !text-[11px]">{label}</span>
    </div>
  );
}
