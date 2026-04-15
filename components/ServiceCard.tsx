import Link from "next/link";
import type { ServicePage } from "@/types/content";

type ServiceCardProps = {
  service: ServicePage;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group surface-card p-6 transition hover:-translate-y-1 hover:border-moss/70 hover:shadow-glow">
      <div className="mb-5 flex size-11 items-center justify-center rounded-md border border-moss/20 bg-moss/10 text-sm font-bold text-moss">
        LM
      </div>
      <h3 className="text-xl font-bold text-ink">
        <Link href={`/${service.slug}`}>{service.title}</Link>
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted">{service.lead}</p>
      <Link href={`/${service.slug}`} className="mt-5 inline-flex text-sm font-semibold text-moss group-hover:text-leaf">
        Подробнее об услуге
      </Link>
    </article>
  );
}
