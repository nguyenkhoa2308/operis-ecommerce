"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import type { BlogPost } from "@/types/blog";
import { MOCK_BLOG_POSTS } from "@/app/blog/data";

const MOCK_POSTS = MOCK_BLOG_POSTS.slice(0, 3);

function formatDate(iso: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(iso));
}

function BlogCard({ post }: { post: BlogPost & { gradient?: string } }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 h-full"
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden">
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
            className={`w-full h-full bg-gradient-to-br ${(post as { gradient?: string }).gradient ?? "from-primary/10 to-sky/10"} flex items-center justify-center`}
          >
            <span className="text-6xl font-bold text-white/20 select-none">O</span>
          </div>
        )}
        {post.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-primary shadow-sm">
              <Tag size={10} />
              {post.category}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/40 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/70">{post.author}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {post.readTime} phút đọc
          </span>
          <span className="ml-auto">{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}

export function BlogSection() {
  return (
    <section className="py-16 md:py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm tracking-widest text-primary font-medium mb-2">
              KIẾN THỨC & TIN TỨC
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              BÀI VIẾT MỚI NHẤT
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
          >
            Xem tất cả <ArrowRight size={14} />
          </Link>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_POSTS.map((post) => (
            <StaggerItem key={post.id}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
          >
            Xem tất cả bài viết <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
