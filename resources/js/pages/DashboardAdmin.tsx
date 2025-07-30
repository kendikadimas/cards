import SuperAdminLayout from "@/layouts/admin-layout"
import { StatsOverviewCards } from "@/components/ui/stats-overview-cards"
import { ArticleStatsChart } from "@/components/ui/article-stats-chart"
import { RecentActivitiesSection } from "@/components/ui/recent-activities-section"
import { ActivePromotionsSection } from "@/components/ui/active-promotion-section"
import { PendingArticlesSection } from "@/components/ui/pending-articles-section"
import { UserManagementSection } from "@/components/ui/user-management-section"
import { usePage, Head } from "@inertiajs/react"
import type { SuperAdminDashboardProps } from "@/types"
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function SuperAdminDashboardPage() {
  const { stats, recentActivities, pendingArticles, usersForManagement, activeBanproms, articleChartData } =
    usePage<SuperAdminDashboardProps>().props

  return (
    <SuperAdminLayout>
      <Head title="Dashboard Super Admin" />
      {/* Header dibuat agar tidak menyusut dan tetap di atas */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-6 flex-shrink-0">
        <div>
          <h1 className="text-xl font-semibold">Dashboard Super Admin</h1>
        <Breadcrumbs items={[{ label: "Dashboard" }]} />
        </div>
        
      </header>


      {/* Konten utama yang bisa di-scroll secara independen */}
      <main className="flex-1 p-6 overflow-y-auto">
        <StatsOverviewCards stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ArticleStatsChart chartData={articleChartData} />
          </div>
          <div>
            <RecentActivitiesSection activities={recentActivities} />
          </div>
        </div>
        
        <ActivePromotionsSection promotions={activeBanproms} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <PendingArticlesSection articles={pendingArticles} />
          <UserManagementSection users={usersForManagement} />
        </div>
      </main>
    </SuperAdminLayout>
  )
}