import Link from "next/link";
import type { BreadcrumbItem } from "@/types/content";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Хлебные крошки" className="border-b border-line/70 bg-paper/90 backdrop-blur">
      <ol className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4 text-sm text-muted sm:px-6 lg:px-8">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.href}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span aria-current="page" className="text-ink">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-moss">{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
