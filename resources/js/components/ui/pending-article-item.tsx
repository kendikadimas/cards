"use client"

import { Button } from "@/components/ui/button"
import { Link, router } from "@inertiajs/react"
import { Eye, Check, X } from "lucide-react"
// import { route } from "inertiajs"

interface PendingArticleItemProps {
  id: string
  title: string
  author: string
  timeAgo: string
}

export function PendingArticleItem({ id, title, author, timeAgo }: PendingArticleItemProps) {
  const handleApprove = () => {
    if (confirm("Apakah Anda yakin ingin menyetujui artikel ini?")) {
      router.post(route("articles.publish", id))
    }
  }

  const handleReject = () => {
    if (confirm("Apakah Anda yakin ingin menolak artikel ini?")) {
      router.post(route("articles.reject", id))
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{title}</h4>
        <p className="text-xs text-muted-foreground truncate">
          oleh {author} &bull; {timeAgo}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button asChild variant="outline" size="icon" className="h-8 w-8 bg-transparent">
          <Link href={route("articles.review", id)} title="Review Artikel">
            <Eye className="h-4 w-4" />
            <span className="sr-only">Review</span>
          </Link>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-green-600 hover:text-green-700 bg-transparent"
          onClick={handleApprove}
          title="Setujui Artikel"
        >
          <Check className="h-4 w-4" />
          <span className="sr-only">Setujui</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-red-700 bg-transparent"
          onClick={handleReject}
          title="Tolak Artikel"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Tolak</span>
        </Button>
      </div>
    </div>
  )
}
