import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { FileText } from "lucide-react"
import { PendingArticleItem } from "./pending-article-item"
import type { PendingArticleData } from "@/types"
// import { route } from "@/utils/route" // Import the route function

interface PendingArticlesSectionProps {
  articles: PendingArticleData[]
}

export function PendingArticlesSection({ articles }: PendingArticlesSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Artikel Menunggu Review</CardTitle>
        <Button asChild variant="outline" size="sm" className="text-black">
          <Link href={route("articles.manage")} className="flex items-center text-black">
            <FileText className="mr-2 h-4 w-4 bg-white text-black" />
            Lihat Semua
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article) => (
              <PendingArticleItem
                key={article.id}
                id={article.id}
                title={article.title}
                author={article.author}
                timeAgo={article.timeAgo}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">Tidak ada artikel menunggu review.</p>
        )}
      </CardContent>
    </Card>
  )
}
