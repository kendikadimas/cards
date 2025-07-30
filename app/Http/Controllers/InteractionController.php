<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Models\Komentar;
use Illuminate\Support\Facades\Auth;

class InteractionController extends Controller
{
    /**
     * Memberikan atau membatalkan 'like' pada sebuah artikel.
     */
    public function toggleLike(Request $request, Article $article)
    {
        $user = Auth::user();

        // Cek apakah user sudah me-like artikel ini
        $like = $article->likes()->where('user_id', $user->id)->first();

        if ($like) {
            // Jika sudah ada, hapus like (unlike)
            $like->delete();
            $message = 'Like dibatalkan.';
        } else {
            // Jika belum ada, tambahkan like baru
            $article->likes()->create(['user_id' => $user->id]);
            $message = 'Artikel disukai.';
        }

        return back()->with('success', $message);
    }

    /**
     * Menyimpan komentar baru pada sebuah artikel.
     */
    public function storeComment(Request $request, Article $article)
    {
        $request->validate([
            'komentar' => 'required|string|max:1000',
            'parent_id' => 'nullable|exists:komentars,id',
        ]);

        $article->komentars()->create([
            'userid' => Auth::id(),
            'parent_id' => $request->parent_id,
            'komentar' => $request->komentar,
        ]);

        return back()->with('success', 'Komentar berhasil ditambahkan.');
    }

    /**
     * Menambah jumlah share pada sebuah artikel.
     */
    public function incrementShare(Request $request, Article $article)
    {
        // Menambah nilai kolom 'share_count' sebanyak 1
        $article->increment('share_count');

        // Mengembalikan respons JSON sederhana
        return response()->json(['message' => 'Share count updated.']);
    }

    public function toggleCommentLike(Request $request, Komentar $komentar)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $like = $komentar->likes()->where('user_id', $user->id)->first();

        if ($like) {
            $like->delete();
            $message = 'Like pada komentar dibatalkan.';
        } else {
            $komentar->likes()->create(['user_id' => $user->id]);
            $message = 'Komentar disukai.';
        }

        return back()->with('success', $message);
    }
}
