/** Transisi halaman ringan: setiap navigasi memasang ulang wrapper ini. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
