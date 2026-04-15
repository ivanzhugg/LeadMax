import Link from "next/link";
import type { BlogPost } from "@/types/content";
import { formatDate } from "@/lib/seo";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="surface-card p-6 transition hover:-translate-y-1 hover:border-moss/60">
      <div className="flex flex-wrap gap-3 text-sm text-muted">
        <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
        <span className="text-moss">{post.readingTime}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-ink">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-semibold text-moss">
        Читать статью
      </Link>
    </article>
  );
}
