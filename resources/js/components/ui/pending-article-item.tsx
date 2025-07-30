"use client"

import { Button } from "@/components/ui/button"
import { Link, router } from "@inertiajs/react"
import { Check, X } from "lucide-react"

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
      router.post(route("articles.reject", id), {})
    }
  }

  return (
    // Container utama dengan padding dan border bawah
    <div className="flex flex-col gap-2 p-4 border-b last:border-b-0 ">
      <div className="border-blue-400">

      </div>
      
      {/* Baris Atas: Judul di kiri, link Review di kanan */}
      <div className="flex items-center justify-between w-full">
        <h4 className="text-base font-semibold text-gray-800 truncate pr-4">
          {title}
        </h4>
        <Link 
          href={route("articles.review", id)} 
          title="Review Artikel" 
          className="text-sm text-blue-600 hover:underline flex-shrink-0"
        >
          Review
        </Link>
      </div>

      {/* Baris Bawah: Info penulis di kiri, tombol aksi di kanan */}
      <div className="flex items-center justify-between w-full mt-1">
        <p className="text-sm text-muted-foreground">
          Oleh: {author} - {timeAgo}
        </p>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200"
            onClick={handleApprove}
            title="Setujui Artikel"
          >
            <Check className="h-4 w-4 mr-2" />
            Setujui
          </Button>
          <Button
            size="sm"
            className="bg-red-100 text-red-800 hover:bg-red-200"
            onClick={handleReject}
            title="Tolak Artikel"
          >
            <X className="h-4 w-4 mr-2" />
            Tolak
          </Button>
        </div>
      </div>
    </div>
  )
}
