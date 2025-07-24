<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\User;
use App\Models\Kategori; // Import model Kategori
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str; // Import Str facade for slug generation

class ArticleController extends Controller
{
    /**
     * Menampilkan halaman kelola artikel dengan daftar artikel.
     */
    public function manageArticles()
    {
        // Ambil semua artikel dengan eager loading penulis dan kategori, lalu paginasi
        $articles = Article::with(['user', 'kategori'])
                            ->orderBy('created_at', 'desc')
                            ->paginate(10) // Menggunakan paginate
                            ->through(function ($article) { // Memetakan data untuk frontend
                                return [
                                    'id' => $article->id,
                                    'title' => $article->judul, // Sesuaikan dengan nama kolom di DB
                                    'excerpt' => $article->excerpt, // Menggunakan accessor
                                    'author' => $article->user->name ?? 'N/A',
                                    'status' => ucfirst($article->status),
                                    'date' => $article->formatted_date, // Menggunakan accessor
                                    'slug' => $article->slug, // Menggunakan slug
                                    'image_url' => $article->gambar_url, // Menggunakan accessor gambar_url
                                    'kategori_id' => $article->kategori_id, // Tambahkan kategori_id
                                    'category_name' => $article->kategori->nama_kategori ?? 'Uncategorized', // Nama kategori
                                ];
                            });

        return Inertia::render('KelolaArtikel', [
            'articles' => $articles,
        ]);
    }

    /**
     * Menampilkan halaman review artikel tunggal.
     */
    public function reviewArticle(Article $article)
    {
        // Eager load user dan kategori untuk mendapatkan nama penulis dan kategori
        $article->load(['user', 'kategori']);

        // Format data artikel untuk tampilan React
        $formattedArticle = [
            'id' => $article->id,
            'title' => $article->judul,
            'author' => $article->user->name ?? 'N/A',
            'date' => $article->formatted_date,
            'image_url' => $article->gambar_url, // Menggunakan accessor gambar_url
            'body_html' => $article->konten, // Asumsi konten disimpan sebagai HTML
            'status' => ucfirst($article->status),
            'slug' => $article->slug,
            'kategori_id' => $article->kategori_id, // Tambahkan kategori_id
            'category_name' => $article->kategori->nama_kategori ?? 'Uncategorized', // Nama kategori
        ];

        return Inertia::render('ReviewArtikel', [
            'article' => $formattedArticle,
        ]);
    }

    /**
     * Menampilkan form untuk membuat artikel baru.
     */
    public function create()
    {
        $categories = Kategori::all()->map(function ($category) {
            return [
                'id' => $category->id,
                'nama_kategori' => $category->nama_kategori,
            ];
        });

        return Inertia::render('CreateArticle', [
            'categories' => $categories,
        ]);
    }

    /**
     * Menyimpan artikel baru ke database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|min:3|max:255',
            'kategori_id' => 'required|exists:kategoris,id', // Validasi kategori_id
            'image' => 'nullable|url|max:255', // Validasi URL untuk gambar
            'description' => 'required|string|min:10',
        ]);

        $user = Auth::user();

        Article::create([
            'userid' => $user->id, // Menggunakan 'userid' sesuai model
            'judul' => $request->title,
            'slug' => Str::slug($request->title), // Generate slug dari judul
            'gambar' => $request->image,
            'konten' => $request->description,
            'status' => 'pending', // Default status saat artikel baru ditambahkan
            'kategori_id' => $request->kategori_id, // Simpan kategori_id
            // 'excerpt' tidak perlu diisi karena akan dihasilkan oleh accessor
            // 'like' dan 'dislike' akan default ke 0 atau diisi di tempat lain
        ]);

        return redirect()->route('articles.manage')->with('success', 'Artikel berhasil ditambahkan dan menunggu review!');
    }

    /**
     * Mengubah status artikel menjadi 'Published'.
     */
    public function publishArticle(Article $article)
    {
        $article->status = 'published';
        $article->save();

        return redirect()->back()->with('success', 'Artikel berhasil dipublikasikan!');
    }

    /**
     * Mengubah status artikel menjadi 'Rejected'.
     */
    public function rejectArticle(Request $request, Article $article)
    {
        $request->validate([
            'reasons' => 'required|array',
            'reasons.*' => 'string',
        ]);

        $article->status = 'rejected';
        // Anda bisa menyimpan alasan penolakan di kolom terpisah jika ada, misal 'rejection_reasons'
        // $article->rejection_reasons = json_encode($request->reasons);
        $article->save();

        return redirect()->back()->with('success', 'Artikel berhasil ditolak!');
    }

    /**
     * Menghapus artikel.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return redirect()->back()->with('success', 'Artikel berhasil dihapus.');
    }
}
