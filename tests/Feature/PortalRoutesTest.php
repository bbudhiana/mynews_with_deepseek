<?php

use App\Models\Category;
use App\Models\Content;
use App\Models\Media;
use App\Models\User;

beforeEach(function () {
    $this->author = User::factory()->create(['name' => 'Budi Redaksi']);
    $this->category = Category::factory()->create(['name' => 'Nasional', 'slug' => 'nasional']);
    $this->media = Media::factory()->create();
});

it('shows the home page with breaking, hero, latest, popular, editors choice', function () {
    Content::factory()->published()->breaking()->count(2)->create(['category_id' => $this->category->id]);
    Content::factory()->published()->editorsPick()->count(2)->create([
        'category_id' => $this->category->id,
        'featured_image_id' => $this->media->id,
    ]);
    Content::factory()->published()->count(8)->create([
        'category_id' => $this->category->id,
        'featured_image_id' => $this->media->id,
    ]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Home')
            ->has('seo')
            ->has('organizationJsonLd')
            ->has('websiteJsonLd')
            ->has('breakingNews', 2)
            ->has('editorsChoice', 2)
            ->has('navCategories')
        );
});

it('returns 404 for unknown news slug', function () {
    $this->get('/news/tidak-ada')->assertNotFound();
});

it('does not expose draft articles publicly', function () {
    Content::factory()->create([
        'slug' => 'rahasia',
        'status' => 'draft',
        'category_id' => $this->category->id,
    ]);

    $this->get('/news/rahasia')->assertNotFound();
});

it('shows published article with related and popular', function () {
    $article = Content::factory()->published()->create([
        'slug' => 'publik',
        'category_id' => $this->category->id,
        'author_id' => $this->author->id,
        'featured_image_id' => $this->media->id,
    ]);
    Content::factory()->published()->count(3)->create([
        'category_id' => $this->category->id,
        'featured_image_id' => $this->media->id,
    ]);

    $this->get('/news/publik')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('News/Show')
            ->has('article')
            ->has('relatedNews', 3)
            ->has('popularNews')
            ->has('jsonLd', 2)
        );
});

it('allows preview of any status via signed URL', function () {
    Content::factory()->create([
        'slug' => 'preview-me',
        'status' => 'draft',
    ]);

    $url = URL::signedRoute('news.preview', ['slug' => 'preview-me']);

    $this->get($url)->assertOk()->assertInertia(fn ($page) => $page
        ->component('News/Show')
        ->where('seo.noindex', true)
    );
});

it('rejects unsigned preview URL', function () {
    Content::factory()->create([
        'slug' => 'preview-me',
        'status' => 'draft',
    ]);

    $this->get('/preview/news/preview-me')
        ->assertStatus(403);
});

it('shows category page and noindex after page 1', function () {
    Content::factory()->published()->count(15)->create([
        'category_id' => $this->category->id,
        'featured_image_id' => $this->media->id,
    ]);

    $this->get(route('category.index', ['slug' => 'nasional']))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Category/Index')
            ->where('seo.noindex', false)
        );

    $this->get(route('category.index', ['slug' => 'nasional', 'page' => 2]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('seo.noindex', true)
        );
});

it('searches by title', function () {
    Content::factory()->published()->create([
        'title' => 'Rilis Produk Baru Artificial Intelligence',
        'category_id' => $this->category->id,
    ]);
    Content::factory()->published()->create([
        'title' => 'Berita Sepakbola Nasional',
        'category_id' => $this->category->id,
    ]);

    $this->get(route('search', ['q' => 'artificial']))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Search/Index')
            ->where('query', 'artificial')
            ->has('articles.data', 1)
        );
});

it('returns 404 for unknown category', function () {
    $this->get('/category/tidak-ada')->assertNotFound();
});

it('resolves author by slug', function () {
    $author = User::factory()->create(['name' => 'Siti Lestari']);
    Content::factory()->published()->count(2)->create(['author_id' => $author->id]);

    $this->get(route('author.show', ['slug' => $author->slug]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Author/Show')
            ->has('articles.data', 2)
            ->has('jsonLd')
        );
});

it('returns 404 for unknown author slug', function () {
    $this->get('/author/tidak-ada-slug-ini')->assertNotFound();
});

it('rejects numeric author slug (no enumeration)', function () {
    User::factory()->create();

    $this->get('/author/1')->assertNotFound();
});
