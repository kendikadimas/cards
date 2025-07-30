<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ArticlePolicy
{
    /**
     * Determine whether the user can update the model.
     * Hanya 'admin' atau 'editor' yang bisa mengupdate.
     */
    public function update(User $user, Article $article): bool
    {
        return in_array($user->role, ['admin', 'editor']);
    }

    /**
     * Determine whether the user can delete the model.
     * Hanya 'admin' atau 'editor' yang bisa menghapus.
     */
    public function delete(User $user, Article $article): bool
    {
        return in_array($user->role, ['admin', 'editor']);
    }

    // Anda bisa menambahkan method lain di sini jika diperlukan,
    // misalnya 'create', 'view', dll. dengan logika peran yang sama.
}