import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  kicker: string;
  title: string;
  lead: string;
  image: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function Hero({
  kicker,
  title,
  lead,
  image,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-white">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.96),rgba(15,23,42,0.82)_48%,rgba(15,23,42,0.40))]" />
      <div className="absolute inset-0 grid-backdrop opacity-45" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-paper to-transparent" />

      <div className="pointer-events-none absolute right-[6%] top-[18%] hidden w-[440px] lg:block">
        <div className="dark-surface rounded-lg p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-sm font-semibold text-white">LeadMax Flow</span>
            <span className="rounded-md bg-moss/10 px-2.5 py-1 text-xs font-semibold text-moss">
              live system
            </span>
          </div>
          <div className="mt-5 grid gap-3">
            {[
              ["MAX", "Входящие диалоги и заявки", "text-moss"],
              ["AI", "Квалификация, ответы, резюме", "text-leaf"],
              ["CRM", "Сделки, задачи, SLA", "text-sun"]
            ].map(([label, text, color], index) => (
              <div key={label} className="relative rounded-lg border border-white/10 bg-white/[0.06] p-4">
                {index < 2 && <span className="absolute -bottom-3 left-8 h-3 w-px bg-moss/50" />}
                <div className="flex items-center gap-3">
                  <span className={`grid size-10 place-items-center rounded-md bg-white/[0.08] text-sm font-bold ${color}`}>
                    {label}
                  </span>
                  <span className="text-sm text-white/75">{text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-white/60">
            <span className="rounded-md border border-white/10 py-2">webhooks</span>
            <span className="rounded-md border border-white/10 py-2">RAG</span>
            <span className="rounded-md border border-white/10 py-2">analytics</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[660px] max-w-7xl items-center px-4 py-16 sm:px-6 md:min-h-[76vh] lg:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow text-sun">{kicker}</p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">{lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="primary-button"
            >
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="dark-button"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
