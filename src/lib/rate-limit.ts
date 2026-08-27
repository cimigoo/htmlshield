// In-memory rate limiter for free tier (3 requests/day per IP)
// Note: This resets on serverless function cold starts. For production,
// consider using Vercel KV or Upstash Redis.

interface RateEntry {
  count: number;
  date: string; // YYYY-MM-DD
}

const GLOBAL: Record<string, unknown> = globalThis as unknown as Record<string, unknown>;
if (!GLOBAL.__hshield_rateLimit) {
  GLOBAL.__hshield_rateLimit = new Map<string, RateEntry>();
}
const store: Map<string, RateEntry> =
  GLOBAL.__hshield_rateLimit as Map<string, RateEntry>;

const FREE_DAILY_LIMIT = 3;

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getRemainingFreeRequests(ip: string): number {
  const entry = store.get(ip);
  const now = today();
  if (!entry || entry.date !== now) {
    return FREE_DAILY_LIMIT;
  }
  return Math.max(0, FREE_DAILY_LIMIT - entry.count);
}

export function consumeFreeRequest(ip: string): { allowed: boolean; remaining: number } {
  const entry = store.get(ip);
  const now = today();
  if (!entry || entry.date !== now) {
    store.set(ip, { count: 1, date: now });
    return { allowed: true, remaining: FREE_DAILY_LIMIT - 1 };
  }
  if (entry.count >= FREE_DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  entry.count += 1;
  return { allowed: true, remaining: FREE_DAILY_LIMIT - entry.count };
}

export function getClientIp(request: Request): string {
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
