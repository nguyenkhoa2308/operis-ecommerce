import { mapPost } from "./blog";
import type { BlogListResponse, BlogPost, BlogFilters } from "@/types/blog";

/* ------------------------------------------------------------------ */
/*  Server-side fetch (Next.js Server Components / ISR)               */
/*  Handles streaming NDJSON — each newline-delimited chunk = 1 post  */
/* ------------------------------------------------------------------ */

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") || "https://admin.operis.vn";

const BASE = `${API_ORIGIN}/api`;

async function consumeStream(res: Response): Promise<BlogPost[]> {
  if (!res.body) return [];

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  const posts: BlogPost[] = [];
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = JSON.parse(trimmed) as any;
        const items = Array.isArray(raw)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            raw.map((r: any) => mapPost(r))
          : raw.posts
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              raw.posts.map((r: any) => mapPost(r))
            : [mapPost(raw)];
        posts.push(...items);
      } catch {
        // skip malformed lines
      }
    }
  }

  if (buffer.trim()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw = JSON.parse(buffer) as any;
      const items = Array.isArray(raw)
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          raw.map((r: any) => mapPost(r))
        : raw.posts
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            raw.posts.map((r: any) => mapPost(r))
          : [mapPost(raw)];
      posts.push(...items);
    } catch {
      // ignore
    }
  }

  return posts;
}

/** GET /blog — list posts (server-side, ISR 60 s, streaming NDJSON) */
export async function fetchBlogPosts(filters?: BlogFilters): Promise<BlogListResponse> {
  const params = new URLSearchParams();
  if (filters?.limit) params.set("limit", String(filters.limit));
  if (filters?.offset) params.set("offset", String(filters.offset));
  if (filters?.category) params.set("category", filters.category);

  try {
    const res = await fetch(`${BASE}/blog?${params}`, { next: { revalidate: 60 } });
    if (!res.ok) return { posts: [], total: 0 };
    const posts = await consumeStream(res);
    return { posts, total: posts.length };
  } catch {
    return { posts: [], total: 0 };
  }
}

/** GET /blog/:slug — single post (server-side, ISR 60 s) */
export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${BASE}/blog/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    // Single post may stream or return plain JSON
    const posts = await consumeStream(res);
    if (posts.length > 0) return posts[0];
    // Fallback: try plain JSON
    return null;
  } catch {
    return null;
  }
}
