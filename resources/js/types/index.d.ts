import type { Config } from "ziggy-js"

// Definisikan interface untuk pengguna
export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string
  profile_image?: string
  role: "admin" | "editor" | "member" | "user" // Tambahkan peran lain jika diperlukan
}

// Definisikan interface untuk data yang dibagikan di seluruh aplikasi Inertia
export interface SharedData {
  auth: {
    user: User | null
  }
  ziggy: Config & { location: string }
  // Tambahkan data bersama lainnya seperti flash messages, errors, dll. jika diperlukan
}

// Ini adalah PageProps dasar untuk Inertia.js, yang memperluas SharedData
export interface PageProps extends SharedData {
  // Tambahkan properti umum lainnya yang mungkin diterima oleh semua halaman Inertia
}

// Interface spesifik untuk data dashboard admin
export interface DashboardStats {
  totalArticles: number
  totalUsers: number
  pendingReviewCount: number
  activeBannersCount: number
}

export interface ActivityItemData {
  icon: string // Nama ikon Lucide sebagai string (misal: "CheckCircle")
  text: string
  time: string
  iconColorClass: string
}

export interface PendingArticleData {
  id: string
  title: string
  author: string
  timeAgo: string
}

export interface UserManagementData {
  id: string
  profileImage: string
  name: string
  role: string
}

export interface PromotionData {
  id: string
  title: string
  description: string
  imageSrc: string
  status: string
  start_date: string
  end_date: string
}

// Interface untuk props halaman SuperAdminDashboardPage
export interface SuperAdminDashboardProps extends PageProps {
  stats: DashboardStats
  recentActivities: ActivityItemData[]
  pendingArticles: PendingArticleData[]
  usersForManagement: UserManagementData[]
  activePromotions: PromotionData[]
}
