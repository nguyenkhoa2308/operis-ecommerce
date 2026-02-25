"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterLink {
  label: string;
  href: string;
}

export function FooterNavLinks({ links }: { links: FooterLink[] }) {
  const pathname = usePathname();

  return (
    <ul className="space-y-2">
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <li key={link.label}>
            <Link
              href={link.href}
              className={`text-sm tracking-wide transition-colors hover:text-primary ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
