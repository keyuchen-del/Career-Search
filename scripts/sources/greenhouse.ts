import { ATS_COMPANIES, type AtsCompany } from "../../config/companies.config";
import type { RawJob } from "../../lib/types";
import { getJson, stripHtml, truncate } from "../lib/fetchUtil";
import type { SourceAdapter } from "./types";

/** Keep only student-relevant postings. \bintern\b avoids matching
 *  "internal" / "international". */
export const STUDENT_ROLE =
  /(\bintern(?:ship)?s?\b|\bco-?op\b|new\s?grad|university\s?grad(?:uate)?|graduate\s?(?:program|scheme|analyst)|\bcampus\b|apprentice|working\s?student|实习|校招|应届|暑期|summer\s?analyst)/i;

interface GhJob {
  id: number;
  title: string;
  absolute_url: string;
  updated_at?: string;
  location?: { name?: string };
  content?: string;
  departments?: { name: string }[];
}

function splitLoc(name?: string): string[] {
  if (!name) return ["未知"];
  return name
    .split(/[;,/、|]| and /i)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function htmlToText(html?: string): string | null {
  if (!html) return null;
  const decoded = html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
  const text = stripHtml(decoded);
  return text ? truncate(text, 150) : null;
}

async function fetchCompany(c: AtsCompany): Promise<RawJob[]> {
  const data = await getJson<{ jobs: GhJob[] }>(
    `https://boards-api.greenhouse.io/v1/boards/${c.token}/jobs?content=true`,
  );
  return (data.jobs ?? [])
    .filter((j) => STUDENT_ROLE.test(j.title))
    .map((j) => ({
      origin: "greenhouse",
      company: c.name,
      companyTier: c.tier,
      title: j.title.trim(),
      category: c.category,
      region: c.region,
      location: splitLoc(j.location?.name),
      applyUrl: j.absolute_url,
      detailUrl: j.absolute_url,
      postedAt: j.updated_at ?? null,
      description: htmlToText(j.content),
      tags: (j.departments ?? []).map((d) => d.name).filter(Boolean).slice(0, 2),
    }));
}

export const greenhouse: SourceAdapter = {
  id: "greenhouse",
  label: "Greenhouse",
  async fetch() {
    const companies = ATS_COMPANIES.filter((c) => c.ats === "greenhouse");
    const out: RawJob[] = [];
    const settled = await Promise.allSettled(companies.map(fetchCompany));
    settled.forEach((r) => {
      if (r.status === "fulfilled") out.push(...r.value);
    });
    return out;
  },
};
