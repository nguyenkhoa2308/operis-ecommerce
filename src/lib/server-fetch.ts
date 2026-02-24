/**
 * Server-safe fetch for public API endpoints.
 * Uses native fetch() — NO axios, NO localStorage, NO auth tokens.
 */

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api"
).replace(/\/$/, "");

export async function serverFetch<T>(
  path: string,
  options?: {
    params?: Record<string, string | number | undefined>;
    next?: NextFetchRequestConfig;
  },
): Promise<T> {
  const url = new URL(`${API_BASE}${path}`);
  if (options?.params) {
    Object.entries(options.params).forEach(([k, v]) => {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    });
  }

  const res = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
    next: options?.next,
  });

  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}
