<?php

namespace Database\Seeders;

use App\Models\dembook;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Schema;

class DembookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Praktik yang baik untuk membersihkan tabel sebelum seeding ulang
        Schema::disableForeignKeyConstraints();
        dembook::truncate();
        Schema::enableForeignKeyConstraints();

        $faker = Faker::create('id_ID'); // Menggunakan lokal Indonesia untuk data yang lebih relevan

        $jenisLembaga = ['SMA/SMK', 'Pesantren', 'Universitas', 'SD/MI', 'SMP/MTS'];
        $posisi = ['Kepala Sekolah', 'Bendahara', 'Ketua Yayasan', 'Guru IT', 'Staf Administrasi'];
        $estimasiSiswa = ['Kurang dari 100', '100 - 250', '251 - 500', '501 - 1000', 'Lebih dari 1000'];
        $fitur = ['Manajemen Keuangan', 'Absensi Digital', 'Pembayaran SPP', 'Kantin Digital', 'Perpustakaan Digital', 'E-Learning'];
        $sumberInfo = ['Google', 'Media Sosial (Facebook/Instagram)', 'Rekomendasi Teman', 'Iklan Online', 'Event Pendidikan'];

        for ($i = 0; $i < 10; $i++) {
            dembook::create([
                'nama_anda' => $faker->name,
                'sebagai' => $faker->randomElement($posisi),
                'nama_lembaga' => 'Yayasan Pendidikan ' . $faker->company,
                'jenis_lembaga' => $faker->randomElement($jenisLembaga),
                'estimasi_jumlah_siswa' => $faker->randomElement($estimasiSiswa),
                'nomor_hp' => $faker->phoneNumber,
                'kabupaten_kota' => $faker->city,
                'provinsi' => $faker->state,
                'kebutuhan_fitur' => json_encode($faker->randomElements($fitur, $faker->numberBetween(1, 4))),
                'mendengar_cazh_dari' => $faker->randomElement($sumberInfo),
                'is_done' => $faker->boolean(30), // 30% kemungkinan statusnya sudah selesai
            ]);
        }
    }
}
