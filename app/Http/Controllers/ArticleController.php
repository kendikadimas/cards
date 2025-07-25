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
        'categories' => Kategori::all(),
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
        $validatedData = $request->validate([
            'title' => 'required|string|min:3|max:255',
            'kategori_id' => 'required|exists:kategoris,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Diubah
            'description' => 'required|string|min:10',
        ]);
         $imagePath = null;
        $user = Auth::user();

        if ($request->hasFile('image')) {
            // Simpan file di dalam folder 'storage/app/public/articles'
            // Pastikan Anda sudah menjalankan `php artisan storage:link`
            $imagePath = $request->file('image')->store('articles', 'public');
        }


        Article::create([
            'userid' => $user->id, // Menggunakan 'userid' sesuai model
            'judul' => $request->title,
            'slug' => Str::slug($request->title), // Generate slug dari judul
            'gambar' => $request->image,
            'konten' => $request->description,
            'status' => 'pending', // Default status saat artikel baru ditambahkan
            'kategori_id' => $request->kategori_id, // Simpan kategori_id
            'excerpt' => Str::limit($request['description'], 150),
            // 'like' dan 'dislike' akan default ke 0 atau diisi di tempat lain
        ]);

        return redirect()->route('articles.manage')->with('success', 'Artikel berhasil ditambahkan dan menunggu review!');
    }

    /**
     * Mengubah status artikel menjadi 'Published'.
     */
    public function publishArticle(Article $article)
    {
        $article->status = 'terpublikasi';
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

        $article->status = 'ditolak';
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

    public function update(Request $request, Article $article)
    {
        // 1. Validasi data yang masuk
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255', Rule::unique('articles', 'judul')->ignore($article->id)],
            'kategori_id' => 'required|exists:kategoris,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validasi file baru
            'description' => 'required|string|min:10',
        ]);

        $imagePath = $article->gambar; // Gunakan gambar lama sebagai default

        // 2. Cek jika ada file gambar baru yang diunggah
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($article->gambar) {
                Storage::disk('public')->delete($article->gambar);
            }
            // Simpan gambar baru dan perbarui path
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        // 3. Update data artikel di database
        $article->update([
            'judul' => $validatedData['title'],
            'slug' => Str::slug($validatedData['title']),
            'gambar' => $imagePath,
            'konten' => $validatedData['description'],
            'kategori_id' => $validatedData['kategori_id'],
            'status' => 'pending', // Set status kembali ke 'pending' untuk direview ulang
        ]);

        return redirect()->route('articles.manage')->with('success', 'Artikel berhasil diperbarui!');
    }

    public function memberArticle(Article $article)
    {
        $user = Auth::user();

        // Ambil artikel milik user, sertakan kategori, urutkan, dan paginasi
        $articles = $user->articles()->with('kategori')->latest()->paginate(5)
            ->through(fn ($article) => [
                'id' => $article->id,
                'imageSrc' => $article->gambar_url, // Menggunakan accessor dari model
                'title' => $article->judul,
                'description' => $article->excerpt, // Menggunakan accessor excerpt untuk tampilan daftar
                'konten' => $article->konten, // Kirim konten lengkap untuk form edit
                'category_id' => $article->kategori_id,
                'category_name' => $article->kategori->nama_kategori ?? 'N/A',
            ]);

        // Ambil kategori yang aktif untuk dropdown di form
        $categories = Kategori::where('status', 'active')->orderBy('nama_kategori')->get(['id', 'nama_kategori']);
        
        return Inertia::render('Member/Article', [
            'articles' => $articles,
            'categories'=> $categories,
        ]);
    }
}
