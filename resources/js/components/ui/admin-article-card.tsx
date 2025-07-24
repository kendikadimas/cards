"use client"

import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2 } from "lucide-react" // Impor kembali ikon
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
  onEdit: (article: ArticleListItem) => void
  onDelete: (id: number) => void
}

export function AdminArticleCard({ article, onReview, onEdit, onDelete }: AdminArticleCardProps) {
  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return { text: "Terpublikasi", className: "text-blue-600 hover:underline" };
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
    // Gunakan padding lebih besar (p-6) dan items-center untuk alignment vertikal
    <div className="w-full bg-white p-6 rounded-xl border border-gray-200 flex justify-between items-center">
      
      {/* Kolom Kiri: Semua informasi artikel digrupkan di sini */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-gray-900">{article.title}</h3>
        <p className="text-sm text-gray-600">
          Oleh: <span className="font-semibold">{article.author}</span> <span className="text-gray-500">{article.institution}</span>
        </p>
        {/* Informasi 'Dikirim' dipindahkan ke sini */}
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <span>Dikirim {article.date}</span>
          <span className="text-gray-300">|</span>
          <span>{article.category_name || "Uncategorized"}</span>
          <span className="text-gray-300">|</span>
          <span>{article.read_count || 0} Membaca</span>
        </div>
      </div>

      {/* Kolom Kanan: Status dan Tombol Aksi */}
      <div className="flex flex-col items-end gap-3 flex-shrink-0 ml-4">
        <p className={`text-sm font-medium ${statusInfo.className}`}>
          {statusInfo.text}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200 px-4 py-2 flex items-center gap-2"
            onClick={() => onReview(article.id)}
          >
            <Eye className="h-4 w-4" /> Tampilkan
          </Button>
          <Button
            size="sm"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-4 py-2 flex items-center gap-2"
            onClick={() => onEdit(article)}
          >
            <Pencil className="h-4 w-4" /> Edit
          </Button>
          <Button
            size="sm"
            className="bg-red-100 text-red-800 hover:bg-red-200 px-4 py-2 flex items-center gap-2"
            onClick={() => onDelete(article.id)}
          >
            <Trash2 className="h-4 w-4" /> Hapus
          </Button>
        </div>
      </div>
    </div>
  )
}