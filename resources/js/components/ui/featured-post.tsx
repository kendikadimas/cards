import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { BlogArticleItem } from '@/types';

interface FeaturedPostProps {
    post: BlogArticleItem | null;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
    // Jika tidak ada artikel terpublikasi sama sekali, jangan render apapun
    if (!post) {
        return null;
    }

    return (
        <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Kolom Kiri: Gambar Artikel */}
                <div className="aspect-video bg-muted rounded-xl overflow-hidden shadow-lg">
                   <img src={post.imageSrc} alt={post.title} className="w-full h-full object-cover" />
                </div>
                {/* Kolom Kanan: Deskripsi */}
                <div className="text-left">
                    <Badge variant="outline" className="border-accent-orange text-accent-orange">{post.category}</Badge>
                    <h2 className="text-3xl font-bold mt-4 line-clamp-3 text-primary">{post.title}</h2>
                    <p className="mt-2 text-muted-foreground line-clamp-3">{post.description}</p>
                    <div className="text-sm text-muted-foreground mt-4">
                        <span>Oleh {post.author}</span> - <span>{post.date}</span>
                    </div>
                    <Link href={route("articles.show", post.slug)} className="inline-flex items-center gap-2 text-primary font-semibold mt-6 group">
                        Baca Selengkapnya <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}