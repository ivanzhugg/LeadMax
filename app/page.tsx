import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { blogPosts } from "@/data/blog";
import { cases } from "@/data/cases";
import { coreServices, crmServices, industryServices, scenarioServices } from "@/data/services";
import { faqSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";
import type { FaqItem } from "@/types/content";

const homeFaq: FaqItem[] = [
  {
    question: "Что делает LeadMax?",
    answer:
      "LeadMax проектирует чат-ботов, AI-ассистентов и интеграции для MAX. Основные задачи: продажи, поддержка, запись клиентов, уведомления, CRM-интеграции и база знаний для ответов ассистента."
  },
  {
    question: "С чего лучше начать внедрение?",
    answer:
      "Лучше начинать с одного измеримого сценария: квалификация заявки, запись клиента, статус заказа или FAQ поддержки. Такой MVP обычно запускается быстрее и дает данные для следующего этапа."
  },
  {
    question: "Какие кейсы есть на сайте?",
    answer:
      "На сайте есть кейсы по квалификации заявок, маршрутизации поддержки, записи на консультацию, AI-ассистенту по базе знаний, статусам заказов интернет-магазина и записи пациентов клиники."
  }
];

export const metadata: Metadata = createPageMetadata({
  title: "LeadMax - чат-боты и AI-автоматизация в MAX",
  description:
    "LeadMax разрабатывает чат-ботов, AI-ассистентов и автоматизацию бизнес-процессов в MAX: продажи, поддержка, CRM, уведомления и аналитика.",
  path: "/"
});

function serviceParagraph(services: typeof coreServices) {
  return services
    .map((service) => `${service.title}: ${service.lead}`)
    .join(" ");
}

export default function HomePage() {
  const crmAndScenarioServices = [...crmServices, ...scenarioServices];

  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />
      <Hero
        kicker="LeadMax для MAX"
        title="Чат-боты, AI-ассистенты и CRM-интеграции в MAX"
        lead="LeadMax помогает компаниям запускать рабочие сценарии в MAX: принимать заявки, отвечать клиентам, передавать данные в CRM, подключать базу знаний и снижать нагрузку на менеджеров."
        image="/images/hero-home.png"
        primaryLabel="Смотреть кейсы"
        primaryHref="/cases"
        secondaryLabel="Основная услуга"
        secondaryHref="/chat-boty-v-max"
      />

      <article>
        <Section
          eyebrow="Кратко"
          title="Что делает LeadMax"
          intro="Мы берем один понятный бизнес-процесс, описываем сценарий, собираем интеграции и доводим запуск до измеримого результата."
        >
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            <p>
              LeadMax внедряет чат-ботов в MAX для продаж, поддержки, записи клиентов и уведомлений. Бот собирает обязательные данные, передает заявки в CRM, отвечает на типовые вопросы и переводит сложные ситуации сотруднику с сохраненным контекстом.
            </p>
            <p>
              AI-ассистент LeadMax работает как слой над базой знаний: он ищет релевантные материалы, отвечает кратко по найденному контексту и не должен выдумывать факты. Если информации на сайте нет, ассистент должен честно сказать, что точного ответа нет.
            </p>
          </div>
        </Section>

        <Section className="bg-paper" eyebrow="Услуги" title="Основные услуги">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            <p>{serviceParagraph(coreServices.slice(0, 8))}</p>
            <p>
              Отраслевые услуги: {serviceParagraph(industryServices)} Интеграционные и сценарные услуги: {serviceParagraph(crmAndScenarioServices)}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {coreServices.slice(0, 8).map((service) => (
              <Link key={service.slug} href={`/${service.slug}`} className="secondary-button">
                {service.title}
              </Link>
            ))}
          </div>
        </Section>

        <Section eyebrow="Кейсы" title="Какие кейсы можно найти на сайте">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            {cases.map((caseItem) => (
              <p key={caseItem.slug}>
                <strong>{caseItem.title}.</strong> {caseItem.summary} Задача: {caseItem.task} Подробнее: <Link href={`/cases/${caseItem.slug}`}>{caseItem.title}</Link>.
              </p>
            ))}
          </div>
        </Section>

        <Section className="bg-paper" eyebrow="Цены и сроки" title="Ориентиры бюджета">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            <p>
              MVP чат-бота в MAX обычно стоит от 75 000 до 240 000 рублей в зависимости от сценария. Рабочая версия с CRM, обработкой ошибок и документацией обычно попадает в диапазон от 150 000 до 520 000 рублей. Сложный контур с AI, базой знаний, SLA и аналитикой может стоить от 300 000 до 950 000 рублей.
            </p>
            <p>
              Срок MVP обычно составляет от 5 до 20 рабочих дней. Интеграции с CRM, helpdesk, календарем, CMS или базой знаний занимают от 3 до 10 недель, потому что требуют тестового контура, правил дублей, журнала ошибок и приемки на реальных диалогах.
            </p>
          </div>
        </Section>

        <Section eyebrow="Статьи" title="Практические материалы">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            <p>
              В блоге собраны практические материалы про безопасный переход в MAX, отличие бота от обычного чата, использование MAX в продажах, CRM-интеграции и AI-ассистентов. Каждая статья помогает принять решение по внедрению, оценить ограничения и подготовить требования к проекту.
            </p>
            <p>
              {blogPosts.map((post) => `${post.title}: ${post.excerpt}`).join(" ")}
            </p>
          </div>
          <Link href="/blog" className="secondary-button mt-6 inline-flex">
            Все статьи
          </Link>
        </Section>

        <Section className="bg-paper" eyebrow="FAQ" title="Частые вопросы">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            {homeFaq.map((item) => (
              <p key={item.question}>
                <strong>{item.question}</strong> {item.answer}
              </p>
            ))}
          </div>
        </Section>
      </article>
    </>
  );
}
