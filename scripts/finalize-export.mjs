// Dijalankan setelah `next build` (GITHUB_PAGES=true): menjadikan Bahasa Indonesia tampil di "/"
// (tanpa prefiks), membuat 404.html, dan menambah .nojekyll.
import { cpSync, existsSync, rmSync, writeFileSync } from "node:fs";

const out = "out";
if (!existsSync(`${out}/id`)) throw new Error("out/id tidak ditemukan: jalankan build dengan GITHUB_PAGES=true");

if (existsSync(`${out}/id/404.html`)) cpSync(`${out}/id/404.html`, `${out}/404.html`);
cpSync(`${out}/id`, out, { recursive: true });
if (existsSync(`${out}/id.html`)) cpSync(`${out}/id.html`, `${out}/index.html`);
rmSync(`${out}/id`, { recursive: true, force: true });
rmSync(`${out}/id.html`, { force: true });
rmSync(`${out}/id.txt`, { force: true });
writeFileSync(`${out}/.nojekyll`, "");
console.log("Export siap di ./out");
