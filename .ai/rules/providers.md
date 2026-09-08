---
paths:
    - 'app/Console/Commands/WarmSeoFiles.php,app/Observers/ContentObserver.php,routes/console.php,app/Providers/AppServiceProvider.php,public/robots.txt'
---

# Providers

## Sitemap and feed live as static files, warmed hourly and on Content save

php artisan seo:warm writes public/sitemap.xml, public/sitemap-news.xml (only articles published within last 48h), public/feed.xml. Scheduled hourly via Schedule::command('seo:warm')->hourly()->withoutOverlapping()->runInBackground(). ContentObserver triggers seo:warm on saved when relevant fields changed and on deleted if status=published; observer swallows exceptions so writer flow never breaks. public/robots.txt disallows /search and /api/, declares both sitemaps.
