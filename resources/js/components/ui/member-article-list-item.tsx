"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import type { ArticleListItem } from "@/types"
import { Badge } from "@/components/ui/badge" // <-- 1. Impor Badge
import { cn } from "@/lib/utils" // <-- 1. Impor cn untuk styling kondisiona

interface MemberArticleListItemProps {
  article: ArticleListItem;
  onEdit: (article: ArticleListItem) => void;
  onDelete: (articleId: number) => void;
}

export function MemberArticleListItem({ article, onEdit, onDelete }: MemberArticleListItemProps) {
  
   // 2. Buat fungsi untuk menentukan warna badge berdasarkan status
  const getStatusVariant = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === "terpublikasi") return "bg-green-100 text-green-800";
    if (lowerStatus === "pending") return "bg-yellow-100 text-yellow-800";
    if (lowerStatus === "ditolak") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  }

  return (
    // Menggunakan Card sebagai dasar dengan padding dihilangkan (p-0)
    <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      
      {/* Kolom Gambar di bagian atas */}
      <div className="w-full aspect-video h-48 overflow-hidden object-contain flex items-center justify-center">
        <img
          src={article.image_url || '/placeholder.svg'}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Kolom Konten di bagian bawah */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 leading-tight pr-4">
              <Link href={route('articles.show', article.slug)} className="hover:text-blue-700 transition-colors">
                {article.title}
              </Link>
            </h3>
            <Badge className={cn("border-none capitalize flex-shrink-0", getStatusVariant(article.status))}>
                {article.status}
            </Badge>
        </div>
        {/* Deskripsi/Distribusi */}
        <p className="text-sm text-gray-600 line-clamp-4 flex-grow">
          {article.konten}
        </p>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 self-start">
          <Button
            onClick={() => onEdit(article)}
            size="sm"
            className="bg-cyan-600 text-white hover:bg-cyan-700 rounded-lg px-6"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(article.id)}
            variant="destructive"
            size="sm"
            className="bg-red-500 hover:bg-red-600 rounded-lg px-6"
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  )
}