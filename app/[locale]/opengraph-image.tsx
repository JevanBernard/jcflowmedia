import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getMessages, isLocale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "JC Flow Media";

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getMessages(isLocale(locale) ? locale : "id");
  const png = await readFile(join(process.cwd(), "public/brand/jc-flow-media-logo.png"));
  const logo = `data:image/png;base64,${png.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FFF6EF", padding: 72, position: "relative" }}>
        <div style={{ position: "absolute", right: -120, top: -120, width: 520, height: 520, borderRadius: 520, background: "linear-gradient(60deg,#F58B4A,#D64F27)" }} />
        {/* Logo resmi berwarna di atas surface (krem) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={130} height={141} alt="" />

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#1F1B18" }}>{t.brand.tagline}</div>
          <div style={{ fontSize: 34, color: "#6E6058", marginTop: 20 }}>{t.brand.explainer}</div>
        </div>
      </div>
    ),
    size,
  );
}

export function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}
