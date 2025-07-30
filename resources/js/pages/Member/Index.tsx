import MemberLayout from "@/layouts/member-layout"
import { MemberPromoCard } from "@/components/ui/member-promo-card"
import { MemberStatCard } from "@/components/ui/member-stat-card"
import { MemberArticleCard } from "@/components/ui/member-article-card"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, Head, usePage } from "@inertiajs/react"
import type { MemberDashboardPageProps } from "@/types"

export default function MemberDashboardPage() {
  const { promos, stats, articles } = usePage<MemberDashboardPageProps>().props

  return (
    <MemberLayout title="Dashboard Member">
      <Head title="Dashboard" />
      <div className="container mx-auto space-y-8 py-8">
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Bagian Promo */}
          <section className="lg:w-3/4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Promo untuk Anda</h2>
            {promos ? (
              <MemberPromoCard {...promos} />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg p-8">
                <p className="text-gray-500">Tidak ada promo aktif saat ini.</p>
              </div>
            )}
          </section>

          {/* Bagian Statistik */}
          <section className="lg:w-1/4">
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistik Saya</h2>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <MemberStatCard key={index} {...stat} />
              ))}
            </div>
          </section>
        </div>
        
        {/* Bagian Artikel */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Artikel untuk Anda</h2>
            <Button asChild size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              <Link href={route("member.articles")}>
                <Plus className="h-4 w-4 mr-2" /> Unggah Artikel
              </Link>
            </Button>
          </div>
          {articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <MemberArticleCard key={index} {...article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border rounded-lg bg-gray-50">
                <p className="text-gray-500">Belum ada artikel untuk ditampilkan.</p>
            </div>
          )}
        </section>
      </div>
    </MemberLayout>
  )
}