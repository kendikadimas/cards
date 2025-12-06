<?php

namespace App\Http\Controllers;

use App\Models\SiteStat;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SiteDataController extends Controller
{
    public function index()
    {
        $stats = SiteStat::orderBy('order')->get();
        $testimonials = Testimonial::orderBy('order')->get();

        return Inertia::render('Admin/SiteData/Index', [
            'stats' => $stats,
            'testimonials' => $testimonials,
        ]);
    }

    // Site Stats Methods
    public function updateStat(Request $request, SiteStat $stat)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|integer|min:0',
        ]);

        $stat->update($validated);

        return back()->with('success', 'Statistik berhasil diperbarui');
    }

    // Testimonial Methods
    public function storeTestimonial(Request $request)
    {
        $validated = $request->validate([
            'quote' => 'required|string',
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'avatar' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('avatar')) {
            $validated['avatar'] = $request->file('avatar')->store('testimonials', 'public');
        }

        $validated['order'] = Testimonial::max('order') + 1;

        Testimonial::create($validated);

        return back()->with('success', 'Testimoni berhasil ditambahkan');
    }

    public function updateTestimonial(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'quote' => 'required|string',
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'avatar' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('avatar')) {
            if ($testimonial->avatar) {
                Storage::disk('public')->delete($testimonial->avatar);
            }
            $validated['avatar'] = $request->file('avatar')->store('testimonials', 'public');
        }

        $testimonial->update($validated);

        return back()->with('success', 'Testimoni berhasil diperbarui');
    }

    public function destroyTestimonial(Testimonial $testimonial)
    {
        if ($testimonial->avatar) {
            Storage::disk('public')->delete($testimonial->avatar);
        }

        $testimonial->delete();

        return back()->with('success', 'Testimoni berhasil dihapus');
    }

    public function reorderTestimonials(Request $request)
    {
        $validated = $request->validate([
            'testimonials' => 'required|array',
            'testimonials.*.id' => 'required|exists:testimonials,id',
            'testimonials.*.order' => 'required|integer',
        ]);

        foreach ($validated['testimonials'] as $item) {
            Testimonial::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return back()->with('success', 'Urutan testimoni berhasil diperbarui');
    }
}
