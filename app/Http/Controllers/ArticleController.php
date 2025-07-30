<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\User;
use App\Models\Kategori; // Import model Kategori
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Str; // Import Str facade for slug generation

class ArticleController extends Controller
{
    use AuthorizesRequests;
    
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
                                    'read_count' => $article->read_count ?? 0,
                                    'konten' => $article->konten,
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
            'gambar' => $imagePath, // Simpan path gambar
            'konten' => $request->description,
            'status' => 'pending', // Default status saat artikel baru ditambahkan
            'kategori_id' => $request->kategori_id, // Simpan kategori_id
            'excerpt' => Str::limit($request['description'], 150),
            // 'like' dan 'dislike' akan default ke 0 atau diisi di tempat lain
        ]);

        return redirect()->route('articles.manage')->with('success', 'Artikel berhasil ditambahkan dan menunggu review!');
    }
    public function storeMember(Request $request)
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
            'gambar' => $imagePath, // Simpan path gambar
            'konten' => $request->description,
            'status' => 'pending', // Default status saat artikel baru ditambahkan
            'kategori_id' => $request->kategori_id, // Simpan kategori_id
            'excerpt' => Str::limit($request['description'], 150),
            // 'like' dan 'dislike' akan default ke 0 atau diisi di tempat lain
        ]);

        return redirect()->route('member.articles')->with('success', 'Artikel berhasil ditambahkan dan menunggu review!');
    }

    private function formatComment($comment)
    {
        $user = auth()->user();
        return [
            'id' => $comment->id,
            'author_name' => $comment->user->name,
            'author_image' => $comment->user->profile_image_url,
            'content' => $comment->komentar,
            'timestamp' => $comment->created_at->isoFormat('D MMMM YYYY, HH:mm'), // <-- Timestamp
            'created_at' => $comment->created_at->diffForHumans(), // <-- Durasi
            'like_count' => $comment->likes()->count(), // <-- Jumlah like
            'is_liked_by_user' => $user ? $comment->likes()->where('user_id', $user->id)->exists() : false, // <-- Status like user
            'replies' => $comment->replies->map(fn ($reply) => $this->formatComment($reply)),
        ];
    }

    public function show(Article $article)
    {
        // Pastikan artikel sudah dipublikasikan sebelum ditampilkan
        if ($article->status !== 'terpublikasi' && (auth()->guest() || auth()->id() !== $article->userid)) {
            abort(404);
        }

        $article->increment('read_count');
        
        // Eager load semua relasi yang dibutuhkan
        $article->load([
            'user', 
            'kategori', 
            'komentars' => function ($query) {
                // Muat relasi user untuk setiap komentar dan balasan secara rekursif
                $query->with(['user', 'replies.user'])->whereNull('parent_id')->latest();
            }
        ]);

        $user = auth()->user();

        // Format data artikel untuk dikirim ke frontend
        $formattedArticle = [
            'id' => $article->id,
            'title' => $article->judul,
            'slug' => $article->slug,
            'image_url' => $article->gambar_url,
            'body_html' => $article->konten,
            'author_name' => $article->user->name,
            'author_image' => $article->user->profile_image_url,
            'author_intituion' => $article->user->institution ?? 'N/A',
            'published_date' => $article->created_at->isoFormat('D MMMM YYYY'),
            'category' => $article->kategori->nama_kategori ?? 'Uncategorized',
            'like_count' => $article->likes()->count(),
            'comment_count' => $article->komentars()->count(),            'share_count' => $article->share_count,
            'is_liked_by_user' => $user ? $article->likes()->where('user_id', $user->id)->exists() : false,
            'comments' => $article->komentars->map(fn ($comment) => $this->formatComment($comment)),
        ];

        // Ambil 4 artikel terkait dari kategori yang sama
        $relatedArticles = Article::where('kategori_id', $article->kategori_id)
            ->where('id', '!=', $article->id)
            ->where('status', 'terpublikasi')
            ->with('user')
            ->latest()
            ->take(4)
            ->get()
            ->map(fn($relArticle) => [
                'id' => $relArticle->id,
                'slug' => $relArticle->slug,
                'title' => $relArticle->judul,
                'image_url' => $relArticle->gambar_url,
                'author_name' => $relArticle->user->name ?? 'N/A',
            ]);

        return Inertia::render('ArticleDetail', [
            'article' => $formattedArticle,
            'relatedArticles' => $relatedArticles,
        ]);
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

    public function destroyMember(Article $article)
    {
        $article->delete();
        return redirect()->back()->with('success', 'Artikel berhasil dihapus.');
    }

    public function update(Request $request, Article $article)
    {
        // Otorisasi: pastikan hanya admin/editor yang bisa update
        $this->authorize('update', $article); // Asumsi Anda punya ArticlePolicy

        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255', Rule::unique('articles', 'judul')->ignore($article->id)],
            'kategori_id' => 'required|exists:kategoris,id',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $updateData = [
            'judul' => $validatedData['title'],
            'slug' => Str::slug($validatedData['title']),
            'konten' => $validatedData['description'],
            'kategori_id' => $validatedData['kategori_id'],
            'excerpt' => Str::limit(strip_tags($validatedData['description']), 150),
            'status' => 'pending', // Set kembali ke pending untuk direview ulang
        ];

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($article->gambar) {
                Storage::disk('public')->delete($article->gambar);
            }
            // Simpan gambar baru
            $updateData['gambar'] = $request->file('image')->store('articles', 'public');
        }

        $article->update($updateData);

        return redirect()->route('articles.manage')->with('success', 'Artikel berhasil diperbarui.');
    }

    public function memberArticle(Article $article, Request $request)
    {
        $user = Auth::user();

        $query = $user->articles()->with('kategori');

        if ($request->filled('search')) {
            $query->where('judul', 'like', '%' . $request->search . '%');
        }

        // Logika untuk Filter Kategori
        if ($request->filled('category') && $request->category !== 'semua') {
            $query->where('kategori_id', $request->category);
        }

        // Logika untuk Filter Bulan
        if ($request->filled('month') && $request->month !== 'semua') {
            $query->whereMonth('created_at', $request->month);
        }

        // Ambil artikel milik user, sertakan kategori, urutkan, dan paginasi
        $articles = $query->latest()->paginate(5)->withQueryString()
            ->through(fn ($article) => [
                'id' => $article->id,
                'slug' => $article->slug,
                'image_url' => $article->gambar_url, // Menggunakan accessor dari model Article
                'title' => $article->judul,
                'excerpt' => $article->excerpt, // Menggunakan accessor
                'konten' => $article->konten, // Kirim konten lengkap untuk form edit
                'kategori_id' => $article->kategori_id,
                'category_name' => $article->kategori->nama_kategori ?? 'Uncategorized',
                'status' => $article->status,
                'read_count' => $article->read_count ?? 0,
            ]);

        // Ambil kategori yang aktif untuk dropdown di filter
        $categories = Kategori::where('status', 'active')->orderBy('nama_kategori')->get(['id', 'nama_kategori']);
        
        return Inertia::render('Member/Article', [
            'articles' => $articles,
            'categories'=> $categories,
            'filters' => $request->only(['search', 'category', 'month']), 
        ]);
    }
}
