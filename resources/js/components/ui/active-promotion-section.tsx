import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { PlusCircle } from "lucide-react"
import { PromotionCard } from "./promotion-card"
import type { BanpromData } from "@/types"

interface ActivePromotionsSectionProps {
  promotions: BanpromData[]
}

export function ActivePromotionsSection({ promotions }: ActivePromotionsSectionProps) {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Promosi Aktif</CardTitle>
        <Button asChild variant="outline" size="sm">
            {/* <Link href={route("banners.manage")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Buat Promosi Baru
            </Link> */}
        </Button>
      </CardHeader>
      <CardContent>
        {promotions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {promotions.map((promo) => (
              <PromotionCard
                key={promo.id}
                imageSrc={promo.gambar} // Menggunakan 'gambar'
                title={promo.judul} // Menggunakan 'judul'
                status={promo.status} // Menggunakan 'status'
                startDate={promo.tglmulai} // Menggunakan 'tglmulai'
                endDate={promo.tglakhir} // Menggunakan 'tglakhir'
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">Tidak ada promosi aktif saat ini.</p>
        )}
      </CardContent>
    </Card>
  )
}
