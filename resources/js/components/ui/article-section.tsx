import { SectionHeader } from "@/components/ui/section-header"
import { ArticleCard, type ArticleProps } from "./article-card" // Path disesuaikan
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Data artikel diperbarui sesuai dengan gambar contoh
const articles: ArticleProps[] = [
  {
    imageSrc: "/images/article1.png", // Ganti dengan path gambar yang sesuai
    title: "Pentingnya Digitalisasi Bagi Pesantren",
    description:
      "Pentingnya digitalisasi bagi Pesantren di era digital 4.0 menjadi salah satu PR dan upaya yang harus dilakukan oleh semua pesantren.",
    link: "/blog/digitalisasi-pesantren",
  },
  {
    imageSrc: "/images/article2.png", // Ganti dengan path gambar yang sesuai
    title: "SMA IT Madiun Luncurkan Kartu Akademik Terpadu",
    description:
      "Kini satu kartu bisa digunakan untuk cek nilai, jadwal pelajaran, hingga akses ruang kelas. Efisien dan modern! Rekap tagihan, pembayaran kantin, dan top up kartu kini bisa diunduh...",
    link: "/blog/sma-it-madiun",
  },
  {
    imageSrc: "/images/article3.png", // Ganti dengan path gambar yang sesuai
    title: "Update Fitur 'Top Up Saldo Kartu' Kini Bisa Lewat QRIS",
    description:
      "Orang tua kini bisa isi saldo kartu siswa cukup dengan scan QR dari aplikasi. Tidak perlu antre atau transfer manual!",
    link: "/blog/fitur-qris",
  },
]

export function ArticleSection() {
  // State paginasi disesuaikan dengan contoh gambar
  const currentPage = 1
  const totalPages = 68 //

  // Logika paginasi disederhanakan untuk mencocokkan tampilan di gambar
  const renderPaginationNumbers = () => {
    const pages: (number | string)[] = []
    
    // Tampilkan: 1, 2, ..., 67, 68
    if (totalPages > 5) {
      pages.push(1)
      pages.push(2)
      pages.push("...")
      pages.push(totalPages - 1)
      pages.push(totalPages)
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    }
    
    return pages.map((page, index) => (
      <Button
        key={index}
        variant="outline"
        className={cn(
          // Tombol diubah dari rounded-full menjadi rounded-md
          "h-10 w-10 rounded-md text-gray-700 border-gray-300 hover:bg-gray-100",
          page === currentPage && "bg-gray-800 text-white border-gray-800 hover:bg-gray-900", // Gaya aktif
          page === "..." && "pointer-events-none border-none bg-transparent text-gray-700", // Gaya elipsis
        )}
        disabled={page === "..."}
      >
        {page}
      </Button>
    ))
  }

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden px-20">
      {/* Background shapes */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-blue-100 rounded-full opacity-50 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <SectionHeader
          title="Artikel Populer"
          description=""
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[75px] mt-12">
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end gap-2 mt-16">{renderPaginationNumbers()}</div>
      </div>
    </section>
  )
}