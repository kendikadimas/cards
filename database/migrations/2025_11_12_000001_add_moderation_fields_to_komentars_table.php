<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('komentars', function (Blueprint $table) {
            $table->string('status')->default('pending')->after('komentar');
            $table->boolean('is_inappropriate')->default(false)->after('status');
            $table->unsignedBigInteger('reviewed_by')->nullable()->after('is_inappropriate');
            $table->timestamp('reviewed_at')->nullable()->after('reviewed_by');
            $table->index(['status', 'is_inappropriate']);
        });
    }

    public function down(): void
    {
        Schema::table('komentars', function (Blueprint $table) {
            $table->dropIndex(['status', 'is_inappropriate']);
            $table->dropColumn(['status', 'is_inappropriate', 'reviewed_by', 'reviewed_at']);
        });
    }
};
