"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ArticleListItem } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { Link, router } from "@inertiajs/react";

interface UserArticlesCardProps {
    articles: ArticleListItem[];
}

export function UserArticlesCard({ articles }: UserArticlesCardProps) {

    const handleDelete = (articleId: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus artikel ini secara permanen?")) {
            // Memanggil rute 'destroy' untuk menghapus artikel
            router.delete(route("member.articles.destroy", articleId), {
                preserveScroll: true, // Agar tetap di halaman profil setelah hapus
                onSuccess: () => {
                    alert("Artikel berhasil dihapus.");
                },
                onError: () => {
                    alert("Gagal menghapus artikel. Anda mungkin tidak memiliki izin.");
                }
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Artikel Anda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {articles && articles.length > 0 ? (
                    articles.map(article => (
                        <div key={article.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 last:border-b-0">
                            <div className="flex items-center space-x-4 flex-1">
                                <img
                                    src={article.image_url || '/placeholder.svg'}
                                    alt={article.title}
                                    className="w-20 h-20 rounded-md object-cover hidden sm:block"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800 hover:underline line-clamp-2">
                                        {article.title}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Oleh: {article.author} | {article.category}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {article.views} Membaca
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 self-start sm:self-center flex-shrink-0">
                                {/* Tombol Edit mengarahkan ke halaman manajemen artikel */}
                                <Button asChild variant="outline" size="icon" className="h-8 w-8" title="Edit Artikel">
                                    <Link href={route('member.articles')}>
                                        <Pencil className="h-4 w-4 text-orange-500" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleDelete(article.id)}
                                    title="Hapus Artikel"
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                        Anda belum mempublikasikan artikel apapun.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
