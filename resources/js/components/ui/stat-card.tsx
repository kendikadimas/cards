import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type React from "react"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  bgColor: string // Prop baru untuk warna latar utama
  iconBgColor?: string // Prop baru untuk warna latar ikon
  descriptionColor?: string // Prop opsional untuk warna deskripsi
}

export function StatCard({ 
    title, 
    value, 
    description, 
    icon, 
    bgColor, 
    iconBgColor = "bg-white/20", // Warna default jika tidak dispesifikasi
    descriptionColor = "text-white/90" // Warna default deskripsi
}: StatCardProps) {
  return (
    <Card className={cn("text-white rounded-xl shadow-lg border-none", bgColor)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconBgColor)}>
            {icon}
          </div>
        </div>
        <p className={cn("text-xs mt-2", descriptionColor)}>
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
