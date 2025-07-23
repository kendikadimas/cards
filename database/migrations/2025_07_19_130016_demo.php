<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('demo_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('nama_anda');
            $table->string('sebagai');
            $table->string('nama_lembaga');
            $table->string('jenis_lembaga');
            $table->string('estimasi_jumlah_siswa')->nullable();
            $table->string('nomor_hp');
            $table->string('kabupaten_kota');
            $table->string('provinsi');
            $table->json('kebutuhan_fitur')->nullable();
            $table->string('mendengar_cazh_dari');
            $table->boolean('is_done')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demo_bookings');
    }
};
