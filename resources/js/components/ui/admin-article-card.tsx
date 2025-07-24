"use client"

import { Button } from "@/components/ui/button"
import type { ArticleListItem as BaseArticleListItem } from "@/types"

// Asumsi tipe ArticleListItem menyertakan 'institution' berdasarkan gambar.
interface ArticleListItem extends BaseArticleListItem {
  institution: string;
  category_name: string;
  read_count: number;
}

interface AdminArticleCardProps {
  article: ArticleListItem
  onReview: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export function AdminArticleCard({ article, onReview, onEdit, onDelete }: AdminArticleCardProps) {
  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return { text: "Terpublikasi", className: "text-blue-600" };
      case "pending":
        return { text: "Pending", className: "text-yellow-600" };
      case "rejected":
        return { text: "Ditolak", className: "text-red-600" };
      default:
        return { text: "Tidak Diketahui", className: "text-gray-500" };
    }
  }

  const statusInfo = getStatusInfo(article.status);

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-start">
      {/* Kolom Kiri: Informasi Artikel */}
        <div className="flex gap-1.5">
            <h3 className="text-xl font-bold text-gray-900">{article.title}</h3>
        </div>
        <p className="text-sm text-gray-600">
            Oleh: <span className="font-semibold">{article.author}</span> <span className="text-gray-500">{article.institution}</span>
        </p>

      {/* Kolom Kanan: Status dan Tombol Aksi */}
      <div className="flex flex-col items-end gap-3 flex-shrink-0 ml-4">
        <p className={`text-sm font-medium ${statusInfo.className}`}>
          {statusInfo.text}
        </p>
        <div className="flex items-center space-x-2">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <span>Dikirim {article.date}</span>
          <span className="text-gray-300">|</span>
          <span>{article.category_name || "Uncategorized"}</span>
          <span className="text-gray-300">|</span>
          <span>{article.read_count || 0} Membaca</span>
        </div>
          <Button
            size="sm"
            className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200 px-4 py-2"
            onClick={() => onReview(article.id)}
          >
            Tampilkan
          </Button>
          <Button
            size="sm"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-4 py-2"
            onClick={() => onEdit(article.id)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            className="bg-red-100 text-red-800 hover:bg-red-200 px-4 py-2"
            onClick={() => onDelete(article.id)}
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  )
}