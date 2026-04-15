import servicesJson from "@/content/services.json";
import type { ServicePage } from "@/types/content";

export const services = servicesJson as ServicePage[];

export const coreServices = services.filter((service) => service.category === "core");

export const industryServices = services.filter((service) => service.category === "industry");

export const crmServices = services.filter((service) => service.category === "crm");

export const scenarioServices = services.filter((service) => service.category === "scenario");

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slugs: string[]) {
  return slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is ServicePage => Boolean(service));
}
