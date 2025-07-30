import MemberLayout from "@/layouts/member-layout"
import { MemberAnalyticsChart } from "@/components/ui/member-analytics-chart"
import { MemberDetailStatCard } from "@/components/ui/member-detail-stat-card"
import { Upload, MessageSquare, ThumbsUp, Clock } from "lucide-react"
import { Head, usePage } from "@inertiajs/react"
import type { MemberAnalyticsPageProps } from "@/types" // Pastikan tipe ini ada

export default function MemberAnalyticsPage() {
  // Ambil data statistik asli dari props
  const { stats } = usePage<MemberAnalyticsPageProps>().props

  return (
    <MemberLayout title="Analitik Artikel">
        <Head title="Analitik Artikel" />
      <div className="container mx-auto space-y-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Statistik Artikel Anda</h1>

        {/* Main Chart menampilkan total artikel yang dipublikasi */}
        <MemberAnalyticsChart
          title="Total Publikasi Anda"
          value={stats.total_published}
          chartPlaceholderText="Grafik akan ditampilkan di sini"
        />

        {/* Detail Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MemberDetailStatCard
            icon={Upload}
            title="Artikel Terpublikasi"
            value={stats.total_published}
            chartColorClass="bg-gradient-to-br from-blue-100 to-blue-200"
          />
          <MemberDetailStatCard
            icon={Clock}
            title="Artikel Pending"
            value={stats.total_pending}
            chartColorClass="bg-gradient-to-br from-orange-100 to-orange-200"
          />
          <MemberDetailStatCard
            icon={ThumbsUp}
            title="Total Like Diterima"
            value={stats.total_likes}
            chartColorClass="bg-gradient-to-br from-green-100 to-green-200"
          />
          <MemberDetailStatCard
            icon={MessageSquare}
            title="Total Komentar"
            value={stats.total_comments}
            chartColorClass="bg-gradient-to-br from-purple-100 to-purple-200"
          />
        </div>
      </div>
    </MemberLayout>
  )
}