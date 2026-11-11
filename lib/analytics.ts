"use client";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Props) => void };
    plausible?: (event: string, opts?: { props?: Props }) => void;
  }
}

/** Kirim event ke Umami atau Plausible (tanpa cookie). Aman bila analitik belum dipasang. */
export function track(event: string, props: Props = {}) {
  try {
    if (typeof window === "undefined") return;
    if (window.umami) window.umami.track(event, props);
    else if (window.plausible) window.plausible(event, { props });
    if (process.env.NODE_ENV === "development") console.debug("[track]", event, props);
  } catch {
    /* analitik tidak boleh mengganggu pengguna */
  }
}

/** Sumber kunjungan (UTM) untuk form_audit_submit. */
export function visitSource(): string {
  try {
    const p = new URLSearchParams(window.location.search);
    const utm = p.get("utm_source");
    if (utm) return utm;
    const stored = sessionStorage.getItem("jc_src");
    if (stored) return stored;
    const ref = document.referrer ? new URL(document.referrer).hostname : "direct";
    return ref || "direct";
  } catch {
    return "unknown";
  }
}
