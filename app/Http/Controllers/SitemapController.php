<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Content;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $base = url('/');
        $now = now()->toAtomString();

        $staticUrls = [
            ['loc' => $base.'/', 'priority' => '1.0', 'changefreq' => 'hourly'],
            ['loc' => route('page.pedoman-media', [], false), 'priority' => '0.3', 'changefreq' => 'monthly'],
            ['loc' => route('page.tentang-kami', [], false), 'priority' => '0.5', 'changefreq' => 'monthly'],
            ['loc' => route('page.susunan-redaksi', [], false), 'priority' => '0.5', 'changefreq' => 'monthly'],
            ['loc' => route('page.karir', [], false), 'priority' => '0.4', 'changefreq' => 'monthly'],
        ];

        $categories = Category::all(['slug', 'updated_at']);
        $categoryUrls = $categories->map(fn ($c) => [
            'loc' => route('category.index', ['slug' => $c->slug], false),
            'lastmod' => $c->updated_at?->toAtomString() ?: $now,
            'priority' => '0.7',
            'changefreq' => 'daily',
        ]);

        $articles = Content::where('status', 'published')
            ->latest('published_at')
            ->limit(2000)
            ->get(['slug', 'updated_at', 'published_at']);

        $articleUrls = $articles->map(fn ($a) => [
            'loc' => route('news.show', ['slug' => $a->slug], false),
            'lastmod' => $a->updated_at?->toAtomString() ?: $a->published_at?->toAtomString() ?: $now,
            'priority' => '0.8',
            'changefreq' => 'weekly',
        ]);

        $urls = array_merge($staticUrls, $categoryUrls->all(), $articleUrls->all());

        return response()
            ->view('sitemap.xml', ['urls' => $urls])
            ->header('Content-Type', 'application/xml; charset=utf-8');
    }

    public function news(): Response
    {
        $base = url('/');
        $articles = Content::where('status', 'published')
            ->where('published_at', '>=', now()->subDays(2))
            ->latest('published_at')
            ->limit(1000)
            ->with(['author', 'category'])
            ->get();

        $items = $articles->map(fn ($a) => [
            'loc' => route('news.show', ['slug' => $a->slug], false),
            'publication_date' => $a->published_at?->toW3cString(),
            'title' => $a->title,
            'keywords' => $a->category?->name,
        ]);

        return response()
            ->view('sitemap-news.xml', ['urls' => $items])
            ->header('Content-Type', 'application/xml; charset=utf-8');
    }

    public function feed(): Response
    {
        $articles = Content::with(['author', 'category'])
            ->where('status', 'published')
            ->latest('published_at')
            ->limit(50)
            ->get();

        $items = $articles->map(function ($a) {
            return [
                'title' => $a->title,
                'link' => route('news.show', ['slug' => $a->slug], false),
                'guid' => route('news.show', ['slug' => $a->slug], false),
                'pubDate' => $a->published_at?->toRfc2822String(),
                'description' => $a->excerpt ?: $a->sub_title,
                'category' => $a->category?->name,
                'author' => $a->author?->name,
            ];
        });

        return response()
            ->view('feed.xml', [
                'siteName' => config('app.name'),
                'siteUrl' => url('/'),
                'items' => $items,
                'updated' => now()->toRfc2822String(),
            ])
            ->header('Content-Type', 'application/rss+xml; charset=utf-8');
    }
}
