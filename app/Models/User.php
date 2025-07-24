<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;


class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone', // Tambahkan 'phone' jika bisa di-update
        'role',  // Tambahkan 'role' jika bisa di-update
        'profile_image',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

        protected $appends = ['profile_image_url'];


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Definisikan relasi: Seorang User memiliki banyak Article.
     */
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class, 'userid');
    }

    public function getProfileImageUrlAttribute(): string
    {
        if ($this->profile_image) {
            // Mengembalikan URL publik dari file yang disimpan
            return Storage::url($this->profile_image);
        }

        // Kembalikan URL placeholder jika tidak ada gambar
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&background=random';
    }
}