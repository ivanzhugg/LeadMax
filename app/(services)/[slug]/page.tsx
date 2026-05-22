import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { getCasesBySlugs } from "@/data/cases";
import { getRelatedServices, getServiceBySlug, services } from "@/data/services";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";
import type { ContentListBlock, ProcessStep } from "@/types/content";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return createPageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${service.slug}`,
    image: service.image || `/images/service-${service.slug}.png`
  });
}

function joinText(items: string[] = []) {
  return items.join(" ");
}

function processText(steps: ProcessStep[] = []) {
  return steps.map((step) => `${step.title}: ${step.text}`).join(" ");
}

function blockParagraph(block: ContentListBlock) {
  return `${block.title}. ${block.text} ${joinText(block.items)}`;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Главная", href: "/" },
    { name: "Услуги", href: "/chat-boty-v-max" },
    { name: service.title, href: `/${service.slug}` }
  ];
  const relatedServices = getRelatedServices(service.relatedSlugs);
  const relatedCases = getCasesBySlugs(service.caseSlugs);
  const heroImage = service.image || `/images/service-${service.slug}.png`;

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), serviceSchema(service), faqSchema(service.faq)]} />
      <Breadcrumbs items={breadcrumbs} />
      <Hero
        kicker={service.kicker}
        title={service.h1}
        lead={service.lead}
        image={heroImage}
        primaryLabel={service.primaryCta}
        primaryHref="/contacts"
        secondaryLabel="Кейсы"
        secondaryHref="#cases"
      />

      <article>
        <Section id="details" eyebrow="Услуга" title="Описание услуги">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            {service.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              <strong>Кому подходит.</strong> {joinText(service.audience)}
            </p>
            <p>
              <strong>Какие задачи решает.</strong> {joinText(service.tasks)}
            </p>
            <p>
              <strong>Что может быть в решении.</strong> {joinText(service.features)}
            </p>
          </div>
        </Section>

        {service.ragBlocks && (
          <Section className="bg-paper" eyebrow="Детали" title="Что важно учесть">
            <div className="prose prose-lg max-w-none prose-p:text-muted">
              {service.ragBlocks.map((block) => (
                <section key={block.title}>
                  <h3>{block.title}</h3>
                  <p>{block.text}</p>
                  <p>{joinText(block.items)}</p>
                </section>
              ))}
            </div>
          </Section>
        )}

        <Section eyebrow="Стоимость" title="Цены, сроки и пакеты">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            {service.pricing && (
              <p>
                <strong>{service.pricing.title}.</strong> {service.pricing.text} {joinText(service.pricing.items)}
              </p>
            )}
            {service.timeline && (
              <p>
                <strong>{service.timeline.title}.</strong> {service.timeline.text} {joinText(service.timeline.items)}
              </p>
            )}
            {service.packages?.map((item) => (
              <p key={item.title}>{blockParagraph(item)}</p>
            ))}
          </div>
        </Section>

        <Section className="bg-paper" eyebrow="Внедрение" title="Как проходит работа">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            <p>
              <strong>Этапы.</strong> {processText(service.process)}
            </p>
            {service.deliverables && (
              <p>
                <strong>Что входит.</strong> {joinText(service.deliverables)}
              </p>
            )}
            {service.clientInputs && (
              <p>
                <strong>Что понадобится от клиента.</strong> {joinText(service.clientInputs)}
              </p>
            )}
            <p>
              <strong>Примеры сценариев.</strong> {joinText(service.examples)}
            </p>
          </div>
        </Section>

        <Section eyebrow="Надежность" title="Риски, поддержка и приемка">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            {service.risks && (
              <p>
                <strong>Риски и ограничения.</strong> {joinText(service.risks)}
              </p>
            )}
            {service.supportOptions && (
              <p>
                <strong>Поддержка.</strong> {joinText(service.supportOptions)}
              </p>
            )}
            {service.guarantees && (
              <p>
                <strong>Гарантии процесса.</strong> {joinText(service.guarantees)}
              </p>
            )}
            {service.commercialNotes && (
              <p>
                <strong>Коммерческие условия.</strong> {joinText(service.commercialNotes)}
              </p>
            )}
          </div>
        </Section>

        {service.legalSupport && (
          <Section className="bg-paper" eyebrow="Юридический контур" title={service.legalSupport.title}>
            <div className="prose prose-lg max-w-none prose-p:text-muted">
              <p>{service.legalSupport.text}</p>
              <p>{joinText(service.legalSupport.items)}</p>
            </div>
          </Section>
        )}

        {relatedCases.length > 0 && (
          <Section id="cases" eyebrow="Кейсы" title="Связанные кейсы">
            <div className="prose prose-lg max-w-none prose-p:text-muted">
              {relatedCases.map((caseItem) => (
                <p key={caseItem.slug}>
                  <strong>{caseItem.title}.</strong> {caseItem.summary} Задача: {caseItem.task} Подробнее: <Link href={`/cases/${caseItem.slug}`}>{caseItem.title}</Link>.
                </p>
              ))}
            </div>
          </Section>
        )}

        <Section className="bg-paper" eyebrow="FAQ" title="Ответы на вопросы">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            {service.faq.map((item) => (
              <p key={item.question}>
                <strong>{item.question}</strong> {item.answer}
              </p>
            ))}
          </div>
        </Section>

        {relatedServices.length > 0 && (
          <Section eyebrow="Соседние услуги" title="Что посмотреть дальше">
            <div className="flex flex-wrap gap-3">
              {relatedServices.map((item) => (
                <Link key={item.slug} href={`/${item.slug}`} className="secondary-button">
                  {item.title}
                </Link>
              ))}
            </div>
          </Section>
        )}
      </article>
    </>
  );
}
