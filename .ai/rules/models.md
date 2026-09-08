---
paths:
  - 'resources/js/pages/**/*.tsx,resources/js/Components/SeoHead.tsx,app/Models/Content.php,app/Models/Tag.php'
---

# Models

## Tags use real BelongsToMany, never hardcoded; canonical/prev-next/og-image always present
Content::tags() relation over content_tags pivot. Show.tsx renders article.tags as Link to /search?q=. Empty → "Belum ada tag". SeoHead always emits canonical from seo.url. og:image requires width=1200 height=630. Category paginated pages emit rel=prev/next from current_page/last_page.
