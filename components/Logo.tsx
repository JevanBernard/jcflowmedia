import Image from "next/image";

/**
 * Logo resmi JC Flow Media (file di /public/brand).
 *
 * Aturan pemakaian:
 *  - Pilih file sesuai latar; jangan mewarnai ulang, memberi efek, meregangkan, atau memiringkan.
 *  - tone="color"  → di atas surface (krem/putih).
 *  - tone="white"  → di atas ink (charcoal), vermilion, flame, atau foto gelap.
 *  - Logo berwarna TIDAK boleh di atas flame/vermilion/amber.
 *  - Ukuran minimum: logo lengkap 120px lebar, horizontal 140px, monogram 40px.
 *  - Area aman ≈ 15% lebar logo di semua sisi (lihat prop `safeArea`).
 */
const FILES = {
  full: { color: "/brand/jc-flow-media-logo.png", white: "/brand/jc-flow-media-logo-white.png", w: 1218, h: 1318, min: 120 },
  mark: { color: "/brand/jc-mark.png", white: "/brand/jc-mark-white.png", w: 1218, h: 1078, min: 40 },
  // Lockup horizontal: monogram + wordmark dari file resmi (skala seragam, tanpa diwarnai ulang)
  horizontal: { color: "/brand/jc-flow-media-horizontal.png", white: "/brand/jc-flow-media-horizontal-white.png", w: 1600, h: 384, min: 140 },
} as const;

export function Logo({
  variant = "mark",
  tone = "color",
  width,
  safeArea = false,
  priority = false,
  alt = "JC Flow Media",
  className = "",
}: {
  variant?: "full" | "mark" | "horizontal";
  tone?: "color" | "white";
  /** Lebar tampilan dalam px (dibatasi minimum sesuai aturan merek). */
  width: number;
  /** Tambahkan padding area aman 15% lebar logo. */
  safeArea?: boolean;
  priority?: boolean;
  alt?: string;
  className?: string;
}) {
  const f = FILES[variant];
  const w = Math.max(width, f.min);
  const h = Math.round((w * f.h) / f.w);
  const img = (
    <Image
      src={f[tone]}
      width={w}
      height={h}
      alt={alt}
      priority={priority}
      sizes={`${w}px`}
      className="block h-auto select-none"
      style={{ width: w, height: "auto" }}
      draggable={false}
    />
  );
  if (!safeArea) return <span className={`inline-block ${className}`}>{img}</span>;
  return (
    <span className={`inline-block ${className}`} style={{ padding: Math.round(w * 0.15) }}>
      {img}
    </span>
  );
}
