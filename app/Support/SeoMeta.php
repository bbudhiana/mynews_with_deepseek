<?php

namespace App\Support;

use App\Models\Category;
use App\Models\Content;
use Illuminate\Support\Str;

class SeoMeta
{
    /**
     * @param  array<string, mixed>|null  $tags
     * @param  list<string>|null  $sameAs
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
        public ?string $publisherLogo = null,
        public ?string $publisherUrl = null,
        public ?array $sameAs = null,
        public ?string $searchUrl = null,
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

    public static function forCategory(Category $category, ?string $siteName = null, ?string $description = null): self
    {
        $site = $siteName ?: (string) config('app.name', 'MyNews');
        $url = route('category.index', ['slug' => $category->slug], true);

        return new self(
            title: "Berita {$category->name} Terkini",
            description: $description ?: "Kumpulan berita {$category->name} terbaru dan terpopuler. Update harian dari redaksi {$site}.",
            url: $url,
            type: 'website',
            siteName: $site,
        );
    }

    /**
     * @param  list<string>|null  $sameAs
     */
    public static function forHome(
        ?string $siteName = null,
        ?string $heroImage = null,
        ?array $sameAs = null,
    ): self {
        $site = $siteName ?: (string) config('app.name', 'MyNews');
        $url = route('home', [], true);
        $searchUrl = url('/search');

        return new self(
            title: "{$site} - Berita Terkini Indonesia",
            description: "Portal berita terkini Indonesia: Nasional, Internasional, Politik, Ekonomi, Teknologi, Olahraga, dan Lifestyle. Update setiap hari dari redaksi {$site}.",
            url: $url,
            type: 'website',
            siteName: $site,
            image: $heroImage,
            sameAs: $sameAs,
            searchUrl: $searchUrl,
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
            'publisherLogo' => $this->publisherLogo,
            'publisherUrl' => $this->publisherUrl,
            'sameAs' => $this->sameAs,
            'searchUrl' => $this->searchUrl,
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

    /**
     * @return array<string, mixed>
     */
    public function organizationJsonLd(): array
    {
        $siteName = $this->siteName ?: (string) config('app.name', 'MyNews');
        $homeUrl = $this->publisherUrl ?: url('/');
        $logo = $this->publisherLogo ?: url('/apple-touch-icon.png');

        $org = [
            '@context' => 'https://schema.org',
            '@type' => 'NewsMediaOrganization',
            'name' => $siteName,
            'url' => $homeUrl,
            'logo' => [
                '@type' => 'ImageObject',
                'url' => $logo,
                'width' => 600,
                'height' => 60,
            ],
        ];

        if (! empty($this->sameAs)) {
            $org['sameAs'] = $this->sameAs;
        }

        return $org;
    }

    /**
     * @return array<string, mixed>
     */
    public function websiteJsonLd(): array
    {
        $siteName = $this->siteName ?: (string) config('app.name', 'MyNews');
        $homeUrl = $this->publisherUrl ?: url('/');

        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => $siteName,
            'url' => $homeUrl,
            'inLanguage' => 'id-ID',
        ];

        if ($this->searchUrl) {
            $schema['potentialAction'] = [
                '@type' => 'SearchAction',
                'target' => [
                    '@type' => 'EntryPoint',
                    'urlTemplate' => $this->searchUrl.'?q={search_term_string}',
                ],
                'query-input' => 'required name=search_term_string',
            ];
        }

        return $schema;
    }

    /**
     * @param  list<string>|null  $knowsAbout
     * @return array<string, mixed>
     */
    public function personJsonLd(?string $jobTitle = null, ?array $knowsAbout = null, ?string $worksFor = null): array
    {
        $person = [
            '@context' => 'https://schema.org',
            '@type' => 'Person',
            'name' => $this->title,
            'description' => $this->description,
            'url' => $this->url,
        ];

        if ($jobTitle) {
            $person['jobTitle'] = $jobTitle;
        }

        if (! empty($knowsAbout)) {
            $person['knowsAbout'] = $knowsAbout;
        }

        if ($worksFor) {
            $person['worksFor'] = [
                '@type' => 'NewsMediaOrganization',
                'name' => $worksFor,
            ];
        }

        if ($this->image) {
            $person['image'] = $this->image;
        }

        return $person;
    }
}
