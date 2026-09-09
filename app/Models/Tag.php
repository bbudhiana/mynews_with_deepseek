<?php

namespace App\Models;

use Database\Factories\TagFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $id
 * @property string $name
 * @property string $slug
 */
class Tag extends Model
{
    /** @use HasFactory<TagFactory> */
    use HasFactory;

    protected $guarded = [];

    /**
     * @return BelongsToMany<Content, $this>
     */
    public function contents()
    {
        return $this->belongsToMany(Content::class, 'content_tags', 'tag_id', 'content_id');
    }
}
