import casesJson from "@/content/cases.json";
import type { CaseItem } from "@/types/content";

export const cases = casesJson as CaseItem[];

export function getCaseBySlug(slug: string) {
  return cases.find((caseItem) => caseItem.slug === slug);
}

export function getCasesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getCaseBySlug(slug))
    .filter((caseItem): caseItem is CaseItem => Boolean(caseItem));
}
