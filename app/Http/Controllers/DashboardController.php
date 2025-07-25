<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Article;
use App\Models\Banprom;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Menampilkan halaman dashboard editor.
     *
     * @return \Inertia\Response
     */
    public function edashboard()
    {
        $totalartikel = Article::count();
        $artikelpending = Article::where('status', 'pending')->count();
        $artikelthismonth = Article::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)->count();
        $totalMember = User::count();

        return Inertia::render(
            'DashboardEditor',
            [
                'totalartikel' => $totalartikel,
                'artikelpending' => $artikelpending,
                'artikelthismonth' => $artikelthismonth,
                'totalMember' => $totalMember
            ]
        );
    }

    /**
     * Menampilkan halaman dashboard member.
     *
     * @return \Inertia\Response
     */
    public function mdashboard()
    {
        $user = Auth::user();

        // 1. Mengambil Promo Aktif Terbaru
        $activePromo = Banprom::where('status', 'aktif')
            ->where('tglmulai', '<=', Carbon::now())
            ->where('tglakhir', '>=', Carbon::now())
            ->latest()
            ->first();

        // 2. Mengambil Statistik Pengguna
        $userStats = [
            [
                'title' => 'Total Artikel',
                'value' => $user->articles()->count(),
                'description' => 'Artikel Terposting',
                'colorClass' => 'bg-primary',
            ],
            [
                'title' => 'Total Like',
                'value' => $user->articles()->sum('like'), // Asumsi ada kolom 'like'
                'description' => 'Like Diterima',
                'colorClass' => 'bg-primary',
            ],
            [
                'title' => 'Total Komentar',
                'value' => 0, // Ganti dengan logika comment jika ada
                'description' => 'Komentar Diterima',
                'colorClass' => 'bg-primary',
            ],
        ];

        // 3. Mengambil Artikel Rekomendasi (3 artikel terbaru yang bukan milik user)
        $allArticles = Article::where('status', 'terpublikasi')
            ->latest()
            ->get() // Mengambil semua hasil tanpa batasan
            ->map(function ($article) {
                return [
                    'imageSrc' => $article->gambar_url, // Menggunakan accessor dari model Article
                    'title' => $article->judul,
                    'timeRead' => rand(5, 20) . 'm', // Waktu baca bisa dibuat dinamis jika perlu
                    'link' => route('articles.review', $article->id), // Contoh link ke detail artikel
                ];
            });


        return Inertia::render('Member/Index', [
            'promo' => $activePromo ? [
                'imageSrc' => Storage::url($activePromo->gambar),
                'title' => $activePromo->judul,
                'description' => 'Promo berlaku hingga ' . $activePromo->tglakhir->format('d M Y'),
            ] : null,
            'stats' => $userStats,
            'articles' => $allArticles
        ]);
    }

    /**
     * Menampilkan halaman dashboard admin.
     *
     * @return \Inertia\Response
     */
    public function adashboard()
    {
        // Statistik Ringkasan
        $totalArticles = Article::count();
        $totalUsers = User::count();
        $pendingReviewCount = Article::where('status', 'pending')->count();
        $activeBanpromsCount = Banprom::where('status', 'aktif') // Menggunakan 'aktif'
                                    ->where('tglmulai', '<=', Carbon::now())
                                    ->where('tglakhir', '>=', Carbon::now())
                                    ->count();

        // Aktivitas Terbaru (contoh data dinamis)
        // Anda bisa mengambil ini dari log aktivitas atau event yang relevan
        $recentActivities = [
            [
                'icon' => 'CheckCircle', // Nama ikon Lucide
                'text' => "Artikel 'Tips Marketing Digital' dipublikasi",
                'time' => "10 menit yang lalu",
                'iconColorClass' => "h-5 w-5 text-green-500",
            ],
            [
                'icon' => 'UserPlus',
                'text' => "15 Pengguna Baru Terdaftar",
                'time' => "30 menit yang lalu",
                'iconColorClass' => "h-5 w-5 text-blue-500",
            ],
            [
                'icon' => 'Megaphone',
                'text' => "Banner sale '50%' di aktifkan",
                'time' => "30 menit yang lalu",
                'iconColorClass' => "h-5 w-5 text-purple-500",
            ],
        ];

        // Artikel Pending (contoh data dinamis)
        $pendingArticles = Article::where('status', 'pending')
                                ->orderBy('created_at', 'desc')
                                ->limit(2)
                                ->get()
                                ->map(function ($article) {
                                    return [
                                        'id' => $article->id,
                                        'title' => $article->judul, // Menggunakan 'judul'
                                        'author' => $article->user->name ?? 'N/A', // Asumsi ada relasi dengan User
                                        'timeAgo' => $article->created_at->diffForHumans(),
                                    ];
                                });

        // Manajemen Pengguna (contoh data dinamis)
        $usersForManagement = User::orderBy('created_at', 'desc')
                                ->limit(3)
                                ->get()
                                ->map(function ($user) {
                                    return [
                                        'id' => $user->id,
                                        'profileImage' => $user->profile_image ?? '/placeholder.svg?height=40&width=40',
                                        'name' => $user->name,
                                        'role' => ucfirst($user->role),
                                    ];
                                });

        // Promosi Aktif (menggunakan Banprom)
        $activeBanproms = Banprom::where('status', 'aktif') // Menggunakan 'aktif'
                                ->where('tglmulai', '<=', Carbon::now())
                                ->where('tglakhir', '>=', Carbon::now())
                                ->orderBy('tglakhir', 'asc')
                                ->limit(3)
                                ->get()
                                ->map(function ($banprom) {
                                    return [
                                        'id' => $banprom->id,
                                        'gambar' => $banprom->gambar, // Menggunakan 'gambar'
                                        'judul' => $banprom->judul,   // Menggunakan 'judul'
                                        'status' => ucfirst($banprom->status), // Menggunakan 'status'
                                        'tglmulai' => $banprom->tglmulai->format('d M Y'), // Menggunakan 'tglmulai'
                                        'tglakhir' => $banprom->tglakhir->format('d M Y'), // Menggunakan 'tglakhir'
                                    ];
                                });

        $data = [
            'stats' => [
                'totalArticles' => $totalArticles,
                'totalUsers' => $totalUsers,
                'pendingReviewCount' => $pendingReviewCount,
                'activeBanpromsCount' => $activeBanpromsCount,
            ],
            'recentActivities' => $recentActivities,
            'pendingArticles' => $pendingArticles,
            'usersForManagement' => $usersForManagement,
            'activeBanproms' => $activeBanproms,
        ];

        // Debugging: Uncomment baris di bawah ini untuk melihat data yang dikirim ke frontend
        // dd($data);

        return Inertia::render('DashboardAdmin', $data); // Pastikan path ini sesuai dengan lokasi file React Anda
    }
    

    /**
     * Menampilkan daftar semua pengguna.
     */
    public function usersIndex()
    {
        $users = User::orderBy('created_at', 'desc')
            ->get()
            ->map(function ($user) {
                // Contoh dummy untuk gambar profil yang berbeda
                $profileImage = '/placeholder.svg?height=40&width=40'; // Default placeholder
                if ($user->id % 2 === 0) {
                    $profileImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kelola%20user-5vjoSxnrqkt6K0sHWF6HUV5CNGvy5m.png'; // Gambar 1
                } else {
                    $profileImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kelola%20user-show-LvAbG2HkYHBPUkdzwCXZPQQ64NCwba.png'; // Gambar 2
                }

                return [
                    'id' => $user->id,
                    'profileImage' => $profileImage,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone_number ?? 'N/A', // Asumsi ada kolom phone_number
                    'role' => ucfirst($user->role), // Asumsi ada kolom role
                ];
            });

        return Inertia::render('Admin/User/Index', [ // PATH BARU: Admin/User/Index
            'users' => $users,
        ]);
    }

    /**
     * Menampilkan detail pengguna tertentu.
     */
    public function usersShow(User $user)
    {
        // Dummy data untuk artikel yang dikirim oleh pengguna
        $dummyArticles = [
            [
                'id' => 'a1',
                'title' => 'Bayar Jajan dan Absen Sekolah Cukup Pakai Kartu CAZH!',
                'author' => $user->name,
                'date' => '30 Juni 2025',
                'category' => 'Sekolah Cahaya Insani',
                'status' => 'Pending',
                'views' => '117',
            ],
            [
                'id' => 'a2',
                'title' => 'Pentingnya Digitalisasi bagi Pesantren',
                'author' => $user->name,
                'date' => '30 Juni 2025',
                'category' => 'User Experience',
                'status' => 'Terpublikasi',
                'views' => '117',
            ],
        ];

        // Dummy data untuk aktivitas terbaru pengguna
        $dummyActivities = [
            [
                'id' => 'act1',
                'type' => 'article-sent',
                'description' => 'Artikel baru “Transaksi Tanpa Tunai Jadi Mudah Bersama CAZH” dikirim',
                'time' => '10 menit yang lalu',
            ],
            [
                'id' => 'act2',
                'type' => 'article-approved',
                'description' => 'Artikel “Pentingnya Digitalisasi bagi Pesantren” disetujui',
                'time' => '15 menit yang lalu',
            ],
            [
                'id' => 'act3',
                'type' => 'article-sent',
                'description' => 'Artikel baru “Bayar Jajan dan Absen Sekolah Cukup Pakai Kartu CAZH!” dikirim',
                'time' => '18 menit yang lalu',
            ],
        ];

        return Inertia::render('Admin/User/Detail', [ // PATH BARU: Admin/User/Detail
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone_number ?? 'N/A',
                'role' => ucfirst($user->role),
                'profileImage' => $user->profile_image ?? '/placeholder.svg?height=80&width=80',
            ],
            'articles' => $dummyArticles,
            'activities' => $dummyActivities,
        ]);
    }

    /**
     * Memperbarui data pengguna.
     */
    public function usersUpdate(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'role' => 'required|string|in:Member,Editor,Admin,Super Admin',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone,
            'role' => $request->role,
        ]);

        return redirect()->back()->with('success', 'Data pengguna berhasil diperbarui.');
    }

    /**
     * Menghapus pengguna.
     */
    public function usersDestroy(User $user)
    {
        $user->delete();
        return redirect()->back()->with('success', 'Pengguna berhasil dihapus.');
    }

    /**
     * Menampilkan halaman analitik untuk member.
     */
    public function memberAnalytics()
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();

        // Ambil semua artikel milik pengguna
        $articles = $user->articles();

        // Hitung semua statistik yang diperlukan
        $stats = [
            'total_published' => (clone $articles)->where('status', 'terpublikasi')->count(),
            'total_pending' => (clone $articles)->where('status', 'pending')->count(),
            'total_likes' => (clone $articles)->sum('like'),
            'total_comments' => 0, // Ganti dengan logika comment jika ada
        ];

        return Inertia::render('Member/Analytics', [
            'stats' => $stats,
        ]);
    }
}
