"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
import { pageKeyFromPath } from "@/lib/i18n";
import { waLink } from "@/lib/site";

/** Tautan WhatsApp dengan pesan awal per halaman; setiap klik tercatat sebagai event wa_click. */
export function WaButton({
  message,
  position,
  lang,
  className = "btn btn-primary",
  children,
  ariaLabel,
}: {
  message: string;
  position: string;
  lang: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const pathname = usePathname();
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => track("wa_click", { page: pageKeyFromPath(pathname), position, lang })}
    >
      {children}
    </a>
  );
}
