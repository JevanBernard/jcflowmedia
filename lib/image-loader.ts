/** Loader gambar untuk static export: file di /public diberi awalan basePath. */
export default function imageLoader({ src }: { src: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
