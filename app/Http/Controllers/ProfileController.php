<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Menampilkan halaman profil pengguna.
     */
    public function show()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Ambil 2 artikel terbaru dari pengguna
        $userArticles = $user->articles()->latest()->take(2)->get()->map(function ($article) {
            return [
                'id' => $article->id,
                'title' => $article->judul,
                'author' => $article->user->name,
                'category' => $article->kategori->nama_kategori ?? 'N/A',
                'views' => $article->views ?? 0,
                'image_url' => $article->gambar_url,
            ];
        });

        // Contoh data aktivitas terbaru
        $recentActivities = [
            ['id' => 1, 'type' => 'read', 'description' => 'Membaca artikel: "Tips Keuangan Sekolah"'],
            ['id' => 2, 'type' => 'edit', 'description' => 'Memperbarui Foto Profil'],
            ['id' => 3, 'type' => 'submit', 'description' => 'Mengirim artikel baru'],
        ];

        return Inertia::render('Profile', [ // Menggunakan satu halaman Profile universal
            'user_articles' => $userArticles,
            'recent_activities' => $recentActivities,
        ]);
    }

    /**
     * Memperbarui informasi profil pengguna.
     */
    public function update(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'institution' => 'nullable|string|max:255',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('profile_image')) {
            if ($user->profile_image) {
                Storage::disk('public')->delete($user->profile_image);
            }
            $validated['profile_image'] = $request->file('profile_image')->store('profiles', 'public');
        }

        $user->update($validated);

        return redirect()->route('profile.show')->with('success', 'Profil berhasil diperbarui!');
    }

    /**
     * Memperbarui password pengguna.
     */
    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('profile.show')->with('success', 'Password berhasil diperbarui!');
    }

    /**
     * Menghapus akun pengguna.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();
        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('success', 'Akun Anda berhasil dihapus.');
    }
}
