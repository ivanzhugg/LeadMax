import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Спасибо за заявку",
  description: "Заявка отправлена.",
  path: "/thanks",
  noIndex: true
});

export default function ThanksPage() {
  return (
    <Section
      eyebrow="Спасибо"
      title="Заявка отправлена"
      intro="Мы получили обращение и свяжемся с вами в рабочее время. Если вопрос срочный, продублируйте сообщение на email или телефон из раздела контактов."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/blog" className="secondary-button">
          Почитать блог
        </Link>
        <Link href="/cases" className="primary-button">
          Смотреть кейсы
        </Link>
      </div>
    </Section>
  );
}
