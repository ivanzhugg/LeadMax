import Link from "next/link";
import { footerServices, mainNav, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-deep text-white">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Link href="/" className="text-xl font-bold">
            LeadMax
          </Link>
          <p className="mt-4 text-sm leading-6 text-white/75">{siteConfig.description}</p>
          <p className="mt-4 text-sm leading-6 text-white/75">
            {siteConfig.region}. Контакты: {siteConfig.email}, {siteConfig.phone}.
          </p>
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
          <h2 className="text-sm font-semibold uppercase text-white/60">Ключевые услуги</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {footerServices.slice(0, 6).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 text-sm text-white/60 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. Все права защищены.</p>
          <p>{siteConfig.inn} · {siteConfig.ogrn}</p>
        </div>
      </div>
    </footer>
  );
}
