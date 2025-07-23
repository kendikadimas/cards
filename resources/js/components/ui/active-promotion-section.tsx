import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PromotionCard } from "./promotion-card"
import { Plus } from "lucide-react"
import type { PromotionData } from "@/types" // Import interface dari types/index.d.ts

interface ActivePromotionsSectionProps {
  promotions: PromotionData[]
}

export function ActivePromotionsSection({ promotions }: ActivePromotionsSectionProps) {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Banner Promosi Aktif</CardTitle>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" /> Tambahkan banner baru
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <PromotionCard key={promo.id} {...promo} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
