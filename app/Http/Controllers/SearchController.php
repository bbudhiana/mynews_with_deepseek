<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function index(Request $request): Response
    {
        $query = trim((string) $request->input('q', ''));
        $searchable = mb_strlen($query) >= 3;

        $articles = Content::with(['category', 'author', 'featuredImage', 'thumbnail'])
            ->published()
            ->when($searchable, function ($q) use ($query) {
                $driver = DB::connection()->getDriverName();

                if (in_array($driver, ['mysql', 'mariadb'], true)) {
                    $q->whereRaw(
                        'MATCH(title, excerpt, body) AGAINST (? IN BOOLEAN MODE)',
                        [$query.'*'],
                    );
                } else {
                    $like = '%'.$query.'%';
                    $q->where(function ($subQ) use ($like) {
                        $subQ->where('title', 'like', $like)
                            ->orWhere('excerpt', 'like', $like);
                    });
                }
            })
            ->latest('published_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Search/Index', [
            'seo' => [
                'title' => $query ? "Pencarian: \"{$query}\" - ".config('app.name') : config('app.name').' - Pencarian',
                'description' => $query ? "Hasil pencarian untuk \"{$query}\" di ".config('app.name').'.' : 'Halaman pencarian.',
                'url' => url()->current().($query ? '?q='.urlencode($query) : ''),
                'type' => 'website',
                'noindex' => true,
                'siteName' => config('app.name'),
            ],
            'query' => $query,
            'articles' => $articles,
        ]);
    }
}
