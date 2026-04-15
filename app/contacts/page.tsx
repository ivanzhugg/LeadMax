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
      <ContactBlock title="Контакты и заявка на автоматизацию в MAX" page="contacts" />
      <Section title="Реквизиты и условия работы" className="bg-mist">
        <dl className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="surface-card p-5">
            <dt className="font-semibold text-ink">Юрлицо</dt>
            <dd className="mt-2 text-sm text-muted">{siteConfig.legalName}</dd>
          </div>
          <div className="surface-card p-5">
            <dt className="font-semibold text-ink">Реквизиты</dt>
            <dd className="mt-2 text-sm text-muted">{siteConfig.inn}, {siteConfig.ogrn}</dd>
          </div>
          <div className="surface-card p-5">
            <dt className="font-semibold text-ink">Адрес</dt>
            <dd className="mt-2 text-sm text-muted">{siteConfig.address}</dd>
          </div>
          <div className="surface-card p-5">
            <dt className="font-semibold text-ink">Условия</dt>
            <dd className="mt-2 text-sm text-muted">{siteConfig.workTerms}</dd>
          </div>
        </dl>
      </Section>
    </>
  );
}
