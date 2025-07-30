import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Navbar } from '@/components/ui/navbar';
import { FeaturedPost } from '@/components/ui/featured-post';
import { PostGrid } from '@/components/ui/post-grid';
import { Footer } from '@/components/ui/footer';
import type { BlogPageProps } from '@/types';
import { Button } from '@/components/ui/button';

export default function Blog() {
    // Ambil semua data yang dikirim dari BlogController
    const { featuredArticle, articles, categories, filters } = usePage<BlogPageProps>().props;
    const { auth } = usePage().props;
    return (
        <>
            <Head title="Blog" />
            <Navbar />
            
            <main className="bg-white">
                {/* Hero Section */}
                <section className="bg-primary text-white text-center py-16 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Selamat Datang di CARDS's Blog</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-white/90">
                        Temukan wawasan terbaru, tips, dan cerita inspiratif seputar dunia pendidikan dan teknologi. Kami hadir untuk mendukung kemajuan sekolah Anda.
                    </p> 
                    <div className="mt-8 gap-2 flex justify-center">
                        <Button variant="secondary" >
                            <Link href={auth.user ? route('member.articles') : route('login')}>Buat Artikel</Link>
                        </Button>
                    </div>
                </section>

                {/* Featured Post akan menampilkan artikel terbaru */}
                <FeaturedPost post={featuredArticle} />
                
                {/* Post Grid akan menampilkan daftar artikel yang bisa difilter */}
                <PostGrid articles={articles} categories={categories} filters={filters} />
            </main>
            
            <Footer />
        </>
    );
}