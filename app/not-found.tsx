import Link from "next/link";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section
      eyebrow="404"
      title="Страница не найдена"
      intro="Возможно, адрес изменился или страница еще не опубликована."
    >
      <Link href="/" className="primary-button">
        На главную
      </Link>
    </Section>
  );
}
