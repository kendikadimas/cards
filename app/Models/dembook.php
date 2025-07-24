<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class dembook extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama_anda',
        'sebagai',
        'nama_lembaga',
        'jenis_lembaga',
        'estimasi_jumlah_siswa',
        'nomor_hp',
        'kabupaten_kota',
        'provinsi',
        'kebutuhan_fitur',
        'mendengar_cazh_dari',
        'is_done',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'kebutuhan_fitur' => 'array', // <-- INI SOLUSINYA
        'is_done' => 'boolean',       // Casting tambahan agar 'is_done' selalu boolean
    ];
}