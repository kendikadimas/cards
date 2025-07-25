"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ArticleListItem } from "@/types" // Import tipe

interface MemberArticleUploadCardProps {
  article: ArticleListItem; // Terima satu objek article
  onEdit: () => void;
  onDelete: () => void;
}

export function MemberArticleUploadCard({
  article,
  onEdit,
  onDelete,
}: MemberArticleUploadCardProps) {
  return (
    <Card className="flex flex-col md:flex-row overflow-hidden shadow-lg rounded-xl border border-gray-200 bg-white">
      <div className="relative w-full md:w-1/3 aspect-video md:aspect-auto flex-shrink-0">
        <img
          src={article.imageSrc || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
        />
      </div>
      <div className="flex flex-col p-4 md:p-6 flex-grow">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-xl font-bold text-gray-900 leading-tight">{article.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">{article.description}</p>
        </CardContent>
        <div className="flex gap-2 mt-4 self-start">
          <Button
            variant="outline"
            size="sm"
            className="text-orange-500 border-orange-200 hover:bg-orange-50"
            onClick={onEdit} // Tidak perlu mengirim ID lagi
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete} // Tidak perlu mengirim ID lagi
          >
            Hapus
          </Button>
        </div>
      </div>
    </Card>
  )
}
