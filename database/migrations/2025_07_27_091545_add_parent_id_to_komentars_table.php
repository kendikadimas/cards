<?php
// database/migrations/xxxx_xx_xx_xxxxxx_add_parent_id_to_komentars_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('komentars', function (Blueprint $table) {
            // Kolom untuk menyimpan ID komentar induk (jika ini adalah balasan)
            $table->foreignId('parent_id')->nullable()->constrained('komentars')->onDelete('cascade')->after('articleid');
        });
    }

    public function down(): void
    {
        Schema::table('komentars', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
            $table->dropColumn('parent_id');
        });
    }
};