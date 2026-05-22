import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { cases } from "@/data/cases";
import { breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

const breadcrumbs = [
  { name: "Главная", href: "/" },
  { name: "Кейсы", href: "/cases" }
];

export const metadata: Metadata = createPageMetadata({
  title: "Кейсы автоматизации и чат-ботов в MAX",
  description:
    "Примеры внедрения ботов в MAX: квалификация заявок, поддержка, запись на консультации, CRM-интеграции и уведомления.",
  path: "/cases"
});

export default function CasesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <article>
        <Section
          eyebrow="Кейсы"
          title="Практические сценарии автоматизации в MAX"
          intro="Здесь собраны проекты с понятной задачей, решением, стеком и результатом. По ним удобно оценить, какие сценарии подходят для продаж, поддержки, записи клиентов и внутренних процессов."
        >
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            {cases.map((caseItem) => (
              <p key={caseItem.slug}>
                <strong>{caseItem.title}.</strong> Ниша: {caseItem.industry}. {caseItem.summary} Задача: {caseItem.task} Решение: {caseItem.solution.join(" ")} Результат: {caseItem.result.join(" ")} Подробнее: <Link href={`/cases/${caseItem.slug}`}>{caseItem.title}</Link>.
              </p>
            ))}
          </div>
        </Section>
      </article>
    </>
  );
}
