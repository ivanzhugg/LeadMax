import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope"
});

const widgetUrl =
  process.env.NEXT_PUBLIC_AI_CHAT_WIDGET_URL || "http://localhost:8000/ai-chat-widget.js";
const widgetBackendUrl =
  process.env.NEXT_PUBLIC_AI_CHAT_BACKEND_URL || "http://localhost:8000";
const widgetDesignId = process.env.NEXT_PUBLIC_AI_CHAT_DESIGN_ID || "1";
const widgetAssistantName = process.env.NEXT_PUBLIC_AI_CHAT_ASSISTANT_NAME || "Ассистент LeadMax";
const widgetWelcomeMessage =
  process.env.NEXT_PUBLIC_AI_CHAT_WELCOME_MESSAGE ||
  "Здравствуйте! Я AI-ассистент LeadMax. Могу кратко рассказать об услугах, кейсах, ценах и сроках.";
const widgetInputPlaceholder =
  process.env.NEXT_PUBLIC_AI_CHAT_INPUT_PLACEHOLDER || "Спросите про услуги или кейсы";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Чат-боты и AI-автоматизация в MAX для бизнеса",
    template: "%s | LeadMax"
  },
  description:
    "Разработка чат-ботов, AI-ассистентов и автоматизации в мессенджере MAX: CRM-интеграции, продажи, поддержка, уведомления.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: "Чат-боты и AI-автоматизация в MAX для бизнеса",
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/images/og-cover.png"),
        width: 1200,
        height: 630,
        alt: "LeadMax"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Чат-боты и AI-автоматизация в MAX для бизнеса",
    description: siteConfig.description,
    images: [absoluteUrl("/images/og-cover.png")]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="font-sans antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main>{children}</main>
        <Footer />
        <Script
          src={widgetUrl}
          strategy="afterInteractive"
          data-backend-url={widgetBackendUrl}
          data-design-id={widgetDesignId}
          data-assistant-name={widgetAssistantName}
          data-welcome-message={widgetWelcomeMessage}
          data-input-placeholder={widgetInputPlaceholder}
        />
      </body>
    </html>
  );
}
