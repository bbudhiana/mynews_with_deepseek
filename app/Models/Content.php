<?php

namespace App\Models;

use Database\Factories\ContentFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;
use Mews\Purifier\Facades\Purifier;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property int|null $category_id
 * @property int|null $author_id
 * @property int|null $featured_image_id
 * @property int|null $thumbnail_id
 * @property string $status
 * @property Carbon|null $published_at
 * @property string $body_first
 * @property string $body_second
 * @property int $body_word_count
 * @property string|null $author_url
 * @property-read Media|null $featured_image
 * @property-read Media|null $thumbnail
 * @property-read string|null $featured_image_srcset
 * @property-read string|null $thumbnail_srcset
 */
class Content extends Model
{
    /** @use HasFactory<ContentFactory> */
    use HasFactory;

    protected $table = 'contents';

    protected $guarded = [];

    protected $casts = [
        'published_at' => 'datetime',
        'reviewed_at' => 'datetime',
        'breaking_news_flag' => 'boolean',
        'editor_pick_flag' => 'boolean',
    ];

    /**
     * @param  Builder<Content>  $query
     * @return Builder<Content>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    /**
     * @param  Builder<Content>  $query
     * @return Builder<Content>
     */
    public function scopeBreaking(Builder $query): Builder
    {
        return $query->published()->where('breaking_news_flag', true);
    }

    /**
     * @param  Builder<Content>  $query
     * @return Builder<Content>
     */
    public function scopeEditorsPick(Builder $query): Builder
    {
        return $query->published()->where('editor_pick_flag', true);
    }

    /**
     * @param  Builder<Content>  $query
     * @return Builder<Content>
     */
    public function scopePopular(Builder $query): Builder
    {
        return $query->published()
            ->whereNotNull('featured_image_id')
            ->latest('published_at');
    }

    /**
     * @return BelongsTo<Category, $this>
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * @return BelongsTo<Media, $this>
     */
    public function featuredImage()
    {
        return $this->belongsTo(Media::class, 'featured_image_id');
    }

    /**
     * @return BelongsTo<Media, $this>
     */
    public function thumbnail()
    {
        return $this->belongsTo(Media::class, 'thumbnail_id');
    }

    /**
     * @return BelongsToMany<Tag, $this>
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'content_tags', 'content_id', 'tag_id');
    }

    public function setBodyAttribute(?string $value): void
    {
        $this->attributes['body'] = $value === null ? null : Purifier::clean($value);
    }

    public function setExcerptAttribute(?string $value): void
    {
        $this->attributes['excerpt'] = $value === null ? null : Purifier::clean($value, 'excerpt');
    }
}
