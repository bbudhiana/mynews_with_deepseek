<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * ponytail: short edge cache for HTML pages so CDNs (or browser back-forward)
 * can absorb crawler bursts and repeat visits. Private cache so logged-in
 * sessions do not leak.
 */
class HtmlCacheHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($request->method() !== 'GET') {
            return $response;
        }

        if ($response->getStatusCode() !== 200) {
            return $response;
        }

        if ($request->user() !== null) {
            return $response;
        }

        if (str_contains($request->path(), 'search') || $request->has('q')) {
            $response->headers->set('Cache-Control', 'no-cache, private');

            return $response;
        }

        $response->headers->set(
            'Cache-Control',
            'private, max-age=60, stale-while-revalidate=300',
        );

        return $response;
    }
}
