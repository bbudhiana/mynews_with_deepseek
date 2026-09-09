<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Content;
use App\Support\SeoMeta;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $breakingNews = Content::breaking()
            ->take(5)
            ->get(['id', 'title', 'slug', 'published_at']);

        $categoriesList = Category::with(['contents' => function ($query) {
            $query->where('status', 'published')
                ->whereNotNull('featured_image_id')
                ->latest('published_at')
                ->take(3);
        }, 'contents.featuredImage', 'contents.thumbnail', 'contents.author'])
            ->take(4)
            ->get();

        $heroNews = Content::with(['category', 'author', 'featuredImage', 'thumbnail'])
            ->whereNotNull('featured_image_id')
            ->latest('published_at')
            ->first();

        if (! $heroNews) {
            $heroNews = Content::with(['category', 'author', 'featuredImage', 'thumbnail'])
                ->latest('published_at')
                ->first();
        }

        $latestNews = Content::with(['category', 'featuredImage', 'thumbnail'])
            ->whereNotNull('featured_image_id')
            ->where('id', '!=', $heroNews?->id)
            ->latest('published_at')
            ->take(6)
            ->get();

        $popularNews = Content::popular()
            ->take(5)
            ->get(['id', 'title', 'slug', 'published_at']);

        $editorsChoice = Content::editorsPick()
            ->with(['category', 'author', 'featuredImage', 'thumbnail'])
            ->take(3)
            ->get();

        $heroImage = $heroNews?->featured_image?->url ?: $heroNews?->thumbnail?->url ?: null;
        $socialProfiles = [
            'https://www.facebook.com/mynews.id',
            'https://twitter.com/mynews_id',
            'https://www.instagram.com/mynews.id',
            'https://www.youtube.com/@mynews.id',
        ];
        $seo = SeoMeta::forHome(heroImage: $heroImage, sameAs: $socialProfiles);
        $seo->publisherLogo = url('/publisher-logo.svg');
        $seo->publisherUrl = url('/');

        return Inertia::render('Home', [
            'seo' => $seo->toArray(),
            'organizationJsonLd' => $seo->organizationJsonLd(),
            'websiteJsonLd' => $seo->websiteJsonLd(),
            'breakingNews' => $breakingNews,
            'heroNews' => $heroNews,
            'latestNews' => $latestNews,
            'popularNews' => $popularNews,
            'editorsChoice' => $editorsChoice,
            'categoriesList' => $categoriesList,
        ]);
    }
}
