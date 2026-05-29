// Ranking knobs — pure data, safe to import on client and in the crawler.
// Fork this project and tweak these to change how jobs are prioritized.

/** Composite weights. urgency/freshness/tier form the build-time `base`;
 *  `match` is the extra boost applied client-side from your saved preferences. */
export const RANKING_WEIGHTS = {
  urgency: 0.4,
  freshness: 0.3,
  tier: 0.3,
  match: 0.6,
} as const;

/** A job whose deadline is within this many days counts as "临近截止". */
export const URGENT_THRESHOLD_DAYS = 15;

/** Deadlines further out than this contribute ~no urgency. */
export const URGENCY_WINDOW_DAYS = 45;

/** Jobs first seen longer ago than this contribute ~no freshness. */
export const FRESHNESS_WINDOW_DAYS = 30;

/** companyTier -> tier score. */
export const TIER_SCORE: Record<number, number> = { 1: 1, 2: 0.7, 3: 0.4 };
