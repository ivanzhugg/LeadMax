import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  tone?: "light" | "dark";
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  contentClassName,
  tone = "light"
}: SectionProps) {
  const isDark = tone === "dark";

  return (
    <section id={id} className={cn("border-b border-line/70 py-10 md:py-14", className)}>
      <div className={cn("mx-auto max-w-5xl px-4 sm:px-6 lg:px-8", contentClassName)}>
        {(eyebrow || title || intro) && (
          <div className="mb-7 max-w-3xl">
            {eyebrow && (
              <p className="eyebrow mb-3">{eyebrow}</p>
            )}
            {title && (
              <h2 className={cn("text-2xl font-bold leading-tight md:text-4xl", isDark ? "text-white" : "text-ink")}>
                {title}
              </h2>
            )}
            {intro && (
              <p className={cn("mt-4 text-lg leading-8", isDark ? "text-white/75" : "text-muted")}>
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
