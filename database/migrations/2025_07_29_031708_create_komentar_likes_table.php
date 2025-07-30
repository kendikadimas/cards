<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('komentar_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('komentar_id')->constrained('komentars')->onDelete('cascade');
            $table->timestamps();

            // Kunci unik agar satu user hanya bisa like satu komentar sekali
            $table->unique(['user_id', 'komentar_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('komentar_likes');
    }
};