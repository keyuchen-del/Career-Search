export const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const DEFAULT_TIMEOUT = Number(process.env.CRAWL_TIMEOUT_MS || 15000);

async function request(url: string, headers: Record<string, string>): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), DEFAULT_TIMEOUT);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, ...headers },
      signal: ctrl.signal,
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} <- ${url}`);
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function getText(url: string, headers: Record<string, string> = {}): Promise<string> {
  const res = await request(url, headers);
  return res.text();
}

export async function getJson<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
  const res = await request(url, { Accept: "application/json", ...headers });
  return (await res.json()) as T;
}

/** Strip HTML tags + decode common entities + collapse whitespace. */
export function stripHtml(input: string | null | undefined): string {
  if (!input) return "";
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(s: string, max = 160): string {
  const t = s.trim();
  return t.length <= max ? t : t.slice(0, max).trimEnd() + "…";
}

/** Parse common date formats to ISO; null when unparseable. */
export function toIso(input: string | number | null | undefined): string | null {
  if (input == null || input === "") return null;
  if (typeof input === "number") {
    const d = new Date(input);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }
  const d = new Date(String(input).trim());
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}
