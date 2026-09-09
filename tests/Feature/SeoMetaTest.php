<?php

use App\Models\Content;
use App\Support\SeoMeta;

it('builds NewsArticle JSON-LD with required fields', function () {
    $article = new Content([
        'title' => 'Berita Penting',
        'slug' => 'berita-penting',
        'body' => '<p>Isi berita</p>',
        'excerpt' => 'Ringkasan',
        'status' => 'published',
    ]);
    $article->published_at = now();
    $article->updated_at = now();

    $seo = SeoMeta::forArticle($article);
    $jsonLd = $seo->toJsonLd();

    expect($jsonLd)
        ->toHaveKey('@type', 'NewsArticle')
        ->toHaveKey('headline', 'Berita Penting')
        ->toHaveKey('datePublished')
        ->toHaveKey('url');
});

it('returns null JSON-LD for non-article types', function () {
    $seo = new SeoMeta(title: 'x', description: 'y', url: 'http://x', type: 'website');

    expect($seo->toJsonLd())->toBeNull();
});

it('includes image in JSON-LD when present', function () {
    $seo = new SeoMeta(
        title: 't',
        description: 'd',
        url: 'http://x',
        type: 'article',
        image: 'http://x/img.jpg',
    );

    expect($seo->toJsonLd()['image']['url'])->toBe('http://x/img.jpg');
});

it('builds Organization JSON-LD with sameAs', function () {
    $seo = new SeoMeta(
        title: 't',
        description: 'd',
        url: 'http://x',
        sameAs: ['https://twitter.com/x'],
    );

    $org = $seo->organizationJsonLd();
    expect($org)->toHaveKey('@type', 'NewsMediaOrganization')
        ->toHaveKey('sameAs');
});

it('builds Website JSON-LD with search action', function () {
    $seo = new SeoMeta(
        title: 't',
        description: 'd',
        url: 'http://x',
        searchUrl: 'http://x/search',
    );

    $site = $seo->websiteJsonLd();
    expect($site)->toHaveKey('@type', 'WebSite')
        ->and($site['potentialAction']['@type'])->toBe('SearchAction');
});
