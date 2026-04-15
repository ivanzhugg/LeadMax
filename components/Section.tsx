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
    <section id={id} className={cn("relative overflow-hidden py-16 md:py-24", className)}>
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", contentClassName)}>
        {(eyebrow || title || intro) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow && (
              <p className="eyebrow mb-3">{eyebrow}</p>
            )}
            {title && (
              <h2 className={cn("text-3xl font-bold leading-[1.08] md:text-5xl", isDark ? "text-white" : "text-ink")}>
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
