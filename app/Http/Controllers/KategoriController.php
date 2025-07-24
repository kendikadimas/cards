<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class KategoriController extends Controller
{
    /**
     * Menampilkan daftar kategori.
     */
    public function index()
    {
        $categories = Kategori::orderBy('nama_kategori')
            ->paginate(10)
            ->through(fn ($category) => [
                'id' => $category->id,
                'name' => $category->nama_kategori,
                'slug' => $category->slug,
                'status' => $category->status,
            ]);

        return Inertia::render('Admin/Category/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Menyimpan kategori baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:kategoris,nama_kategori',
            'status' => 'required|string|in:active,inactive',
        ]);

        Kategori::create([
            'nama_kategori' => $request->name,
            'slug' => Str::slug($request->name, '-'),
            'status' => $request->status,
        ]);

        return redirect()->route('kategori.index')->with('success', 'Kategori berhasil dibuat.');
    }

    /**
     * Mengupdate kategori yang sudah ada.
     */
    public function update(Request $request, Kategori $kategori)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:kategoris,nama_kategori,' . $kategori->id,
            'status' => 'required|string|in:active,inactive',
        ]);

        $kategori->update([
            'nama_kategori' => $request->name,
            'slug' => Str::slug($request->name, '-'),
            'status' => $request->status,
        ]);

        return redirect()->route('kategori.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    /**
     * Menghapus kategori.
     */
    public function destroy(Kategori $kategori)
    {
        // Tambahkan pengecekan jika kategori masih digunakan oleh artikel
        if ($kategori->articles()->count() > 0) {
            return redirect()->route('kategori.index')->with('error', 'Kategori tidak dapat dihapus karena masih digunakan oleh artikel.');
        }

        $kategori->delete();

        return redirect()->route('kategori.index')->with('success', 'Kategori berhasil dihapus.');
    }
}