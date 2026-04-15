import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { CaseCard } from "@/components/CaseCard";
import { ContactBlock } from "@/components/ContactBlock";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { Stats } from "@/components/Stats";
import { blogPosts } from "@/data/blog";
import { cases } from "@/data/cases";
import { coreServices, crmServices, industryServices, scenarioServices, services } from "@/data/services";
import { legalSupport } from "@/data/site";
import { faqSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";
import type { FaqItem } from "@/types/content";

const homeFaq: FaqItem[] = [
  {
    question: "Вы делаете только frontend или самих ботов тоже?",
    answer:
      "В этом проекте сайт подготовлен как frontend. Как услуга для клиентов мы проектируем и внедряем ботов, сценарии, AI-ассистентов и интеграции с backend."
  },
  {
    question: "Можно ли подключить существующий FastAPI backend?",
    answer:
      "Да. Форма и архитектура сайта уже рассчитаны на server-side отправку данных в FastAPI endpoint через переменную окружения."
  },
  {
    question: "С чего лучше начать автоматизацию в MAX?",
    answer:
      "С одного процесса, где много повторений и понятная метрика: входящие заявки, частые вопросы, запись или статус заказа."
  },
  {
    question: "Нужен ли AI на первом этапе?",
    answer:
      "Не всегда. Часто выгоднее начать с надежных сценариев и CRM-интеграции, а AI добавить после анализа реальных диалогов."
  }
];

export const metadata: Metadata = createPageMetadata({
  title: "LeadMax - чат-боты и AI-автоматизация в MAX",
  description:
    "LeadMax разрабатывает чат-ботов, AI-ассистентов и автоматизацию бизнес-процессов в MAX: продажи, поддержка, CRM, уведомления и аналитика.",
  path: "/"
});

export default function HomePage() {
  const featuredServices = services.slice(0, 6);
  const featuredIndustryServices = industryServices.slice(0, 4);
  const featuredIntegrationServices = [...crmServices, ...scenarioServices].slice(0, 4);
  const featuredCases = cases.slice(0, 3);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />
      <Hero
        kicker="LeadMax для продаж, поддержки и сервиса"
        title="Чат-боты, AI и автоматизация в MAX для сильных бизнес-процессов"
        lead="Проектируем сценарии, интеграции с CRM, AI-ассистентов и обработку заявок в MAX так, чтобы команда быстрее отвечала клиентам, не теряла лиды и видела результат в цифрах."
        image="/images/hero-home.png"
        primaryLabel="Обсудить задачу"
        primaryHref="/contacts"
        secondaryLabel="Смотреть услуги"
        secondaryHref="/chat-boty-v-max"
      />

      <Section className="bg-paper" contentClassName="-mt-10 relative z-10">
        <Stats
          items={[
            { value: "1-2 недели", label: "на запуск MVP-сценария без сложной AI-логики" },
            { value: "CRM + MAX", label: "единая воронка вместо ручного переноса заявок" },
            { value: "SLA", label: "регламент поддержки и реакции после запуска" },
            { value: "HTML", label: "индексируемый контент для Яндекса и Google" }
          ]}
        />
      </Section>

      <Section
        eyebrow="Преимущества LeadMax"
        title="Строим не бота ради бота, а управляемую систему коммуникаций"
        intro="В основе каждого проекта - процесс, данные, интеграции и метрики. Такой подход помогает MAX стать рабочим каналом продаж, поддержки и сервиса."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Процесс до интерфейса", "Сначала описываем путь клиента и данные, которые нужны бизнесу. Потом проектируем сценарии."],
            ["Интеграции с учетом сбоев", "Закладываем повторные отправки, журнал событий и понятные ошибки, чтобы заявки не исчезали."],
            ["AI под контролем", "Ассистент отвечает в заданных рамках, использует базу знаний и передает сложные ситуации человеку."]
          ].map(([title, text]) => (
            <div key={title} className="surface-card p-6">
              <div className="mb-5 h-px w-16 bg-gradient-to-r from-moss to-leaf" />
              <h3 className="text-xl font-bold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        className="bg-mist"
        eyebrow="Что автоматизируем"
        title="Сценарии в MAX для продаж, поддержки и внутренних процессов"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Квалификация лидов и передача заявок в CRM",
            "FAQ, база знаний и передача оператору",
            "Запись на консультации, визиты и сервисные работы",
            "Уведомления о статусах, оплате и документах",
            "AI-помощник для оператора и клиента",
            "Маршрутизация обращений по отделам",
            "Контроль дублей, тегов и обязательных полей",
            "Аналитика по источникам, конверсии и SLA"
          ].map((item) => (
            <div key={item} className="surface-card p-5 text-sm font-semibold leading-6 text-ink">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        className="bg-deep text-white"
        tone="dark"
        eyebrow="CRM + AI"
        title="Интеграции, которые превращают диалог в управляемую воронку"
        intro="LeadMax связывает MAX, CRM, AI-ассистента, уведомления и аналитику в единый поток обработки обращений."
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="dark-surface rounded-lg p-6">
            <div className="grid gap-4 md:grid-cols-4">
              {[
                ["MAX", "Сообщения, заявки, статусы"],
                ["AI", "Ответы, резюме, квалификация"],
                ["CRM", "Лиды, сделки, задачи"],
                ["BI", "Конверсии, SLA, источники"]
              ].map(([title, text], index) => (
                <div key={title} className="relative rounded-lg border border-white/10 bg-white/[0.06] p-5">
                  {index < 3 && <span className="absolute right-[-18px] top-1/2 hidden h-px w-8 bg-moss/50 md:block" />}
                  <span className="text-sm font-bold text-moss">{title}</span>
                  <p className="mt-3 text-sm leading-6 text-white/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {[
              "Контроль дублей и обязательных полей перед созданием лида",
              "Fallback-сценарии, если AI не уверен или API временно недоступен",
              "Уведомления менеджеру по приоритету, срокам и статусам",
              "События аналитики для оценки канала MAX"
            ].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.06] p-5 text-sm leading-6 text-white/75">
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="services"
        eyebrow="Услуги"
        title="Отдельные посадочные страницы под разные интенты"
        intro="Так поисковик видит не один общий лендинг, а конкретные страницы под коммерческие запросы."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(coreServices.length > 0 ? coreServices.slice(0, 6) : featuredServices).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <Link href="/chat-bot-pod-klyuch-v-max" className="mt-8 inline-flex rounded-md border border-moss px-5 py-3 text-sm font-semibold text-moss hover:bg-moss hover:text-white">
          Смотреть формат под ключ
        </Link>
      </Section>

      {featuredIndustryServices.length > 0 && (
        <Section
          className="bg-paper"
          eyebrow="Отраслевые решения"
          title="Посадочные страницы под ниши и длинные коммерческие запросы"
          intro="Эти страницы можно быстро расширять в JSON: добавлять отрасли, сценарии, FAQ, кейсы и перелинковку без правки шаблонов."
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featuredIndustryServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Section>
      )}

      {featuredIntegrationServices.length > 0 && (
        <Section
          eyebrow="CRM и сценарии"
          title="Страницы под интеграции, запись, уведомления и отдельные процессы"
          intro="Для SEO-роста удобно добавлять отдельные страницы под Битрикс24, amoCRM, запись клиентов, уведомления и другие точные интенты."
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featuredIntegrationServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Section>
      )}

      <Section
        className="bg-paper"
        eyebrow="Кейсы"
        title="Примеры сценариев, которые можно адаптировать под вашу нишу"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredCases.map((caseItem) => (
            <CaseCard key={caseItem.slug} caseItem={caseItem} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Внедрение"
        title="Как проходит запуск"
        intro="Двигаемся короткими этапами, чтобы быстро получить рабочий сценарий и не потерять контроль над интеграциями."
      >
        <ProcessSteps
          steps={[
            {
              title: "Аудит",
              text: "Разбираем входящие обращения, CRM, частые вопросы и точки ручной работы."
            },
            {
              title: "Проектирование",
              text: "Готовим карту диалогов, роли, данные, статусы, fallback и события аналитики."
            },
            {
              title: "Разработка",
              text: "Подключаем MAX, FastAPI backend, CRM, уведомления и тестовый контур."
            },
            {
              title: "Запуск",
              text: "Проверяем реальные сценарии, документируем систему и улучшаем по данным."
            }
          ]}
        />
      </Section>

      <Section className="bg-deep text-white" tone="dark" eyebrow="Правовой контур" title={legalSupport.title} intro={legalSupport.text}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {legalSupport.items.map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/[0.06] p-5 text-sm leading-6 text-white/75">
              {item}
            </div>
          ))}
        </div>
        <Link href="/blog/bezopasnyy-perehod-v-max-yuridicheskoe-soprovozhdenie" className="mt-8 inline-flex rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-moss hover:text-moss">
          Подробнее о безопасном переходе
        </Link>
      </Section>

      <Section className="bg-mist" eyebrow="Блог" title="Материалы для роста органического трафика">
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Частые вопросы">
        <FAQ items={homeFaq} />
      </Section>

      <CTA
        title="Начнем с процесса, где автоматизация окупится быстрее"
        text="Опишите текущий поток обращений в MAX или план запуска. Подскажем, какой сценарий лучше сделать первым."
        primaryLabel="Оставить заявку"
        primaryHref="/contacts"
        secondaryLabel="Изучить кейсы"
        secondaryHref="/cases"
      />

      <ContactBlock page="home" />
    </>
  );
}
