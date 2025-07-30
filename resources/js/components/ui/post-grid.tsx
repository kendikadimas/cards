import React from 'react';
import { ArticleCard } from '@/components/ui/article-card';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { BlogPageProps } from '@/types';
import { TrendingUp, Sparkles } from 'lucide-react';
import { BlogArticleCard } from './blog-article-card';

type PostGridProps = Pick<BlogPageProps, 'articles' | 'categories' | 'filters'>;

export function PostGrid({ articles, categories, filters }: PostGridProps) {
    
    // Fungsi untuk menangani klik pada tombol filter
    const handleFilterClick = (type: 'category' | 'sort', value: string) => {
        const newFilters: { category?: string; sort?: string } = { ...filters };
        
        if (type === 'category') {
            // Jika mengklik "Semua" atau kategori yang sedang aktif, hapus filter kategori
            newFilters.category = (value === 'semua' || filters.category === value) ? undefined : value;
        }
        if (type === 'sort') {
            newFilters.sort = value;
        }

        // Kirim request ke backend dengan parameter filter baru
        router.get(route('blog.index'), newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Gabungkan "Semua" dengan kategori dari database
    const allCategories = [{nama_kategori: 'Semua', slug: 'semua'}, ...(categories || [])];

    return (
        <section className="container mx-auto px-20 py-16 ">
            <div className="text-left mb-12">
                <h2 className="text-4xl font-bold text-black">Artikel Kami</h2>
                <div className="mt-2 w-24 h-1.5 bg-black" />
            </div>

            {/* FIX: Tombol Filter digabungkan menjadi satu grup */}
            <div className="flex flex-wrap gap-3 mb-12">
                {/* Tombol Sort/Urutan */}
                <Button
                    onClick={() => handleFilterClick('sort', 'trending')}
                    variant="outline"
                    className={cn(
                        "rounded-lg bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100 font-semibold",
                        filters.sort === 'trending' && "bg-orange-500 text-white hover:bg-orange-600 border-orange-500"
                    )}
                >
                   <TrendingUp className="mr-2 h-4 w-4"/> Trending
                </Button>
                <Button
                    onClick={() => handleFilterClick('sort', 'terbaru')}
                    variant="outline"
                    className={cn(
                        "rounded-lg bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100 font-semibold",
                        (!filters.sort || filters.sort !== 'trending') && "bg-orange-500 text-white hover:bg-orange-600 border-orange-500"
                    )}
                >
                    <Sparkles className="mr-2 h-4 w-4"/> Terbaru
                </Button>

                {/* Tombol Kategori */}
                {allCategories.map(cat => (
                    <Button
                        key={cat.slug}
                        onClick={() => handleFilterClick('category', cat.slug)}
                        variant="outline"
                        className={cn(
                            "rounded-lg bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100 font-semibold",
                            (filters.category === cat.slug || (!filters.category && cat.slug === 'semua')) && "bg-orange-500 text-white hover:bg-orange-600 border-orange-500"
                        )}
                    >
                       {cat.nama_kategori}
                    </Button>
                ))}
            </div>

            {/* Grid Artikel */}
            {articles.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.data.map((article) => <BlogArticleCard key={article.id} {...article} />)}
                </div>
            ) : (
                <p className="text-center text-muted-foreground mt-16">Tidak ada artikel yang cocok dengan filter Anda.</p>
            )}

            {/* Paginasi */}
            <div className="mt-16 flex justify-center items-center gap-2">
                {articles.links.map((link, index) => (
                    (link.label.includes('Previous') || link.label.includes('Next')) ? (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={cn(
                                "px-4 py-2 text-sm transition-colors rounded-lg text-gray-700 font-semibold hover:bg-gray-100",
                                !link.url && "text-gray-400 cursor-not-allowed"
                            )}
                        >
                            {link.label.includes('Previous') ? '← Previous' : 'Next →'}
                        </Link>
                    ) : (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={cn(
                            "h-10 w-10 flex items-center justify-center rounded-lg text-sm transition-colors",
                            link.active ? "bg-orange-500 text-white font-bold" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                            link.label === '...' && "bg-transparent cursor-default",
                            !link.url && "text-gray-400 cursor-not-allowed"
                        )}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                    )
                ))}
            </div>
        </section>
    );
}