"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import type { ArticleListItem } from "@/types"

interface MemberArticleListItemProps {
  article: ArticleListItem;
  onEdit: (article: ArticleListItem) => void;
  onDelete: (articleId: number) => void;
}

export function MemberArticleListItem({ article, onEdit, onDelete }: MemberArticleListItemProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="w-full sm:w-1/3 flex-shrink-0">
        <img
          src={article.image_url || '/placeholder.svg'}
          alt={article.title}
          className="rounded-xl w-full h-full object-cover aspect-video sm:aspect-square"
        />
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {/* <Link href={route('articles.show', article.slug)} className="hover:text-blue-700 transition-colors"> */}
            {article.title}
          {/* </Link> */}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-4 flex-grow">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <Button
            onClick={() => onEdit(article)}
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(article.id)}
            variant="destructive"
            size="sm"
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  )
}