"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon, WhatsAppGlyph } from "./Icon";
import { Logo } from "./Logo";
import { WaButton } from "./WaButton";
import { track } from "@/lib/analytics";
import { href, pageKeyFromPath, pagePaths, switchPath, type Locale, type Messages, type PageKey } from "@/lib/i18n";

function LangSwitch({
  locale,
  pathname,
  nav,
  dark = false,
  onSwitch,
}: {
  locale: Locale;
  pathname: string;
  nav: Messages["nav"];
  dark?: boolean;
  onSwitch: () => void;
}) {
  return (
    <div className={`lang-switch ${dark ? "lang-dark" : ""}`} role="group" aria-label={nav.langLabel}>
      {(["id", "en"] as Locale[]).map((l) =>
        l === locale ? (
          <span key={l} aria-current="true">
            {l.toUpperCase()}
          </span>
        ) : (
          <Link key={l} href={switchPath(pathname, l)} hrefLang={l} lang={l} aria-label={nav.switchLabel} onClick={onSwitch} prefetch={false}>
            {l.toUpperCase()}
          </Link>
        ),
      )}
    </div>
  );
}

const SERVICE_ITEMS = [
  { key: "studio", icon: "camera", desc: "studioDesc" },
  { key: "systems", icon: "web", desc: "systemsDesc" },
] as const;

/**
 * Menu "Layanan" (desktop): tombol disclosure berisi Studio dan Systems.
 * Terbuka lewat klik, hover mouse, atau fokus; tertutup lewat Esc, klik di luar, atau pindah halaman.
 */
