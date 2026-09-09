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
     */
    private function navCategories(): array
    {
        try {
            return Category::root()
                ->orderBy('name')
                ->get(['id', 'name', 'slug'])
                ->all();
        } catch (\Throwable) {
            return [];
        }
    }
}
