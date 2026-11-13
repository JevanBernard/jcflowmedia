# Website JC Flow Media

Situs bilingual (ID di `/`, EN di `/en`) sesuai PRD v1 — Next.js 15 (App Router, SSG) + Tailwind CSS v4.

## Menjalankan

```bash
npm install
cp .env.example .env.local   # isi key form & analitik
npm run dev                  # http://localhost:3000
npm run build && npm start   # produksi
# build ke folder lain saat dev server sedang jalan: NEXT_DIST_DIR=.next-build npm run build
```

Deploy: hubungkan repo GitHub ke Vercel (atau Cloudflare Pages), set environment variable dari `.env.example`.

## Wajib diisi sebelum tayang

| File | Yang diganti |
|------|--------------|
| `content/site.json` | `whatsapp` (masih nomor contoh `6280000000000`), `instagram`, `legalName` (sesuai NIB), `founder.name` & `founder.photo` |
| `public/partners/` + `content/partners.json` | File logo kelima partner (SVG/PNG transparan), lalu isi kolom `logo`. Selama kosong, nama bisnis tampil sebagai teks |
| `.env.local` / Vercel | `NEXT_PUBLIC_WEB3FORMS_KEY` (form → hello@jcflowmedia.com), `NEXT_PUBLIC_SITE_URL`, Umami **atau** Plausible |
| `content/messages/*.json` → `privasi` | Lama penyimpanan data "12 bulan" adalah usulan — tinjau dengan konsultan |

## Logo

File resmi di `public/brand/` dan dipakai lewat komponen `components/Logo.tsx`:

| File | Latar | Dipakai di |
|------|-------|-----------|
| `jc-flow-media-horizontal.png` | surface (krem) | Header (+ tagline di bawahnya) |
| `jc-flow-media-horizontal-white.png` | ink | Menu HP |
| `jc-mark.png` | surface (krem/putih) | Badge putih di atas foto hero, favicon |
| `jc-flow-media-logo-white.png` | ink, gradien oranye | Footer, profil pendiri (Tentang) |
| `jc-flow-media-logo.png` | surface | Gambar OG, schema LocalBusiness |

Versi horizontal disusun dari file resmi (monogram + wordmark, skala seragam, warna asli); sebaiknya disetujui desainer. Favicon (`app/icon.png`) dan `app/apple-icon.png` dibuat dari `jc-mark.png`. Aturan: jangan mewarnai ulang/memberi efek; logo berwarna tidak di atas flame/vermilion/amber; minimum logo lengkap 120px, monogram 40px (komponen `Logo` menegakkan batas minimum ini); area aman ±15% lebar logo.

## Mengubah konten (tanpa mengubah kode)

- **Teks**: `content/messages/id.json` dan `en.json` (struktur sama).
- **Karya (portofolio)**: `content/projects.json`, satu entri per proyek/klien. Kolom `categories` menentukan filter di halaman Karya (kategori: photography, content, branding, design, website, social, operations; nama tampil di `karya.categories` pada file pesan). Kolom `scope` menjelaskan apa yang dikerjakan per kategori, `about` adalah penjelasan proyek. Taruh foto di `public/works/` lalu isi `cover` (sampul) dan `media[].image` (galeri). Selama `cover` kosong, logo klien jadi sampul; `media` dengan `image: null` tampil sebagai ilustrasi berlabel "Ilustrasi". Proyek partner hanya tampil bila `consent: true` di `partners.json`. Teks ringkasan masih DRAF dari daftar layanan di PRD, mohon ditinjau.
- **Partner**: `content/partners.json`. Set `"consent": true` hanya setelah ada izin tertulis. Urutan di file = urutan tampil. Halaman `/partner`, menu, dan strip logo beranda aktif selama ada partner berizin.

## Fitur PRD

F1 tombol WhatsApp melayang + pesan per halaman · F2 form kontak · F3 form audit (kuota, estimasi, PDF) · F4 pengalih ID/EN ke halaman padanan, diingat lewat cookie `NEXT_LOCALE` · F5 galeri dengan filter & lightbox · F6 header lengket + menu HP · F7 404 bilingual.
Event analitik: `wa_click`, `form_contact_submit`, `form_audit_submit`, `lang_switch`, `gallery_open`.
SEO: judul/deskripsi per halaman & bahasa, hreflang, `sitemap.xml`, `robots.txt`, OG image, schema `LocalBusiness` (areaServed Sarbagita). Anti-spam: honeypot.
