import MemberLayout from "@/layouts/member-layout"
import { MemberPromoCard } from "@/components/ui/member-promo-card"
import { MemberStatCard } from "@/components/ui/member-stat-card"
import { MemberArticleCard } from "@/components/ui/member-article-card"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, Head, usePage } from "@inertiajs/react"
import type { MemberDashboardPageProps } from "@/types"

export default function MemberDashboardPage() {
  const { promo, stats, articles } = usePage<MemberDashboardPageProps>().props

  return (
    <MemberLayout title="Dashboard Member">
      <Head title="Dashboard" />
      {/* Container utama diubah menjadi flexbox kolom yang mengisi sisa tinggi layar.
        'h-full' mengharuskan layout induk (MemberLayout) juga memiliki struktur tinggi penuh.
      */}
      <div className="container mx-auto py-4 flex flex-col h-screen">
        
        {/* Baris Atas: Promo & Statistik. flex-shrink-0 mencegah bagian ini menyusut. */}
        <div className="flex flex-col lg:flex-row gap-4 flex-shrink-0">
          
          {/* Bagian Promo: Lebar 3/4 di layar besar */}
          {promo && (
            <section className="lg:w-3/4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Promo untuk Anda</h2>
              <MemberPromoCard {...promo} />
            </section>
          )}

          {/* Bagian Statistik: Lebar 1/4 dan jarak antar kartu (space-y) dikurangi */}
          <section className="lg:w-1/4">
            <div className="flex flex-col space-y-2 h-full justify-between">
              {stats.map((stat, index) => (
                <MemberStatCard key={index} {...stat} />
              ))}
            </div>
          </section>
        </div>
        
        <section className="mt-4 flex-1 flex flex-col min-h-0 max-h-[45vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <h2 className="text-lg font-bold text-gray-900">Artikel untuk Anda</h2>
              <Button asChild size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                <Link href={route("articles.create")}>
                  <Plus className="h-4 w-4 mr-2" /> Unggah Artikel
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {articles.length > 0 ? (
                articles.map((article, index) => (
                  <MemberArticleCard key={index} {...article} />
                ))
              ) : (
                <div className="text-center h-full flex items-center justify-center py-10 border rounded-lg bg-gray-50">
                  <p className="text-gray-500">Belum ada artikel untuk ditampilkan.</p>
                </div>
              )}
            </div>
          </section>
      </div>
    </MemberLayout>
  )
}
