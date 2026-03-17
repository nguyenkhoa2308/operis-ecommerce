export interface ContentBlock {
  id: string;
  type: "h1" | "h2" | "h3" | "h4" | "p" | "img" | "ul" | "ol" | "blockquote" | "code" | "hr" | string;
  content: string;
  alt?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  contentBlocks: ContentBlock[] | null;
  thumbnail: string | null;
  category: string;
  tags: string[];
  author: string;
  readTime: number; // minutes
  publishedAt: string;
  createdAt: string;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
}

export interface BlogFilters {
  limit?: number;
  offset?: number;
  category?: string;
}
