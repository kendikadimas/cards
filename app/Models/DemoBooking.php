<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemoBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_anda',
        'sebagai',
        'nama_lembaga',
        'jenis_lembaga',
        'estimasi_jumlah_siswa',
        'nomor_hp',
        'kabupaten_kota',
        'provinsi',
        'kebutuhan_fitur', // Akan disimpan sebagai JSON
        'mendengar_cazh_dari',
        'is_done',
    ];

    protected $casts = [
        'kebutuhan_fitur' => 'array', // Otomatis mengkonversi ke array/JSON
        'is_done' => 'boolean',
    ];
}
