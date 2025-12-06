<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SiteStat;
use App\Models\Testimonial;

class SiteDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed site statistics
        $stats = [
            ['key' => 'schools', 'label' => 'Sekolah/Madrasah', 'value' => 359, 'order' => 1],
            ['key' => 'partners', 'label' => 'Lembaga Partner', 'value' => 242, 'order' => 2],
            ['key' => 'provinces', 'label' => 'Provinsi', 'value' => 24, 'order' => 3],
        ];

        foreach ($stats as $stat) {
            SiteStat::updateOrCreate(
                ['key' => $stat['key']],
                $stat
            );
        }

        // Seed testimonials
        $testimonials = [
            [
                'quote' => 'Platform ini benar-benar mengubah cara kami mengelola administrasi. Semuanya menjadi lebih efisien dan terorganisir.',
                'name' => 'Budi Santoso',
                'title' => 'Kepala Sekolah, SMA Negeri 1',
                'avatar' => null,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'quote' => 'Sebagai orang tua, saya merasa lebih terhubung dengan perkembangan anak saya di sekolah berkat aplikasi ini. Luar biasa!',
                'name' => 'Citra Lestari',
                'title' => 'Orang Tua Murid',
                'avatar' => null,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'quote' => 'Fitur e-learning dan pembayaran non-tunai sangat membantu. Ini adalah inovasi yang dibutuhkan dunia pendidikan saat ini.',
                'name' => 'Ahmad Dahlan',
                'title' => 'Ketua Yayasan Pendidikan',
                'avatar' => null,
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
