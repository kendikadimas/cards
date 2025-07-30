<?php

namespace App\Http\Controllers;

use App\Models\Banprom;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BanpromController extends Controller
{
    /**
     * Menampilkan halaman manajemen banner promosi.
     * Sesuai dengan route 'kelolabanprom'.
     */
    public function index()
    {
        $banproms = Banprom::latest()
            ->paginate(10)
            ->through(fn ($banprom) => [
                'id' => $banprom->id,
                'title' => $banprom->judul,
                'uploader' => $banprom->user->name ?? 'N/A',
                'status' => $banprom->status,
                'date' => $banprom->created_at->format('d M Y'),
                'image_url' => Storage::url($banprom->gambar),
                'duration' => $banprom->tglmulai->diffInDays($banprom->tglakhir) . ' hari',
                'startDate' => $banprom->tglmulai->format('Y-m-d'),
                'endDate' => $banprom->tglakhir->format('Y-m-d'),
                // Tambahkan tanggal yang sudah diformat untuk tampilan (jika perlu)
                'displayStartDate' => $banprom->tglmulai->format('d M Y'),
                'displayEndDate' => $banprom->tglakhir->format('d M Y'),
            ]);

        return Inertia::render('Admin/Banner/Index', [
            'banproms' => $banproms,
        ]);
    }

    public function show(Banprom $banner)
    {
        // Format data untuk dikirim ke halaman review
        $formattedBanner = [
            'id' => $banner->id,
            'title' => $banner->judul,
            'status' => $banner->status,
            'image_url' => $banner->gambar_url,
            'startDate' => $banner->tglmulai->format('d M Y'),
            'endDate' => $banner->tglakhir->format('d M Y'),
            'duration' => $banner->tglmulai->diffInDays($banner->tglakhir) . ' hari',
        ];

        return Inertia::render('Admin/Banner/Review', [
            'banner' => $formattedBanner,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,webp',
            'tglmulai' => 'required|date',
            'tglakhir' => 'required|date|after_or_equal:tglmulai',
            'status' => 'required|string|in:aktif,berakhir',
        ]);

        $imagePath = $request->file('gambar')->store('banproms', 'public');

        // FIX: Membuat Banprom secara langsung, tanpa relasi user
        Banprom::create([
            'userid' => auth()->id(), // Tetap simpan ID admin jika diperlukan untuk jejak audit
            'judul' => $validated['judul'],
            'gambar' => $imagePath,
            'tglmulai' => $validated['tglmulai'],
            'tglakhir' => $validated['tglakhir'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('banners.index')->with('success', 'Banner promosi berhasil ditambahkan.');
    }

    public function update(Request $request, Banprom $banner)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp',
            'tglmulai' => 'required|date',
            'tglakhir' => 'required|date|after_or_equal:tglmulai',
            'status' => 'required|string|in:aktif,berakhir',
        ]);

        $imagePath = $banner->gambar;
        if ($request->hasFile('gambar')) {
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('gambar')->store('banproms', 'public');
        }

        $banner->update([
            'judul' => $validated['judul'],
            'gambar' => $imagePath,
            'tglmulai' => $validated['tglmulai'],
            'tglakhir' => $validated['tglakhir'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('banners.index')->with('success', 'Banner promosi berhasil diperbarui.');
    }


    public function destroy(Banprom $banprom)
    {
        try {
            $gambarPath = $banprom->gambar;
            $bannerId = $banprom->id;

            // FIX: Gunakan Query Builder untuk menghapus, ini akan melewati Model Events.
            // Method delete() dari query builder akan me-return jumlah baris yang terhapus.
            $deletedRows = Banprom::where('id', $bannerId)->delete();

            // Cek apakah proses hapus di database berhasil
            if ($deletedRows > 0) {
                // Jika berhasil, baru hapus file gambarnya dari storage
                if ($gambarPath) {
                    Storage::disk('public')->delete($gambarPath);
                }
                
                return redirect()->route('banners.index')->with('success', 'Banner promosi berhasil dihapus.');
            } else {
                // Ini terjadi jika tidak ada baris yang terhapus (misalnya karena event)
                return redirect()->back()->with('error', 'Gagal menghapus banner dari database. Kemungkinan dibatalkan oleh sebuah event.');
            }

        } catch (Exception $e) {
            // Jika terjadi error tak terduga (misal masalah koneksi DB atau foreign key)
            return redirect()->back()->with('error', 'Terjadi error: ' . $e->getMessage());
        }
    }
    
    public function reviewbanprom(Banprom $banprom)
    {
        $banprom->load('user');

        $formattedBanprom = [
            'id' => $banprom->id,
            'title' => $banprom->judul,
            'uploader' => $banprom->user->name ?? 'N/A',
            'date' => $banprom->created_at->format('d M Y'),
            'image_url' => $banprom->gambar_url,
            'target_link' => $banprom->link_tujuan, // Asumsi kolom 'link_tujuan'
            'status' => ucfirst($banprom->status),
        ];

        // Asumsi ada halaman Inertia 'ReviewBanprom'
        return Inertia::render('ReviewBanprom', [
            'banprom' => $formattedBanprom,
        ]);
    }

    /**
     * Mengubah status banner promosi menjadi 'terpublikasi'.
     */
    public function publishbanprom(Banprom $banprom)
    {
        $banprom->status = 'terpublikasi';
        $banprom->save();

        return redirect()->back()->with('success', 'Banner promosi berhasil dipublikasikan!');
    }

    /**
     * Mengubah status banner promosi menjadi 'ditolak'.
     */
    public function rejectbanprom(Request $request, Banprom $banprom)
    {
        $request->validate([
            'reasons' => 'nullable|array',
            'reasons.*' => 'string',
        ]);

        $banprom->status = 'ditolak';
        $banprom->save();

        return redirect()->back()->with('success', 'Banner promosi berhasil ditolak!');
    }
}
