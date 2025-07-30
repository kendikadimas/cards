<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Komentar extends Model
{
    use HasFactory;

    protected $table = 'komentars';

    protected $fillable = [
        'userid',
        'articleid',
        'parent_id',
        'komentar',
    ];

    /**
     * Mendefinisikan relasi: Komentar ini milik seorang User.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userid');
    }

    /**
     * Mendefinisikan relasi: Komentar ini untuk sebuah Article.
     */
    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class, 'articleid');
    }

    /**
     * Mendefinisikan relasi: Komentar ini memiliki banyak balasan.
     */
    public function replies(): HasMany
    {
        return $this->hasMany(Komentar::class, 'parent_id');
    }

    public function likes(): HasMany
    {
        return $this->hasMany(KomentarLike::class, 'komentar_id');
    }
}
