# SEO Conventions

Rules for SEO-relevant code in this project. Globs target Laravel controllers, Inertia page components, and the Blade shell.

---

## Every controller method that returns an Inertia page MUST emit a `seo` prop

**Globs:** `app/Http/Controllers/**/*.php`, `resources/js/pages/**/*.tsx`

Build the array via `App\Support\SeoMeta` static helpers:

- `SeoMeta::forHome()`
- `SeoMeta::forCategory($category)`
- `SeoMeta::forArticle($article)`

Add `seo` to the `Inertia::render()` array. Set `noindex: true` for search results, static editorial pages (pedoman, tentang, karir, susunan-redaksi), and paginated category pages where the title alone is enough.

Article page also passes a `jsonLd` array — call `$seo->toJsonLd()` plus the breadcrumb JSON-LD builder.

The page component renders it via `<SeoHead seo={seo} jsonLd={jsonLd} title={seo?.title} />`. Never hardcode `<title>` or `<meta>` directly in pages.

---

## Article body MUST render server-side, not via `useEffect` + `ref.innerHTML`

**Globs:** `resources/js/pages/News/Show.tsx`, `app/Http/Controllers/NewsController.php`

Pre-split the article body in `NewsController::show()` into `body_first` / `body_second` properties (boundary at `</p>` midpoint, fallback to character midpoint). Pass both as model attributes. The React page renders both halves with `dangerouslySetInnerHTML` and injects an `<AdBanner position="in-article" />` between them.

Why: Google News crawler indexes the static HTML body for snippet extraction and topical ranking. `useEffect` + ref makes body invisible to non-JS crawlers.

If a future React 19 scheduler bug appears, fix the underlying cause — do NOT reintroduce the useEffect dodge. Track with a `ponytail:` comment if reverted.

---

## Sitemap + feed live as static files in `public/`, regenerated hourly and on Content save

**Globs:** `app/Console/Commands/WarmSeoFiles.php`, `app/Observers/ContentObserver.php`, `routes/console.php`, `app/Providers/AppServiceProvider.php`

- `php artisan seo:warm` writes `public/sitemap.xml`, `public/sitemap-news.xml`, `public/feed.xml`.
- `routes/console.php` schedules it hourly with `withoutOverlapping()->runInBackground()`.
- `ContentObserver` calls `seo:warm` on `saved` when `status`/`slug`/`published_at`/`updated_at` change or the row was just created, and on `deleted` if `status === 'published'`. The observer swallows exceptions — never break the writer flow.
- Web server serves the static files directly. `SitemapController` route remains as a fallback for when files have not been warmed yet.

News sitemap only includes articles published in the last 48 hours (Google News requirement).

---

## Tags must come from the `tags()` BelongsToMany relation, never hardcoded

**Globs:** `resources/js/pages/News/Show.tsx`, `app/Models/Content.php`, `app/Models/Tag.php`

`Content::tags()` exists on pivot `content_tags`. Page reads `article.tags` and renders each as a `<Link>` to `/search?q=<tag>`. If empty, render "Belum ada tag" placeholder — never show fake labels like `Nasional/Terkini/Pemerintah/Sorotan`. Hardcoded tags were a pre-existing SEO smell; do not reintroduce them anywhere.

---

## Canonical URL, robots, and pagination prev/next

**Globs:** `resources/js/pages/Category/Index.tsx`, `resources/js/Components/SeoHead.tsx`

`SeoHead` emits `<link rel="canonical">` from `seo.url`. Article pages emit `index,follow,max-image-preview:large,max-snippet:-1`. Search and static editorial pages emit `noindex,follow`.

`Category/Index.tsx` adds `rel="prev"` / `rel="next"` for paginated pages using the `articles.current_page` and `articles.last_page` props.

---

## Reading time and word count come from server-side `body_word_count`

**Globs:** `app/Http/Controllers/NewsController.php`, `resources/js/pages/News/Show.tsx`

`NewsController::show()` sets `article.body_word_count` (`str_word_count(strip_tags($article->body))`). Page renders `⏱️ ${ceil(words/200)} menit baca`. Never hardcode `3 menit baca`.

---

## Robots, sitemap pointers, RSS auto-discovery

**Globs:** `public/robots.txt`, `resources/views/app.blade.php`

`public/robots.txt` allows `/`, disallows `/search` and `/api/`, and lists both `sitemap.xml` and `sitemap-news.xml`.

`resources/views/app.blade.php` includes global `<link rel="alternate" type="application/rss+xml">` and `<link rel="sitemap">` so RSS readers and crawlers auto-discover feed/sitemap from every page.

`app.blade.php` also sets `lang="id"`, `theme-color`, and `geo.region=ID` at the document level.
