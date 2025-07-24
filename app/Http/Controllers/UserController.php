<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules; 


class UserController extends Controller
{
    /**
     * Menampilkan daftar semua pengguna (untuk halaman 'Kelola User').
     */
    public function index()
    {
        $users = User::orderBy('name')->paginate(10)->through(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? 'N/A',
                'role' => $user->role ?? 'Member',
                'profileImage' => $user->profile_image_url, // <-- Gunakan accessor
                
            ];
        });

        return Inertia::render('Admin/User/Index', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'phone' => 'nullable|string|max:20',
            'role' => 'required|string|in:Admin,Editor,Member,Super Admin',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('profile_image')) {
            $imagePath = $request->file('profile_image')->store('profiles', 'public');
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'role' => $request->role,
            'password' => Hash::make($request->password),
            'profile_image' => $imagePath,
        ]);

        return redirect()->route('users.index')->with('success', 'Pengguna baru berhasil ditambahkan!');
    }
    
    /**
     * Menampilkan halaman detail untuk satu pengguna.
     */
    public function show(User $user)
    {
        // 1. Ambil detail user dasar (sudah ada dari route-model binding)
        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone ?? 'N/A',
            'role' => $user->role ?? 'Member',
            'profileImage' => $user->profile_image_url
        ];

        // 2. Ambil artikel yang ditulis oleh user tersebut
        $userArticles = $user->articles()->latest()->take(5)->get()->map(function ($article) {
            return [
                'id' => $article->id,
                'title' => $article->judul,
                'author' => $article->user->name,
                'date' => Carbon::parse($article->created_at)->diffForHumans(),
                'category' => $article->kategori->nama_kategori ?? 'Uncategorized',
                'status' => ucfirst($article->status),
                'views' => $article->views ?? 0, // Ganti dengan kolom 'views' jika ada
            ];
        });

        // 3. Generate daftar aktivitas terbaru (contoh sederhana)
        $userActivities = $user->articles()->latest()->take(5)->get()->map(function ($article) {
            return [
                'id' => 'article-' . $article->id,
                'type' => 'article-sent', // Tipe aktivitas
                'description' => 'Mengirim artikel baru berjudul "' . $article->judul . '"',
                'time' => Carbon::parse($article->created_at)->diffForHumans(),
            ];
        });
        // Catatan: Untuk aktivitas 'like' dan 'komen', Anda perlu tabel/logika terpisah.

        return Inertia::render('Admin/User/Detail', [
            'user' => $userData,
            'articles' => $userArticles,
            'activities' => $userActivities,
        ]);
    }

    /**
     * Mengupdate data pengguna.
     */
    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'role' => 'required|string|in:Admin,Editor,Member,Super Admin',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // <-- Validasi gambar
        ]);

        $updateData = $validatedData;

        if ($request->hasFile('profile_image')) {
            // Hapus gambar lama jika ada
            if ($user->profile_image) {
                Storage::disk('public')->delete($user->profile_image);
            }
            // Simpan gambar baru
            $updateData['profile_image'] = $request->file('profile_image')->store('profiles', 'public');
        }

        $user->update($updateData);

        return redirect()->back()->with('success', 'Data pengguna berhasil diperbarui!');
    }

     /**
     * Menghapus pengguna.
     */
    public function destroy(User $user)
    {
        // Tambahkan logika untuk mencegah penghapusan diri sendiri atau admin lain jika perlu
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        $user->delete();
        return redirect()->route('users.index')->with('success', 'Pengguna berhasil dihapus.');
    }
}