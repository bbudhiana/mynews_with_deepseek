<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property int|null $parent_id
 */
class Category extends Model
{
    protected $table = 'categories';

    protected $guarded = [];

    /**
     * @return HasMany<Content, $this>
     */
    public function contents()
    {
        return $this->hasMany(Content::class, 'category_id');
    }

    /**
     * @return BelongsTo<Category, $this>
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * @return HasMany<Category, $this>
     */
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    /**
     * @param  Builder<Category>  $query
     * @return Builder<Category>
     */
    public function scopeRoot($query)
    {
        return $query->whereNull('parent_id');
    }
}
