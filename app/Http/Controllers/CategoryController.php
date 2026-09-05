<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Content;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(string $slug): Response
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        $featured = Content::with(['author', 'featuredImage', 'thumbnail'])
            ->where('category_id', $category->id)
            ->where('status', 'published')
            ->whereNotNull('featured_image_id')
            ->latest('published_at')
            ->first();

        $articles = Content::with(['author', 'featuredImage', 'thumbnail'])
            ->where('category_id', $category->id)
            ->where('status', 'published')
            ->whereNotNull('featured_image_id')
            ->when($featured, function ($query) use ($featured) {
                $query->where('id', '!=', $featured->id);
            })
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('Category/Index', [
            'category' => $category,
            'featured' => $featured,
            'articles' => $articles,
            'navCategories' => Category::root()->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }
}