function ServicesMenu({ locale, nav, current }: { locale: Locale; nav: Messages["nav"]; current: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const active = current === "studio" || current === "systems";

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const clear = () => window.clearTimeout(timer.current);

  return (
    <li
      ref={wrapRef}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        clear();
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        clear();
        timer.current = window.setTimeout(() => setOpen(false), 140);
      }}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          btnRef.current?.focus();
        }
      }}
    >
      <button
        ref={btnRef}
        type="button"
        className="nav-link gap-1.5"
        data-active={active}
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={(e) => {
          // Mouse: hover sudah membuka menu, klik tidak boleh menutupnya. Keyboard/sentuh: buka-tutup.
          const mouse = e.detail > 0 && (e.nativeEvent as PointerEvent).pointerType === "mouse";
          setOpen((v) => (mouse ? true : !v));
        }}
      >
        {nav.layanan}
        <Icon name="chevronD" width={16} height={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div id="services-menu" className="dropdown" data-open={open} inert={!open}>
        <ul className="dropdown-panel" aria-label={nav.layananMenu}>
          {SERVICE_ITEMS.map((it) => (
            <li key={it.key}>
              <Link href={href(locale, pagePaths[it.key])} className="dropdown-item" aria-current={current === it.key ? "page" : undefined}>
                <span className="icon-dot !size-11">
                  <Icon name={it.icon} width={20} height={20} />
                </span>
                <span>
                  <span className="block font-semibold">JC Flow {nav[it.key]}</span>
                  <span className="mt-0.5 block text-[0.875rem] leading-snug text-muted">{nav[it.desc]}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Header({
  locale,
  nav,
  wa,
  partnersEnabled,
}: {
  locale: Locale;
  nav: Messages["nav"];
  wa: Messages["wa"];
  partnersEnabled: boolean;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const current = pageKeyFromPath(pathname);

  const items: PageKey[] = [
    "karya",
    ...(partnersEnabled ? (["partner"] as PageKey[]) : []),
    "tentang",
    "audit",
    "kontak",
  ];
  const other: Locale = locale === "id" ? "en" : "id";
  const waMsg = wa.messages[current as keyof typeof wa.messages] ?? wa.messages.home;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onSwitch = () => {
    document.cookie = `NEXT_LOCALE=${other}; path=/; max-age=31536000; samesite=lax`;
    track("lang_switch", { from: locale, to: other });
  };

  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-3 z-[70] rounded-full bg-charcoal px-5 py-3 font-semibold text-cream">
        {nav.skip}
      </a>
      <header className="site-header" data-scrolled={scrolled}>
        <div className="container-x flex h-full items-center justify-between gap-4">
          <Link href={href(locale, "/")} className="-m-1.5 rounded-xl p-1.5" aria-label={nav.homeLabel}>
            <Logo variant="horizontal" tone="color" width={150} priority alt="" />
          </Link>

          <nav aria-label={nav.primary} className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              <ServicesMenu locale={locale} nav={nav} current={current} />
              {items.map((k) => (
                <li key={k}>
                  <Link href={href(locale, pagePaths[k])} className="nav-link" aria-current={current === k ? "page" : undefined}>
                    {nav[k]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LangSwitch locale={locale} pathname={pathname} nav={nav} onSwitch={onSwitch} />
            </div>
            <WaButton message={waMsg} position="header" lang={locale} className="btn btn-primary btn-sm hidden xl:inline-flex">
              <WhatsAppGlyph /> {nav.cta}
            </WaButton>
            <button
              ref={toggleRef}
              type="button"
              className="grid size-11 place-items-center rounded-full bg-charcoal text-cream xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={nav.menu}
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" width={22} height={22} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className="mobile-menu on-dark xl:hidden"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label={nav.menu}
        inert={!open}
      >
        <div className="container-x flex h-[var(--header-h)] flex-none items-center justify-between">
          <Logo variant="horizontal" tone="white" width={150} />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-cream text-charcoal"
            aria-label={nav.close}
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
          >
            <Icon name="close" width={22} height={22} />
          </button>
        </div>
        <nav aria-label={nav.primary} className="container-x flex flex-1 flex-col justify-between overflow-y-auto pb-8 pt-4">
          <ul className="flex flex-col">
            {(["home", "services", ...items] as (PageKey | "services")[]).map((k, i) =>
              k === "services" ? (
                <li key={k} style={{ ["--i" as string]: i }} className="border-b border-cream/10 py-3">
                  <p className="t-label text-cream/55">{nav.layanan}</p>
                  <ul className="mt-1 grid">
                    {SERVICE_ITEMS.map((it) => (
                      <li key={it.key}>
                        <Link
                          href={href(locale, pagePaths[it.key])}
                          aria-current={current === it.key ? "page" : undefined}
                          className="flex min-h-14 items-center justify-between py-2 pl-4 text-[1.5rem] font-extrabold tracking-[-0.03em] aria-[current=page]:text-brand-light"
                        >
                          <span>
                            {nav[it.key]}
                            <span className="mt-0.5 block text-[0.8125rem] font-medium tracking-normal text-cream/60">{nav[it.desc]}</span>
                          </span>
                          <Icon name="arrow" width={22} height={22} className="opacity-50" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={k} style={{ ["--i" as string]: i }} className="border-b border-cream/10">
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={href(locale, pagePaths[k])}
                    aria-current={current === k ? "page" : undefined}
                    className="flex min-h-14 items-center justify-between py-2 text-[1.75rem] font-extrabold tracking-[-0.03em] aria-[current=page]:text-brand-light"
                  >
                    {nav[k]}
                    <Icon name="arrow" width={22} height={22} className="opacity-50" />
                  </Link>
                </li>
              ),
            )}
          </ul>
          <ul className="mt-8 flex flex-wrap items-center gap-3">
            <li style={{ ["--i" as string]: items.length + 2 }}>
              <LangSwitch locale={locale} pathname={pathname} nav={nav} dark onSwitch={onSwitch} />
            </li>
            <li style={{ ["--i" as string]: items.length + 3 }} className="min-w-[220px] flex-1">
              <WaButton message={waMsg} position="menu" lang={locale} className="btn btn-grad w-full">
                <WhatsAppGlyph /> {nav.cta}
              </WaButton>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
