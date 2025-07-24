import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react" // Menggunakan ikon ImageIcon dari Lucide React

interface PromotionCardProps {
  imageSrc: string
  title: string
  status: string
  startDate: string
  endDate: string
}

export function PromotionCard({ imageSrc, title, status, startDate, endDate }: PromotionCardProps) {
  return (
    <Card className="overflow-hidden rounded-lg shadow-md">
      <div className="relative h-40 w-full">
        {imageSrc ? (
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=160&width=320&text=Gambar+Tidak+Tersedia"
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute bottom-2 left-2 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
          {status}
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <div className="text-sm text-muted-foreground">
          <p>Mulai: {startDate}</p>
          <p>Berakhir: {endDate}</p>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Lihat
          </Button>
          <Button size="sm">Edit</Button>
        </div>
      </div>
    </Card>
  )
}
