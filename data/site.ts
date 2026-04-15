import siteJson from "@/content/site.json";
import type { SiteContent } from "@/types/content";

const siteContent = siteJson as SiteContent;

export const siteConfig = {
  ...siteContent.siteConfig,
  url: process.env.NEXT_PUBLIC_SITE_URL || siteContent.siteConfig.url
};

export const mainNav = siteContent.mainNav;

export const footerServices = siteContent.footerServices;

export const legalLinks = siteContent.legalLinks;

export const legalSupport = siteContent.legalSupport;
