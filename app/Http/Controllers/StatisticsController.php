<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\User;
use App\Models\Komentar;
use App\Models\ArticleLike;
use App\Models\dembook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StatisticsController extends Controller
{
    public function index()
    {
        // Total statistics
        $totalArticles = Article::where('status', 'terpublikasi')->count();
        $totalViews = Article::where('status', 'terpublikasi')->sum('read_count');
        $totalLikes = ArticleLike::count();
        $totalComments = Komentar::count();
        $totalRejected = Article::where('status', 'ditolak')->count();
        $totalUsers = User::where('role', 'member')->count();
        $totalDemoRequests = dembook::count();

        // Monthly article statistics (last 12 months)
        $monthlyStats = Article::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('YEAR(created_at) as year'),
            DB::raw('COUNT(*) as count')
        )
            ->where('status', 'terpublikasi')
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                $monthNames = [
                    1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
                    5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
                    9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
                ];
                return [
                    'month' => $monthNames[$item->month],
                    'count' => $item->count
                ];
            });

        // Category distribution
        $categoryStats = Article::select('kategori_id', DB::raw('COUNT(*) as count'))
            ->with('kategori:id,nama_kategori')
            ->where('status', 'terpublikasi')
            ->groupBy('kategori_id')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => optional($item->kategori)->nama_kategori ?? 'Uncategorized',
                    'value' => $item->count
                ];
            });

        return Inertia::render('Admin/Statistics', [
            'stats' => [
                'totalArticles' => $totalArticles,
                'totalViews' => $totalViews,
                'totalLikes' => $totalLikes,
                'totalComments' => $totalComments,
                'totalRejected' => $totalRejected,
                'totalUsers' => $totalUsers,
                'totalDemoRequests' => $totalDemoRequests,
            ],
            'monthlyStats' => $monthlyStats,
            'categoryStats' => $categoryStats,
        ]);
    }
}
