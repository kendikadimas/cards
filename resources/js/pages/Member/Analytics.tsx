// Analytics.tsx
import MemberLayout from "@/layouts/member-layout";
import { MemberAnalyticsChart } from "@/components/ui/member-analytics-chart";
import { MemberDetailStatCard } from "@/components/ui/member-detail-stat-card";
import { Upload, MessageSquare, ThumbsUp, Clock, TrendingUp, BarChart3 } from "lucide-react";
import { Head, usePage } from "@inertiajs/react";
import type { MemberAnalyticsPageProps } from "@/types";

export default function MemberAnalyticsPage() {
  const { stats } = usePage<MemberAnalyticsPageProps>().props;

  return (
    <MemberLayout title="Analitik Artikel">
      <Head title="Analitik Artikel" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto space-y-8 py-8 px-4 sm:px-6 lg:px-8">
          {/* Main Chart with enhanced container */}
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <MemberAnalyticsChart
              title="Total Publikasi Anda"
              value={stats.total_published}
              data={stats.published_over_time}
              chartPlaceholderText="Data publikasi tidak tersedia."
            />
          </div>

          {/* Detail Stats Cards with improved grid and animations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
              <MemberDetailStatCard
                icon={Clock}
                title="Artikel Pending"
                value={stats.total_pending}
                data={stats.pending_over_time || []}
                chartColorClass="bg-gradient-to-br from-orange-100 via-orange-50 to-orange-200"
                chartPlaceholderText="Data pending tidak tersedia."
              />
            </div>
            
            <div className="transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
              <MemberDetailStatCard
                icon={ThumbsUp}
                title="Total Like Diterima"
                value={stats.total_likes}
                data={stats.likes_over_time || []}
                chartColorClass="bg-gradient-to-br from-green-100 via-green-50 to-green-200"
                chartPlaceholderText="Data like tidak tersedia."
              />
            </div>
            
            <div className="transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
              <MemberDetailStatCard
                icon={TrendingUp}
                title="Total Pembacaan Artikel"
                value={stats.total_reads}
                data={stats.reads_over_time || []}
                chartColorClass="bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200"
                chartPlaceholderText="Data pembacaan tidak tersedia."
              />
            </div>
            
            <div className="transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
              <MemberDetailStatCard
                icon={MessageSquare}
                title="Total Komentar"
                value={stats.total_comments}
                data={stats.comments_over_time || []}
                chartColorClass="bg-gradient-to-br from-purple-100 via-purple-50 to-purple-200"
                chartPlaceholderText="Data komentar tidak tersedia."
              />
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}