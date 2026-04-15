import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

const breadcrumbs = [
  { name: "Главная", href: "/" },
  { name: "Политика конфиденциальности", href: "/privacy-policy" }
];

export const metadata: Metadata = createPageMetadata({
  title: "Политика конфиденциальности",
  description: "Политика обработки персональных данных на сайте LeadMax.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <Section title="Политика конфиденциальности" intro="Документ-заготовка для дальнейшей юридической адаптации под реквизиты компании и реальные процессы обработки данных.">
        <div className="prose prose-lg max-w-none prose-headings:text-ink prose-p:text-muted prose-li:text-muted">
          <h2>1. Общие положения</h2>
          <p>{siteConfig.legalName} обрабатывает данные, которые пользователь передает через формы сайта, email или мессенджеры, чтобы ответить на обращение и подготовить предложение.</p>
          <h2>2. Какие данные обрабатываются</h2>
          <p>Имя, телефон, email, компания, содержание обращения, технические данные о странице отправки и иные сведения, которые пользователь добровольно указывает в заявке.</p>
          <h2>3. Цели обработки</h2>
          <ul>
            <li>Ответ на заявку и коммуникация по проекту.</li>
            <li>Подготовка коммерческого предложения.</li>
            <li>Улучшение качества сайта и клиентских сценариев.</li>
          </ul>
          <h2>4. Контакты</h2>
          <p>По вопросам обработки данных можно написать на {siteConfig.email}.</p>
        </div>
      </Section>
    </>
  );
}
