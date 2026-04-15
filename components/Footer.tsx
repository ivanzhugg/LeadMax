import Link from "next/link";
import { footerServices, legalLinks, mainNav, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <Link href="/" className="text-xl font-bold">
            LeadMax
          </Link>
          <p className="mt-4 text-sm leading-6 text-white/75">{siteConfig.description}</p>
          <p className="mt-4 text-sm text-white/75">{siteConfig.region}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase text-white/60">Навигация</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase text-white/60">Услуги</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {footerServices.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase text-white/60">Документы</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-white/70">{siteConfig.inn}</p>
          <p className="mt-1 text-sm text-white/70">{siteConfig.ogrn}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-sm text-white/60 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. Все права защищены.</p>
          <p>{siteConfig.email} · {siteConfig.phone}</p>
        </div>
      </div>
    </footer>
  );
}
