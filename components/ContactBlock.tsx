import { siteConfig } from "@/data/site";
import { LeadForm } from "@/components/LeadForm";

type ContactBlockProps = {
  title?: string;
  page?: string;
};

export function ContactBlock({ title = "Обсудим задачу в MAX", page = "site" }: ContactBlockProps) {
  return (
    <section className="relative overflow-hidden bg-paper py-16 md:py-24">
      <div className="absolute inset-0 grid-backdrop opacity-35" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
        <div className="relative">
          <p className="eyebrow">Контакты</p>
          <h2 className="mt-3 text-3xl font-bold leading-[1.08] text-ink md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            Опишите процесс, который хотите автоматизировать. Вернемся с вопросами, оценкой сложности и ближайшим разумным шагом.
          </p>
          <dl className="mt-8 grid gap-4 text-sm text-ink sm:grid-cols-2">
            <div className="surface-card p-5">
              <dt className="font-semibold">Email</dt>
              <dd className="mt-2 text-muted">{siteConfig.email}</dd>
            </div>
            <div className="surface-card p-5">
              <dt className="font-semibold">Телефон</dt>
              <dd className="mt-2 text-muted">{siteConfig.phone}</dd>
            </div>
            <div className="surface-card p-5">
              <dt className="font-semibold">Регион</dt>
              <dd className="mt-2 text-muted">{siteConfig.region}</dd>
            </div>
            <div className="surface-card p-5">
              <dt className="font-semibold">Поддержка</dt>
              <dd className="mt-2 text-muted">{siteConfig.support}</dd>
            </div>
          </dl>
        </div>
        <LeadForm page={page} />
      </div>
    </section>
  );
}
