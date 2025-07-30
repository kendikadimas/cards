<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArticleLike extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'article_id',
    ];

    /**
     * Mendefinisikan relasi: Like ini milik seorang User.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Mendefinisikan relasi: Like ini untuk sebuah Article.
     */
    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}
