<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\User;
use App\Models\Kategori; 
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str; 
use Illuminate\Validation\Rule;

class ArticleController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $articles = $user->articles()->with('kategori')->latest()->paginate(5)
            ->through(fn ($article) => [
                'id' => $article->id,
                'imageSrc' => $article->gambar_url, // Menggunakan accessor dari model
                'title' => $article->judul,
                'description' => $article->excerpt, // Menggunakan accessor excerpt
                'konten' => $article->konten, // Kirim konten lengkap untuk form edit
                'category_id' => $article->kategori_id,
                'category_name' => $article->kategori->nama_kategori ?? 'N/A',
            ]);

        // Ambil kategori yang aktif untuk dropdown di form
        $categories = Kategori::where('status', 'active')->orderBy('nama_kategori')->get(['id', 'nama_kategori']);

        return Inertia::render('Member/Article', [
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }

    /**
     * Menyimpan artikel baru dari member.
     * Nama route: member.articles.store
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategoris,id',
            'description' => 'required|string|min:20',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        Auth::user()->articles()->create([
            'judul' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'konten' => $validated['description'],
            'kategori_id' => $validated['kategori_id'],
            'gambar' => $imagePath,
            'status' => 'pending', // Status default
        ]);

        return redirect()->route('member.articles.index')->with('success', 'Artikel berhasil diunggah.');
    }

    /**
     * Mengupdate artikel yang ada milik member.
     * Nama route: member.articles.update
     */
    public function update(Request $request, Article $article)
    {
        $this->authorize('update', $article); // Otorisasi menggunakan Policy

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategoris,id',
            'description' => 'required|string|min:20',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Image tidak 'required' saat update
        ]);
        
        $imagePath = $article->gambar;
        if ($request->hasFile('image')) {
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        $article->update([
            'judul' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'konten' => $validated['description'],
            'kategori_id' => $validated['kategori_id'],
            'gambar' => $imagePath,
            'status' => 'pending',
        ]);

        return redirect()->route('member.articles.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    /**
     * Menghapus artikel milik member.
     * Nama route: member.articles.destroy
     */
    public function destroy(Article $article)
    {
        $this->authorize('delete', $article); // Otorisasi menggunakan Policy

        if ($article->gambar) {
            Storage::disk('public')->delete($article->gambar);
        }
        
        $article->delete();

        return redirect()->route('member.articles.index')->with('success', 'Artikel berhasil dihapus.');
    }

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

    public function memberStore(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategoris,id',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        Auth::user()->articles()->create([
            'judul' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'konten' => $validated['description'],
            'kategori_id' => $validated['kategori_id'],
            'gambar' => $imagePath,
            'status' => 'pending',
        ]);

        return redirect()->route('member.articles.index')->with('success', 'Artikel berhasil diunggah dan sedang menunggu review.');
    }

    public function memberUpdate(Request $request, Article $article)
    {
        // Pastikan member hanya bisa mengedit artikel miliknya sendiri
        $this->authorize('update', $article);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategoris,id',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        
        $imagePath = $article->gambar;
        if ($request->hasFile('image')) {
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        $article->update([
            'judul' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'konten' => $validated['description'],
            'kategori_id' => $validated['kategori_id'],
            'gambar' => $imagePath,
            'status' => 'pending', // Set kembali ke pending untuk direview ulang
        ]);

        return redirect()->route('member.articles.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    public function memberDestroy(Article $article)
    {
        // Pastikan member hanya bisa menghapus artikel miliknya sendiri
        $this->authorize('delete', $article);

        if ($article->gambar) {
            Storage::disk('public')->delete($article->gambar);
        }
        
        $article->delete();

        return redirect()->route('member.articles.index')->with('success', 'Artikel berhasil dihapus.');
    }
}
