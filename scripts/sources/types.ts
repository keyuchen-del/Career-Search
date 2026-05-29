import type { RawJob } from "../../lib/types";

export interface SourceAdapter {
  /** Stable adapter id, e.g. "greenhouse" | "seed" | "official:bytedance". */
  id: string;
  /** Human-readable label for logs. */
  label: string;
  /** Fetch + map this source to RawJob[]. Throwing fails only this source. */
  fetch(): Promise<RawJob[]>;
}
