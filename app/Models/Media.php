<?php

namespace App\Models;

use Database\Factories\MediaFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string|null $path
 * @property-read string|null $url
 * @property-read string|null $srcset
 */
class Media extends Model
{
    /** @use HasFactory<MediaFactory> */
    use HasFactory;

    protected $table = 'media';

    protected $guarded = [];

    protected $appends = ['url', 'srcset'];

    public const SIZES = ['thumb', 'small', 'medium', 'large'];

    public const SIZES_PX = [
        'thumb' => 320,
        'small' => 640,
        'medium' => 1024,
        'large' => 1920,
    ];

    public function getUrlAttribute(): ?string
    {
        return $this->path ? $this->variantUrl(null) : null;
    }

    public function getSrcsetAttribute(): ?string
    {
        return $this->buildSrcset();
    }

    /**
     * ponytail: size variant convention — `path-{size}.{ext}` saved next to
     * the original. Upload pipeline or `media:generate-variants` artisan
     * populates these. Returns null when the variant file is missing.
     *
     * Use this for srcset on <img> tags instead of `->url` directly.
     */
    public function variantUrl(?string $size): ?string
    {
        if (! $this->path) {
            return null;
        }

        if ($size === null) {
            return asset('storage/'.$this->path);
        }

        if (! in_array($size, self::SIZES, true)) {
            return asset('storage/'.$this->path);
        }

        $variantPath = $this->variantPath($size);
        if (! Storage::disk('public')->exists($variantPath)) {
            return asset('storage/'.$this->path);
        }

        return asset('storage/'.$variantPath);
    }

    /**
     * Returns HTML-ready srcset string. Falls back to original if variants
     * are not yet generated.
     */
    public function buildSrcset(): ?string
    {
        if (! $this->path) {
            return null;
        }

        $parts = [];
        foreach (self::SIZES as $size) {
            $url = $this->variantUrl($size);
            if ($url) {
                $parts[] = $url.' '.self::SIZES_PX[$size].'w';
            }
        }

        if (empty($parts)) {
            return null;
        }

        return implode(', ', $parts);
    }

    private function variantPath(string $size): string
    {
        $extPos = strrpos($this->path, '.');
        if ($extPos === false) {
            return $this->path.'-'.$size;
        }

        $stem = substr($this->path, 0, $extPos);
        $ext = substr($this->path, $extPos);

        return $stem.'-'.$size.$ext;
    }
}
