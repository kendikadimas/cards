import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, UserPlus, Megaphone, type LucideIcon } from "lucide-react"
import type React from "react"
import type { ActivityItemData } from "@/types" // Import interface dari types/index.d.ts

// Peta nama ikon string ke komponen Lucide
const iconMap: { [key: string]: LucideIcon } = {
  CheckCircle: CheckCircle,
  UserPlus: UserPlus,
  Megaphone: Megaphone,
  // Tambahkan ikon lain sesuai kebutuhan
}

interface ActivityItemProps {
  icon: string // Diubah menjadi string agar sesuai dengan output Laravel
  text: string
  time: string
  iconColorClass: string
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, text, time, iconColorClass }) => {
  const IconComponent = iconMap[icon] // Dapatkan komponen Lucide yang sebenarnya

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in iconMap.`)
    return null // Atau render ikon default
  }

  return (
    <div className="flex items-start gap-3">
      <IconComponent className={iconColorClass} />
      <div>
        <p className="text-sm text-gray-800">{text}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}

interface RecentActivitiesSectionProps {
  activities: ActivityItemData[]
}

export function RecentActivitiesSection({ activities }: RecentActivitiesSectionProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Aktivitas Terbaru</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </CardContent>
    </Card>
  )
}
