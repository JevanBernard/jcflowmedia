"use client";

import { useEffect, useMemo, useState } from "react";
import { ProjectCard, type ProjectCardData } from "./ProjectCard";

type Labels = {
  filterLabel: string;
  all: string;
  count: string;
  empty: string;
  viewProject: string;
};

/**
 * Daftar proyek dengan filter kategori. Kategori dibaca dari ?kategori= agar bisa dibagikan,
 * dan hanya kategori yang punya proyek yang ditampilkan.
 */
export function ProjectGrid({
  projects,
  categories,
  labels,
}: {
  projects: ProjectCardData[];
  categories: { key: string; label: string }[];
  labels: Labels;
}) {
  const [active, setActive] = useState("all");

  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get("kategori");
    if (k && categories.some((c) => c.key === k)) setActive(k);
    // hanya saat pertama dimuat
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (key: string) => {
    setActive(key);
    try {
      const url = new URL(window.location.href);
      if (key === "all") url.searchParams.delete("kategori");
      else url.searchParams.set("kategori", key);
      window.history.replaceState(null, "", url);
    } catch {
      /* tidak kritis */
    }
  };

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: projects.length };
    for (const c of categories) m[c.key] = projects.filter((p) => p.categoryKeys.includes(c.key)).length;
    return m;
  }, [projects, categories]);

  const list = active === "all" ? projects : projects.filter((p) => p.categoryKeys.includes(active));
  const tabs = [{ key: "all", label: labels.all }, ...categories];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap gap-2">
          {tabs.map((c) => (
            <button key={c.key} type="button" className="filter-btn" aria-pressed={active === c.key} onClick={() => select(c.key)}>
              {c.label}
              <span className="ml-2 text-[0.75rem] opacity-60" aria-hidden="true">
                {counts[c.key]}
              </span>
            </button>
          ))}
        </div>
        <p className="text-sm font-medium text-muted" aria-live="polite">
          {list.length} {labels.count}
        </p>
      </div>

      {list.length === 0 ? (
        <p className="mt-12 rounded-[var(--radius-card)] bg-cream-2 p-10 text-center text-muted">{labels.empty}</p>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <li key={p.slug}>
              <ProjectCard p={p} priority={i < 3} cta={labels.viewProject} sizes="(min-width:1024px) 420px, (min-width:640px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
