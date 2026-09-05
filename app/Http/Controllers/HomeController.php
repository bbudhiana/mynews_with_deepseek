<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Content;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $breakingNews = Content::where('status', 'published')
            ->latest('published_at')
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
            ->where('status', 'published')
            ->whereNotNull('featured_image_id')
            ->latest('published_at')
            ->first();

        if (! $heroNews) {
            $heroNews = Content::with(['category', 'author', 'featuredImage', 'thumbnail'])
                ->where('status', 'published')
                ->latest('published_at')
                ->first();
        }

        $latestNews = Content::with(['category', 'featuredImage', 'thumbnail'])
            ->where('status', 'published')
            ->whereNotNull('featured_image_id')
            ->where('id', '!=', $heroNews?->id)
            ->latest('published_at')
            ->take(6)
            ->get();

        $popularNews = Content::where('status', 'published')
            ->whereNotNull('featured_image_id')
            ->orderBy('id', 'desc')
            ->take(5)
            ->get(['id', 'title', 'slug', 'published_at']);

        $editorsChoice = Content::with(['category', 'author', 'featuredImage', 'thumbnail'])
            ->where('status', 'published')
            ->whereNotNull('featured_image_id')
            ->latest('published_at')
            ->skip(1)
            ->take(3)
            ->get();

        return Inertia::render('Home', [
            'breakingNews' => $breakingNews,
            'heroNews' => $heroNews,
            'latestNews' => $latestNews,
            'popularNews' => $popularNews,
            'editorsChoice' => $editorsChoice,
            'categoriesList' => $categoriesList,
            'navCategories' => Category::root()->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }
}
