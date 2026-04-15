import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

const breadcrumbs = [
  { name: "Главная", href: "/" },
  { name: "Условия использования", href: "/terms" }
];

export const metadata: Metadata = createPageMetadata({
  title: "Условия использования сайта",
  description: "Условия использования сайта LeadMax и материалов о разработке ботов в MAX.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Section title="Условия использования сайта">
        <div className="prose prose-lg max-w-none prose-headings:text-ink prose-p:text-muted prose-li:text-muted">
          <p>Материалы сайта предназначены для предварительного знакомства с услугами разработки чат-ботов и автоматизации в MAX.</p>
          <h2>Использование материалов</h2>
          <p>Тексты, структура страниц и визуальные материалы не являются публичным обещанием конкретного результата без отдельного договора и технического задания.</p>
          <h2>Обратная связь</h2>
          <p>Заявки через формы используются для связи с пользователем и уточнения задачи. Контакты для связи: {siteConfig.email}, {siteConfig.phone}.</p>
        </div>
      </Section>
    </>
  );
}
