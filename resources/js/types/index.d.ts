import type { Config } from "ziggy-js"

// Definisikan interface untuk pengguna
export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string
  profile_image?: string
  phone?: string
  role: "admin" | "editor" | "member" | "user" | "Super Admin"
}

// Definisikan interface untuk data yang dibagikan di seluruh aplikasi Inertia
export interface SharedData {
  auth: {
    user: User | null
  }
  ziggy: Config & { location: string }
}

export interface PageProps extends SharedData {}

// --- Tipe Data Dashboard & Umum ---

export interface DashboardStats {
  totalArticles: number
  totalUsers: number
  pendingReviewCount: number
  activeBanpromsCount: number
}

export interface ActivityItemData {
  icon: string
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

export interface BanpromData {
  id: number
  judul: string
  gambar: string
  status: "pending" | "aktif" | "berakhir"
  tglmulai: string
  tglakhir: string
}

export interface SuperAdminDashboardProps extends PageProps {
  stats: DashboardStats
  recentActivities: ActivityItemData[]
  pendingArticles: PendingArticleData[]
  usersForManagement: UserManagementData[]
  activeBanproms: BanpromData[]
}

// --- Tipe Data Demo Booking ---

export interface DemoBookingItem {
    id: string;
    namaAnda: string;
    sebagai?: string;
    namaLembaga: string;
    jenisLembaga?: string;
    estimasiJumlahSiswa?: string;
    nomorHp: string;
    kabupatenKota?: string;
    provinsi?: string;
    kebutuhanFitur?: string[];
    mendengarCazhDari?: string;
    tanggalBooking: string;
    isDone: boolean;
}

export interface ManageDemoBookingsPageProps extends PageProps {
    demoBookings: {
        data: DemoBookingItem[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export interface DemoBookingDetailPageProps extends PageProps {
    dembook: DemoBookingItem;
}

// --- Tipe Data Artikel & Kategori ---

export interface Category {
  id: number
  nama_kategori: string
}

export interface ArticleListItem {
  id: number
  title: string
  excerpt?: string
  author?: string
  status: "Pending" | "Terpublikasi" | "Published" | "Rejected" | string
  date: string
  slug?: string
  image_url?: string
  kategori_id?: number
  category_name?: string
  konten?: string
  views?: string | number
  category?: string
}

export interface KelolaArtikelPageProps extends PageProps {
  articles: {
    data: ArticleListItem[]
    links: { url:string | null; label: string; active: boolean }[]
    current_page: number
    last_page: number
    from: number
    to: number
    total: number
  }
  categories: Category[]
}

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
    kategori_id: number
    category_name?: string
  }
}

export interface CreateArticlePageProps extends PageProps {
  categories: Category[]
}


// --- Tipe Data Untuk Manajemen Pengguna (Baru & Diperbarui) ---

// Tipe untuk aktivitas pengguna di halaman detail
export interface Activity {
  id: string
  type: "article-sent" | "article-approved" | "link-shared"
  description: string
  time: string
}

// Tipe untuk satu item user di dalam tabel utama (lebih lengkap)
export interface UserInTable {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    profileImage: string;
}

// Tipe untuk props halaman daftar pengguna (paginasi)
export interface ManageUsersPageProps extends PageProps {
    users: {
        data: UserInTable[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

// Tipe untuk props halaman detail pengguna
export interface UserDetailPageProps extends PageProps {
    user: UserInTable;
    articles: ArticleListItem[];
    activities: Activity[];
}


export interface Category {
  id: number;
  name: string;
  slug: string;
  status: "active" | "inactive";
}

export interface ManageCategoriesPageProps extends PageProps {
  categories: {
    data: Category[];
    links: { url: string | null; label: string; active: boolean }[];
    // properti paginasi lainnya...
  };
}

export interface PromoData {
  imageSrc: string;
  title: string;
  description: string;
}

export interface StatData {
  title: string;
  value: string | number;
  description: string;
  colorClass: string;
}

export interface MemberArticleData {
  imageSrc: string;
  title: string;
  timeRead: string;
  link: string;
}

export interface MemberDashboardPageProps extends PageProps {
  promo: PromoData | null;
  stats: StatData[];
  articles: MemberArticleData[];
}

export interface MemberAnalyticsStats {
    total_published: number;
    total_pending: number;
    total_likes: number;
    total_comments: number;
}

export interface MemberAnalyticsPageProps extends PageProps {
    stats: MemberAnalyticsStats;
}


export interface MemberArticlePageProps extends PageProps {
  articles: {
    data: ArticleListItem[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  categories: Category[];
}
