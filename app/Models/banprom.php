<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage; // <-- Tambahkan import ini

class Banprom extends Model
{
    use HasFactory;

    protected $table = 'banproms';

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

    public function user()
    {
        return $this->belongsTo(User::class, 'userid');
    }

    /**
     * Accessor untuk mendapatkan URL gambar yang bisa diakses publik.
     */
    public function getGambarUrlAttribute(): string
    {
        if ($this->gambar && Storage::disk('public')->exists($this->gambar)) {
            return Storage::url($this->gambar);
        }

        // Kembalikan URL placeholder jika tidak ada gambar
        return 'https://via.placeholder.com/300x150?text=No+Image';
    }
}
