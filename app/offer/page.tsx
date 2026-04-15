import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

const breadcrumbs = [
  { name: "Главная", href: "/" },
  { name: "Оферта", href: "/offer" }
];

export const metadata: Metadata = createPageMetadata({
  title: "Оферта и порядок работы",
  description: "Базовые условия оказания услуг по разработке чат-ботов, AI-ассистентов и автоматизации в MAX.",
  path: "/offer"
});

export default function OfferPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Section title="Оферта и порядок работы" intro="Страница подготовлена как основа для юридической версии оферты. Перед публикацией условия нужно согласовать с юристом.">
        <div className="prose prose-lg max-w-none prose-headings:text-ink prose-p:text-muted prose-li:text-muted">
          <h2>Предмет работ</h2>
          <p>{siteConfig.legalName} оказывает услуги по проектированию, разработке и сопровождению чат-ботов, AI-ассистентов, интеграций и frontend-решений.</p>
          <h2>Этапы</h2>
          <ul>
            <li>Сбор требований и подготовка состава работ.</li>
            <li>Согласование сценариев, интеграций и сроков.</li>
            <li>Разработка, тестирование, приемка и запуск.</li>
          </ul>
          <h2>SLA и поддержка</h2>
          <p>{siteConfig.support}. Конкретные сроки реакции и объем поддержки фиксируются в договоре или приложении.</p>
        </div>
      </Section>
    </>
  );
}
