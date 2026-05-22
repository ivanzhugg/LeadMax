import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBlock } from "@/components/ContactBlock";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

const breadcrumbs = [
  { name: "Главная", href: "/" },
  { name: "Контакты", href: "/contacts" }
];

export const metadata: Metadata = createPageMetadata({
  title: "Контакты для разработки ботов в MAX",
  description:
    "Оставьте заявку на разработку чат-бота, AI-ассистента или интеграции MAX с CRM. Работаем с бизнесом по всей России.",
  path: "/contacts"
});

export default function ContactsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <article>
        <Section title="Контакты и условия работы">
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            <p>
              Для обсуждения проекта LeadMax принимает описание процесса, список систем для интеграции, примеры текущих обращений и желаемый результат. Контакт для связи: {siteConfig.email}, телефон: {siteConfig.phone}.
            </p>
            <p>
              Юридическое лицо: {siteConfig.legalName}. Реквизиты: {siteConfig.inn}, {siteConfig.ogrn}. Адрес для корреспонденции: {siteConfig.address}. Условия работы: {siteConfig.workTerms}
            </p>
            <p>
              Поддержка после запуска возможна по SLA. Регламент реакции, состав сопровождения и порядок обновления сценариев фиксируются в договоре или приложении к проекту.
            </p>
          </div>
        </Section>
      </article>
      <ContactBlock title="Описать задачу для автоматизации в MAX" page="contacts" />
    </>
  );
}
