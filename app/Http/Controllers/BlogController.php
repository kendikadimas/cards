<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Kategori; // <-- Import model Kategori
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class BlogController extends Controller
{
    /**
     * Menampilkan halaman utama blog.
     */
    public function index(Request $request)
    {
        // --- 1. Ambil Artikel Unggulan (Featured Post) ---
        // Ini adalah satu artikel terbaru yang sudah dipublikasikan.
        $featuredArticle = Article::with(['user', 'kategori'])
            ->where('status', 'terpublikasi')
            ->latest()
            ->first();

        // --- 2. Ambil Daftar Artikel untuk Grid Utama ---
        $query = Article::with(['user', 'kategori'])
            ->where('status', 'terpublikasi');

        // Filter berdasarkan Kategori
        if ($request->filled('category')) {
            $query->whereHas('kategori', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Filter berdasarkan Urutan (Trending/Terbaru)
        if ($request->input('sort') === 'trending') {
            // Mengurutkan berdasarkan 'read_count'. Pastikan kolom ini ada di tabel articles Anda.
            $query->orderBy('read_count', 'desc');
        } else {
            // Default adalah urutan terbaru
            $query->latest();
        }

        $articles = $query->paginate(9)->withQueryString()
            ->through(fn ($article) => [
                'id' => $article->id,
                'slug' => $article->slug,
                'category' => $article->kategori->nama_kategori ?? 'Uncategorized',
                'title' => $article->judul,
                'imageSrc' => $article->gambar_url,
                'author' => $article->user->name,
                'date' => $article->created_at->isoFormat('D MMMM YYYY'),
            ]);

        // --- 3. Ambil Semua Kategori untuk Tombol Filter ---
        $categories = Kategori::where('status', 'active')->get(['nama_kategori', 'slug']);

        return Inertia::render('Blog', [
            'featuredArticle' => $featuredArticle ? [
                'slug' => $featuredArticle->slug,
                'category' => $featuredArticle->kategori->nama_kategori ?? 'Uncategorized',
                'title' => $featuredArticle->judul,
                'description' => $featuredArticle->excerpt,
                'imageSrc' => $featuredArticle->gambar_url,
                'author' => $featuredArticle->user->name,
                'date' => $featuredArticle->created_at->isoFormat('D MMMM YYYY'),
            ] : null,
            'articles' => $articles,
            'categories' => $categories,
            'filters' => $request->only(['category', 'sort']), // Kirim filter saat ini ke frontend
        ]);
    }
}
