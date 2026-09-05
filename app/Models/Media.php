<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string|null $path
 * @property-read string|null $url
 */
class Media extends Model
{
    protected $table = 'media';

    protected $guarded = [];

    protected $appends = ['url'];

    public function getUrlAttribute(): ?string
    {
        return $this->path ? asset('storage/'.$this->path) : null;
    }
}
