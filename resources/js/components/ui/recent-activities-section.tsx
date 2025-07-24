import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity } from "lucide-react"
import { CheckCircle, UserPlus, Megaphone, FileText, Clock, MessageSquare, Users } from "lucide-react"
import type { ActivityItemData } from "@/types"

interface RecentActivitiesSectionProps {
  activities: ActivityItemData[]
}

// Map string icon names to Lucide React components
const iconMap: { [key: string]: React.ElementType } = {
  CheckCircle: CheckCircle,
  UserPlus: UserPlus,
  Megaphone: Megaphone,
  FileText: FileText,
  Clock: Clock,
  MessageSquare: MessageSquare,
  Users: Users,
}

export function RecentActivitiesSection({ activities }: RecentActivitiesSectionProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Aktivitas Terbaru</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px]">
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const IconComponent = iconMap[activity.icon] || Activity // Fallback to generic Activity icon
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {IconComponent && <IconComponent className={activity.iconColorClass} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
