import { daysUntil } from "@/lib/scoring";
import type { Job } from "@/lib/types";

export default function StatBar({ jobs, now }: { jobs: Job[]; now: number }) {
  const d = new Date(now);
  const stats = [
    { label: "总岗位", value: jobs.length },
    { label: "暑期实习", value: jobs.filter((j) => j.jobType === "暑期实习").length },
    { label: "秋招/校招", value: jobs.filter((j) => j.jobType === "秋招" || j.jobType === "校招").length },
    { label: "外企/海外", value: jobs.filter((j) => j.category === "外企" || j.region !== "大陆").length },
    {
      label: "临近截止",
      value: jobs.filter((j) => {
        const x = daysUntil(j.deadline, d);
        return x !== null && x >= 0 && x <= 15;
      }).length,
      highlight: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="card px-4 py-3 text-center">
          <div className={`text-2xl font-bold ${s.highlight ? "text-red-600" : "text-brand-600"}`}>
            {s.value}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
