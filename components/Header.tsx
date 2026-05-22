import Link from "next/link";
import { mainNav } from "@/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-bold text-ink" aria-label="LeadMax">
          <span className="grid size-9 place-items-center rounded-xl bg-deep text-sm text-white shadow-glow">
            LM
          </span>
          <span className="text-lg">LeadMax</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-moss">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contacts"
            className="rounded-xl bg-deep px-4 py-2 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 hover:bg-ink"
          >
            Обсудить проект
          </Link>
        </div>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-xl border border-line bg-white/75 px-3 py-2 text-sm font-semibold text-ink">
            Меню
          </summary>
          <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-line bg-paper p-3 shadow-soft">
            <nav className="grid gap-2">
              {mainNav.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm text-ink">
                  {item.label}
                </Link>
              ))}
              <Link href="/contacts" className="rounded-xl bg-deep px-3 py-2 text-sm font-semibold text-white">
                Обсудить проект
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
