import { SectionHeader } from "@/components/ui/section-header"
import { ArticleCard, type ArticleProps } from "./article-card"
import { Button } from "@/components/ui/button"

// Komponen sekarang menerima 'articles' sebagai prop
interface ArticleSectionProps {
  articles: ArticleProps[];
}

export function ArticleSection({ articles }: ArticleSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden px-20">
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-blue-100 rounded-full opacity-50 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <SectionHeader
          title="Artikel Populer"
          description=""
        />
        {/* Tampilkan data dinamis dari props */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[75px] mt-12">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
        
        {articles.length === 0 && (
            <p className="text-center text-gray-500 mt-12">Belum ada artikel untuk ditampilkan.</p>
        )}

        <div className="flex justify-center mt-16">
            <Button variant="secondary">Lihat Artikel Lainnya</Button>
        </div>
      </div>
    </section>
  )
}
