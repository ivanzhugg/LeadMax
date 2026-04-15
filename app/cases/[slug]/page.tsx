import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBlock } from "@/components/ContactBlock";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Section } from "@/components/Section";
import { cases, getCaseBySlug } from "@/data/cases";
import { getRelatedServices } from "@/data/services";
import { breadcrumbSchema, caseBreadcrumbItems } from "@/lib/schema";
import { createPageMetadata, formatDate } from "@/lib/seo";

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((caseItem) => ({
    slug: caseItem.slug
  }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) {
    return {};
  }

  return createPageMetadata({
    title: caseItem.metaTitle,
    description: caseItem.metaDescription,
    path: `/cases/${caseItem.slug}`
  });
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) {
    notFound();
  }

  const breadcrumbs = caseBreadcrumbItems(caseItem.slug);
  const relatedServices = getRelatedServices(caseItem.serviceSlugs);

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <article>
        <Section
          eyebrow={caseItem.industry}
          title={caseItem.title}
          intro={caseItem.summary}
          className="bg-paper"
        >
          <div className="grid gap-6 text-sm text-muted md:grid-cols-3">
            <div className="surface-card p-5">
              <span className="font-semibold text-ink">Обновлено</span>
              <p className="mt-2">{formatDate(caseItem.updatedAt)}</p>
            </div>
            <div className="surface-card p-5">
              <span className="font-semibold text-ink">Ниша</span>
              <p className="mt-2">{caseItem.industry}</p>
            </div>
            <div className="surface-card p-5">
              <span className="font-semibold text-ink">Фокус</span>
              <p className="mt-2">MAX, CRM, автоматизация процесса</p>
            </div>
          </div>
        </Section>

        <Section title="Задача">
          <p className="max-w-3xl text-lg leading-8 text-muted">{caseItem.task}</p>
        </Section>

        <Section className="bg-mist" title="Решение">
          <div className="grid gap-4 md:grid-cols-3">
            {caseItem.solution.map((item) => (
              <div key={item} className="surface-card p-6 text-sm leading-6 text-ink">
                {item}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Стек и интеграции">
          <div className="flex flex-wrap gap-3">
            {caseItem.stack.map((item) => (
              <span key={item} className="rounded-md border border-moss/20 bg-moss/10 px-4 py-2 text-sm font-semibold text-moss">
                {item}
              </span>
            ))}
          </div>
        </Section>

        <Section className="bg-paper" title="Результат">
          <ul className="grid gap-4 md:grid-cols-3">
            {caseItem.result.map((item) => (
              <li key={item} className="surface-card p-6 text-sm leading-6 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <RelatedLinks
            title="Связанные услуги"
            items={relatedServices.map((service) => ({
              label: service.title,
              href: `/${service.slug}`,
              description: service.metaDescription
            }))}
          />
          <div className="mt-10">
            <Link href="/cases" className="text-sm font-semibold text-moss">
              Все кейсы
            </Link>
          </div>
        </Section>
      </article>

      <CTA
        title="Хотите похожий сценарий в MAX?"
        text="Разберем текущий процесс и предложим MVP, который можно проверить на реальных обращениях."
        primaryHref="/contacts"
        primaryLabel="Обсудить кейс"
      />
      <ContactBlock title="Оценить автоматизацию по вашему процессу" page={`case:${caseItem.slug}`} />
    </>
  );
}
