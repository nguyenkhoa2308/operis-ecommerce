import api from "@/lib/axios";
import type { ContentBlock, BlogPost, BlogListResponse, BlogFilters } from "@/types/blog";
export type { ContentBlock, BlogPost, BlogListResponse, BlogFilters };

/* ------------------------------------------------------------------ */
/*  Mapper                                                             */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapPost(raw: any): BlogPost {
  // category can be object { name, slug } or plain string
  const categoryName =
    typeof raw.category === "object" && raw.category !== null
      ? (raw.category.name ?? "")
      : (raw.category ?? "");

  // author can be string, or nested in author_info / author_name
  const authorName =
    typeof raw.author === "string" && raw.author
      ? raw.author
      : (raw.author_info?.name ?? raw.author_name ?? raw.authorName ?? "Operisbot");

  // thumbnail field variations
  const thumbnail =
    raw.cover_image ?? raw.thumbnail ?? raw.image ?? raw.cover ?? null;

  // tags can be string[] or relation ID array — keep only strings
  const tags: string[] = Array.isArray(raw.tags)
    ? raw.tags.filter((t: unknown) => typeof t === "string")
    : [];

  // content_blocks
  const contentBlocks: ContentBlock[] | null = Array.isArray(raw.content_blocks)
    ? raw.content_blocks
    : null;

  return {
    id: raw.id ?? raw._id ?? "",
    slug: raw.slug ?? "",
    title: raw.title ?? "",
    excerpt: raw.excerpt ?? raw.subtitle ?? raw.summary ?? raw.description ?? "",
    content: raw.content ?? raw.body ?? "",
    contentBlocks,
    thumbnail,
    category: categoryName,
    tags,
    author: authorName,
    readTime: raw.reading_time ?? raw.readTime ?? raw.read_time ?? 5,
    publishedAt: raw.published_at ?? raw.publishedAt ?? raw.createdAt ?? raw.created_at ?? "",
    createdAt: raw.created_at ?? raw.createdAt ?? "",
  };
}

/* ------------------------------------------------------------------ */
/*  API calls (client-side via axios)                                  */
/* ------------------------------------------------------------------ */

/** GET /blog — list blog posts (streaming NDJSON, each line = 1 JSON object) */
export async function getBlogPosts(
  filters?: BlogFilters,
  onPost?: (post: BlogPost) => void,
): Promise<BlogListResponse> {
  const params = new URLSearchParams();
  if (filters?.limit) params.set("limit", String(filters.limit));
  if (filters?.offset) params.set("offset", String(filters.offset));
  if (filters?.category) params.set("category", filters.category);

  const response = await fetch(`/api/blog?${params}`, {
    credentials: "include",
  });

  if (!response.ok || !response.body) return { posts: [], total: 0 };

  const reader = response.body.getReader();
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
        const items: BlogPost[] = Array.isArray(raw)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            raw.map((r: any) => mapPost(r))
          : raw.posts
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              raw.posts.map((r: any) => mapPost(r))
            : [mapPost(raw)];
        for (const post of items) {
          posts.push(post);
          onPost?.(post);
        }
      } catch {
        // incomplete or invalid line, skip
      }
    }
  }

  if (buffer.trim()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw = JSON.parse(buffer) as any;
      const items: BlogPost[] = Array.isArray(raw)
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          raw.map((r: any) => mapPost(r))
        : raw.posts
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            raw.posts.map((r: any) => mapPost(r))
          : [mapPost(raw)];
      for (const post of items) {
        posts.push(post);
        onPost?.(post);
      }
    } catch {
      // ignore
    }
  }

  return { posts, total: posts.length };
}

/** GET /blog/:slug — single post */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/blog/${slug}`, { credentials: "include" });
    if (!response.ok) return null;
    const data = await response.json();
    return mapPost(data.post ?? data);
  } catch {
    return null;
  }
}

// Keep axios instance imported to avoid unused-import warning
void api;
