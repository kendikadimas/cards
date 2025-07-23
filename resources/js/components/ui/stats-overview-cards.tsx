import { StatCard } from "./stat-card"
import { FileText, Users, Clock, Megaphone } from "lucide-react"
import type { DashboardStats } from "@/types" // Import interface dari types/index.d.ts

export function StatsOverviewCards({
  totalArticles,
  totalUsers,
  pendingReviewCount,
  activeBannersCount,
}: DashboardStats) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={FileText}
        title="Total Artikel"
        value={totalArticles.toLocaleString()} // Format angka
        change="+12% dari bulan lalu" // Tetap statis untuk saat ini
        colorClass="bg-green-500"
      />
      <StatCard
        icon={Users}
        title="Total Users"
        value={totalUsers.toLocaleString()} // Format angka
        change="+8% dari bulan lalu" // Tetap statis untuk saat ini
        colorClass="bg-green-500"
      />
      <StatCard
        icon={Clock}
        title="Pending Review"
        value={pendingReviewCount.toLocaleString()} // Format angka
        description="Butuh Diperhatikan"
        colorClass="bg-orange-500"
      />
      <StatCard
        icon={Megaphone}
        title="Banner Aktif"
        value={activeBannersCount.toLocaleString()} // Format angka
        description="5 Banner Baru" // Tetap statis untuk saat ini
        colorClass="bg-purple-600"
      />
    </div>
  )
}
