import Link from "next/link";

type HeroProps = {
  kicker: string;
  title: string;
  lead: string;
  image?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function Hero({
  kicker,
  title,
  lead,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
}: HeroProps) {
  return (
    <section className="hero-shell border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <p className="eyebrow">{kicker}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-ink md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{lead}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryHref} className="primary-button">
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link href={secondaryHref} className="secondary-button">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>

        <aside className="surface-card hero-panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">
            Проектный подход
          </p>
          <p className="mt-4 text-2xl font-bold leading-snug text-ink">
            Запускаем MAX не как отдельный чат, а как рабочий канал продаж и сервиса.
          </p>
          <div className="mt-6 grid gap-4">
            <div className="rounded-xl border border-line bg-white p-4">
              <p className="text-sm font-semibold text-ink">MVP за 5-20 рабочих дней</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Сначала запускаем один измеримый сценарий, затем добавляем интеграции и аналитику.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-white p-4">
              <p className="text-sm font-semibold text-ink">CRM, helpdesk и база знаний</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Подключаем заявки, статусы, уведомления, передачу оператору и контроль качества ответов.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
