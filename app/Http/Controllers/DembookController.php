<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\dembook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class DembookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
        public function index(Request $request) // <-- 2. Tambahkan parameter Request
    {
        // 3. Tambahkan logika filter berdasarkan input status
        $filters = $request->only('status');

        $demoBookings = dembook::query()
            // 3. Tambahkan logika filter kondisional
            ->when($request->input('status'), function ($query, $status) {
                if ($status === 'done') {
                    // Jika filter 'done', cari yang is_done = true (atau 1)
                    $query->where('is_done', true);
                } elseif ($status === 'pending') {
                    // Jika filter 'pending', cari yang is_done = false (atau 0)
                    $query->where('is_done', false);
                }
            })
            ->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString() // Penting agar filter tetap ada saat pindah halaman paginasi
            ->through(function ($booking) {
                return [
                    'id' => $booking->id,
                    'namaAnda' => $booking->nama_anda,
                    'namaLembaga' => $booking->nama_lembaga,
                    'nomorHp' => $booking->nomor_hp,
                    'tanggalBooking' => Carbon::parse($booking->created_at)->format('d M Y'),
                    'isDone' => $booking->is_done,
                ];
            });

        return Inertia::render('Admin/Demo/Index', [
            'demoBookings' => $demoBookings,
            'filters' => $filters, // <-- 4. Kirim kembali filter ke frontend
        ]);
    }

    
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Method ini untuk menampilkan form pembuatan data dari sisi admin.
        // Jika tidak ada, bisa dibiarkan kosong atau redirect.
        // Contoh: return Inertia::render('Admin/Demo/Create');
        return abort(404, 'Halaman tidak ditemukan.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'namaAnda' => 'required|string|max:255',
            'sebagai' => 'required|string|max:255',
            'namaLembaga' => 'required|string|max:255',
            'jenisLembaga' => 'required|string|max:255',
            'estimasiJumlahSiswa' => 'nullable|string|max:255',
            'nomorHp' => 'required|string|max:20',
            'kabupatenKota' => 'required|string|max:255',
            'provinsi' => 'required|string|max:255',
            'kebutuhanFitur' => 'nullable|array',
            'kebutuhanFitur.*' => 'string|max:255',
            'mendengarCazhDari' => 'required|string|max:255',
        ]);

        dembook::create([
            'nama_anda' => $validatedData['namaAnda'],
            'sebagai' => $validatedData['sebagai'],
            'nama_lembaga' => $validatedData['namaLembaga'],
            'jenis_lembaga' => $validatedData['jenisLembaga'],
            'estimasi_jumlah_siswa' => $validatedData['estimasiJumlahSiswa'],
            'nomor_hp' => $validatedData['nomorHp'],
            'kabupaten_kota' => $validatedData['kabupatenKota'],
            'provinsi' => $validatedData['provinsi'],
            'kebutuhan_fitur' => $validatedData['kebutuhanFitur'] ?? [],
            'mendengar_cazh_dari' => $validatedData['mendengarCazhDari'],
            'is_done' => false, // Default status
        ]);

        return Redirect::back()->with('success', 'Permintaan demo berhasil dikirim!');
    }

    /**
     * Display the specified resource.
     */
    public function show(dembook $dembook)
    {
        return Inertia::render('Admin/Demo/Detail', [
            'dembook' => [ // Menyamakan nama prop dengan variabel
                'id' => $dembook->id,
                'namaAnda' => $dembook->nama_anda,
                'sebagai' => $dembook->sebagai,
                'namaLembaga' => $dembook->nama_lembaga,
                'jenisLembaga' => $dembook->jenis_lembaga,
                'estimasiJumlahSiswa' => $dembook->estimasi_jumlah_siswa,
                'nomorHp' => $dembook->nomor_hp,
                'kabupatenKota' => $dembook->kabupaten_kota,
                'provinsi' => $dembook->provinsi,
                'kebutuhanFitur' => $dembook->kebutuhan_fitur,
                'mendengarCazhDari' => $dembook->mendengar_cazh_dari,
                'tanggalBooking' => Carbon::parse($dembook->created_at)->format('d M Y H:i'),
                'isDone' => $dembook->is_done,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(dembook $dembook)
    {
        // Menampilkan form untuk mengedit data.
        // Bisa menggunakan view yang sama dengan 'show' jika form edit ada di sana.
        return Inertia::render('Admin/Demo/Edit', [
            'dembook' => $dembook
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, dembook $dembook)
    {
        // Validasi data yang masuk, contoh untuk update status
        $validated = $request->validate([
            'is_done' => 'required|boolean',
            // Tambahkan validasi untuk field lain jika bisa di-edit
        ]);

        $dembook->update($validated);

        return Redirect::route('dembook.index')->with('success', 'Booking demo berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(dembook $dembook)
    {
        $dembook->delete();

        return Redirect::route('dembook.index')->with('success', 'Booking demo berhasil dihapus.');
    }
}
