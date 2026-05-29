import { CATEGORY_COLORS } from "@/lib/taxonomy";
import { daysUntil } from "@/lib/scoring";
import type { Job } from "@/lib/types";

function md(iso: string | null): string {
  return iso ? iso.slice(5, 10) : "";
}

export default function JobCard({ job, now }: { job: Job; now: number }) {
  const dl = daysUntil(job.deadline, new Date(now));
  const urgent = dl !== null && dl >= 0 && dl <= 15;

  return (
    <article className="card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-lg font-bold leading-tight truncate">{job.company}</div>
          <div className="text-brand-600 font-medium text-sm mt-1 line-clamp-2">{job.title}</div>
        </div>
        {job.salary && (
          <span className="shrink-0 text-xs font-bold text-white px-2.5 py-1 rounded-full bg-gradient-to-r from-brand-500 to-brand-700">
            {job.salary}
          </span>
        )}
      </div>

      {job.description && (
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 bg-gray-50 rounded-lg px-3 py-2">
          {job.description}
        </p>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
        <span>{job.location.join(" / ")}</span>
        {job.requirements && <span>{job.requirements}</span>}
        <span className="text-gray-400">·</span>
        <span>{job.jobType}</span>
        {job.deadline ? (
          <span className={urgent ? "text-red-600 font-semibold" : "text-gray-500"}>
            截止 {md(job.deadline)}
            {dl !== null && dl >= 0 ? ` · 剩 ${dl} 天` : ""}
          </span>
        ) : (
          <span className="text-emerald-600">滚动招聘</span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100">
        <div className="flex flex-wrap gap-1.5 min-w-0">
          <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${CATEGORY_COLORS[job.category]}`}>
            {job.category}
          </span>
          {job.tags.slice(0, 2).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 truncate">
              {t}
            </span>
          ))}
        </div>
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-sm font-semibold text-white px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 transition"
        >
          投递 →
        </a>
      </div>
    </article>
  );
}
