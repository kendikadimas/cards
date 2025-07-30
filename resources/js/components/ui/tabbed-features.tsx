"use client"

import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react"
import { SectionHeader } from "./section-header"
import { GraduationCap, Users, UserPlus, Wallet, MessageSquare, ShoppingCart, QrCode } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Define the structure for each category and its sub-features, grouped logically from the image
const categories = {
  "manajemen-sekolah": {
    mainTitle: "Manajemen Sekolah",
    mainDescription: "Kelola semua aktivitas sekolah dengan lebih rapi & efisien dengan satu sistem terintegrasi.", // Inferred description
    subFeatures: [
      {
        title: "Akademik",
        description:
          "Mengelola jadwal mata pelajaran, presensi harian dan presensi mata pelajaran, presensi kegiatan, serta nilai hingga rapor digital siswa.",
        icon: GraduationCap,
      },
      {
        title: "Pendaftaran",
        description:
          "Website sekolah disediakan, termasuk sistem pendaftaran siswa baru yang terintegrasi dengan proses otomatis.",
        icon: UserPlus,
      },
      {
        title: "Kesiswaan",
        description:
          "Informasi umum seperti pengumuman dan informasi terkait prestasi, pelanggaran, kesehatan, perizinan, dan progres.",
        icon: Users,
      },
    ],
  },
  "keuangan-pembayaran": {
    mainTitle: "Keuangan dan Pembayaran",
    mainDescription: "Sistem keuangan terpadu untuk pengelolaan dana yang transparan dan efisien.", // Inferred description
    subFeatures: [
      {
        title: "Keuangan",
        description:
          "Pengelolaan program tabungan siswa dan program donasi, serta pembukuan dan laporan pembayaran tagihan otomatis.",
        icon: Wallet,
      },
      {
        title: "Sistem Tagihan",
        description:
          "Manajemen tagihan yang lengkap beserta pembayaran tagihan sekolah melalui akun virtual bank, minimarket, dan QRIS.",
        icon: Wallet,
      },
      {
        title: "Uang Saku Digital",
        description:
          "Uang saku aman yang dapat dimonitor dan dibatasi penggunaannya oleh orang tua, serta fitur top-up dari mana saja.",
        icon: Wallet,
      },
    ],
  },
  "komunikasi-digital": {
    mainTitle: "Komunikasi dan Kantin Digital",
    mainDescription: "Tingkatkan interaksi dan layanan kantin digital dengan aplikasi terintegrasi.", // Inferred description
    subFeatures: [
      {
        title: "Komunikasi",
        description:
          "Penyebaran informasi bisa menggunakan WhatsApp blast dan notifikasi aplikasi untuk pengingat tagihan dan informasi.",
        icon: MessageSquare,
      },
      {
        title: "Kantin",
        description:
          "Aplikasi kantin dengan fitur lengkap dapat menerima transaksi digital dari kartu siswa (uang saku digital) dan e-wallet.",
        icon: QrCode,
      },
      {
        title: "Toko Online",
        description:
          "Memungkinkan kantin untuk memiliki toko online yang terhubung dengan sistem kantin dan dapat ditampilkan pada aplikasi orang tua.",
        icon: ShoppingCart,
      },
    ],
  },
}

const categoryKeys = Object.keys(categories)

export function TabbedFeatures() {
  const [activeCategory, setActiveCategory] = useState(categoryKeys[0])
  const activeContent = categories[activeCategory]

  return (
    <section className="w-full py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-blue-100 rounded-full opacity-50 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-12">
          <SectionHeader
            title="Banyak Fitur, Banyak Solusi"
            description="" // Description is empty as per image
          />
        </div>

        {/* Category Tabs */}
        <ToggleGroup
          type="single"
          defaultValue={activeCategory}
          onValueChange={(value) => {
            if (value) {
              setActiveCategory(value)
            }
          }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <ToggleGroupItem
            value="manajemen-sekolah"
            aria-label="Manajemen Sekolah"
            className="data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:shadow-md data-[state=on]:border-primary rounded-full px-6 py-2 border border-gray-300 text-gray-700 hover:bg-primary/10 transition-colors duration-200"
          >
            Manajemen Sekolah
          </ToggleGroupItem>
          <ToggleGroupItem
            value="keuangan-pembayaran"
            aria-label="Keuangan dan Pembayaran"
            className="data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:shadow-md data-[state=on]:border-primary rounded-full px-6 py-2 border border-gray-300 text-gray-700 hover:bg-primary/10 transition-colors duration-200"
          >
            Keuangan dan Pembayaran
          </ToggleGroupItem>
          <ToggleGroupItem
            value="komunikasi-digital"
            aria-label="Komunikasi dan Kantin Digital"
            className="data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:shadow-md data-[state=on]:border-primary rounded-full px-6 py-2 border border-gray-300 text-gray-700 hover:bg-primary/10 transition-colors duration-200"
          >
            Komunikasi dan Kantin Digital
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Main Content Card with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory} // Key changes to trigger animation on content change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-6xl bg-white p-8 lg:p-12 rounded-2xl border border-blue-200 shadow-xl relative"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 gap-6 lg:gap-12">
              <h3 className="text-3xl md:text-4xl font-bold text-primary lg:w-1/2 text-left">
                {activeContent.mainTitle}
              </h3>
              <p className="text-lg text-muted-foreground lg:w-1/2 text-left">{activeContent.mainDescription}</p>
            </div>

            {/* Sub-feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeContent.subFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }} // Staggered animation
                  className="bg-primary rounded-lg p-6 relative shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group" // Reverted to original styling
                >
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 rounded-lg" />
                  {/* Icon at top-right */}
                  <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 p-3 bg-accent-orange rounded-md shadow-sm z-10">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="relative z-10">
                    {" "}
                    {/* Ensure text is above gradient */}
                    <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-white/80">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Button */}
        <Button size="lg" className="mt-12 text-white" variant={"secondary"}>
          <a href={route('demo')}>Jadwalkan Demo</a>
        </Button>
      </div>
    </section>
  )
}
