import SuperAdminLayout from "@/layouts/admin-layout"
import { StatsOverviewCards } from "@/components/ui/stats-overview-cards"
import { ArticleStatsChart } from "@/components/ui/article-stats-chart"
import { RecentActivitiesSection } from "@/components/ui/recent-activities-section"
import { ActivePromotionsSection } from "@/components/ui/active-promotion-section"
import { PendingArticlesSection } from "@/components/ui/pending-articles-section"
import { UserManagementSection } from "@/components/ui/user-management-section"
import { usePage } from "@inertiajs/react"
import type { SuperAdminDashboardProps } from "@/types" // Import interface dari types/index.d.ts

export default function SuperAdminDashboardPage() {
  const { stats, recentActivities, pendingArticles, usersForManagement, activePromotions } =
    usePage<SuperAdminDashboardProps>().props

  return (
    <SuperAdminLayout>
      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="text-xl font-semibold">Dashboard Super Admin</h1>
          <p className="text-sm text-muted-foreground">Selamat datang kembali, Super Admin</p>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top Stats Cards */}
        <StatsOverviewCards
          totalArticles={stats.totalArticles}
          totalUsers={stats.totalUsers}
          pendingReviewCount={stats.pendingReviewCount}
          activeBannersCount={stats.activeBannersCount}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Article Stats Chart */}
          <div className="lg:col-span-2">
            <ArticleStatsChart totalArticles={stats.totalArticles} /> {/* Meneruskan totalArticles untuk saat ini */}
          </div>
          {/* Recent Activities */}
          <div>
            <RecentActivitiesSection activities={recentActivities} />
          </div>
        </div>

        {/* Active Promotions Section */}
        <ActivePromotionsSection promotions={activePromotions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Articles Section */}
          <PendingArticlesSection articles={pendingArticles} />
          {/* User Management Section */}
          <UserManagementSection users={usersForManagement} />
        </div>
      </main>
    </SuperAdminLayout>
  )
}
