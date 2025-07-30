"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PromotionCardProps {
  imageSrc: string
  title: string
  status: string
  startDate: string
  endDate: string
}

export function PromotionCard({ imageSrc, title, status, startDate, endDate }: PromotionCardProps) {
  const getStatusVariant = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === "aktif") return "bg-cyan-100 text-cyan-800";
    if (lowerStatus === "berakhir") return "bg-gray-100 text-gray-800";
    return "bg-red-100 text-red-800"; // Default untuk status lain
  };

  return (
    <Card className="overflow-hidden rounded-xl shadow-md border border-gray-200 flex flex-col">
      {/* Bagian Gambar */}
      <div className="relative aspect-video w-full">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/400x200?text=Gambar+Tidak+Tersedia"
          }}
        />
      </div>
      
      {/* Bagian Konten */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-800 leading-tight">{title}</h3>
          <Badge className={cn("border-none capitalize flex-shrink-0", getStatusVariant(status))}>
            {status}
          </Badge>
        </div>
        
        <div className="text-sm text-muted-foreground mt-2">
          <p>Dimulai : {startDate}</p>
          <p>Berakhir : {endDate}</p>
        </div>

        {/* Spacer untuk mendorong tombol ke bawah */}
        <div className="flex-grow" />

        <div className="mt-4 flex justify-start gap-2">
          <Button size="sm" className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200">
            Edit
          </Button>
          <Button size="sm" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Pause
          </Button>
          <Button size="sm" className="bg-red-100 text-red-800 hover:bg-red-200">
            Hapus
          </Button>
        </div>
      </div>
    </Card>
  )
}
