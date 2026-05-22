import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/data/blog";
import { getRelatedServices } from "@/data/services";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata, formatDate } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return createPageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    type: "article"
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Главная", href: "/" },
    { name: "Блог", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` }
  ];
  const relatedServices = getRelatedServices(post.serviceSlugs);
  const relatedPosts = getRelatedPosts(post.relatedSlugs);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), articleSchema(post)]} />
      <Breadcrumbs items={breadcrumbs} />

      <article>
        <Section className="bg-paper" eyebrow="Статья" title={post.title} intro={post.excerpt}>
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            <p>
              Материал обновлен {formatDate(post.updatedAt)}. Время чтения: {post.readingTime}. В статье собраны практические правила, ограничения и примеры, которые помогают подготовить внедрение MAX без лишних итераций.
            </p>
          </div>
        </Section>

        <Section>
          <div className="prose prose-lg max-w-none prose-headings:text-ink prose-p:text-muted prose-li:text-muted">
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <p>
                    <strong>Ключевые пункты.</strong> {section.bullets.join(" ")}
                  </p>
                )}
              </section>
            ))}
          </div>
        </Section>

        <Section className="bg-paper" title="Связанные услуги и статьи">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            {relatedServices.length > 0 && (
              <p>
                <strong>Услуги по теме.</strong>{" "}
                {relatedServices.map((service) => `${service.title}: ${service.metaDescription}`).join(" ")}
              </p>
            )}
            {relatedPosts.length > 0 && (
              <p>
                <strong>Похожие статьи.</strong>{" "}
                {relatedPosts.map((relatedPost) => `${relatedPost.title}: ${relatedPost.excerpt}`).join(" ")}
              </p>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {relatedServices.map((service) => (
              <Link key={service.slug} href={`/${service.slug}`} className="secondary-button">
                {service.title}
              </Link>
            ))}
            <Link href="/blog" className="secondary-button">
              Все статьи
            </Link>
          </div>
        </Section>
      </article>
    </>
  );
}
