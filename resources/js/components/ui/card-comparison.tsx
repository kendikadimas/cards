import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "./section-header"
import { Link } from "@inertiajs/react" // <-- 1. Ganti <a> dengan <Link> dari Inertia

const cardProducts = [
  {
    id: "parents",
    name: "cards parents",
    logo: "/images/cards_parents_blue.png",
    uses: [
      "Manajemen data siswa dan guru",
      "Absensi digital terintegrasi",
      "Pelaporan akademik otomatis",
      "Kalender akademik sekolah",
    ],
    features: ["Dashboard analitik sekolah", "Keamanan data terintegrasi"],
    link: "/products/cards-parents", // <-- 2. Tambahkan link untuk setiap produk
  },
  {
    id: "school",
    name: "cards school",
    logo: "/images/cards_school_blue.png",
    uses: [
      "Manajemen data siswa dan guru",
      "Absensi digital terintegrasi",
      "Pelaporan akademik otomatis",
      "Kalender akademik sekolah",
    ],
    features: ["Dashboard analitik sekolah", "Keamanan data terintegrasi"],
    link: "/products/cards-school", // <-- 2. Tambahkan link untuk setiap produk
  },
  {
    id: "canteen",
    name: "cards canteen",
    logo: "/images/cards_canteen_blue.png",
    uses: [
      "Manajemen data siswa dan guru",
      "Absensi digital terintegrasi",
      "Pelaporan akademik otomatis",
      "Kalender akademik sekolah",
    ],
    features: ["Dashboard analitik sekolah", "Keamanan data terintegrasi"],
    link: "/products/cards-canteen", // <-- 2. Tambahkan link untuk setiap produk
  },
  {
    id: "edu",
    name: "cards edu",
    logo: "/images/cards_edu_blue.png",
    uses: [
      "Manajemen data siswa dan guru",
      "Absensi digital terintegrasi",
      "Pelaporan akademik otomatis",
      "Kalender akademik sekolah",
    ],
    features: ["Dashboard analitik sekolah", "Keamanan data terintegrasi"],
    link: "/products/cards-edu", // <-- 2. Tambahkan link untuk setiap produk
  },
]

export function CardComparison() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white relative overflow-hidden px-15">
      {/* Background shapes */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-blue-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-40 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionHeader
            title="Berbagai Jenis Cards, Sesuai Kebutuhan"
            description="Dapatkan solusi yang sesuai dengan kebutuhan Anda dengan berbagai jenis kartu Cards."
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {cardProducts.map((card) => (
            <Card
              key={card.id}
              className="flex flex-col border border-blue-200 rounded-2xl overflow-hidden shadow-md relative min-h-[450px] group transition-all duration-300 hover:shadow-black/50"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-blue-100 opacity-30 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full p-6">
                {/* Logo & Title row */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-auto h-14 mb-5 flex items-center justify-center rounded-lg overflow-hidden">
                    <img
                      src={card.logo || "/placeholder.svg"}
                      alt={card.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                <CardHeader className="px-0 pt-0 pb-4">
                  <CardTitle className="text-lg font-semibold text-primary mb-2">Kegunaan</CardTitle>
                  <ul className="space-y-1 text-sm text-primary">
                    {card.uses.map((use, index) => (
                      <li key={index}>• {use}</li>
                    ))}
                  </ul>
                </CardHeader>

                <CardContent className="px-0 pt-4 pb-6 flex-grow">
                  <CardTitle className="text-lg font-semibold text-primary mb-2">Fitur</CardTitle>
                  <ul className="space-y-1 text-sm text-primary">
                    {card.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </div>

              {/* See More on Hover */}
              <Link
                href={card.link}
                className="absolute inset-x-0 bottom-0 p-4 text-right bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm text-primary underline hover:no-underline"
              >
                <span className="block w-full h-full" />
                See More
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
