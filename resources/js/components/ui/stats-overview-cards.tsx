"use client"
import { Users, Newspaper, TrendingUp, DollarSign } from "lucide-react"
import { StatCard } from "./stat-card"

interface StatsOverviewCardsProps {
  stats: {
    totalUsers?: number
    totalArticles?: number
    publishedArticles?: number
    pendingArticles?: number
    totalRevenue?: number
    newUsersToday?: number
    articlesPublishedToday?: number
    revenueToday?: number
  }
}

export function StatsOverviewCards({ stats }: StatsOverviewCardsProps) {
  // Provide default values if stats or its properties are undefined
  const totalUsers = stats?.totalUsers ?? 0
  const totalArticles = stats?.totalArticles ?? 0
  const publishedArticles = stats?.publishedArticles ?? 0
  const pendingArticles = stats?.pendingArticles ?? 0
  const totalRevenue = stats?.totalRevenue ?? 0
  const newUsersToday = stats?.newUsersToday ?? 0
  const articlesPublishedToday = stats?.articlesPublishedToday ?? 0
  const revenueToday = stats?.revenueToday ?? 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Pengguna"
        value={totalUsers.toString()}
        description={`+${newUsersToday} pengguna baru hari ini`}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Total Artikel"
        value={totalArticles.toString()}
        description={`${publishedArticles} dipublikasikan, ${pendingArticles} menunggu`}
        icon={<Newspaper className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Pendapatan Total"
        value={`Rp${totalRevenue.toLocaleString("id-ID")}`}
        description={`+Rp${revenueToday.toLocaleString("id-ID")} hari ini`}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Trafik Situs"
        value="2,350"
        description="+180 dari bulan lalu"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}
