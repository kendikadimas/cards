"use client"

import { useState } from "react"
import { FlexyCazhCard } from "./flexy-cazh-card"
import { DollarSign, ShieldCheck, TrendingUp, Users, Lightbulb } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Data untuk semua bagian digabungkan dalam satu array
const sections = [
  {
    id: "apa-itu",
    title: "Apa itu FlexyCazh?",
    description:
      "FlexyCazh adalah layanan pembiayaan faktur (factoring invoice financing) yang dirancang khusus untuk membantu sekolah menerima dana di muka berdasarkan tagihan yang belum dibayar tanpa harus menunggu pembayaran dari orang tua atau pihak ketiga.",
    cards: [
      {
        icon: DollarSign,
        title: "Keunggulan Utama",
        features: [
          "Akses dana langsung tanpa mengganggu operasional.",
          "Pembayaran bulanan otomatis dari arus kas tagihan sekolah.",
          "Terintegrasi secara mulus dengan sistem CARDS.",
          "Tanpa agunan fisik.",
          "Tanpa adanya survei pengajuan mudah.",
          "Tenor fleksibel hingga 12 bulan.",
        ],
      },
      {
        icon: ShieldCheck,
        title: "Keamanan & Transparansi",
        features: [
          "Proses yang aman dan terpercaya.",
          "Transparansi penuh dalam setiap transaksi.",
          "Dukungan pelanggan yang responsif.",
          "Data terenkripsi dan terlindungi.",
        ],
      },
    ],
  },
  {
    id: "mengapa",
    title: "Mengapa FlexyCazh?",
    description:
      "Dengan FlexyCazh, sekolah dapat mengoptimalkan manajemen keuangan, mempercepat proyek-proyek penting, dan memastikan semua kebutuhan operasional terpenuhi tanpa hambatan finansial.",
    cards: [
      {
        icon: TrendingUp,
        title: "Peningkatan Efisiensi",
        features: [
          "Otomatisasi tugas-tugas administratif.",
          "Pengelolaan data yang terpusat.",
          "Pengurangan beban kerja manual.",
          "Akses informasi real-time.",
        ],
      },
      {
        icon: Users,
        title: "Keterlibatan Komunitas",
        features: [
          "Komunikasi yang lebih baik antara sekolah, orang tua, dan siswa.",
          "Portal khusus untuk orang tua.",
          "Pengumuman dan notifikasi instan.",
          "Forum diskusi interaktif.",
        ],
      },
      {
        icon: Lightbulb,
        title: "Inovasi Berkelanjutan",
        features: [
          "Fitur-fitur baru yang terus dikembangkan.",
          "Adaptasi terhadap kebutuhan pendidikan modern.",
          "Teknologi terkini untuk pengalaman terbaik.",
          "Solusi yang skalabel untuk pertumbuhan lembaga.",
        ],
      },
    ],
  },
]

export function FlexyCazhSection() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const activeSection = sections[activeSectionIndex]
  const totalCards = activeSection.cards.length

  const handleNavigateCard = (navDirection: "prev" | "next") => {
    const isNext = navDirection === "next";
    setDirection(isNext ? 1 : -1);

    const nextCardIndex = currentCardIndex + (isNext ? 1 : -1);

    if (nextCardIndex >= totalCards) {
      // Pindah ke section berikutnya
      setActiveSectionIndex((prev) => (prev + 1) % sections.length);
      setCurrentCardIndex(0);
    } else if (nextCardIndex < 0) {
      // Pindah ke section sebelumnya
      const prevSectionIndex = (activeSectionIndex - 1 + sections.length) % sections.length;
      setActiveSectionIndex(prevSectionIndex);
      setCurrentCardIndex(sections[prevSectionIndex].cards.length - 1);
    } else {
      setCurrentCardIndex(nextCardIndex);
    }
  }

  return (
    <section className="w-full py-16 lg:py-24 bg-white relative overflow-hidden px-15">
      {/* Background shapes */}
      {/* <div className="absolute top-1/4 left-0 w-48 h-48 bg-blue-100 rounded-full opacity-50 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl" /> */}

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Kolom Kiri: Judul dan Deskripsi dengan animasi */}
            <div className="space-y-4 text-center lg:text-left">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl pb-6 font-bold text-[#00718F]">{activeSection.title}</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">{activeSection.description}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Kolom Kanan: Kartu dengan animasi */}
            <div className="flex justify-center items-center h-full">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={`${activeSection.id}-${currentCardIndex}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-md"
                >
                  <FlexyCazhCard
                    {...activeSection.cards[currentCardIndex]}
                    onNavigateCard={handleNavigateCard}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
        </div>
      </div>
    </section>
  )
}
