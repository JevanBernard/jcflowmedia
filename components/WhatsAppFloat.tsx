"use client";

import { usePathname } from "next/navigation";
import { WhatsAppGlyph } from "./Icon";
import { WaButton } from "./WaButton";
import { pageKeyFromPath, type Messages } from "@/lib/i18n";

export function WhatsAppFloat({ wa, lang }: { wa: Messages["wa"]; lang: string }) {
  const pathname = usePathname();
  const key = pageKeyFromPath(pathname);
  const message = wa.messages[key as keyof typeof wa.messages] ?? wa.messages.home;
  return (
    <WaButton message={message} position="floating" lang={lang} className="wa-float" ariaLabel={wa.floatLabel}>
      <span className="wa-ico">
        <WhatsAppGlyph />
      </span>
      <span className="wa-text">{wa.float}</span>
    </WaButton>
  );
}
