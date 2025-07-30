import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@inertiajs/react"; // <-- Import Link dari Inertia

export interface ArticleProps {
  id: number;
  slug: string;
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
}

export function ArticleCard({ id, slug, imageSrc, imageAlt = "Article image", title, description }: ArticleProps) {
  return (
    // Gunakan Link dari Inertia untuk navigasi SPA
    <Link href={route('articles.show', slug)} className="block group">
      <Card className="flex flex-col h-full overflow-hidden shadow-md rounded-xl border border-primary transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 bg-white p-0">
        <div className="relative aspect-video bg-muted overflow-hidden rounded-t-xl">
          <img
            src={imageSrc || "/images/news.png"}
            alt={imageAlt}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="text-xl font-bold text-gray-800 leading-tight line-clamp-2">{title}</CardTitle>      
        </CardHeader>
        <CardContent className="flex-grow px-6 pb-6">
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
