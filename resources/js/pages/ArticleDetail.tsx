"use client"

import React, { useState } from 'react';
import { Head, Link, usePage, router, useForm } from '@inertiajs/react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ArticleDetailPageProps, Comment as CommentType, SharedData, RelatedArticleItem } from '@/types';
import { cn } from '@/lib/utils';


// --- Komponen Interaksi (Like, Comment, Share) ---
function InteractionBar({ article }) {
  const { auth } = usePage<SharedData>().props;

  const handleLike = () => {
    if (!auth.user) return router.visit(route('login'));
    router.post(route('articles.like', article.id), {}, { preserveScroll: true });
  };

  const handleShare = async () => {
    const shareData = { title: article.title, url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        router.post(route('articles.share', article.id), {}, { preserveScroll: true });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link artikel telah disalin!');
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-b py-4 my-8">
      <div className="flex items-center gap-6">
        <Button
          variant="ghost" size="sm" onClick={handleLike}
          className={cn("flex items-center gap-2 text-gray-600 hover:text-red-500", article.is_liked_by_user && "text-red-500")}
        >
          <Heart className={cn("h-5 w-5", article.is_liked_by_user && "fill-current")} />
          <span>{article.like_count} Suka</span>
        </Button>
        <div className="flex items-center gap-2 text-gray-600">
          <MessageCircle className="h-5 w-5" />
          <span>{article.comment_count} Komentar</span>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={handleShare} className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
        <Share2 className="h-5 w-5" />
        <span>Bagikan</span>
      </Button>
    </div>
  );
}

// --- Komponen Komentar ---
function CommentForm({ articleId, parentId = null, onCommentPosted }) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        komentar: '', parent_id: parentId,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth.user) return router.visit(route('login'));
        post(route('articles.comment.store', articleId), {
            preserveScroll: true,
            onSuccess: () => {
                reset('komentar');
                if (onCommentPosted) onCommentPosted();
            },
        });
    };

    if (!auth.user) return null;

    return (
        <form onSubmit={handleSubmit} className="flex items-start gap-4 mt-4">
            <Avatar className="h-10 w-10"><AvatarImage src={auth.user.profile_image} /><AvatarFallback>{auth.user.name.charAt(0)}</AvatarFallback></Avatar>
            <div className="flex-1">
                <Textarea value={data.komentar} onChange={(e) => setData('komentar', e.target.value)} placeholder="Tulis komentar Anda..."/>
                {errors.komentar && <p className="text-red-500 text-xs mt-1">{errors.komentar}</p>}
                <Button type="submit" size="sm" disabled={processing} className="mt-2">
                    <Send className="h-4 w-4 mr-2" />{processing ? 'Mengirim...' : 'Kirim'}
                </Button>
            </div>
        </form>
    );
}

// Di dalam file resources/js/Pages/ArticleDetail.tsx

function CommentItem({ comment, articleId }: { comment: CommentType, articleId: number }) {
    const { auth } = usePage<SharedData>().props;
    const [isReplying, setIsReplying] = useState(false);

    const handleCommentLike = () => {
        if (!auth.user) return router.visit(route('login'));
        router.post(route('comments.like', comment.id), {}, {
            preserveScroll: true,
        });
    };

    return (
        <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
                <AvatarImage src={comment.author_image} />
                <AvatarFallback>{comment.author_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-primary">{comment.author_name}</p>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-400">{comment.timestamp}</p>
                    <span className="text-xs text-gray-400">|</span>
                    <p className="text-xs text-gray-400">{comment.created_at}</p>
                </div>
                <p className="text-gray-800 mt-1">{comment.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <button onClick={handleCommentLike} className={cn("flex items-center gap-1.5 hover:text-red-500", comment.is_liked_by_user && "text-red-500")}>
                        <Heart className={cn("h-4 w-4", comment.is_liked_by_user && "fill-current")} />
                        <span>{comment.like_count}</span>
                    </button>
                    <button onClick={() => setIsReplying(!isReplying)} className="font-semibold hover:underline">
                        Balas
                    </button>
                </div>

                {isReplying && <CommentForm articleId={articleId} parentId={comment.id} onCommentPosted={() => setIsReplying(false)} />}
                
                <div className="mt-4 space-y-4 pl-6 border-l-2">
                    {comment.replies && comment.replies.map(reply => <CommentItem key={reply.id} comment={reply} articleId={articleId} />)}
                </div>
            </div>
        </div>
    );
}


// --- Komponen Sidebar Artikel Terkait ---
const RelatedArticlesSidebar = ({ articles }: { articles: RelatedArticleItem[] }) => (
    <aside className="lg:sticky lg:top-24">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Artikel Populer</h3>
            <div className="space-y-6">
                {articles.map(article => (
                    <div key={article.id} className="flex items-center gap-4 group">
                        <img 
                            src={article.image_url || '/placeholder.svg'} 
                            alt={article.title} 
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div>
                            <Link href={route('articles.show', article.slug)}>
                                <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h4>
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">{article.author_name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </aside>
);

// --- Halaman Detail Artikel Utama ---
export default function ArticleDetailPage() {
    const { article, relatedArticles } = usePage<ArticleDetailPageProps>().props;

    return (
        <>
            <Head title={article.title} />
            <Navbar />
            <main className="py-12 lg:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                        {/* Kolom Kiri: Konten Artikel Utama */}
                        <article className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
                            {/* FIX: Detail Penulis dan Artikel di Atas Judul */}
                            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={article.author_image} />
                                        <AvatarFallback>{article.author_name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-gray-800">{article.author_name}</p>
                                        <p className="text-sm text-muted-foreground">{article.author_institution}</p>
                                    </div>
                                </div>
                                <div className="text-left sm:text-right text-sm text-muted-foreground flex-shrink-0">
                                    <span>{article.published_date}</span>
                                    <span className="mx-2">|</span>
                                    <span>{article.category}</span>
                                    <span className="mx-2">|</span>
                                    <span>{article.read_count} Membaca</span>
                                </div>
                            </header>

                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
                                {article.title}
                            </h1>
                            
                            <div className="my-8 aspect-video bg-muted rounded-lg overflow-hidden">
                                <img src={article.image_url || '/placeholder.svg'} alt={article.title} className="w-full h-full object-cover" />
                            </div>
                            
                            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.body_html }} />
                            <InteractionBar article={article} />
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold">Komentar ({article.comments.length})</h2>
                                <CommentForm articleId={article.id} onCommentPosted={() => {}} />
                                <div className="space-y-6">
                                    {article.comments.map(comment => <CommentItem key={comment.id} comment={comment} articleId={article.id} />)}
                                </div>
                            </section>
                            {/* Tempat untuk InteractionBar dan Komentar bisa ditambahkan di sini */}
                        </article>

                        {/* Kolom Kanan: Sidebar Artikel Terkait */}
                        <div className="lg:col-span-1">
                            <RelatedArticlesSidebar articles={relatedArticles} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}