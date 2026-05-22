export type FaqItem = {
  question: string;
  answer: string;
};

export type LinkItem = {
  label: string;
  href: string;
  description?: string;
};

export type ProcessStep = {
  title: string;
  text: string;
};

export type ContentListBlock = {
  title: string;
  text: string;
  items: string[];
};

export type LegalSupportBlock = ContentListBlock;

export type MetricItem = {
  label: string;
  value: string;
  text: string;
};

export type ServicePage = {
  category?: "core" | "industry" | "crm" | "scenario" | "custom";
  image?: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  kicker: string;
  intro: string[];
  audience: string[];
  tasks: string[];
  features: string[];
  process: ProcessStep[];
  examples: string[];
  faq: FaqItem[];
  relatedSlugs: string[];
  caseSlugs: string[];
  primaryCta: string;
  secondaryCta: string;
  pricing?: ContentListBlock;
  packages?: ContentListBlock[];
  timeline?: ContentListBlock;
  deliverables?: string[];
  clientInputs?: string[];
  risks?: string[];
  supportOptions?: string[];
  guarantees?: string[];
  commercialNotes?: string[];
  ragBlocks?: ContentListBlock[];
  legalSupport?: LegalSupportBlock;
};

export type CaseItem = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  industry: string;
  task: string;
  solution: string[];
  stack: string[];
  result: string[];
  clientProfile?: string;
  baseline?: string;
  implementation?: string[];
  metrics?: MetricItem[];
  timeline?: string;
  budget?: string;
  constraints?: string[];
  assistantQuestions?: FaqItem[];
  serviceSlugs: string[];
  summary: string;
  updatedAt: string;
};

export type BlogSection = {
  id: string;
  title: string;
  body: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  updatedAt: string;
  readingTime: string;
  serviceSlugs: string[];
  relatedSlugs: string[];
  sections: BlogSection[];
};

export type SiteConfig = {
  name: string;
  legalName: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  address: string;
  region: string;
  inn: string;
  ogrn: string;
  support: string;
  workTerms: string;
  social: {
    max: string;
    telegram: string;
  };
};

export type SiteContent = {
  siteConfig: SiteConfig;
  mainNav: LinkItem[];
  footerServices: LinkItem[];
  legalLinks: LinkItem[];
  legalSupport: LegalSupportBlock;
};

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export type LeadFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  message?: string;
  page?: string;
};
