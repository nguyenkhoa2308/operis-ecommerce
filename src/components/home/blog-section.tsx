import Image from "next/image";
import { blogPosts } from "@/data/blogs";

export function BlogSection() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-lg font-semibold tracking-widest text-center mb-8">BÀI VIẾT MỚI NHẤT</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-[3/2] overflow-hidden mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-primary font-medium">{post.category}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <h3 className="text-sm font-semibold leading-snug mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Nguồn: <span className="underline underline-offset-2">{post.source}</span>
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
