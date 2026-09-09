<?php

namespace App\Http\Middleware;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'appUrl' => url('/'),
            'navCategories' => $this->navCategories(),
        ];
    }

    /**
     * ponytail: DB query is cheap and runs on every render anyway via HomeController
     * and SitemapController. Caching it across all sessions invites stale-TTL
     * bugs and stale-data surprises on category edits.
     *
     * @return array<int, array{id: int, name: string, slug: string}>
     */
    private function navCategories(): array
    {
        try {
            $rows = Category::root()
                ->orderBy('name')
                ->get(['id', 'name', 'slug'])
                ->map(fn (Category $c) => [
                    'id' => $c->id,
                    'name' => $c->name,
                    'slug' => $c->slug,
                ]);

            return array_values($rows->all());
        } catch (\Throwable) {
            return [];
        }
    }
}
