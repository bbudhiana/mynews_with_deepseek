<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Category;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function show($slug)
    {
        $article = Content::with(['category', 'author', 'featuredImage', 'thumbnail'])
            ->where('slug', $slug)
            ->whereIn('status', ['published', 'draft'])
            ->firstOrFail();

        $related = Content::with(['featuredImage', 'thumbnail'])
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->where('status', 'published')
            ->whereNotNull('featured_image_id')
            ->latest('published_at')
            ->take(3)
            ->get();

        $popular = Content::with(['featuredImage', 'thumbnail'])
            ->where('status', 'published')
            ->whereNotNull('featured_image_id')
            ->orderBy('id', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('News/Show', [
            'article' => $article,
            'relatedNews' => $related,
            'popularNews' => $popular,
            'navCategories' => Category::root()->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }
}
