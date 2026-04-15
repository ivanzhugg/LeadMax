import Link from "next/link";
import type { LinkItem } from "@/types/content";

type RelatedLinksProps = {
  title: string;
  items: LinkItem[];
};

export function RelatedLinks({ title, items }: RelatedLinksProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="surface-card p-5 text-ink transition hover:-translate-y-1 hover:border-moss/70"
          >
            <span className="font-semibold">{item.label}</span>
            {item.description && <span className="mt-2 block text-sm leading-6 text-muted">{item.description}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
