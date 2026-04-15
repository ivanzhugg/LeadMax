import type { FaqItem } from "@/types/content";

type FAQProps = {
  items: FaqItem[];
};

export function FAQ({ items }: FAQProps) {
  return (
    <div className="surface-card divide-y divide-line/80 overflow-hidden">
      {items.map((item) => (
        <details key={item.question} className="group p-6 open:bg-mist/50">
          <summary className="cursor-pointer list-none text-lg font-semibold text-ink marker:hidden">
            {item.question}
          </summary>
          <p className="mt-3 text-base leading-7 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
