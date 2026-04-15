import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBlock } from "@/components/ContactBlock";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { blogPosts } from "@/data/blog";
import { breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

const breadcrumbs = [
  { name: "Главная", href: "/" },
  { name: "Блог", href: "/blog" }
];

export const metadata: Metadata = createPageMetadata({
  title: "Блог про чат-боты, MAX и автоматизацию",
  description:
    "Статьи о чат-ботах в MAX, AI-ассистентах, CRM-интеграциях, продажах, поддержке и автоматизации процессов.",
  path: "/blog"
});

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Section
        eyebrow="Блог"
        title="SEO-статьи про MAX, ботов и автоматизацию"
        intro="Материалы закрывают информационные и полукоммерческие запросы, а также ведут читателя к релевантным услугам."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
      <ContactBlock title="Нужна автоматизация после изучения материалов?" page="blog" />
    </>
  );
}
