// Pastikan file ini berada di resources/js/Pages/Superadmin/Dashboard.tsx
// Ini adalah komponen utama untuk dashboard Super Admin

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
  // Mengambil props dari Inertia
  const { stats, recentActivities, pendingArticles, usersForManagement, activeBanproms } =
    usePage<SuperAdminDashboardProps>().props

  // Debugging: Log props yang diterima untuk memastikan data ada
  // Ini akan menampilkan seluruh objek props di konsol browser
  console.log("Props received in SuperAdminDashboardPage:", usePage<SuperAdminDashboardProps>().props)

  // Tidak perlu fallback if (!stats) di sini, biarkan komponen anak yang menanganinya
  // agar halaman tetap render dan kita bisa melihat log lebih jelas.

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
        {/* Meneruskan stats sebagai objek, dan biarkan StatsOverviewCards yang mengakses propertinya */}
        <StatsOverviewCards
          totalArticles={stats?.totalArticles ?? 0} // Menggunakan optional chaining dan nullish coalescing
          totalUsers={stats?.totalUsers ?? 0}
          pendingReviewCount={stats?.pendingReviewCount ?? 0}
          activeBanpromsCount={stats?.activeBanpromsCount ?? 0}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Article Stats Chart */}
          <div className="lg:col-span-2">
            {/* Chart ini masih menggunakan data dummy, bisa diintegrasikan nanti */}
            <ArticleStatsChart />
          </div>
          {/* Recent Activities */}
          <div>
            <RecentActivitiesSection activities={recentActivities} />
          </div>
        </div>
        {/* Active Promotions Section */}
        <ActivePromotionsSection promotions={activeBanproms} /> {/* Meneruskan activeBanproms */}
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
