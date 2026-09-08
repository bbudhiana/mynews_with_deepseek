<?php

namespace App\Console\Commands;

use App\Models\Media;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Throwable;

class GenerateMediaVariants extends Command
{
    protected $signature = 'media:generate-variants
        {--only-missing : Skip media that already have all variants on disk}
        {--size=* : Restrict to specific sizes (default: all)}';

    protected $description = 'Generate thumb/small/medium/large variants for every Media row';

    /**
     * ponytail: GD-based resize. No extra dependency. Quality tradeoff: GD is
     * CPU-only and slower than Imagick, fine for batch-once workloads.
     * Upgrade path: Imagick driver or external CDN (imgix/Cloudflare Images).
     */
    public function handle(): int
    {
        $sizes = $this->option('size')
            ? array_intersect($this->option('size'), Media::SIZES)
            : Media::SIZES;

        if (empty($sizes)) {
            $this->error('No valid sizes requested. Allowed: '.implode(', ', Media::SIZES));

            return self::FAILURE;
        }

        if (! function_exists('imagecreatetruecolor')) {
            $this->error('PHP GD extension is not installed.');

            return self::FAILURE;
        }

        $disk = Storage::disk('public');
        $mediaQuery = Media::query()->whereNotNull('path');
        if ($this->option('only-missing')) {
            $mediaQuery->whereRaw('1 = 1');
        }

        $count = 0;
        $skipped = 0;
        $failed = 0;

        $mediaQuery->orderBy('id')->chunkById(50, function ($rows) use ($sizes, $disk, &$count, &$skipped, &$failed) {
            foreach ($rows as $media) {
                $srcAbs = $disk->path($media->path);
                if (! is_file($srcAbs)) {
                    $skipped++;

                    continue;
                }

                $imageData = @getimagesize($srcAbs);
                if ($imageData === false) {
                    $this->warn("Skipping {$media->path}: not a readable image");
                    $skipped++;

                    continue;
                }
                [$srcW, $srcH, $type] = $imageData;

                foreach ($sizes as $size) {
                    $variantPath = $this->variantPath($media->path, $size);
                    $variantAbs = $disk->path($variantPath);
                    if ($this->option('only-missing') && is_file($variantAbs)) {
                        continue;
                    }

                    $targetW = (int) (Media::SIZES_PX[$size] ?? 0);
                    if ($srcW <= $targetW || $targetW < 1) {
                        continue;
                    }

                    try {
                        $this->resize($srcAbs, $variantAbs, $type, $targetW, $srcW, $srcH);
                        $count++;
                    } catch (Throwable $e) {
                        $failed++;
                        $this->warn("Failed {$media->path} → {$size}: ".$e->getMessage());
                    }
                }
            }
        });

        $this->info("Generated {$count} variants. Skipped: {$skipped}. Failed: {$failed}.");

        return $failed === 0 ? self::SUCCESS : self::FAILURE;
    }

    private function variantPath(string $path, string $size): string
    {
        $extPos = strrpos($path, '.');
        if ($extPos === false) {
            return $path.'-'.$size;
        }

        return substr($path, 0, $extPos).'-'.$size.substr($path, $extPos);
    }

    private function resize(string $src, string $dst, int $type, int $targetW, int $srcW, int $srcH): void
    {
        $ratio = $targetW / $srcW;
        $targetH = (int) round($srcH * $ratio);

        $srcImg = $this->createFromFile($src, $type);
        if ($srcImg === false) {
            throw new \RuntimeException('source image unsupported');
        }

        if ($targetW < 1 || $targetH < 1) {
            throw new \RuntimeException('invalid target dimensions');
        }

        $dstImg = imagecreatetruecolor($targetW, $targetH);
        if ($type === IMAGETYPE_PNG || $type === IMAGETYPE_WEBP) {
            imagealphablending($dstImg, false);
            imagesavealpha($dstImg, true);
            $transparent = imagecolorallocatealpha($dstImg, 0, 0, 0, 127);
            if ($transparent !== false) {
                imagefilledrectangle($dstImg, 0, 0, $targetW, $targetH, $transparent);
            }
        }

        imagecopyresampled($dstImg, $srcImg, 0, 0, 0, 0, $targetW, $targetH, $srcW, $srcH);

        switch ($type) {
            case IMAGETYPE_JPEG:
                imagejpeg($dstImg, $dst, 82);
                break;
            case IMAGETYPE_PNG:
                imagepng($dstImg, $dst, 8);
                break;
            case IMAGETYPE_WEBP:
                imagewebp($dstImg, $dst, 82);
                break;
            default:
                imagejpeg($dstImg, $dst, 82);
        }

        imagedestroy($srcImg);
        imagedestroy($dstImg);
    }

    private function createFromFile(string $path, int $type): \GdImage|false
    {
        return match ($type) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($path),
            IMAGETYPE_PNG => @imagecreatefrompng($path),
            IMAGETYPE_WEBP => @imagecreatefromwebp($path),
            IMAGETYPE_GIF => @imagecreatefromgif($path),
            default => false,
        };
    }
}
