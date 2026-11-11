import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "NEXT_LOCALE";

/**
 * Routing bahasa:
 *  - Bahasa Indonesia di "/" (URL tanpa prefiks)  → di-rewrite ke /id/...
 *  - English di "/en/..."
 *  - Pilihan bahasa diingat lewat cookie fungsional NEXT_LOCALE (diset oleh tombol ID/EN).
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // File statis (gambar, svg, dll.) tidak diproses
  if (/\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  // /id/... tidak boleh diakses langsung (hindari konten ganda)
  if (pathname === "/id" || pathname.startsWith("/id/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/id/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  // Pengunjung yang sebelumnya memilih English
  if (req.cookies.get(COOKIE)?.value === "en") {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    return NextResponse.redirect(url, 307);
  }

  const url = req.nextUrl.clone();
  url.pathname = `/id${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)"],
};
