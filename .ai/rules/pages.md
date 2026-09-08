---
paths:
    - 'app/Http/Controllers/**/*.php,resources/js/pages/**/*.tsx'
---

# Pages

## Every Inertia page controller emits a seo prop via SeoMeta

Use App\Support\SeoMeta static helpers (forHome, forCategory, forArticle). The SeoHead React component renders all meta, OG, Twitter Card, canonical, robots. Articles also pass a jsonLd array from $seo->toJsonLd(). Search, static pages, paginated category: set noindex:true. No hardcoded <title> or <meta> in pages.
