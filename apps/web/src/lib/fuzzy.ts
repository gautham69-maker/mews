// Simple fuzzy scorer: partial, order-preserving match gets points; exact gets bonus.
export function fuzzyScore(needle: string, hay: string): number {
  if (!needle) return 0;
  const n = needle.toLowerCase().trim();
  const h = hay.toLowerCase();
  if (n === h) return 100;
  if (h.includes(n)) return 80;

  // order-preserving subsequence score
  let i = 0, j = 0, hits = 0;
  while (i < n.length && j < h.length) {
    if (n[i] === h[j]) { hits++; i++; j++; } else { j++; }
  }
  const coverage = hits / n.length;
  return Math.floor(60 * coverage);
}
