<?php
// nama file: xxxx_xx_xx_xxxxxx_add_slug_and_status_to_kategoris_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('kategoris', function (Blueprint $table) {
            // $table->string('slug')->unique()->after('nama_kategori');
            $table->enum('status', ['active', 'inactive'])->default('active')->after('slug');
        });
    }

    public function down(): void
    {
        Schema::table('kategoris', function (Blueprint $table) {
            $table->dropColumn(['slug', 'status']);
        });
    }
};