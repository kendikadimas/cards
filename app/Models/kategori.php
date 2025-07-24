<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $table = 'kategoris'; // Pastikan nama tabel sesuai

    protected $fillable = [
        'nama_kategori',
        // Tambahkan kolom lain jika ada, misal 'slug'
    ];

    // Jika Anda memiliki relasi satu-ke-banyak dengan Article
    public function articles()
    {
        return $this->hasMany(Article::class, 'kategori_id');
    }
}
