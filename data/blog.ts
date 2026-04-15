import blogJson from "@/content/blog.json";
import type { BlogPost } from "@/types/content";

export const blogPosts = blogJson as BlogPost[];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slugs: string[]) {
  return slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => Boolean(post));
}
