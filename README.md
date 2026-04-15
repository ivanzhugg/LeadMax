# LeadMax Frontend

Production-ready frontend для сайта LeadMax: услуг по разработке чат-ботов, AI-ассистентов и автоматизации в мессенджере MAX для бизнеса в России.

Проект собран на Next.js App Router с SEO-first архитектурой: основной контент рендерится на сервере, коммерческие страницы имеют отдельные URL, metadata, canonical, хлебные крошки, JSON-LD и внутреннюю перелинковку.

## Стек

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Server Components по умолчанию
- Server Action для отправки заявки в FastAPI
- Локальные TS-данные без CMS
- Минимум клиентского JavaScript

## Структура

```text
app/
  (services)/[slug]/page.tsx  # SEO-шаблон service pages
  blog/[slug]/page.tsx        # SEO-шаблон статей
  cases/[slug]/page.tsx       # SEO-шаблон кейсов
  contacts/page.tsx
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
data/
  blog.ts
  cases.ts
  services.ts
  site.ts
lib/
  api.ts
  schema.ts
  seo.ts
types/
public/images/
```

## Запуск

```bash
npm install
npm run dev
```

Production build:

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

## Переменные окружения

Создайте `.env.local` на основе `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://example.ru
NEXT_PUBLIC_API_BASE_URL=https://api.example.ru
```

`NEXT_PUBLIC_SITE_URL` используется для canonical, sitemap, robots и JSON-LD.

`NEXT_PUBLIC_API_BASE_URL` используется server action для отправки заявок в FastAPI. По умолчанию frontend отправляет `POST {NEXT_PUBLIC_API_BASE_URL}/leads`.

Ожидаемый payload:

```json
{
  "name": "Имя",
  "phone": "+7 000 000-00-00",
  "email": "name@company.ru",
  "company": "Компания",
  "message": "Описание задачи",
  "page": "service:chat-boty-v-max"
}
```

Если backend временно недоступен, форма показывает понятную ошибку и не ломает страницу. Если API URL не задан, включается демо-режим успешной отправки, чтобы frontend можно было проверить без backend.

## Как редактировать контент

Основное наполнение вынесено в JSON:

- `content/site.json` - бренд, контакты, меню, юридический блок.
- `content/services.json` - услуги, отраслевые посадочные, CRM-интеграции и сценарии.
- `content/cases.json` - кейсы.
- `content/blog.json` - статьи.

Подробная инструкция лежит в `content/README.md`.

## Как добавлять service pages

1. Откройте `content/services.json`.
2. Добавьте объект `ServicePage` со slug на латинице в нижнем регистре.
3. Заполните уникальные `metaTitle`, `metaDescription`, `h1`, `lead`, `intro`, `audience`, `tasks`, `features`, `process`, `examples`, `faq`, `relatedSlugs`, `caseSlugs`.
4. Добавьте изображение `public/images/service-{slug}.png` или укажите `"image": "/images/hero-home.png"`.

Страница появится автоматически по адресу `/{slug}`, попадет в sitemap, получит canonical, Service schema, FAQPage schema и breadcrumb.

## Как добавлять кейсы

1. Откройте `content/cases.json`.
2. Добавьте объект `CaseItem`.
3. В `serviceSlugs` укажите услуги, к которым относится кейс.

Кейс появится в `/cases`, будет доступен по `/cases/{slug}` и автоматически попадет в sitemap.

## Как добавлять статьи

1. Откройте `content/blog.json`.
2. Добавьте объект `BlogPost`.
3. В `sections` задайте серверно рендеримый контент и id для оглавления.
4. В `serviceSlugs` и `relatedSlugs` задайте внутреннюю перелинковку.

Статья появится в `/blog`, будет доступна по `/blog/{slug}`, получит Article schema, breadcrumbs и sitemap URL.

## SEO-решения

- Главная, service pages, кейсы, блог, контакты, about и юридические страницы индексируются.
- `/thanks` помечена `noindex` и не добавляется в sitemap, потому что это техническая страница после отправки формы.
- `/api` закрыт в `robots.ts`.
- `privacy-policy`, `terms` и `offer` оставлены индексируемыми как trust-сигналы для коммерческого сайта. При необходимости их можно исключить из `app/sitemap.ts` и пометить `noIndex`.
- JSON-LD вынесен в `lib/schema.ts`: Organization, WebSite, BreadcrumbList, Service, FAQPage, Article.
- Metadata собирается через `lib/seo.ts`, чтобы canonical и OG формировались единообразно.

## Производительность

- Основные страницы рендерятся server-side/static.
- Контент хранится локально и сразу виден в HTML.
- Client Component используется только для формы заявки.
- Изображения локальные и подключены через `next/image`.
- Нет тяжелых UI-фреймворков, видео и анимационных библиотек.

## Docker

```bash
docker build -t leadmax-frontend .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://example.ru \
  -e NEXT_PUBLIC_API_BASE_URL=https://api.example.ru \
  leadmax-frontend
```

## Деплой

Подходит для Vercel, Docker, VPS или любой платформы, где можно запустить Next.js standalone/server build.

Перед production:

```bash
npm run content:validate
npm run typecheck
npm run lint
npm run build
```

Проверьте:

- корректный `NEXT_PUBLIC_SITE_URL`;
- доступность FastAPI endpoint `/leads`;
- реальные реквизиты в `data/site.ts`;
- юридические тексты в `privacy-policy`, `terms`, `offer`;
- изображения для новых service pages.
