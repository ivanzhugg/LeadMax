import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CaseCard } from "@/components/CaseCard";
import { ContactBlock } from "@/components/ContactBlock";
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
      <Section
        eyebrow="Кейсы"
        title="Практические сценарии автоматизации в MAX"
        intro="Здесь собраны типовые примеры, которые можно адаптировать под отрасль, CRM, команду и текущие ограничения бизнеса."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {cases.map((caseItem) => (
            <CaseCard key={caseItem.slug} caseItem={caseItem} />
          ))}
        </div>
      </Section>
      <ContactBlock title="Подберем сценарий под вашу нишу" page="cases" />
    </>
  );
}
