<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Content;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class WarmSeoFiles extends Command
{
    protected $signature = 'seo:warm {--force : Overwrite existing files without prompting}';

    protected $description = 'Regenerate static sitemap, news-sitemap, and RSS feed files in public/';

    /**
     * ponytail: writes to public/ so web server serves them without DB hit.
     * If a fetch fails or DB is down, the previous file is left untouched.
     */
    public function handle(): int
    {
        $now = now()->toAtomString();
        $siteName = (string) config('app.name', 'MyNews');
        $base = url('/');

        $staticUrls = [
            ['loc' => $base.'/', 'priority' => '1.0', 'changefreq' => 'hourly', 'lastmod' => $now],
            ['loc' => route('page.pedoman-media', [], false), 'priority' => '0.3', 'changefreq' => 'monthly', 'lastmod' => $now],
            ['loc' => route('page.tentang-kami', [], false), 'priority' => '0.5', 'changefreq' => 'monthly', 'lastmod' => $now],
            ['loc' => route('page.susunan-redaksi', [], false), 'priority' => '0.5', 'changefreq' => 'monthly', 'lastmod' => $now],
            ['loc' => route('page.karir', [], false), 'priority' => '0.4', 'changefreq' => 'monthly', 'lastmod' => $now],
        ];

        $categories = Category::all(['slug', 'updated_at']);
        $categoryUrls = $categories->map(fn ($c) => [
            'loc' => route('category.index', ['slug' => $c->slug], false),
            'lastmod' => $c->updated_at?->toAtomString() ?: $now,
            'priority' => '0.7',
            'changefreq' => 'daily',
        ])->all();

        $articles = Content::where('status', 'published')
            ->latest('published_at')
            ->limit(2000)
            ->get(['slug', 'updated_at', 'published_at']);

        $articleUrls = $articles->map(fn ($a) => [
            'loc' => route('news.show', ['slug' => $a->slug], false),
            'lastmod' => $a->updated_at?->toAtomString() ?: $a->published_at?->toAtomString() ?: $now,
            'priority' => '0.8',
            'changefreq' => 'weekly',
        ])->all();

        $urls = array_merge($staticUrls, $categoryUrls, $articleUrls);
        $sitemapXml = $this->renderSitemap($urls);

        $newsArticles = Content::with(['author', 'category'])
            ->where('status', 'published')
            ->where('published_at', '>=', now()->subDays(2))
            ->latest('published_at')
            ->limit(1000)
            ->get();

        $newsItems = $newsArticles->map(fn ($a) => [
            'loc' => route('news.show', ['slug' => $a->slug], false),
            'publication_date' => $a->published_at?->toW3cString(),
            'title' => $a->title,
            'keywords' => $a->category?->name,
        ])->all();

        $newsXml = $this->renderNewsSitemap($newsItems, $siteName);

        $feedArticles = Content::with(['author', 'category'])
            ->where('status', 'published')
            ->latest('published_at')
            ->limit(50)
            ->get();

        $feedItems = $feedArticles->map(fn ($a) => [
            'title' => $a->title,
            'link' => route('news.show', ['slug' => $a->slug], false),
            'guid' => route('news.show', ['slug' => $a->slug], false),
            'pubDate' => $a->published_at?->toRfc2822String(),
            'description' => $a->excerpt ?: $a->sub_title,
            'category' => $a->category?->name,
            'author' => $a->author?->name,
        ])->all();

        $feedXml = $this->renderFeed($feedItems, $siteName, $base, now()->toRfc2822String());

        $written = $this->writeFile('sitemap.xml', $sitemapXml)
            | $this->writeFile('sitemap-news.xml', $newsXml)
            | $this->writeFile('feed.xml', $feedXml);

        $this->info(sprintf(
            'Wrote sitemap.xml (%d urls), sitemap-news.xml (%d), feed.xml (%d)',
            count($urls),
            count($newsItems),
            count($feedItems),
        ));

        return $written ? self::SUCCESS : self::FAILURE;
    }

    private function writeFile(string $name, string $content): bool
    {
        $path = public_path($name);

        try {
            File::put($path, $content);

            return true;
        } catch (\Throwable $e) {
            $this->error("Failed writing {$name}: ".$e->getMessage());

            return false;
        }
    }

    private function renderSitemap(array $urls): string
    {
        $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        $xml .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
        foreach ($urls as $u) {
            $xml .= "  <url>\n";
            $xml .= '    <loc>'.htmlspecialchars($u['loc'], ENT_XML1)."</loc>\n";
            if (! empty($u['lastmod'])) {
                $xml .= '    <lastmod>'.htmlspecialchars($u['lastmod'], ENT_XML1)."</lastmod>\n";
            }
            if (! empty($u['changefreq'])) {
                $xml .= '    <changefreq>'.htmlspecialchars($u['changefreq'], ENT_XML1)."</changefreq>\n";
            }
            if (! empty($u['priority'])) {
                $xml .= '    <priority>'.htmlspecialchars($u['priority'], ENT_XML1)."</priority>\n";
            }
            $xml .= "  </url>\n";
        }
        $xml .= "</urlset>\n";

        return $xml;
    }

    private function renderNewsSitemap(array $items, string $siteName): string
    {
        $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        $xml .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:news=\"http://www.google.com/schemas/sitemap-news/0.9\">\n";
        foreach ($items as $u) {
            $xml .= "  <url>\n";
            $xml .= '    <loc>'.htmlspecialchars($u['loc'], ENT_XML1)."</loc>\n";
            $xml .= "    <news:news>\n";
            $xml .= '      <news:publication>'."\n";
            $xml .= '        <news:name>'.htmlspecialchars($siteName, ENT_XML1)."</news:name>\n";
            $xml .= "        <news:language>id</news:language>\n";
            $xml .= "      </news:publication>\n";
            if (! empty($u['publication_date'])) {
                $xml .= '      <news:publication_date>'.htmlspecialchars($u['publication_date'], ENT_XML1)."</news:publication_date>\n";
            }
            if (! empty($u['title'])) {
                $xml .= '      <news:title>'.htmlspecialchars($u['title'], ENT_XML1)."</news:title>\n";
            }
            if (! empty($u['keywords'])) {
                $xml .= '      <news:keywords>'.htmlspecialchars($u['keywords'], ENT_XML1)."</news:keywords>\n";
            }
            $xml .= "    </news:news>\n";
            $xml .= "  </url>\n";
        }
        $xml .= "</urlset>\n";

        return $xml;
    }

    private function renderFeed(array $items, string $siteName, string $siteUrl, string $updated): string
    {
        $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        $xml .= "<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n";
        $xml .= "  <channel>\n";
        $xml .= '    <title>'.htmlspecialchars($siteName, ENT_XML1)." - Berita Terkini</title>\n";
        $xml .= '    <link>'.htmlspecialchars($siteUrl, ENT_XML1)."</link>\n";
        $xml .= '    <description>'.htmlspecialchars($siteName, ENT_XML1)." - Portal berita terkini Indonesia.</description>\n";
        $xml .= "    <language>id-ID</language>\n";
        $xml .= '    <lastBuildDate>'.htmlspecialchars($updated, ENT_XML1)."</lastBuildDate>\n";
        $xml .= '    <atom:link href="'.htmlspecialchars($siteUrl.'/feed.xml', ENT_XML1)."\" rel=\"self\" type=\"application/rss+xml\" />\n";
        foreach ($items as $i) {
            $xml .= "    <item>\n";
            $xml .= '      <title>'.htmlspecialchars($i['title'], ENT_XML1)."</title>\n";
            $xml .= '      <link>'.htmlspecialchars($i['link'], ENT_XML1)."</link>\n";
            $xml .= '      <guid isPermaLink="true">'.htmlspecialchars($i['guid'], ENT_XML1)."</guid>\n";
            if (! empty($i['pubDate'])) {
                $xml .= '      <pubDate>'.htmlspecialchars($i['pubDate'], ENT_XML1)."</pubDate>\n";
            }
            if (! empty($i['description'])) {
                $xml .= '      <description>'.htmlspecialchars($i['description'], ENT_XML1)."</description>\n";
            }
            if (! empty($i['category'])) {
                $xml .= '      <category>'.htmlspecialchars($i['category'], ENT_XML1)."</category>\n";
            }
            if (! empty($i['author'])) {
                $xml .= '      <dc:creator xmlns:dc=\"http://purl.org/dc/elements/1.1/\">'.htmlspecialchars($i['author'], ENT_XML1)."</dc:creator>\n";
            }
            $xml .= "    </item>\n";
        }
        $xml .= "  </channel>\n";
        $xml .= "</rss>\n";

        return $xml;
    }
}
