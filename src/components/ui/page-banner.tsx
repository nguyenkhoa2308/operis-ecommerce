import Link from "next/link";

interface PageBannerProps {
  title: string;
  breadcrumb: { label: string; href?: string }[];
}

/** Shared page banner with title and breadcrumb - used on Shop, About, Cart, Contact pages */
export function PageBanner({ title, breadcrumb }: PageBannerProps) {
  return (
    <section className="bg-muted py-14 text-center">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">{title}</h1>
      <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        {breadcrumb.map((item, i) => (
          <span key={item.label} className="flex items-center gap-2">
            {i > 0 && <span>&gt;</span>}
            {item.href ? (
              <Link href={item.href} className="text-primary hover:underline">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </section>
  );
}
