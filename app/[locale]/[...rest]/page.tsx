import { notFound } from "next/navigation";

export const metadata = { title: "404", robots: { index: false } };

/** Semua URL yang tidak dikenal diarahkan ke halaman 404 bilingual. */
export default function CatchAll() {
  notFound();
}
