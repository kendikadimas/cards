// Analytics.tsx
import MemberLayout from "@/layouts/member-layout";
import { MemberAnalyticsChart } from "@/components/ui/member-analytics-chart";
import { MemberDetailStatCard } from "@/components/ui/member-detail-stat-card";
import { Upload, MessageSquare, ThumbsUp, Clock } from "lucide-react";
import { Head, usePage } from "@inertiajs/react";
import type { MemberAnalyticsPageProps } from "@/types"; // Pastikan tipe ini sudah diperbarui

export default function MemberAnalyticsPage() {
  // Ambil data statistik asli dari props
  const { stats } = usePage<MemberAnalyticsPageProps>().props;

  return (
    <MemberLayout title="Analitik Artikel">
      <Head title="Analitik Artikel" />
      <div className="container mx-auto space-y-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Statistik Artikel Anda</h1>

        {/* Main Chart menampilkan total artikel yang dipublikasi beserta historisnya */}
        <MemberAnalyticsChart
          title="Total Publikasi Anda"
          value={stats.total_published}
          data={stats.published_over_time} // Meneruskan data historis ke chart
          chartPlaceholderText="Data publikasi tidak tersedia."
        />

        {/* Detail Stats Cards */}
        <div className="grid grid-cols-2 gap-6">
          <MemberDetailStatCard
            icon={Clock}
            title="Pending Publikasi Anda"
            value={stats.total_pending}
            data={stats.total_pending} // Meneruskan data historis ke chart
            chartColorClass="bg-gradient-to-br from-orange-100 to-orange-200"
          />
          <MemberDetailStatCard
            icon={ThumbsUp}
            title="Like Untuk Artikel Anda"
            value={stats.total_likes}
            chartColorClass="bg-gradient-to-br from-green-100 to-green-200"
          />
          <MemberDetailStatCard
            icon={Upload}
            title="Artikel Anda Telah Dibagikan"
            value={stats.total_reads}
            data={stats.total_reads} // Meneruskan data historis ke chart
            chartColorClass="bg-gradient-to-br from-blue-100 to-blue-200"
          />
          <MemberDetailStatCard
            icon={MessageSquare}
            title="Komentar Untuk Artikel Anda"
            value={stats.total_comments}
            chartColorClass="bg-gradient-to-br from-purple-100 to-purple-200"
          />
        </div>
      </div>
    </MemberLayout>
  );
}