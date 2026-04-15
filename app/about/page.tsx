import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBlock } from "@/components/ContactBlock";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { Stats } from "@/components/Stats";
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
      <Section
        eyebrow="О нас"
        title="Проектируем автоматизацию в MAX вокруг бизнес-процесса"
        intro="Мы соединяем продуктовый подход, backend-интеграции и аккуратный диалоговый UX, чтобы бот не был отдельной игрушкой, а работал внутри продаж, поддержки и сервиса."
      >
        <Stats
          items={[
            { value: "B2B", label: "фокус на понятных коммерческих процессах" },
            { value: "API", label: "интеграции с CRM, helpdesk и внутренними системами" },
            { value: "SEO", label: "архитектура сайта для органического роста" },
            { value: "SLA", label: "сопровождение и контроль изменений после запуска" }
          ]}
        />
      </Section>
      <Section className="bg-mist" title="Принципы работы">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Прозрачность", "Фиксируем сценарии, поля, события и ограничения до разработки."],
            ["Надежность", "Планируем ошибки интеграций, fallback и контроль дублей заранее."],
            ["Рост", "После MVP расширяем бота по данным реальных диалогов, а не по догадкам."]
          ].map(([title, text]) => (
            <div key={title} className="surface-card p-6">
              <div className="mb-5 h-px w-16 bg-gradient-to-r from-moss to-leaf" />
              <h2 className="text-xl font-bold text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>
      <ContactBlock title="Расскажите о процессе, который хотите автоматизировать" page="about" />
    </>
  );
}
