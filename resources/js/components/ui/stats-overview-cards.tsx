"use client"
import { Users, Newspaper, Send, Clock, Megaphone } from "lucide-react"
import { StatCard } from "./stat-card"
import type { DashboardStats } from "@/types"

interface StatsOverviewCardsProps {
  stats: DashboardStats;
}

export function StatsOverviewCards({ stats }: StatsOverviewCardsProps) {
  // Memberikan nilai default 0 jika stats tidak ada atau belum termuat
  const { 
    totalArticles = 0,
    articleProgress = 0,
    totalUsers = 0,
    userProgress = 0,
    totalDemos = 0, 
    pendingArticles = 0, 
    activeBanners = 0,
    newBanners = 0,
  } = stats || {};

  // Fungsi untuk memformat angka (misal: 112000 -> 112.000)
  const formatNumber = (num: number) => new Intl.NumberFormat('id-ID').format(num);

  // Fungsi untuk membuat teks progres dinamis
  const getProgressText = (progress: number) => {
      if (progress > 0) {
          return `+${progress}% dari bulan lalu`;
      }
      if (progress < 0) {
          // Tanda minus sudah otomatis ada di angka progress
          return `${progress}% dari bulan lalu`;
      }
      return 'Sama seperti bulan lalu';
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
      <StatCard
        title="Total Artikel"
        value={formatNumber(totalArticles)}
        description={getProgressText(articleProgress)}
        icon={<Newspaper className="h-6 w-6 text-white" />}
        bgColor="bg-[#00718F]" // Biru Tua
      />
      <StatCard
        title="Total Users"
        value={formatNumber(totalUsers)}
        description={getProgressText(userProgress)}
        icon={<Users className="h-6 w-6 text-white" />}
        bgColor="bg-[#27AE60]" // Hijau
      />
      <StatCard
        title="Demo Review"
        value={formatNumber(totalDemos)}
        description="Butuh Di Cek"
        descriptionColor="text-red-300 font-semibold"
        icon={<Send className="h-6 w-6 text-white" />}
        bgColor="bg-[#2D3E50]" // Biru Gelap
      />
      <StatCard
        title="Pending Review"
        value={formatNumber(pendingArticles)}
        description="Butuh Diperhatikan"
        icon={<Clock className="h-6 w-6 text-white" />}
        bgColor="bg-[#F39C12]" // Kuning
      />
      <StatCard
        title="Banner Aktif"
        value={formatNumber(activeBanners)}
        description={`${newBanners} Banner Baru`}
        icon={<Megaphone className="h-6 w-6 text-white" />}
        bgColor="bg-[#8E44AD]" // Ungu
      />
    </div>
  )
}
