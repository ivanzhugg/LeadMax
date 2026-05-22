import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { breadcrumbSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

const breadcrumbs = [
  { name: "Главная", href: "/" },
  { name: "О нас", href: "/about" }
];

export const metadata: Metadata = createPageMetadata({
  title: "О компании LeadMax",
  description:
    "LeadMax разрабатывает чат-ботов, AI-ассистентов и интеграции для MAX. Проектирование процессов, backend-интеграции и поддержка.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
      <article>
        <Section
          eyebrow="О нас"
          title="LeadMax проектирует автоматизацию в MAX вокруг бизнес-процесса"
        >
          <div className="prose prose-lg max-w-none prose-p:text-muted">
            <p>
              LeadMax делает чат-ботов, AI-ассистентов и интеграции для MAX. Главный принцип работы: сначала описывается процесс, данные, ответственные роли и метрика результата, затем проектируется сценарий диалога и backend-интеграции.
            </p>
            <p>
              Команда фокусируется на B2B-процессах, CRM, helpdesk, записи клиентов, уведомлениях и базах знаний. Проект считается готовым не после красивого интерфейса, а после тестовых диалогов, записи данных в нужную систему, обработки ошибок и передачи документации.
            </p>
            <p>
              После MVP LeadMax рекомендует наблюдать реальные диалоги минимум две недели. По ним видно, какие вопросы повторяются, где пользователи бросают сценарий, какие ответы нужно добавить в базу знаний и какие интеграции требуют доработки.
            </p>
          </div>
        </Section>
      </article>
    </>
  );
}
