<?php

namespace Database\Factories;

use App\Models\Content;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Content>
 */
class ContentFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(6);
        $paragraphs = collect(range(1, 4))->map(fn () => '<p>'.fake()->paragraph().'</p>')->all();

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.Str::random(6),
            'sub_title' => fake()->sentence(),
            'excerpt' => fake()->paragraph(),
            'body' => implode('', $paragraphs),
            'status' => 'draft',
            'breaking_news_flag' => false,
            'editor_pick_flag' => false,
            'published_at' => null,
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => [
            'status' => 'published',
            'published_at' => now()->subMinutes(fake()->numberBetween(1, 1440)),
        ]);
    }

    public function breaking(): static
    {
        return $this->published()->state(fn () => ['breaking_news_flag' => true]);
    }

    public function editorsPick(): static
    {
        return $this->published()->state(fn () => ['editor_pick_flag' => true]);
    }
}
