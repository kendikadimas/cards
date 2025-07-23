import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Tipe props untuk artikel
export interface ArticleProps {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
  link: string // Link to the full article
}

export function ArticleCard({ imageSrc, imageAlt = "Article image", title, description, link }: ArticleProps) {
  return (
    // Gaya kartu disederhanakan: border netral, background putih, dan efek hover yang lebih subtle.
    <a href={link} className="block group">
      <Card className="flex flex-col h-full overflow-hidden shadow-md rounded-xl border border-primary transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 bg-white p-0">
        <div className="relative aspect-video bg-muted overflow-hidden rounded-t-xl">
          <img
            src={imageSrc || "/images/news.png"}
            alt={imageAlt}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {/* Overlay logo dan waktu telah dihilangkan sesuai contoh gambar */}
        <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="text-xl font-bold text-gray-800 leading-tight">{title}</CardTitle>      
        </CardHeader>
        <CardContent className="flex-grow px-6 pb-6">
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </CardContent>
      </Card>
    </a>
  )
}