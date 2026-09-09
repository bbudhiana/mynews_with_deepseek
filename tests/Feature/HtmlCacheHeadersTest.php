<?php

use App\Http\Middleware\HtmlCacheHeaders;
use App\Models\User;
use Illuminate\Http\Request;

it('sets short private cache for GET 200 anonymous', function () {
    $response = (new HtmlCacheHeaders)->handle(
        Request::create('/', 'GET'),
        fn () => response('ok', 200),
    );

    expect($response->headers->get('Cache-Control'))
        ->toContain('private')
        ->toContain('max-age=60');
});

it('does not override cache for non-200 responses', function () {
    $response = (new HtmlCacheHeaders)->handle(
        Request::create('/news/missing', 'GET'),
        fn () => response('nf', 404),
    );

    expect($response->headers->get('Cache-Control'))->not->toContain('max-age=60');
});

it('sets no-cache for search requests', function () {
    $response = (new HtmlCacheHeaders)->handle(
        Request::create('/search?q=foo', 'GET'),
        fn () => response('ok', 200),
    );

    expect($response->headers->get('Cache-Control'))
        ->toContain('no-cache')
        ->not->toContain('max-age=60');
});

it('skips caching for POST requests', function () {
    $response = (new HtmlCacheHeaders)->handle(
        Request::create('/', 'POST'),
        fn () => response('ok', 200),
    );

    expect($response->headers->get('Cache-Control'))->not->toContain('max-age=60');
});

it('skips caching for authenticated users', function () {
    $user = User::factory()->create();
    $request = Request::create('/', 'GET');
    $request->setUserResolver(fn () => $user);

    $response = (new HtmlCacheHeaders)->handle(
        $request,
        fn () => response('ok', 200),
    );

    expect($response->headers->get('Cache-Control'))->not->toContain('max-age=60');
});
