import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
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

function joinText(items: string[] = []) {
  return items.join(" ");
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
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            <p>
              Кейс обновлен {formatDate(caseItem.updatedAt)}. Ниша проекта: {caseItem.industry}. Фокус кейса: MAX, интеграции, автоматизация процесса и измеримый результат.
            </p>
          </div>
        </Section>

        <Section title="Контекст и задача">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            {caseItem.clientProfile && <p>{caseItem.clientProfile}</p>}
            <p>{caseItem.task}</p>
            {caseItem.baseline && <p>{caseItem.baseline}</p>}
          </div>
        </Section>

        <Section className="bg-paper" title="Решение и реализация">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            <p>
              <strong>Решение.</strong> {joinText(caseItem.solution)}
            </p>
            {caseItem.implementation && (
              <p>
                <strong>Как реализовали.</strong> {joinText(caseItem.implementation)}
              </p>
            )}
            <p>
              <strong>Стек и интеграции.</strong> {joinText(caseItem.stack)}
            </p>
          </div>
        </Section>

        {caseItem.metrics && (
          <Section title="Метрики и результат">
            <div className="prose prose-lg max-w-none prose-p:text-muted">
              <p>
                <strong>Метрики.</strong> {caseItem.metrics.map((metric) => `${metric.label}: ${metric.value}. ${metric.text}`).join(" ")}
              </p>
              <p>
                <strong>Результат.</strong> {joinText(caseItem.result)}
              </p>
            </div>
          </Section>
        )}

        {(caseItem.timeline || caseItem.budget || caseItem.constraints) && (
          <Section className="bg-paper" title="Сроки, бюджет и ограничения">
            <div className="prose prose-lg max-w-none prose-p:text-muted">
              {caseItem.timeline && (
                <p>
                  <strong>Сроки.</strong> {caseItem.timeline}
                </p>
              )}
              {caseItem.budget && (
                <p>
                  <strong>Бюджет.</strong> {caseItem.budget}
                </p>
              )}
              {caseItem.constraints && (
                <p>
                  <strong>Ограничения.</strong> {joinText(caseItem.constraints)}
                </p>
              )}
            </div>
          </Section>
        )}

        {caseItem.assistantQuestions && (
          <Section title="Вопросы для AI-ассистента">
            <div className="prose prose-lg max-w-none prose-p:text-muted">
              {caseItem.assistantQuestions.map((item) => (
                <p key={item.question}>
                  <strong>{item.question}</strong> {item.answer}
                </p>
              ))}
            </div>
          </Section>
        )}

        {relatedServices.length > 0 && (
          <Section className="bg-paper" title="Связанные услуги">
            <div className="flex flex-wrap gap-3">
              {relatedServices.map((service) => (
                <Link key={service.slug} href={`/${service.slug}`} className="secondary-button">
                  {service.title}
                </Link>
              ))}
              <Link href="/cases" className="secondary-button">
                Все кейсы
              </Link>
            </div>
          </Section>
        )}
      </article>
    </>
  );
}
