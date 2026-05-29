"use client";

import { useEffect, useMemo, useState } from "react";
import FilterBar, { type FilterState } from "./FilterBar";
import Header from "./Header";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import PrefsPanel from "./PrefsPanel";
import SourceStatusBanner from "./SourceStatusBanner";
import StatBar from "./StatBar";
import { queryJobs } from "@/lib/filter";
import { EMPTY_PREFS, loadPrefs, savePrefs } from "@/lib/prefs";
import { hasPrefs } from "@/lib/ranking";
import type { Job, JobsMeta, Prefs } from "@/lib/types";

const PAGE_SIZE = 12;

const DEFAULT_FILTER: FilterState = {
  category: "all",
  city: "all",
  jobType: "all",
  region: "all",
  keyword: "",
  urgentOnly: false,
  sort: "composite",
};

export default function HomeClient({
  jobs,
  meta,
  now,
}: {
  jobs: Job[];
  meta: JobsMeta | null;
  now: number;
}) {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);
  const [page, setPage] = useState(1);
  const [prefs, setPrefs] = useState<Prefs>(EMPTY_PREFS);
  const [prefsOpen, setPrefsOpen] = useState(false);

  // Preferences live only in the browser; loaded after mount (no SSR mismatch).
  useEffect(() => {
    setPrefs(loadPrefs());
  }, []);

  function patch(p: Partial<FilterState>) {
    setFilter((f) => ({ ...f, ...p }));
    setPage(1);
  }

  const result = useMemo(
    () => queryJobs(jobs, { ...filter, prefs, page, pageSize: PAGE_SIZE }, new Date(now)),
    [jobs, filter, prefs, page, now],
  );

  const personalized = filter.sort === "composite" && hasPrefs(prefs);

  return (
    <>
      <Header total={jobs.length} />

      <main id="jobs" className="max-w-6xl mx-auto px-4 py-6 space-y-5">
        <StatBar jobs={jobs} now={now} />

        <FilterBar
          state={filter}
          onChange={patch}
          onOpenPrefs={() => setPrefsOpen(true)}
          prefsActive={hasPrefs(prefs)}
        />

        <div className="text-sm text-gray-500">
          共 {result.total} 个岗位
          {personalized && <span className="text-brand-600"> · 已按你的方向优先排序</span>}
        </div>

        {result.items.length === 0 ? (
          <div className="card p-12 text-center text-gray-400">没有符合条件的岗位，换个筛选条件试试。</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {result.items.map((j) => (
              <JobCard key={j.id} job={j} now={now} />
            ))}
          </div>
        )}

        <Pagination
          page={result.page}
          totalPages={result.totalPages}
          onPage={(p) => {
            setPage(p);
            if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        <SourceStatusBanner meta={meta} />
      </main>

      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500 flex flex-wrap justify-between gap-2">
          <span>
            © {new Date(now).getFullYear()} Career-Search · 仅整理公开招聘信息，投递以官方页面为准
          </span>
          <a
            href="https://github.com/keyuchen-del/Career-Search"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-600"
          >
            GitHub: keyuchen-del/Career-Search
          </a>
        </div>
      </footer>

      <PrefsPanel
        open={prefsOpen}
        prefs={prefs}
        onSave={(p) => {
          setPrefs(p);
          savePrefs(p);
          setPage(1);
        }}
        onClose={() => setPrefsOpen(false)}
      />
    </>
  );
}
