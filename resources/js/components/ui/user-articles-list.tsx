"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ArticleListItem } from "@/types" // Menggunakan tipe global yang lebih baik

// Perbarui interface props untuk menerima fungsi
interface UserArticlesListProps {
  articles: ArticleListItem[];
  onReview: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function UserArticlesList({ articles, onReview, onEdit, onDelete }: UserArticlesListProps) {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Artikel Terkirim</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="border rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-800">{article.title}</p>
              <Badge
                className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  article.status.toLowerCase() === "pending" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800",
                )}
              >
                {article.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Dikirim {article.date} | {article.category} | {article.views} Membaca
            </p>
            <div className="flex gap-2 mt-2">
              {/* Tambahkan onClick handler untuk setiap tombol */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-blue-500 border-blue-200 hover:bg-blue-50 bg-transparent"
                onClick={() => onReview(article.id)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-orange-500 border-orange-200 hover:bg-orange-50 bg-transparent"
                onClick={() => onEdit(article.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-red-500 border-red-200 hover:bg-red-50 bg-transparent"
                onClick={() => onDelete(article.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
         {articles.length === 0 && (
            <p className="text-center text-muted-foreground py-8">Pengguna ini belum mengirim artikel.</p>
        )}
      </CardContent>
    </Card>
  )
}