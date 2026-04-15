import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CaseCard } from "@/components/CaseCard";
import { ContactBlock } from "@/components/ContactBlock";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Section } from "@/components/Section";
import { getCasesBySlugs } from "@/data/cases";
import { getRelatedServices, getServiceBySlug, services } from "@/data/services";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

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
        secondaryLabel={service.secondaryCta}
        secondaryHref="#details"
      />

      <Section id="details" eyebrow="Услуга" title="Что входит в работу">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="prose prose-lg max-w-none prose-headings:text-ink prose-p:text-muted">
            {service.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h2>Кому подходит</h2>
            <ul>
              {service.audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <aside className="surface-card bg-mist/80 p-6">
            <h2 className="text-xl font-bold text-ink">Коммерческий фокус</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              На старте фиксируем целевое действие, данные для CRM и метрики, по которым можно понять пользу автоматизации.
            </p>
            <Link href="/contacts" className="primary-button mt-5 inline-flex">
              Получить оценку
            </Link>
          </aside>
        </div>
      </Section>

      <Section className="bg-mist" eyebrow="Бизнес-задачи" title="Какие задачи решает">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {service.tasks.map((task) => (
            <div key={task} className="surface-card p-5 text-sm font-semibold leading-6 text-ink">
              {task}
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Функциональность" title="Что может быть в решении">
        <div className="grid gap-4 md:grid-cols-2">
          {service.features.map((feature) => (
            <div key={feature} className="surface-card p-5 text-muted">
              {feature}
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-paper" eyebrow="Этапы" title="Как внедряем">
        <ProcessSteps steps={service.process} />
      </Section>

      {(service.pricing || service.timeline) && (
        <Section eyebrow="Бюджет и сроки" title="Что влияет на оценку проекта">
          <div className="grid gap-5 md:grid-cols-2">
            {service.pricing && (
              <div className="surface-card p-6">
                <h3 className="text-xl font-bold text-ink">{service.pricing.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{service.pricing.text}</p>
                <ul className="mt-5 grid gap-3 text-sm text-muted">
                  {service.pricing.items.map((item) => (
                    <li key={item} className="rounded-md bg-mist px-4 py-3">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {service.timeline && (
              <div className="surface-card p-6">
                <h3 className="text-xl font-bold text-ink">{service.timeline.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{service.timeline.text}</p>
                <ul className="mt-5 grid gap-3 text-sm text-muted">
                  {service.timeline.items.map((item) => (
                    <li key={item} className="rounded-md bg-mist px-4 py-3">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      {(service.deliverables || service.clientInputs) && (
        <Section className="bg-mist" eyebrow="Состав работ" title="Что входит и что нужно от клиента">
          <div className="grid gap-5 md:grid-cols-2">
            {service.deliverables && (
              <div className="surface-card p-6">
                <h3 className="text-xl font-bold text-ink">Что входит</h3>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {service.clientInputs && (
              <div className="surface-card p-6">
                <h3 className="text-xl font-bold text-ink">Что понадобится от вашей команды</h3>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
                  {service.clientInputs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      {(service.risks || service.supportOptions || service.guarantees) && (
        <Section eyebrow="Надежность" title="Риски, поддержка и SLA">
          <div className="grid gap-5 lg:grid-cols-3">
            {service.risks && (
              <div className="surface-card p-6">
                <h3 className="text-xl font-bold text-ink">Риски и ограничения</h3>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
                  {service.risks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {service.supportOptions && (
              <div className="surface-card p-6">
                <h3 className="text-xl font-bold text-ink">Форматы поддержки</h3>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
                  {service.supportOptions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {service.guarantees && (
              <div className="surface-card p-6">
                <h3 className="text-xl font-bold text-ink">Гарантии процесса</h3>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
                  {service.guarantees.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      {service.legalSupport && (
        <Section className="bg-deep text-white" tone="dark" eyebrow="Юридическое сопровождение" title={service.legalSupport.title} intro={service.legalSupport.text}>
          <div className="grid gap-4 md:grid-cols-2">
            {service.legalSupport.items.map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.06] p-5 text-sm leading-6 text-white/75">
                {item}
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section eyebrow="Примеры" title="Сценарии для запуска">
        <div className="grid gap-4 md:grid-cols-3">
          {service.examples.map((example) => (
            <div key={example} className="surface-card p-6 text-sm leading-6 text-muted">
              {example}
            </div>
          ))}
        </div>
      </Section>

      {relatedCases.length > 0 && (
        <Section className="bg-mist" eyebrow="Кейсы" title="Связанные примеры">
          <div className="grid gap-5 lg:grid-cols-3">
            {relatedCases.map((caseItem) => (
              <CaseCard key={caseItem.slug} caseItem={caseItem} />
            ))}
          </div>
        </Section>
      )}

      <Section eyebrow="FAQ" title="Ответы на вопросы">
        <FAQ items={service.faq} />
      </Section>

      <Section className="bg-paper">
        <RelatedLinks
          title="Соседние услуги"
          items={relatedServices.map((item) => ({
            label: item.title,
            href: `/${item.slug}`,
            description: item.metaDescription
          }))}
        />
      </Section>

      <CTA
        title="Получите план внедрения под ваш процесс"
        text="Опишите, какие обращения идут в MAX и куда должны попадать данные. Подскажем состав MVP и риски интеграции."
        primaryLabel={service.primaryCta}
        primaryHref="/contacts"
        secondaryLabel="Кейсы"
        secondaryHref="/cases"
      />

      <ContactBlock title={`Обсудить: ${service.title}`} page={`service:${service.slug}`} />
    </>
  );
}
