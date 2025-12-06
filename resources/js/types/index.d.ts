import exp from "constants"
import type { Config } from "ziggy-js"

// Definisikan interface untuk pengguna
export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string
  profile_image?: string
  phone?: string
  institution?: string;
  role: "admin" | "editor" | "member" | "user" | "Super Admin"
}

// Definisikan interface untuk data yang dibagikan di seluruh aplikasi Inertia
export interface SharedData {
  auth: {
    user: User | null
  }
  ziggy: Config & { location: string }
}

export interface PageProps extends SharedData { 
  [key: string]: any;
}

// --- Tipe Data Dashboard & Umum ---

export interface DashboardStats {
  totalArticles: number;
  articleProgress: number;
  totalUsers: number;
  userProgress: number;
  totalDemos: number;
  pendingArticles: number;
  activeBanners: number;
  newBanners: number;
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

export interface ArticleChartData {
  month: string;
  count: number;
}

export interface SuperAdminDashboardProps extends PageProps {
  stats: DashboardStats;
  recentActivities: ActivityItemData[];
  pendingArticles: PendingArticleData[];
  usersForManagement: UserManagementData[];
  activeBanproms: BanpromData[];
  articleChartData: ArticleChartData[];
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
  filters: {
    status?: string
  }
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
  konten: string // Untuk artikel yang sudah terpublikasi
  read_count?: number // Jumlah pembacaan artikel
}

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
  id: number; // <-- Tambahkan id
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
  id: number;
  slug: string;
  imageSrc: string;
  title: string;
  timeRead: string;
  link: string;
}

export interface MemberDashboardPageProps extends PageProps {
  promos: PromoData[];
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
  filters: { // <-- Tambahkan properti filter
      search?: string;
      category?: string;
      month?: string;
  };
}

export interface EditorStats {
  totalArtikel: number;
  artikelPending: number;
  artikelBulanIni: number;
  totalMember: number;
  articleProgress: number;
    newPending: number;
    memberProgress: number;
}

export interface PendingArticle {
  id: number;
  title: string;
  author: string;
  time: string;
}

export interface Activity {
  id: number;
  type: 'submitted' | 'approved';
  text: string;
  time: string;
}

export interface EditorDashboardPageProps extends PageProps {
  stats: EditorStats;
  pendingArticles: PendingArticle[];
  recentActivities: Activity[];
}


export interface Activity {
  id: number;
  type: "read" | "edit" | "submit" | string;
  description: string;
}


export interface ProfilePageProps extends PageProps {
  user_articles: ArticleListItem[];
  recent_activities: Activity[];
}

export interface BanpromItem {
  id: number;
  title: string;
  uploader: string;
  status: string;
  date: string; // Tanggal dibuat
  image_url: string;
  startDate: string; // Tanggal mulai (YYYY-MM-DD)
  endDate: string;   // Tanggal akhir (YYYY-MM-DD)
  duration: string;
}

export interface ManageBannersPageProps extends PageProps {
  banproms: {
    data: BanpromItem[];
    links: { url: string | null; label: string; active: boolean }[];
    // ...properti paginasi lainnya
  };
}

// Tipe baru untuk halaman review
export interface BannerReviewPageProps extends PageProps {
  banner: BanpromItem;
}

export interface Comment {
  id: number;
  author_name: string;
  author_image: string;
  content: string;
  timestamp: string; // <-- Tambahkan timestamp
  created_at: string;
  like_count: number; // <-- Tambahkan like_count
  is_liked_by_user: boolean; // <-- Tambahkan is_liked_by_user
  replies: Comment[];
}

export interface ArticleDetailData {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  body_html: string;
  author_name: string;
  author_image: string;
  author_institution: string;
  published_date: string;
  category: string;
  read_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
  is_liked_by_user: boolean;
  comments: Comment[];
}

export interface RelatedArticleItem {
  id: number;
  slug: string;
  title: string;
  image_url: string;
  author_name: string;
}


export interface ArticleDetailPageProps extends PageProps {
  article: ArticleDetailData;
  relatedArticles: RelatedArticleItem[];
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

// Tipe untuk data utama produk
export interface ProductData {
  name: string;
  description: string;
  icon: string;
  features: ProductFeature[];
}

// Tipe untuk props yang diterima oleh halaman ProductDetail
export interface ProductDetailPageProps extends PageProps {
  product: ProductData;
  partners: string[];
}

export interface UniqueSectionData {
  type: string; // 'parent_monitoring', 'school_administration', etc.
  data: {
    title: string;
    content: string;
    image_url: string;
  };
}

export interface ProductData {
  name: string;
  description: string;
  icon: string;
  features: ProductFeature[];
  unique_section?: UniqueSectionData; // <-- Buat jadi opsional
}

// Tipe untuk props halaman
export interface ProductDetailPageProps extends PageProps {
  product: ProductData;
  partners: string[];
}

export interface LandingPageArticle {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
}

export interface BannerLandingPage {
  id: number;
  judul: string;
  gambar_url: string;

}

// Definisikan tipe untuk props yang diterima oleh halaman utama (Index/LandingPage)
export interface LandingPageProps extends PageProps {
  articles: LandingPageArticle[];
  banners: BannerLandingPage[];
  siteStats: { title: string; value: number }[];
  testimonials: {
    quote: string;
    name: string;
    title: string;
    avatarSrc: string;
    avatarFallback: string;
  }[];
}

export interface CategoryFilterItem {
  nama_kategori: string;
  slug: string;
}

export interface BlogArticleItem {
  id: number;
  slug: string;
  category: string;
  title: string;
  imageSrc: string;
  author: string;
  date: string;
  description?: string; // Untuk featured post
}

export interface BlogPageProps extends PageProps {
  featuredArticle: BlogArticleItem | null;
  articles: {
    data: BlogArticleItem[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  categories: CategoryFilterItem[];
  filters: {
    category?: string;
    sort?: string;
  };
}

export type ChartDataPoint = {
  name: string; // Misalnya, nama bulan atau tanggal
  value: number; // Jumlah data untuk periode tersebut
};

export type MemberAnalyticsPageProps = PageProps & {
  stats: {
    total_published: number;
    total_pending: number;
    total_likes: number;
    total_comments: number;
    // Tambahkan data historis untuk chart
    published_over_time: ChartDataPoint[]; // Misalnya, [{ name: 'Jan', value: 10 }, { name: 'Feb', value: 15 }]
    likes_over_time: ChartDataPoint[]; // Bisa juga ditambahkan untuk like atau komentar jika diperlukan
  };
};

export type ChartDataPoint = {
  name: string; // Misalnya, nama bulan atau tanggal
  value: number; // Jumlah data untuk periode tersebut
};

export type MemberAnalyticsPageProps = PageProps & {
  stats: {
    total_published: number;
    total_pending: number;
    total_likes: number;
    total_comments: number;
    total_reads: number; // Menambahkan ini jika belum ada
    // Tambahkan data historis untuk chart
    published_over_time: ChartDataPoint[];
    pending_over_time: ChartDataPoint[]; // BARU
    likes_over_time: ChartDataPoint[];   // BARU
    comments_over_time: ChartDataPoint[]; // BARU
    reads_over_time: ChartDataPoint[];    // BARU
  };
};