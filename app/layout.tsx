import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
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
      </body>
    </html>
  );
}
