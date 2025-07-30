<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Banprom;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    /**
     * Menampilkan halaman utama (landing page) dengan data dinamis.
     */
    public function index()
    {
        // Mengambil 3 artikel terbaru yang statusnya 'terpublikasi'
        $latestArticles = Article::with(['user', 'kategori'])
            ->where('status', 'terpublikasi')
            ->latest()
            ->take(3)
            ->get()
            ->map(fn ($article) => [
                'id' => $article->id,
                'slug' => $article->slug,
                'title' => $article->judul,
                'description' => $article->excerpt,
                'imageSrc' => $article->gambar_url, // Menggunakan accessor dari model
            ]);

        $activeBanners = Banprom::where('status', 'aktif')
            ->where('tglmulai', '<=', Carbon::now())
            ->where('tglakhir', '>=', Carbon::now())
            ->latest()
            ->get()
            ->map(fn ($banner) => [
                'id' => $banner->id,
                'judul' => $banner->judul,
                'gambar_url' => $banner->gambar_url, // Menggunakan accessor dari model
            ]);

        return Inertia::render('Index', [
            'articles' => $latestArticles,
            'banners' => $activeBanners,

        ]);
    }
}