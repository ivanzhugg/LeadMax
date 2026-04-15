import Link from "next/link";
import type { CaseItem } from "@/types/content";
import { getRelatedServices } from "@/data/services";

type CaseCardProps = {
  caseItem: CaseItem;
};

export function CaseCard({ caseItem }: CaseCardProps) {
  const relatedServices = getRelatedServices(caseItem.serviceSlugs).slice(0, 2);

  return (
    <article className="surface-card p-6 transition hover:-translate-y-1 hover:border-leaf/50">
      <p className="text-sm font-semibold text-leaf">{caseItem.industry}</p>
      <h3 className="mt-3 text-xl font-bold text-ink">
        <Link href={`/cases/${caseItem.slug}`}>{caseItem.title}</Link>
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted">{caseItem.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {relatedServices.map((service) => (
          <Link
            key={service.slug}
            href={`/${service.slug}`}
            className="rounded-md border border-moss/20 bg-moss/10 px-3 py-1 text-xs font-semibold text-moss"
          >
            {service.title}
          </Link>
        ))}
      </div>
      <Link href={`/cases/${caseItem.slug}`} className="mt-5 inline-flex text-sm font-semibold text-moss">
        Читать кейс
      </Link>
    </article>
  );
}
