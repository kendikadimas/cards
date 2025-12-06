<?php

use App\Http\Controllers\DemoBookingController;
use App\Http\Controllers\InteractionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BanpromController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DembookController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CommentController;

Route::get('/', [LandingPageController::class, 'index'])->name('landing_page');


Route::get('flexy-cazh', function () {
    return Inertia::render('FlexyCazh');
})->name('flexycazh');
Route::get('/demo', function () {
    return Inertia::render('RequestDemo');
})->name('demo');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');
Route::get('/about', function () {
    return Inertia::render('Tentang');
})->name('about');

Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');


Route::get('/blog/{article:slug}', [ArticleController::class, 'show'])->name('articles.show');
// Route::get(', [UserController::class,''])->name(

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/password', [ProfileController::class, 'updatePassword'])->name('password.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/articles/{article}/like', [InteractionController::class, 'toggleLike'])->name('articles.like');
    Route::post('/articles/{article}/comment', [InteractionController::class, 'storeComment'])->name('articles.comment.store');
    Route::post('/articles/{article}/share', [InteractionController::class, 'incrementShare'])->name('articles.share');
    Route::post('/comments/{komentar}/like', [InteractionController::class, 'toggleCommentLike'])->name('comments.like');
    
});


Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('adashboard', [DashboardController::class, 'adashboard'])->name('adashboard');
    Route::get('/statistics', [\App\Http\Controllers\StatisticsController::class, 'index'])->name('statistics.index');
    
    // Site Data Management
    Route::get('/site-data', [\App\Http\Controllers\SiteDataController::class, 'index'])->name('sitedata.index');
    Route::patch('/site-stats/{stat}', [\App\Http\Controllers\SiteDataController::class, 'updateStat'])->name('sitestats.update');
    Route::post('/testimonials', [\App\Http\Controllers\SiteDataController::class, 'storeTestimonial'])->name('testimonials.store');
    Route::patch('/testimonials/{testimonial}', [\App\Http\Controllers\SiteDataController::class, 'updateTestimonial'])->name('testimonials.update');
    Route::delete('/testimonials/{testimonial}', [\App\Http\Controllers\SiteDataController::class, 'destroyTestimonial'])->name('testimonials.destroy');
    Route::post('/testimonials/reorder', [\App\Http\Controllers\SiteDataController::class, 'reorderTestimonials'])->name('testimonials.reorder');
    
    Route::get('/articles/create', [ArticleController::class, 'create'])->name('articles.create'); // Mengubah nama rute
    Route::post('/articles/store', [ArticleController::class,'store'])->name('articles.store');
    Route::resource('banners', BanpromController::class);
    Route::delete('/banprom/{banprom}', [BanpromController::class, 'destroy'])->name('banners.destroy');
    Route::get('/banprom/{banprom}/review', [BanpromController::class, 'reviewbanprom'])->name('banprom.review');
    Route::post('/banprom/{banprom}/publish', [BanpromController::class, 'publishbanprom'])->name('banprom.publish');
    Route::post('/banprom/{banprom}/reject', [BanpromController::class, 'rejectbanprom'])->name('banprom.reject');
    Route::get('/categories', function () {return Inertia::render('Admin/Category/Index'); // Sesuaikan path jika berbeda
    })->name('categories.index');
    Route::resource('kategori', KategoriController::class)->except(['create', 'show', 'edit']);
    Route::resource('users', UserController::class);
    // Route::resource('kategori',KategoriController::class)->except(['show', 'create', 'edit']);
    Route::get('/articles/manage', [ArticleController::class, 'manageArticles'])->name('articles.manage');
    Route::resource('dembook', DembookController::class);

    // Route Manajemen Pengguna
    // Route::get('/users', [DashboardController::class, 'usersIndex'])->name('users.index');
    // Route::get('/users/{user}', [DashboardController::class, 'usersShow'])->name('users.show');
    // Route::put('/users/{user}', [DashboardController::class, 'usersUpdate'])->name('users.update');
    // Route::delete('/users/{user}', [DashboardController::class, 'usersDestroy'])->name('users.destroy');
});

Route::middleware(['auth', 'verified', 'role:editor'])->group(function () {
    Route::get('edashboard', [DashboardController::class, 'edashboard'])->name('edashboard');
});

Route::middleware(['auth', 'verified', 'role:admin,editor'])->group(function () {
    // Route Manajemen Artikel (Review & Approval)
    Route::get('/articles/manage', [ArticleController::class, 'manageArticles'])->name('articles.manage');
    Route::get('/articles/{article}/review', [ArticleController::class, 'reviewArticle'])->name('articles.review');
    Route::post('/articles/{article}/publish', [ArticleController::class, 'publishArticle'])->name('articles.publish');
    Route::post('/articles/{article}/reject', [ArticleController::class, 'rejectArticle'])->name('articles.reject');
    Route::post('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');

    // Route CRUD Artikel
    // Route::resource('articles', ArticleController::class); // Ini bisa dihapus jika sudah ada rute spesifik di atas
    Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');

    Route::post('/articles/store', [ArticleController::class, 'store'])->name('articles.store'); // Mengubah nama rute
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy'); // Menambahkan rute delete

    // Comment management (Editor/Admin)
    Route::get('/comments', [CommentController::class, 'index'])->name('comments.manage');
    Route::post('/comments/{komentar}/approve', [CommentController::class, 'approve'])->name('comments.approve');
    Route::post('/comments/{komentar}/flag', [CommentController::class, 'toggleFlag'])->name('comments.flag');
    Route::delete('/comments/{komentar}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

// Rute untuk Member
Route::middleware(['auth', 'verified', 'role:member'])->group(function () {
    Route::get('mdashboard', [DashboardController::class, 'mdashboard'])->name('mdashboard');

        Route::get('member/analytics', [DashboardController::class, 'memberAnalytics'])->name('member.analytics');
        Route::get('member/articles', [ArticleController::class, 'memberArticle'])->name('member.articles');
        Route::post('member/articles/upload', [ArticleController::class, 'storeMember'])->name('member.articles.upload');
        Route::delete('member/articles/{article}', [ArticleController::class, 'destroyMember'])->name('member.articles.destroy');
    });



// require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
