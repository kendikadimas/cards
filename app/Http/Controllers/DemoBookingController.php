<?php

namespace App\Http\Controllers;

use App\Models\DemoBooking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DemoBookingController extends Controller
{
    /**
     * Menampilkan daftar semua booking demo.
     */
    public function index()
    {
        $demoBookings = DemoBooking::orderBy('created_at', 'desc')
                                    ->get()
                                    ->map(function ($booking) {
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
        ]);
    }

    /**
     * Menampilkan detail booking demo tertentu.
     */
    public function show(DemoBooking $demoBooking)
    {
        return Inertia::render('Admin/Demo/Detail', [
            'demoBooking' => [
                'id' => $demoBooking->id,
                'namaAnda' => $demoBooking->nama_anda,
                'sebagai' => $demoBooking->sebagai,
                'namaLembaga' => $demoBooking->nama_lembaga,
                'jenisLembaga' => $demoBooking->jenis_lembaga,
                'estimasiJumlahSiswa' => $demoBooking->estimasi_jumlah_siswa,
                'nomorHp' => $demoBooking->nomor_hp,
                'kabupatenKota' => $demoBooking->kabupaten_kota,
                'provinsi' => $demoBooking->provinsi,
                'kebutuhanFitur' => $demoBooking->kebutuhan_fitur,
                'mendengarCazhDari' => $demoBooking->mendengar_cazh_dari,
                'tanggalBooking' => Carbon::parse($demoBooking->created_at)->format('d M Y H:i'),
                'isDone' => $demoBooking->is_done,
            ],
        ]);
    }

    /**
     * Menyimpan booking demo baru dari formulir publik.
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

        DemoBooking::create([
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

        return redirect()->back()->with('success', 'Permintaan demo berhasil dikirim!');
    }

    /**
     * Memperbarui status 'is_done' dari booking demo.
     */
    public function updateStatus(Request $request, DemoBooking $demoBooking)
    {
        $request->validate([
            'is_done' => 'required|boolean',
        ]);

        $demoBooking->is_done = $request->is_done;
        $demoBooking->save();

        return redirect()->back()->with('success', 'Status booking demo berhasil diperbarui.');
    }
}
