<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('content_tags')) {
            Schema::create('content_tags', function (Blueprint $table) {
                $table->foreignId('content_id')->constrained('contents')->cascadeOnDelete();
                $table->foreignId('tag_id')->constrained('tags')->cascadeOnDelete();
                $table->primary(['content_id', 'tag_id']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('content_tags');
    }
};
