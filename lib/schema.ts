import { cases } from "@/data/cases";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";
import type { BlogPost, BreadcrumbItem, FaqItem, ServicePage } from "@/types/content";

type JsonLdObject = Record<string, unknown>;

export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: absoluteUrl("/"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "RU",
      addressLocality: "Москва",
      streetAddress: siteConfig.address
    },
    areaServed: "RU",
    sameAs: []
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    inLanguage: "ru-RU"
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href)
    }))
  };
}

export function faqSchema(faq: FaqItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function serviceSchema(service: ServicePage): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: absoluteUrl("/")
    },
    areaServed: {
      "@type": "Country",
      name: "Россия"
    },
    url: absoluteUrl(`/${service.slug}`),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги автоматизации в MAX",
      itemListElement: service.features.map((feature) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feature
        }
      }))
    }
  };
}

export function articleSchema(post: BlogPost): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    dateModified: post.updatedAt,
    datePublished: post.updatedAt,
    inLanguage: "ru-RU",
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName
    }
  };
}

export function caseBreadcrumbItems(slug?: string): BreadcrumbItem[] {
  const items = [
    { name: "Главная", href: "/" },
    { name: "Кейсы", href: "/cases" }
  ];
  const caseItem = slug ? cases.find((item) => item.slug === slug) : undefined;
  return caseItem ? [...items, { name: caseItem.title, href: `/cases/${caseItem.slug}` }] : items;
}
