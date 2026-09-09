<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Support\SeoMeta;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function show(string $slug): Response
    {
        $article = Content::with(['category', 'author', 'featuredImage', 'thumbnail', 'tags'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $related = Content::with(['featuredImage', 'thumbnail'])
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->where('status', 'published')
            ->whereNotNull('featured_image_id')
            ->latest('published_at')
            ->take(3)
            ->get();

        $popular = Content::popular()
            ->with(['featuredImage', 'thumbnail'])
            ->take(5)
            ->get();

        $seo = SeoMeta::forArticle($article);
        $seoArr = $seo->toArray();
        $seoArr['tags'] = $article->tags->pluck('name')->all();

        $article->body_first = $this->splitBody($article->body ?? '', true);
        $article->body_second = $this->splitBody($article->body ?? '', false);
        $article->body_word_count = $this->wordCount(strip_tags($article->body ?? ''));
        $article->author_url = $article->author
            ? route('author.show', ['slug' => $article->author->slug], true)
            : null;

        return Inertia::render('News/Show', [
            'seo' => $seoArr,
            'jsonLd' => [
                $seo->toJsonLd(),
                $this->breadcrumbJsonLd($article),
            ],
            'article' => $article,
            'relatedNews' => $related,
            'popularNews' => $popular,
        ]);
    }

    public function preview(string $slug): Response
    {
        $article = Content::with(['category', 'author', 'featuredImage', 'thumbnail', 'tags'])
            ->where('slug', $slug)
            ->firstOrFail();

        $seo = SeoMeta::forArticle($article);
        $seoArr = $seo->toArray();
        $seoArr['tags'] = $article->tags->pluck('name')->all();
        $seoArr['noindex'] = true;

        $article->body_first = $this->splitBody($article->body ?? '', true);
        $article->body_second = $this->splitBody($article->body ?? '', false);
        $article->body_word_count = $this->wordCount(strip_tags($article->body ?? ''));
        $article->author_url = $article->author
            ? route('author.show', ['slug' => $article->author->slug], true)
            : null;

        return Inertia::render('News/Show', [
            'seo' => $seoArr,
            'article' => $article,
        ]);
    }

    /**
     * ponytail: simple midpoint split on </p> boundary for in-article ad — no parser.
     */
    private function splitBody(string $html, bool $first): string
    {
        if ($html === '') {
            return '';
        }

        $parts = preg_split('/(?<=<\/p>)/i', $html, -1, PREG_SPLIT_DELIM_CAPTURE);
        $chunks = array_filter($parts ?: [], fn ($p) => $p !== '');

        if (count($chunks) <= 1) {
            $mid = (int) floor(mb_strlen($html) / 2);

            return $first ? mb_substr($html, 0, $mid) : mb_substr($html, $mid);
        }

        $mid = (int) floor(count($chunks) / 2);
        $half = $first ? array_slice($chunks, 0, $mid) : array_slice($chunks, $mid);

        return implode('', $half);
    }

    private function wordCount(string $text): int
    {
        return str_word_count($text);
    }

    /**
     * @return array<string, mixed>
     */
    private function breadcrumbJsonLd(Content $article): array
    {
        $categoryUrl = $article->category
            ? route('category.index', ['slug' => $article->category->slug], true)
            : url('/');

        return [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => url('/')],
                ['@type' => 'ListItem', 'position' => 2, 'name' => $article->category->name ?? 'Berita', 'item' => $categoryUrl],
                ['@type' => 'ListItem', 'position' => 3, 'name' => $article->title, 'item' => url()->current()],
            ],
        ];
    }
}
