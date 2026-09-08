<?php

namespace App\Observers;

use App\Models\Content;
use Illuminate\Support\Facades\Artisan;

class ContentObserver
{
    /**
     * ponytail: refresh sitemap right after publish so news-sitemap freshness
     * is not gated on the hourly cron.
     */
    public function saved(Content $content): void
    {
        if (! $this->shouldRefresh($content)) {
            return;
        }

        $this->runWarm();
    }

    public function deleted(Content $content): void
    {
        if ($content->status !== 'published') {
            return;
        }

        $this->runWarm();
    }

    private function shouldRefresh(Content $content): bool
    {
        if ($content->status !== 'published') {
            return false;
        }

        return $content->wasChanged(['status', 'slug', 'published_at', 'updated_at'])
            || $content->wasRecentlyCreated;
    }

    private function runWarm(): void
    {
        try {
            Artisan::call('seo:warm');
        } catch (\Throwable $e) {
            // ponytail: never let SEO refresh break the writer flow — cron will pick up within an hour.
            report($e);
        }
    }
}
