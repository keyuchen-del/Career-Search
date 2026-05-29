import type { Category, Region } from "../lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// ATS company list. Fork this and edit the array to track your own companies.
// Adding a company = adding one line. Each entry hits that company's public
// job-board API (Greenhouse / Lever / Ashby) at crawl time.
//
//   Greenhouse token:  the slug in boards.greenhouse.io/<token>
//   Lever token:       the slug in jobs.lever.co/<token>
//   Ashby token:       the org slug in jobs.ashbyhq.com/<token>
// ─────────────────────────────────────────────────────────────────────────────

export type Ats = "greenhouse" | "lever" | "ashby";

export interface AtsCompany {
  name: string;
  ats: Ats;
  token: string;
  tier: number; // 1 = 头部, 2 = 知名, 3 = 其他
  category: Category;
  region?: Region;
}

export const ATS_COMPANIES: AtsCompany[] = [
  // —— Greenhouse ——
  { name: "Stripe", ats: "greenhouse", token: "stripe", tier: 1, category: "外企", region: "海外" },
  { name: "Databricks", ats: "greenhouse", token: "databricks", tier: 1, category: "外企", region: "海外" },
  { name: "Figma", ats: "greenhouse", token: "figma", tier: 1, category: "外企", region: "海外" },
  { name: "Robinhood", ats: "greenhouse", token: "robinhood", tier: 1, category: "外企", region: "海外" },
  { name: "Coinbase", ats: "greenhouse", token: "coinbase", tier: 1, category: "外企", region: "海外" },
  { name: "Discord", ats: "greenhouse", token: "discord", tier: 2, category: "外企", region: "海外" },
  { name: "GitLab", ats: "greenhouse", token: "gitlab", tier: 2, category: "外企", region: "海外" },
  { name: "Brex", ats: "greenhouse", token: "brex", tier: 2, category: "外企", region: "海外" },
  { name: "Samsara", ats: "greenhouse", token: "samsara", tier: 2, category: "外企", region: "海外" },
  { name: "Pinterest", ats: "greenhouse", token: "pinterest", tier: 1, category: "外企", region: "海外" },
  { name: "Reddit", ats: "greenhouse", token: "reddit", tier: 1, category: "外企", region: "海外" },
  { name: "DoorDash", ats: "greenhouse", token: "doordash", tier: 1, category: "外企", region: "海外" },

  // —— Lever ——
  { name: "Plaid", ats: "lever", token: "plaid", tier: 2, category: "外企", region: "海外" },
  { name: "Attentive", ats: "lever", token: "attentive", tier: 3, category: "外企", region: "海外" },

  // —— Ashby ——
  { name: "Linear", ats: "ashby", token: "linear", tier: 2, category: "外企", region: "海外" },
  { name: "Vercel", ats: "ashby", token: "vercel", tier: 2, category: "外企", region: "海外" },
];
