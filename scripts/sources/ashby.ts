import { ATS_COMPANIES, type AtsCompany } from "../../config/companies.config";
import type { RawJob } from "../../lib/types";
import { getJson } from "../lib/fetchUtil";
import { STUDENT_ROLE } from "./greenhouse";
import type { SourceAdapter } from "./types";

interface AshbyJob {
  title: string;
  location?: string;
  locationName?: string;
  employmentType?: string;
  jobUrl?: string;
  applyUrl?: string;
  publishedDate?: string;
  publishedAt?: string;
  team?: string;
  department?: string;
}

async function fetchCompany(c: AtsCompany): Promise<RawJob[]> {
  const data = await getJson<{ jobs: AshbyJob[] }>(
    `https://api.ashbyhq.com/posting-api/job-board/${c.token}?includeCompensation=false`,
  );
  return (data.jobs ?? [])
    .filter((j) => STUDENT_ROLE.test(j.title) || /intern/i.test(j.employmentType ?? ""))
    .map((j) => {
      const loc = j.locationName || j.location || "未知";
      const url = j.jobUrl || j.applyUrl || `https://jobs.ashbyhq.com/${c.token}`;
      return {
        origin: "ashby",
        company: c.name,
        companyTier: c.tier,
        title: j.title.trim(),
        category: c.category,
        region: c.region,
        location: [loc.trim()],
        applyUrl: url,
        detailUrl: url,
        postedAt: j.publishedDate || j.publishedAt || null,
        description: null,
        tags: [j.team || j.department].filter(Boolean) as string[],
      };
    });
}

export const ashby: SourceAdapter = {
  id: "ashby",
  label: "Ashby",
  async fetch() {
    const companies = ATS_COMPANIES.filter((c) => c.ats === "ashby");
    const out: RawJob[] = [];
    const settled = await Promise.allSettled(companies.map(fetchCompany));
    settled.forEach((r) => {
      if (r.status === "fulfilled") out.push(...r.value);
    });
    return out;
  },
};
