<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Content;
use App\Models\User;
use App\Support\SeoMeta;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AuthorController extends Controller
{
    public function show(string $slug): Response
    {
        $author = Str::contains($slug, '|') || is_numeric($slug)
            ? User::find((int) $slug)
            : User::all()->first(fn ($u) => Str::slug($u->name) === $slug);

        abort_unless($author, 404);

        $articles = Content::with(['category', 'featuredImage', 'thumbnail'])
            ->where('author_id', $author->id)
            ->where('status', 'published')
            ->latest('published_at')
            ->paginate(12);

        $seo = new SeoMeta(
            title: "{$author->name} - ".config('app.name'),
            description: Str::limit($author->bio ?? "Berita terbaru dari kontributor {$author->name}.", 160, ''),
            url: url()->current(),
            type: 'profile',
            authorName: $author->name,
            siteName: config('app.name'),
        );

        return Inertia::render('Author/Show', [
            'seo' => $seo->toArray(),
            'author' => $author,
            'articles' => $articles,
            'navCategories' => Category::root()->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }
}
