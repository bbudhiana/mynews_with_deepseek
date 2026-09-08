<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

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
 */
class Content extends Model
{
    protected $table = 'contents';

    protected $guarded = [];

    protected $casts = [
        'published_at' => 'datetime',
    ];

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
}
