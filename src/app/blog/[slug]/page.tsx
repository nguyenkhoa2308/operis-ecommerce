import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Tag, Calendar } from "lucide-react";
import sanitizeHtml from "sanitize-html";
import { SubscribeSection } from "@/components/home/subscribe-section";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/api/blog.server";
import { MOCK_BLOG_POSTS } from "../data";
import { FadeIn } from "@/components/ui/motion";
import { BlogToc, type TocItem } from "@/components/blog/blog-toc";
import { BlogContent, extractTocFromBlocks } from "@/components/blog/blog-content";

const ALLOWED_TAGS = [
  "h2", "h3", "h4", "p", "br", "strong", "em", "b", "i", "u", "s",
  "ul", "ol", "li",
  "blockquote",
  "a",
  "img",
  "figure", "figcaption",
  "pre", "code",
  "table", "thead", "tbody", "tr", "th", "td",
  "hr",
];

const ALLOWED_ATTRS: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "title", "target", "rel"],
  img: ["src", "alt", "width", "height", "loading"],
  "*": ["id", "class"],
};

function sanitize(html: string) {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRS,
    allowedSchemes: ["https", "http", "mailto"],
  });
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const apiPost = await fetchBlogPost(slug);
  const post = apiPost ?? MOCK_BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Bài viết không tồn tại | Operisbot" };
  return {
    title: `${post.title} | Operisbot Blog`,
    description: post.excerpt,
    openGraph: post.thumbnail
      ? { images: [{ url: post.thumbnail }] }
      : undefined,
  };
}

export async function generateStaticParams() {
  const { posts: apiPosts } = await fetchBlogPosts({ limit: 50 });
  const slugs = new Set(apiPosts.map((p) => p.slug));
  MOCK_BLOG_POSTS.forEach((p) => slugs.add(p.slug));
  return Array.from(slugs).map((slug) => ({ slug }));
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** Extract headings and inject id attributes into content HTML */
function processContent(html: string): {
  processedHtml: string;
  tocItems: TocItem[];
} {
  const tocItems: TocItem[] = [];
  let counter = 0;

  const processedHtml = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_, level, attrs, inner) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const id = `section-${counter++}`;
      tocItems.push({ id, text, level: parseInt(level) });
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    },
  );

  return { processedHtml, tocItems };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  const apiPost = await fetchBlogPost(slug);
  const post = apiPost ?? MOCK_BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const mockPost = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
  const gradient =
    mockPost?.gradient ?? "from-primary/80 via-sky-500/70 to-violet-500/60";

  const hasBlocks = !!(post.contentBlocks && post.contentBlocks.length > 0);
  const { processedHtml, tocItems: htmlTocItems } = processContent(post.content);
  const { tocItems: blockTocItems, idMap: blockIdMap } = hasBlocks
    ? extractTocFromBlocks(post.contentBlocks!)
    : { tocItems: [], idMap: {} };
  const tocItems = hasBlocks ? blockTocItems : htmlTocItems;

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[480px]">
        {post.thumbnail ? (
          <>
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/50 to-black/70" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-5 left-0 right-0 z-20 max-w-7xl mx-auto px-6 md:px-10">
          <nav className="flex items-center gap-2 text-sm text-white/75">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <span className="text-white/40">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white line-clamp-1 max-w-[280px]">
              {post.title}
            </span>
          </nav>
        </div>

        {/* Hero content — bottom-aligned */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-20 md:pb-24 flex items-end min-h-[400px] md:min-h-[480px]">
          <FadeIn direction="up" className="max-w-3xl">
            {post.category && (
              <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5 text-white text-xs font-semibold tracking-wide uppercase mb-4">
                <Tag className="w-3 h-3" />
                {post.category}
              </div>
            )}
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/65">
              <span className="font-semibold text-white/90">{post.author}</span>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt)}
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Decorative dots */}
        <div
          className="absolute bottom-10 right-10 z-10 pointer-events-none select-none"
          aria-hidden
        >
          <svg width="80" height="64">
            {Array.from({ length: 5 }, (_, xi) =>
              Array.from({ length: 4 }, (_, yi) => (
                <circle
                  key={`${xi}-${yi}`}
                  cx={xi * 16 + 8}
                  cy={yi * 16 + 8}
                  r="2.5"
                  fill="white"
                  opacity="0.3"
                />
              )),
            )}
          </svg>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 80"
            className="w-full block"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTENT — TOC sidebar + article
      ══════════════════════════════════════════ */}
      <main className="bg-white -mt-px">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-12 md:pb-16 flex gap-12 xl:gap-16">
          {/* Sticky TOC — desktop only */}
          <BlogToc items={tocItems} />

          {/* Article */}
          <article className="flex-1 min-w-0 max-w-3xl">
            <FadeIn>
              {/* Lead excerpt */}
              {post.excerpt && (
                <p className="text-lg text-muted-foreground leading-relaxed mb-10 font-medium border-l-4 border-primary/40 pl-5 italic">
                  {post.excerpt}
                </p>
              )}

              {/* Body — structured blocks (API) or sanitized HTML (fallback) */}
              {post.contentBlocks && post.contentBlocks.length > 0 ? (
                <BlogContent blocks={post.contentBlocks} idMap={blockIdMap} />
              ) : (
                <div
                  className="
                    prose prose-gray max-w-none
                    prose-p:leading-[1.9] prose-p:text-foreground/80 prose-p:my-4
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-ul:my-5 prose-ol:my-5 prose-li:my-1.5 prose-li:leading-relaxed
                    prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:bg-primary/4 prose-blockquote:rounded-r-lg prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:text-foreground/70
                    [&_figure]:mt-4 [&_figure]:mb-8 [&_figure]:rounded-2xl [&_figure]:overflow-hidden
                    [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:w-full [&_img]:object-cover
                    [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_figcaption]:mt-3 [&_figcaption]:italic [&_figcaption]:leading-relaxed
                    prose-code:text-primary prose-code:bg-primary/8 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal
                    prose-pre:bg-muted/60 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl
                    [&_h2]:scroll-mt-24 [&_h2]:text-[1.6rem] [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:pb-3 [&_h2]:border-b-2 [&_h2]:border-primary/25
                    [&_h3]:scroll-mt-24 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3
                    [&_h4]:scroll-mt-24 [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-foreground [&_h4]:mt-6 [&_h4]:mb-2
                  "
                  dangerouslySetInnerHTML={{ __html: sanitize(processedHtml) }}
                />
              )}
            </FadeIn>

            {/* Tags */}
            {post.tags.length > 0 && (
              <FadeIn>
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border/40">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted/60 text-muted-foreground rounded-full px-3 py-1.5 border border-border/50 hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Back */}
            <FadeIn>
              <div className="mt-10">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-medium transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </div>
                  Quay lại Blog
                </Link>
              </div>
            </FadeIn>
          </article>
        </div>
      </main>

      <SubscribeSection />
    </>
  );
}
