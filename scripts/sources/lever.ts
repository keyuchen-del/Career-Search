import { ATS_COMPANIES, type AtsCompany } from "../../config/companies.config";
import type { RawJob } from "../../lib/types";
import { getJson, truncate } from "../lib/fetchUtil";
import { STUDENT_ROLE } from "./greenhouse";
import type { SourceAdapter } from "./types";

interface LeverPost {
  id: string;
  text: string;
  hostedUrl: string;
  applyUrl?: string;
  createdAt?: number;
  descriptionPlain?: string;
  categories?: { location?: string; team?: string; commitment?: string };
}

async function fetchCompany(c: AtsCompany): Promise<RawJob[]> {
  const posts = await getJson<LeverPost[]>(
    `https://api.lever.co/v0/postings/${c.token}?mode=json`,
  );
  return (Array.isArray(posts) ? posts : [])
    .filter((p) => STUDENT_ROLE.test(p.text) || /intern/i.test(p.categories?.commitment ?? ""))
    .map((p) => ({
      origin: "lever",
      company: c.name,
      companyTier: c.tier,
      title: p.text.trim(),
      category: c.category,
      region: c.region,
      location: p.categories?.location ? [p.categories.location.trim()] : ["未知"],
      applyUrl: p.applyUrl || p.hostedUrl,
      detailUrl: p.hostedUrl,
      postedAt: p.createdAt ? new Date(p.createdAt).toISOString() : null,
      description: p.descriptionPlain ? truncate(p.descriptionPlain, 150) : null,
      tags: [p.categories?.team, p.categories?.commitment].filter(Boolean) as string[],
    }));
}

export const lever: SourceAdapter = {
  id: "lever",
  label: "Lever",
  async fetch() {
    const companies = ATS_COMPANIES.filter((c) => c.ats === "lever");
    const out: RawJob[] = [];
    const settled = await Promise.allSettled(companies.map(fetchCompany));
    settled.forEach((r) => {
      if (r.status === "fulfilled") out.push(...r.value);
    });
    return out;
  },
};
