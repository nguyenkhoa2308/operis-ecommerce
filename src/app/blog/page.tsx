import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BlogFilterTabs } from "@/components/blog/blog-filter-tabs";
import { PageBanner } from "@/components/ui/page-banner";
import { SubscribeSection } from "@/components/home/subscribe-section";
import { fetchBlogPosts } from "@/lib/api/blog.server";
import type { BlogPost } from "@/types/blog";
import { MOCK_BLOG_POSTS, type MockBlogPost } from "./data";

export const metadata: Metadata = {
  title: "Blog & Kiến thức",
  description:
    "Cập nhật kiến thức tự động hóa, AI workflow và tin tức mới nhất từ đội ngũ Operisbot.",
};

const POSTS_PER_PAGE = 9;

const GRADIENTS = [
  "from-sky-500 via-blue-600 to-violet-600",
  "from-violet-500 via-rose-500 to-amber-500",
  "from-emerald-500 via-teal-500 to-sky-500",
  "from-amber-500 via-orange-500 to-rose-500",
  "from-primary via-sky-500 to-violet-500",
  "from-rose-500 via-violet-500 to-sky-500",
];

function formatDate(iso: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

/* ─── Hero card (first post, large) ─────────────────────────────── */
function HeroCard({ post, gradient }: { post: BlogPost; gradient?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col justify-end rounded-2xl overflow-hidden h-[420px] lg:h-full min-h-[380px]"
    >
      {/* Background */}
      {post.thumbnail ? (
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          sizes="(max-width:1024px) 100vw, 55vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          priority
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient ?? GRADIENTS[0]}`}
        />
      )}

      {/* Gradient overlay — dark at bottom, fade to transparent at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 via-40% to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-7">
        <div className="flex items-center gap-2 mb-3">
          {post.category && (
            <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
          )}
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white leading-snug line-clamp-3 mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          {post.title}
        </h2>

        <p className="text-sm text-white/70 line-clamp-2 mb-4 hidden sm:block">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50">
            {formatDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/15 hover:bg-primary border border-white/20 px-3 py-1.5 rounded-full transition-colors group-hover:bg-primary group-hover:border-primary">
            Đọc ngay <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Side card (2nd & 3rd posts stacked beside hero) ───────────── */
function SideCard({ post, gradient }: { post: BlogPost; gradient?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col justify-end rounded-2xl overflow-hidden flex-1 min-h-[160px]"
    >
      {post.thumbnail ? (
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          sizes="(max-width:1024px) 100vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient ?? GRADIENTS[1]}`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 via-40% to-transparent" />

      <div className="relative z-10 p-5">
        {post.category && (
          <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wide">
            {post.category}
          </span>
        )}
        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-[11px] text-white/50">
          {formatDate(post.publishedAt)}
        </div>
      </div>
    </Link>
  );
}

/* ─── Regular grid card ──────────────────────────────────────────── */
function PostCard({ post, gradient }: { post: BlogPost; gradient?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 h-full"
    >
      <div className="relative h-44 shrink-0 overflow-hidden">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient ?? GRADIENTS[0]}`}
          />
        )}
        {post.category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary px-2.5 py-1 rounded-full shadow-sm">
            {post.category}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h2 className="font-semibold text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/40 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/60 truncate">
            {post.author}
          </span>
          <span className="ml-auto shrink-0">
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam, category } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const offset = (page - 1) * POSTS_PER_PAGE;

  const [{ posts: apiPosts }, { posts: allApiPosts }] = await Promise.all([
    fetchBlogPosts({ limit: POSTS_PER_PAGE, offset, category }),
    fetchBlogPosts({ limit: 100 }),
  ]);

  const usingApi = allApiPosts.length > 0;

  const posts: (BlogPost & { gradient?: string })[] = usingApi
    ? apiPosts.map((p, i) => ({
        ...p,
        gradient: GRADIENTS[i % GRADIENTS.length],
      }))
    : (MOCK_BLOG_POSTS as MockBlogPost[]).filter(
        (p) => !category || p.category === category,
      );

  const categories = [
    ...new Set(
      (usingApi ? allApiPosts : MOCK_BLOG_POSTS)
        .map((p) => p.category)
        .filter(Boolean),
    ),
  ];

  const totalPages = Math.ceil(
    (usingApi ? allApiPosts.length : posts.length) / POSTS_PER_PAGE,
  );

  /* Split: hero (pos 0), side (pos 1-2), grid (pos 3+) — page 1 only */
  const isFirstPage = page === 1;
  const heroPost = isFirstPage ? posts[0] : null;
  const sidePosts = isFirstPage ? posts.slice(1, 3) : [];
  const gridPosts = isFirstPage ? posts.slice(3) : posts;

  return (
    <>
      <PageBanner
        title="Blog & Kiến thức"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Blog" }]}
      />

      <section className="py-12 md:py-16 bg-[#f8fafc] min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          {/* ── Filter tabs (horizontal scroll, animated) ────────────── */}
          {categories.length > 0 && <BlogFilterTabs categories={categories} />}

          {posts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Không có bài viết nào trong danh mục này.
            </div>
          ) : (
            <>
              {/* ── Hero section (page 1 only) ──────────────────────────── */}
              {heroPost && (
                <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-4 lg:h-[420px]">
                  <HeroCard
                    post={heroPost}
                    gradient={(heroPost as MockBlogPost).gradient}
                  />
                  {sidePosts.length > 0 && (
                    <div className="flex flex-col gap-4 h-full">
                      {sidePosts.map((p) => (
                        <SideCard
                          key={p.id}
                          post={p}
                          gradient={(p as MockBlogPost).gradient}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── Grid ────────────────────────────────────────────────── */}
              {gridPosts.length > 0 && (
                <div>
                  {isFirstPage && (
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Tất cả bài viết
                      </span>
                      <div className="flex-1 h-px bg-border/50" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gridPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        gradient={(post as MockBlogPost).gradient}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Pagination ──────────────────────────────────────────── */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <Link
                        key={p}
                        href={`/blog?page=${p}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium border transition-colors ${
                          p === page
                            ? "bg-foreground text-background border-foreground"
                            : "bg-white border-border hover:border-foreground hover:text-foreground"
                        }`}
                      >
                        {p}
                      </Link>
                    ),
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <SubscribeSection />
    </>
  );
}
