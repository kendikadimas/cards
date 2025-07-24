<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon; // Import Carbon

class Banprom extends Model
{
    use HasFactory;

    protected $table = 'banproms'; // Pastikan nama tabel sesuai migrasi

    protected $fillable = [
        'userid',
        'judul',
        'gambar',
        'tglmulai',
        'tglakhir',
        'status',
    ];

    protected $casts = [
        'tglmulai' => 'datetime',
        'tglakhir' => 'datetime',
    ];

    // Relasi ke model User jika diperlukan
    public function user()
    {
        return $this->belongsTo(User::class, 'userid');
    }

    public function getFormattedDateAttribute()
    {
        return $this->created_at->format('d M Y');
    }
}
