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
  activeBanpromsCount: number
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

// Interface untuk data Banprom (sebelumnya PromotionData)
export interface BanpromData {
  id: number
  judul: string // Menggunakan 'judul' sesuai migrasi
  gambar: string // Menggunakan 'gambar' sesuai migrasi
  status: "pending" | "aktif" | "berakhir" // Menggunakan enum sesuai migrasi
  tglmulai: string // Menggunakan 'tglmulai' sesuai migrasi
  tglakhir: string // Menggunakan 'tglakhir' sesuai migrasi
}

// Interface untuk props halaman SuperAdminDashboardPage
export interface SuperAdminDashboardProps extends PageProps {
  stats: DashboardStats
  recentActivities: ActivityItemData[]
  pendingArticles: PendingArticleData[]
  usersForManagement: UserManagementData[]
  activeBanproms: BanpromData[]
}

// Interface untuk data Kategori
export interface Category {
  id: number
  nama_kategori: string
}

// Interface untuk data artikel di halaman KelolaArtikel
export interface ArticleListItem {
  id: number
  title: string
  excerpt: string
  author: string
  status: "pending" | "published" | "rejected" | string // Menambahkan string untuk fleksibilitas
  date: string // Formatted date string
  slug: string
  image_url?: string // Optional image URL
  kategori_id: number // Tambahkan kategori_id
  category_name?: string // Tambahkan category_name untuk tampilan
}

// Interface untuk props halaman KelolaArtikel
export interface KelolaArtikelPageProps extends PageProps {
  articles: {
    data: ArticleListItem[]
    links: { url: string | null; label: string; active: boolean }[]
    current_page: number
    last_page: number
    from: number
    to: number
    total: number
  }
}

// Interface untuk props halaman ReviewArtikel
export interface ReviewArticlePageProps extends PageProps {
  article: {
    id: number
    title: string
    author: string
    date: string
    image_url: string
    body_html: string
    status: string
    slug: string
    kategori_id: number // Tambahkan kategori_id
    category_name?: string // Tambahkan category_name untuk tampilan
  }
}

// Interface untuk props halaman CreateArticle
export interface CreateArticlePageProps extends PageProps {
  categories: Category[]
}
