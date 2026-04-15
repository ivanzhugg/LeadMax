import Link from "next/link";

type CTAProps = {
  title: string;
  text: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTA({
  title,
  text,
  primaryLabel = "Обсудить проект",
  primaryHref = "/contacts",
  secondaryLabel,
  secondaryHref
}: CTAProps) {
  return (
    <section className="relative isolate overflow-hidden bg-deep py-14 text-white">
      <div className="absolute inset-0 grid-backdrop opacity-35" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.18),transparent_42%,rgba(139,124,246,0.18))]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold leading-[1.08] md:text-5xl">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-white/75">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link href={primaryHref} className="primary-button">
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="dark-button"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
