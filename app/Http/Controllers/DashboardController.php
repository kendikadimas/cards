<?php

namespace App\Http\Controllers;

use App\Models\ArticleLike;
use App\Models\dembook;
use App\Models\Komentar;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Article;
use App\Models\Banprom;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Menampilkan halaman dashboard editor.
     *
     * @return \Inertia\Response
     */
    public function edashboard()
    {
        $totalArtikel = Article::count();
        $artikelPendingCount = Article::where('status', 'pending')->count();
        $artikelThisMonth = Article::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)->count();
        $totalMember = User::where('role', 'member')->count();

        // --- 2. Hitung Data Progres untuk Deskripsi Dinamis ---
        // Progres Total Artikel
        $articlesLastMonth = Article::whereMonth('created_at', Carbon::now()->subMonth()->month)->count();
        $articleProgress = ($articlesLastMonth > 0) ? (($totalArtikel - $articlesLastMonth) / $articlesLastMonth) * 100 : ($totalArtikel > 0 ? 100 : 0);

        // Progres Artikel Pending (contoh: pending baru dalam 7 hari terakhir)
        $newPendingArticles = Article::where('status', 'pending')->where('created_at', '>=', Carbon::now()->subDays(7))->count();

        // Progres Member Baru
        $membersLastMonth = User::where('role', 'member')->whereMonth('created_at', Carbon::now()->subMonth()->month)->count();
        $memberProgress = ($membersLastMonth > 0) ? (($totalMember - $membersLastMonth) / $membersLastMonth) * 100 : ($totalMember > 0 ? 100 : 0);

        // --- 3. Kumpulkan Data Statistik untuk Frontend ---
        $stats = [
            'totalArtikel' => $totalArtikel,
            'artikelPending' => $artikelPendingCount,
            'artikelBulanIni' => $artikelThisMonth,
            'totalMember' => $totalMember,
            // Data progres
            'articleProgress' => round($articleProgress),
            'newPending' => $newPendingArticles,
            'memberProgress' => round($memberProgress),
        ];

        // 2. Ambil 5 Artikel Pending Terbaru
        $pendingArticles = Article::with('user') // Eager load user untuk mendapatkan nama author
            ->where('status', 'pending')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($article) => [
                'id' => $article->id,
                'title' => $article->judul,
                'author' => $article->user->name ?? 'N/A',
                'time' => $article->created_at->diffForHumans(),
            ]);

        // 3. Ambil 5 Aktivitas Terbaru (Contoh: artikel baru dibuat atau disetujui)
        $recentActivities = Article::with('user')
            ->whereIn('status', ['pending', 'terpublikasi'])
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($article) => [
                'id' => $article->id,
                'type' => $article->status === 'pending' ? 'submitted' : 'approved',
                'text' => $article->status === 'pending'
                    ? "Artikel baru \"{$article->judul}\" dikirim"
                    : "Artikel \"{$article->judul}\" telah disetujui",
                'time' => $article->updated_at->diffForHumans(),
            ]);

        return Inertia::render('DashboardEditor', [
            'stats' => $stats,
            'pendingArticles' => $pendingArticles,
            'recentActivities' => $recentActivities,
        ]);
    }

    /**
     * Menampilkan halaman dashboard member.
     *
     * @return \Inertia\Response
     */
    public function mdashboard()
    {
        $user = Auth::user();


        // 1. Mengambil SEMUA Promo Aktif Terbaru
        $activePromos = Banprom::where('status', 'aktif')
            ->where('tglmulai', '<=', Carbon::now())
            ->where('tglakhir', '>=', Carbon::now())
            ->latest()
            ->get() // <-- Diubah dari first() menjadi get()
            ->map(fn($promo) => [
                'id' => $promo->id,
                'imageSrc' => $promo->gambar_url,
                'title' => $promo->judul,
                'description' => 'Promo berlaku hingga ' . $promo->tglakhir->format('d M Y'),
            ]);

        // 2. Mengambil Statistik Pengguna Sesuai Database Baru
        $userArticleIds = $user->articles()->pluck('id');

        $userStats = [
            [
                'title' => 'Total Artikel',
                'value' => $user->articles()->count(),
                'description' => 'Artikel Terposting',
                'colorClass' => 'bg-primary',
            ],
            [
                'title' => 'Total Like',
                // Menghitung total like dari tabel article_likes berdasarkan artikel milik user
                'value' => ArticleLike::whereIn('article_id', $userArticleIds)->count(),
                'description' => 'Like Diterima',
                'colorClass' => 'bg-primary',
            ],
            [
                'title' => 'Total Komentar',
                // Menghitung total komentar dari relasi
                'value' => $user->articles()->withCount('komentars')->get()->sum('komentars_count'),
                'description' => 'Komentar Diterima',
                'colorClass' => 'bg-primary',
            ],
        ];

        // 3. Mengambil Semua Artikel yang sudah dipublikasikan
        $latestArticles = Article::where('status', 'terpublikasi')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'slug' => $article->slug,
                    'imageSrc' => $article->gambar_url,
                    'title' => $article->judul,
                    'timeRead' => rand(5, 15) . ' min read',
                    'link' => route('articles.show', $article->slug),
                ];
            });

        return Inertia::render('Member/Index', [
            'promos' => $activePromos,
            'stats' => $userStats,
            'articles' => $latestArticles
        ]);
    }

    /**
     * Menampilkan halaman dashboard admin.
     *
     * @return \Inertia\Response
     */
    public function adashboard()
    {
        // --- 1. Statistik Utama ---
        $totalArticles = Article::count();
        $totalUsers = User::count();
        $totalDemos = dembook::count();
        $pendingArticles = Article::where('status', 'pending')->count();
        $activeBanners = Banprom::where('status', 'aktif')
            ->where('tglakhir', '>=', Carbon::now())
            ->count();

        // --- 2. Perhitungan Progres untuk Deskripsi ---
        // Progres Total Artikel
        $articlesLastMonth = Article::whereMonth('created_at', Carbon::now()->subMonth()->month)->count();
        $articlesThisMonth = Article::whereMonth('created_at', Carbon::now()->month)->count();
        $articleProgress = 0;
        if ($articlesLastMonth > 0) {
            $articleProgress = (($articlesThisMonth - $articlesLastMonth) / $articlesLastMonth) * 100;
        } elseif ($articlesThisMonth > 0) {
            $articleProgress = 100; // Jika bulan lalu 0, dan bulan ini > 0, anggap kenaikan 100%
        }

        // Progres Total Pengguna
        $usersLastMonth = User::whereMonth('created_at', Carbon::now()->subMonth()->month)->count();
        $usersThisMonth = User::whereMonth('created_at', Carbon::now()->month)->count();
        $userProgress = 0;
        if ($usersLastMonth > 0) {
            $userProgress = (($usersThisMonth - $usersLastMonth) / $usersLastMonth) * 100;
        } elseif ($usersThisMonth > 0) {
            $userProgress = 100;
        }

        // Banner Baru (contoh: banner baru dalam 7 hari terakhir)
        $newBannersCount = Banprom::where('created_at', '>=', Carbon::now()->subDays(7))->count();

        // --- 3. Kumpulkan semua data statistik ---
        $stats = [
            'totalArticles' => $totalArticles,
            'articleProgress' => round($articleProgress),
            'totalUsers' => $totalUsers,
            'userProgress' => round($userProgress),
            'totalDemos' => $totalDemos,
            'pendingArticles' => $pendingArticles,
            'activeBanners' => $activeBanners,
            'newBanners' => $newBannersCount,
        ];

        $articleChartQuery = Article::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('count(*) as count')
        )
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        $articleChartData = $articleChartQuery->map(function ($item) {
            return [
                'month' => Carbon::create()->month($item->month)->format('M'),
                'count' => $item->count,
            ];
        });

        // Ambil data lain untuk bagian dashboard (Aktivitas, Artikel Pending, dll.)
        $pendingArticlesList = Article::with('user')
            ->where('status', 'pending')
            ->latest()->take(5)->get()->map(fn($article) => [
                'id' => $article->id,
                'title' => $article->judul,
                'author' => $article->user->name ?? 'N/A',
                'timeAgo' => $article->created_at->diffForHumans(),
            ]);

        $usersForManagement = User::latest()->take(5)->get()->map(fn($user) => [
            'id' => $user->id,
            'profileImage' => $user->profile_image_url,
            'name' => $user->name,
            'role' => ucfirst($user->role),
        ]);

        // Anda bisa menambahkan logika untuk recentActivities di sini
        $latestArticles = Article::with('user')->latest()->take(3)->get();
        $latestUsers = User::latest()->take(3)->get();

        $activities = collect();

        foreach ($latestArticles as $article) {
            $activities->push([
                'id' => 'article-' . $article->id,
                'icon' => 'FileText',
                'iconColorClass' => 'text-blue-500',
                'text' => "Artikel \"{$article->judul}\" dikirim oleh {$article->user->name}",
                'time' => $article->created_at->diffForHumans(),
            ]);
        }

        foreach ($latestUsers as $user) {
            $activities->push([
                'id' => 'user-' . $user->id,
                'icon' => 'UserPlus',
                'iconColorClass' => 'text-green-500',
                'text' => "Pengguna baru \"{$user->name}\" telah mendaftar.",
                'time' => $user->created_at->diffForHumans(),
            ]);
        }

        $recentActivities = $activities->sortByDesc(function ($activity) {
            // Ini asumsi kasar, idealnya timestamp asli disimpan
            return Carbon::parse(str_replace(' ago', '', $activity['time']))->timestamp;
        })->take(5)->values();

        $activePromotions = Banprom::where('status', 'aktif')
            ->where('tglmulai', '<=', Carbon::now())
            ->where('tglakhir', '>=', Carbon::now())
            ->latest()
            ->get()
            ->map(fn($promo) => [
                'id' => $promo->id,
                'judul' => $promo->judul,
                'gambar' => Storage::url($promo->gambar),
                'status' => $promo->status,
                'tglmulai' => $promo->tglmulai->format('d M Y'),
                'tglakhir' => $promo->tglakhir->format('d M Y'),
            ]);

        // dd($articleChartData);

        return Inertia::render('DashboardAdmin', [
            'stats' => $stats,
            'articleChartData' => $articleChartData,
            'recentActivities' => $recentActivities,
            'activeBanproms' => $activePromotions,
            'pendingArticles' => $pendingArticlesList,
            'usersForManagement' => $usersForManagement,
        ]);
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
        $user = auth()->user(); // Ambil user yang sedang login

        // Statistik Total
        $totalPublished = $user->articles()->where('status', 'terpublikasi')->count();
        $totalPending = $user->articles()->where('status', 'pending')->count();
        $totalLikes = DB::table('article_likes')
            ->whereIn('article_id', $user->articles->pluck('id'))
            ->count();
        $totalComments = DB::table('komentars')
            ->whereIn('articleid', $user->articles->pluck('id'))
            ->count();
        // Asumsi 'read_count' adalah kolom di tabel 'articles' atau ada tabel 'article_reads'
        $totalReads = $user->articles()->sum('read_count'); // Jika ada kolom read_count di tabel articles
        // ATAU jika Anda memiliki tabel terpisah untuk reads, seperti ini:
        // $totalReads = DB::table('article_reads')->whereIn('article_id', $user->articles->pluck('id'))->count();


        // Data historis untuk Chart (Contoh: artikel yang dipublikasikan per bulan)
        $publishedOverTime = $user->articles()
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'), // Asumsi ada kolom published_at
                DB::raw('count(*) as value')
            )
            ->where('status', 'terpublikasi')
            ->whereNotNull('created_at') // Penting: hanya hitung yang sudah punya tanggal publikasi
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => Carbon::parse($item->month)->format('M Y'),
                    'value' => (int) $item->value,
                ];
            })
            ->toArray();

        // Data historis untuk Artikel Pending per bulan (menggunakan created_at)
        $pendingOverTime = $user->articles()
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
                DB::raw('count(*) as value')
            )
            ->where('status', 'pending')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => Carbon::parse($item->month)->format('M Y'),
                    'value' => (int) $item->value,
                ];
            })
            ->toArray();

        // Data historis untuk Total Like Diterima per bulan
        // Ini lebih kompleks karena like bisa terjadi kapan saja pada artikel yang sudah ada.
        // Anda perlu join ke tabel artikel untuk mendapatkan created_at artikel, atau
        // lebih baik lagi jika tabel article_likes memiliki kolom created_at sendiri.
        $likesOverTime = DB::table('article_likes')
            ->select(
                DB::raw('DATE_FORMAT(article_likes.created_at, "%Y-%m") as month'), // Asumsi article_likes punya created_at
                DB::raw('count(*) as value')
            )
            ->join('articles', 'article_likes.article_id', '=', 'articles.id')
            ->where('articles.userid', $user->id)
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => Carbon::parse($item->month)->format('M Y'),
                    'value' => (int) $item->value,
                ];
            })
            ->toArray();

        // Data historis untuk Total Komentar per bulan
        // Mirip dengan likes, asumsikan tabel komentars memiliki created_at
        $commentsOverTime = DB::table('komentars')
            ->select(
                DB::raw('DATE_FORMAT(komentars.created_at, "%Y-%m") as month'), // Asumsi komentars punya created_at
                DB::raw('count(*) as value')
            )
            ->join('articles', 'komentars.articleid', '=', 'articles.id') // Perhatikan 'articleid' di tabel komentars
            ->where('articles.userid', $user->id)
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => Carbon::parse($item->month)->format('M Y'),
                    'value' => (int) $item->value,
                ];
            })
            ->toArray();

        // Data historis untuk Total Pembacaan Artikel per bulan
        // Jika read_count di tabel articles diupdate terus menerus (agregat), maka Anda perlu logs dari setiap bacaan.
        // Asumsi sederhana: jika ada tabel 'article_reads' dengan kolom 'created_at' untuk setiap bacaan.
        // Jika tidak ada tabel terpisah, ini akan lebih sulit dibuat historisnya per bulan.
        // Untuk demo, kita bisa asumsikan articles.created_at dan menghitung total article published saat itu.
        // ATAU jika read_count adalah kolom di tabel articles, Anda bisa menghitung sum read_count per bulan artikel dipublikasi (kurang akurat untuk historis reads).
        // SOLUSI SEMENTARA UNTUK READS: Menggunakan published_at dan sum read_count dari artikel yang dipublikasikan pada bulan itu. Ini tidak menunjukkan reads real-time.
        $readsOverTime = $user->articles()
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
                DB::raw('SUM(read_count) as value') // Sum read_count per bulan
            )
            ->where('status', 'terpublikasi')
            ->whereNotNull('created_at')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => Carbon::parse($item->month)->format('M Y'),
                    'value' => (int) $item->value,
                ];
            })
            ->toArray();


        return Inertia::render('Member/Analytics', [
            'stats' => [
                'total_published' => $totalPublished,
                'total_pending' => $totalPending,
                'total_likes' => $totalLikes,
                'total_comments' => $totalComments,
                'total_reads' => $totalReads, // Pastikan ini juga dikirim
                'published_over_time' => $publishedOverTime,
                'pending_over_time' => $pendingOverTime, // BARU
                'likes_over_time' => $likesOverTime,   // BARU
                'comments_over_time' => $commentsOverTime, // BARU
                'reads_over_time' => $readsOverTime,    // BARU
            ]
        ]);
    }
}
