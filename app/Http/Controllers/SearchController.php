<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('q', '');

        $articles = Content::with(['category', 'author', 'featuredImage', 'thumbnail'])
            ->where('status', 'published')
            ->when($query, function ($q) use ($query) {
                $q->where(function ($subQ) use ($query) {
                    $subQ->where('title', 'like', "%{$query}%")
                        ->orWhere('excerpt', 'like', "%{$query}%")
                        ->orWhere('body', 'like', "%{$query}%");
                });
            })
            ->latest('published_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Search/Index', [
            'query' => $query,
            'articles' => $articles,
            'navCategories' => Category::root()->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }
}
