<?php

namespace App\Support;

use App\Models\Category;
use App\Models\Content;
use Illuminate\Support\Str;

class SeoMeta
{
    /**
     * @param  array<string, mixed>|null  $tags
     */
    public function __construct(
        public string $title,
        public string $description,
        public string $url,
        public ?string $image = null,
        public string $type = 'website',
        public ?string $publishedTime = null,
        public ?string $modifiedTime = null,
        public ?string $authorName = null,
        public ?string $section = null,
        public ?array $tags = null,
        public ?string $siteName = null,
        public bool $noindex = false,
    ) {}

    public static function forArticle(Content $article, ?string $siteName = null): self
    {
        $site = $siteName ?: (string) config('app.name', 'MyNews');
        $description = $article->excerpt ?: $article->sub_title ?: Str::limit(strip_tags($article->body ?? ''), 160, '');
        $image = $article->featured_image?->url ?: $article->thumbnail?->url ?: null;
        $url = route('news.show', ['slug' => $article->slug], true);

        return new self(
            title: $article->title,
            description: Str::limit($description, 160, ''),
            url: $url,
            image: $image ? (str_starts_with($image, 'http') ? $image : url($image)) : null,
            type: 'article',
            publishedTime: optional($article->published_at)->toIso8601String(),
            modifiedTime: optional($article->updated_at)->toIso8601String(),
            authorName: $article->author?->name,
            section: $article->category?->name,
            siteName: $site,
        );
    }

    public static function forCategory(Category $category, ?string $siteName = null): self
    {
        $site = $siteName ?: (string) config('app.name', 'MyNews');
        $url = route('category.index', ['slug' => $category->slug], true);

        return new self(
            title: "Berita {$category->name} Terkini",
            description: "Kumpulan berita {$category->name} terbaru dan terpopuler. Update harian dari redaksi {$site}.",
            url: $url,
            type: 'website',
            siteName: $site,
        );
    }

    public static function forHome(?string $siteName = null): self
    {
        $site = $siteName ?: (string) config('app.name', 'MyNews');
        $url = route('home', [], true);

        return new self(
            title: "{$site} - Berita Terkini Indonesia",
            description: "Portal berita terkini Indonesia: Nasional, Internasional, Politik, Ekonomi, Teknologi, Olahraga, dan Lifestyle. Update setiap hari dari redaksi {$site}.",
            url: $url,
            type: 'website',
            siteName: $site,
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'url' => $this->url,
            'image' => $this->image,
            'type' => $this->type,
            'publishedTime' => $this->publishedTime,
            'modifiedTime' => $this->modifiedTime,
            'authorName' => $this->authorName,
            'section' => $this->section,
            'tags' => $this->tags,
            'siteName' => $this->siteName,
            'noindex' => $this->noindex,
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    public function toJsonLd(): ?array
    {
        if ($this->type !== 'article') {
            return null;
        }

        $data = [
            '@context' => 'https://schema.org',
            '@type' => 'NewsArticle',
            'headline' => $this->title,
            'description' => $this->description,
            'url' => $this->url,
            'mainEntityOfPage' => ['@type' => 'WebPage', '@id' => $this->url],
            'publisher' => [
                '@type' => 'Organization',
                'name' => $this->siteName,
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => url('/apple-touch-icon.png'),
                ],
            ],
        ];

        if ($this->image) {
            $data['image'] = [
                '@type' => 'ImageObject',
                'url' => $this->image,
            ];
        }

        if ($this->publishedTime) {
            $data['datePublished'] = $this->publishedTime;
        }

        if ($this->modifiedTime) {
            $data['dateModified'] = $this->modifiedTime;
        }

        if ($this->authorName) {
            $data['author'] = [
                '@type' => 'Person',
                'name' => $this->authorName,
            ];
        }

        if ($this->section) {
            $data['articleSection'] = $this->section;
        }

        if (! empty($this->tags)) {
            $data['keywords'] = implode(', ', $this->tags);
        }

        return $data;
    }
}
