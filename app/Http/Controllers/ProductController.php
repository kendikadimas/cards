<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Menampilkan halaman detail produk berdasarkan slug.
     */
    public function show($slug)
    {
        // Data untuk semua produk disimpan di sini untuk kemudahan.
        // Dalam aplikasi nyata, ini bisa diambil dari database.
        $allProducts = [
            'cards-parents' => [
                'name' => 'Cards Parents',
                'description' => 'Aplikasi pendukung yang digunakan oleh orang tua untuk memantau perkembangan dan aktivitas anak di sekolah mitra PT Cazh Teknologi Inovasi. Aplikasi ini memungkinkan orang tua untuk mengelola pembayaran, tagihan, dan transaksi digital dengan mudah, aman, dan terintegrasi dengan sistem sekolah.',
                'icon' => '/images/cards-parent.svg', // Ganti dengan path ikon Anda
                'features' => [
                    ['icon' => 'receipt-text', 'title' => 'Kantin Non-Tunai', 'description' => 'Transaksi di kantin bisa menggunakan uang saku digital secara non-tunai yang aman dilengkapi dengan PIN transaksi.'],
                    ['icon' => 'landmark', 'title' => 'Tagihan Sekolah', 'description'=> 'Transaksi tagihan sekolah bisa dilakukan dengan mudah dan cepat.'],
                    ['icon' => 'store', 'title' => 'Toko Online Internal', 'description' => 'Aplikasi kantin dengan fitur lengkap dapat menerima transaksi digital dari kartu siswa (uang saku digital) dan e-wallet.'],
                    ['icon' => 'file-text', 'title' => 'General Bill', 'description' => 'Aplikasi kantin dengan fitur lengkap dapat menerima transaksi digital dari kartu siswa (uang saku digital) dan e-wallet.'],
                ],
                'unique_section' => [
                    'type' => 'cards-parent',
                    'data' => [
                        'pre_title' => '— Orang Tua Gak Risau',
                        'title' => 'Aplikasi Orang Tua Bantu Memantau Aktivitas Anak',
                        'description' => 'Terhubung real-time 24/7 antara orang tua, lembaga dan siswa.',
                        'features' => [
                            'Kelola uang saku anak',
                            'Pantau progres pendidikan anak',
                            'Monitor & bayar online tagihan sekolah',
                            'Selalu mendapatkan informasi terbaru dari sekolah',
                            'Terlibat dalam pengkinian data anak dengan mudah',
                        ],
                        'image_url' => '/images/aplikasi-orang-tua.png',
                    ]
                ]
            ],
            'cards-edu' => [
                'name' => 'Cards Edu',
                'description' => 'Aplikasi pembelajaran daring yang digunakan oleh siswa dan guru untuk menjalankan kegiatan belajar-mengajar secara online. Aplikasi ini mendukung pengiriman tugas, ujian digital, diskusi materi, serta pelacakan progres belajar secara interaktif dan efisien.',
                'icon' => '/images/cards-edu.png', // Ganti dengan path ikon Anda
                'features' => [
                    ['icon' => 'book-open', 'title' => 'Materi Belajar', 'description'=> 'Aplikasi siswa yang memudahkan mereka dalam kegiatan belajar, mengakses informasi, dan melakukan transaksi di lingkungan sekolah secara digital.'],
                    ['icon' => 'calendar-check', 'title' => 'Jadwal Pelajaran' , 'description'=> 'Aplikasi siswa yang memudahkan mereka dalam kegiatan belajar, mengakses informasi, dan melakukan transaksi di lingkungan sekolah secara digital.'],
                    ['icon' => 'clipboard-list', 'title' => 'Absensi Digital', 'description'=> 'Aplikasi siswa yang memudahkan mereka dalam kegiatan belajar, mengakses informasi, dan melakukan transaksi di lingkungan sekolah secara digital.'],
                    ['icon' => 'message-square', 'title' => 'Pesan & Pengumuman', 'description'=> 'Aplikasi siswa yang memudahkan mereka dalam kegiatan belajar, mengakses informasi, dan melakukan transaksi di lingkungan sekolah secara digital.'],
                ],
                'unique_section' => [
                    'type' => 'cards-edu',
                    'data' => [
                        'title' => 'Kini hadir untuk mempermudah belajar dan mengajar!',
                        'features' => [
                            "Jadwal Pelajaran – Cek jadwal dengan mudah.",
                            "Rekap Presensi – Pantau kehadiran kapan saja.",
                            "Tugas – Kelola tugas lebih rapi.",
                            "Jadwal Kegiatan – Jangan lewatkan acara penting.",
                            "Kesiswaan – Info siswa dalam satu tempat.",
                            "Rapor – Lihat hasil belajar langsung dari HP-mu.",
                            "Rekap Keuangan – Cek alur uang dari Kartu-mu"
                        ],
                        'image_url' => '/images/cards-edu-promo.png' // Ganti dengan path gambar Anda
                    ]
                ]
            ],
            'cards-school' => [ 
                'name'=> 'Cards School',
                'description'=> 'Aplikasi utama yang digunakan oleh pihak sekolah untuk mengelola administrasi, data akademik, dan aktivitas operasional secara digital. Aplikasi ini mendukung pencatatan absensi, pelaporan nilai, hingga pengelolaan kalender sekolah secara terpusat, aman, dan terintegrasi.',
                'icon'=> '/images/cards-school.svg',
                'features'=> [
                    ['icon' => 'book-open', 'title' => 'Materi Belajar', 'description'=> 'Aplikasi siswa yang memudahkan mereka dalam kegiatan belajar, mengakses informasi, dan melakukan transaksi di lingkungan sekolah secara digital.'],
                    ['icon' => 'calendar-check', 'title' => 'Jadwal Pelajaran' , 'description'=> 'Aplikasi siswa yang memudahkan mereka dalam kegiatan belajar, mengakses informasi, dan melakukan transaksi di lingkungan sekolah secara digital.'],
                    ['icon' => 'clipboard-list', 'title' => 'Absensi Digital', 'description'=> 'Aplikasi siswa yang memudahkan mereka dalam kegiatan belajar, mengakses informasi, dan melakukan transaksi di lingkungan sekolah secara digital.'],
                    ['icon' => 'message-square', 'title' => 'Pesan & Pengumuman', 'description'=> 'Aplikasi siswa yang memudahkan mereka dalam kegiatan belajar, mengakses informasi, dan melakukan transaksi di lingkungan sekolah secara digital.'], 
                    ],
                'unique_section' => [
                    'type' => 'cards-school',
                    'data' => [
                        'title' => 'Urusan administrasi selesai dalam satu Dashboard',
                        'description' => 'Dashboard manajemen yang multi akses untuk mengelola segala kegiatan yang ada di lembaga.',
                        'features' => [
                            'Pendaftaran peserta didik baru (PPDB Online)',
                            'Manajemen database Siswa, Guru, Staff & Alumni',
                            'Manajemen data tagihan',
                            'Manajemen akademik',
                            'Manajemen keuangan',
                        ],
                        'image_url' => '/images/lembaga.svg'
                    ]
                ]
                ],
            'cards-canteen' => [
                'name'=> 'Cards Canteen',
                'description'=> 'CardsCanteen adalah aplikasi transaksi digital bagi siswa untuk membeli di kantin sekolah secara non-tunai, dengan fitur isi saldo, riwayat pembelian, dan pemantauan konsumsi harian yang terhubung ke sistem sekolah.',
                'icon'=> '/images/cards-canteen.png',
                'features'=> [
                   ['icon' => 'book-open', 'title' => 'Materi Belajar', 'description'=> 'Aplikasi siswa yang memudahkan mereka dalam kegiatan belajar, mengakses informasi, dan melakukan transaksi di lingkungan sekolah secara digital.'],
                    ['icon' => 'calendar-check', 'title' => 'Jadwal Pelajaran' , 'description'=> 'Aplikasi siswa yang memudahkan mereka dalam kegiatan belajar, mengakses informasi, dan melakukan transaksi di lingkungan sekolah secara digital.'],
                    ['icon' => 'clipboard-list', 'title' => 'Absensi Digital', 'description'=> 'Aplikasi siswa yang memudahkan mereka dalam kegiatan belajar, mengakses informasi, dan melakukan transaksi di lingkungan sekolah secara digital.'],
                    ['icon' => 'message-square', 'title' => 'Pesan & Pengumuman', 'description'=> 'Aplikasi siswa yang memudahkan mereka dalam kegiatan belajar, mengakses informasi, dan melakukan transaksi di lingkungan sekolah secara digital.'],
                ],    
                'unique_section' => [
                    'type' => 'cards-canteen',
                    'data' => [
                        'title' => 'Cashless di Kantin, Aman dan Mudah dengan Uang Saku Digital',
                        'description' => 'Transaksi di kantin bisa menggunakan uang saku digital secara non-tunai yang aman dilengkapi dengan PIN transaksi',
                        'cards' => [
                            ['title' => 'Kartu Siswa Berbasis QR Code', 'imageSrc' => '/images/kartu-siswa-qr-code.webp'],
                            ['title' => 'Kartu Siswa Berbasis RFID', 'imageSrc' => '/images/kartu-siswa-rfid.webp'],
                            ['title' => 'Gelang Siswa Berbasis RFID', 'imageSrc' => '/images/gelang-siswa-rfid.webp'],
                        ]
                    ]
                ]
            ],
        ];

        // Cek apakah produk dengan slug yang diminta ada
        if (!isset($allProducts[$slug])) {
            abort(404);
        }

        $productData = $allProducts[$slug];

        // Data partner (bisa sama untuk semua produk)
        $partners = [
            // Tambahkan path logo partner Anda di sini
            '/images/partners/Al Murozza Depok.webp',
            '/images/partners/PP MANQ Salebu Majenang Cilacap.webp',
            '/images/partners/PP Zaenab Masykur.webp',
            '/images/partners/ptq kaltara.webp',
            '/images/partners/Salam.webp',
            '/images/partners/SDIT Darul Hijrah.webp',
        ];

        return Inertia::render('ProductDetail', [
            'product' => $productData,
            'partners' => $partners
        ]);
    }
}