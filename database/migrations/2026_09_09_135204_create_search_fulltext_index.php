<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('contents')) {
            return;
        }

        if (DB::connection()->getDriverName() === 'sqlite') {
            return;
        }

        $exists = collect(DB::select('SHOW INDEX FROM contents WHERE Key_name = ?', ['search_index']))
            ->isNotEmpty();

        if ($exists) {
            return;
        }

        DB::statement('ALTER TABLE contents ADD FULLTEXT search_index (title, excerpt, body)');
    }

    public function down(): void
    {
        if (DB::connection()->getDriverName() === 'sqlite') {
            return;
        }

        DB::statement('ALTER TABLE contents DROP INDEX search_index');
    }
};
