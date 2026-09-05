<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'media';

    protected $guarded = [];

    protected $appends = ['url'];

    public function getUrlAttribute()
    {
        return asset('storage/'.$this->path);
    }
}
