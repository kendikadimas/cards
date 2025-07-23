import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PendingArticleItem } from "./pending-article-item"
import type { PendingArticleData } from "@/types" // Import interface dari types/index.d.ts

interface PendingArticlesSectionProps {
  articles: PendingArticleData[]
}

export function PendingArticlesSection({ articles }: PendingArticlesSectionProps) {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Artikel Pending</CardTitle>
        <Button variant="link" size="sm">
          Lihat Semua
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {articles.map((article) => (
          <PendingArticleItem key={article.id} {...article} />
        ))}
      </CardContent>
    </Card>
  )
}
