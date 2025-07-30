"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@inertiajs/react"
import { CalendarDays, ArrowRight } from "lucide-react"
import type { BlogArticleItem } from "@/types" // Pastikan tipe ini ada di index.d.ts

export function BlogArticleCard({ imageSrc, date, title, description, slug }: BlogArticleItem) {
  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-2xl border-2 border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white">
      {/* Gambar Artikel */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <Link href={route('articles.show', slug)}>
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
      
      <CardContent className="p-6 flex flex-col flex-grow">
        {/* Tanggal */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <CalendarDays className="h-4 w-4" />
          <span>{date}</span>
        </div>

        {/* Judul */}
        <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 mb-3">
          <Link href={route('articles.show', slug)} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </h3>

        {/* Deskripsi */}
        <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Link Baca Selengkapnya */}
        <Link href={route("articles.show", slug)} className="inline-flex items-center gap-2 text-primary font-semibold mt-4 group">
          Baca Selengkapnya <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  )
}
