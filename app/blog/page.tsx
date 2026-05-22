import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
      <article>
        <Section
          eyebrow="Блог"
          title="Практические материалы"
          intro="Пишем о внедрении MAX без абстрактных обещаний: сценарии, ограничения, интеграции, юридические нюансы, стоимость и контроль качества."
        >
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            {blogPosts.map((post) => (
              <p key={post.slug}>
                <strong>{post.title}.</strong> {post.excerpt} В материале {post.sections.length} разделов с практическими деталями. Читать: <Link href={`/blog/${post.slug}`}>{post.title}</Link>.
              </p>
            ))}
          </div>
        </Section>
      </article>
    </>
  );
}
