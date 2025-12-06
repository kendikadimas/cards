<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Komentar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * List comments with filters (article, date range) for published articles.
     */
    public function index(Request $request)
    {
        $this->authorizeEditor();

        $base = Komentar::query()
            ->with(['user', 'article'])
            ->whereHas('article', fn($q) => $q->where('status', 'terpublikasi'));

        // Clone for counts before pagination/parent filter
        $totalAll = (clone $base)->count();
        $totalApproved = (clone $base)->where('status','approved')->count();
        $totalPending = (clone $base)->where('status','pending')->count();
        $totalFlagged = (clone $base)->where('is_inappropriate', true)->count();

        // Parent comments only (thread roots)
        $query = (clone $base)->whereNull('parent_id')
            // Eager load replies and their user (only needed columns). Remove non-existent DB column profile_image_url (it's an appended accessor).
            ->with([
                'replies.user' => fn($q) => $q->select('id','name'),
                'replies.parent' => fn($q) => $q->select('id','userid')->with('user:id,name'),
                'article' => fn($q) => $q->withCount(['komentars', 'likes'])
            ]);

        if ($request->filled('article')) {
            $query->where('articleid', $request->integer('article'));
        }
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date('date_from'));
        }
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date('date_to'));
        }

        $comments = $query->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString()
            ->through(fn(Komentar $k) => $this->transformKomentar($k));

        $articles = Article::where('status','terpublikasi')
            ->orderByDesc('created_at')
            ->get(['id','judul','slug'])
            ->map(fn($a) => [ 'id'=>$a->id, 'title'=>$a->judul, 'slug'=>$a->slug ]);

        return Inertia::render('KelolaKomentar', [
            'comments' => $comments,
            'articles' => $articles,
            'filters' => $request->only(['article','date_from','date_to']),
            'stats' => [
                'total' => $totalAll,
                'approved' => $totalApproved,
                'pending' => $totalPending,
                'flagged' => $totalFlagged,
            ],
        ]);
    }

    private function transformKomentar(Komentar $k, bool $isReply = false): array
    {
        $data = [
            'id' => $k->id,
            'article_id' => $k->articleid,
            'article_title' => optional($k->article)->judul,
            'article_slug' => optional($k->article)->slug,
            'article_published_at' => optional($k->article)->created_at?->isoFormat('D MMMM YYYY'),
            'article_read_time' => optional($k->article)->waktu_baca,
            'article_stats' => [
                'read_count' => optional($k->article)->read_count ?? 0,
                'likes_count' => optional($k->article)->likes_count ?? 0,
                'comments_count' => optional($k->article)->komentars_count ?? 0,
            ],
            'user_name' => optional($k->user)->name ?? 'N/A',
            'user_avatar' => optional($k->user)->profile_image_url,
            'content' => $k->komentar,
            'status' => $k->status ?? 'pending',
            'is_inappropriate' => (bool) $k->is_inappropriate,
            'created_at' => $k->created_at->isoFormat('D MMMM YYYY'),
            'created_time' => $k->created_at->format('H:i'),
            'time_ago' => $k->created_at->diffForHumans(),
            'parent_id' => $k->parent_id,
            'replies' => $k->replies->sortBy('created_at')->map(fn($r) => $this->transformKomentar($r, true))->values(),
        ];

        // Add reply_to information if this is a reply
        if ($isReply && $k->parent) {
            $data['reply_to_user'] = optional($k->parent->user)->name;
        }

        return $data;
    }

    public function approve(Komentar $komentar)
    {
        $this->authorizeEditor();
        $komentar->update([
            'status' => 'approved',
            'reviewed_by' => Auth::id(),
            'reviewed_at' => now(),
        ]);
        return back()->with('success', 'Komentar disetujui');
    }

    public function toggleFlag(Komentar $komentar)
    {
        $this->authorizeEditor();
        $komentar->update([
            'is_inappropriate' => ! (bool) $komentar->is_inappropriate,
            'reviewed_by' => Auth::id(),
            'reviewed_at' => now(),
        ]);
        return back()->with('success', 'Status laporan diperbarui');
    }

    public function destroy(Komentar $komentar)
    {
        $this->authorizeEditor();
        // Optionally delete replies as well
        $komentar->replies()->delete();
        $komentar->delete();
        return back()->with('success', 'Komentar dihapus');
    }

    private function authorizeEditor(): void
    {
        $user = Auth::user();
        if (! $user || ! in_array($user->role, ['admin', 'editor'])) {
            abort(403);
        }
    }
}
