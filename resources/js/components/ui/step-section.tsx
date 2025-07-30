"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Data untuk setiap langkah, bisa dipindahkan ke file terpisah jika perlu
const steps = [
  {
    stepNumber: 1,
    title: "Bergabung Menjadi Partner CARDS",
    description: "Untuk mengajukan FlexyCazh, Anda harus terlebih dahulu bergabung sebagai Partner CARDS. Keanggotaan ini menjadi syarat awal agar proses pengajuan dapat diverifikasi dan sesuai standar layanan.",
  },
  {
    stepNumber: 2,
    title: "Transaksi Online Selama 3 Bulan",
    description: "FlexyCazh hanya bisa diajukan oleh partner yang aktif bertransaksi online minimal 3 bulan. Riwayat ini menunjukkan konsistensi dan kredibilitas, sehingga pengajuan lebih lancar dan limit disesuaikan dengan kebutuhan operasional.",
  },
  {
    stepNumber: 3,
    title: "Ajukan Flexycazh Sekarang",
    description: "Setelah memenuhi syarat, Anda bisa langsung mengajukan FlexyCazh melalui menu yang tersedia. Pastikan data dan riwayat transaksi Anda valid agar proses berjalan cepat dan mudah.",
  },
]

// Komponen untuk satu kartu langkah
interface StepCardProps {
  stepNumber: number
  title: string
  description: string
}

function StepCard({ stepNumber, title, description }: StepCardProps) {
  return (
    
    <Card className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 h-full flex flex-col w-[430px] mx-auto">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-500 text-white text-2xl font-bold">
          {stepNumber}
        </div>
      </div>
      <CardHeader className="p-0 text-center">
        <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-4 text-center text-gray-600 flex-grow">
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}


export function StepSection() {
  return (
    <section className="py-16 lg:py-24 bg-primary px-15">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Dapatkan FlexyCazh dengan mengikuti 3 langkah mudah
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Proses cepat, syarat jelas, dan dukungan penuh untuk lembaga Anda.
          </p>
        </div>

        {/* Grid untuk 3 Kartu Langkah */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <StepCard
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
