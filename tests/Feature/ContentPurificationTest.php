<?php

use App\Models\Content;

it('strips script tags from body on save', function () {
    $content = Content::factory()->create([
        'body' => '<p>Hello</p><script>alert(1)</script>',
    ]);

    expect($content->fresh()->body)
        ->not->toContain('<script>')
        ->toContain('<p>Hello</p>');
});

it('strips onload attributes from images', function () {
    $content = Content::factory()->create([
        'body' => '<p><img src="x.jpg" onerror="alert(1)"></p>',
    ]);

    expect($content->fresh()->body)->not->toContain('onerror');
});

it('preserves safe HTML in body', function () {
    $html = '<p>Paragraf <strong>tebal</strong> dan <em>miring</em>.</p>';
    $content = Content::factory()->create(['body' => $html]);

    expect($content->fresh()->body)->toContain('<strong>tebal</strong>');
});

it('uses excerpt purifier profile', function () {
    $content = Content::factory()->create([
        'excerpt' => '<p>Ringkasan</p><script>x</script>',
    ]);

    expect($content->fresh()->excerpt)
        ->toContain('<p>Ringkasan</p>')
        ->not->toContain('<script>');
});
