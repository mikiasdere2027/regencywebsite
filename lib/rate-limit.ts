interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

function sweep(now: number) {
  if (buckets.size < 5_000) return;
  for (const [key, bucket] of buckets) if (bucket.resetAt <= now) buckets.delete(key);
}

export function rateLimit(
  key: string,
  { limit, windowSec, now = Date.now }: { limit: number; windowSec: number; now?: () => number },
): boolean {
  const time = now();
  sweep(time);
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= time) {
    buckets.set(key, { count: 1, resetAt: time + windowSec * 1000 });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}
