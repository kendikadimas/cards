import React from "react";
import { Button } from "@/components/ui/button"; // Asumsi menggunakan komponen dari shadcn/ui

export function CtaBanner() {
  return (
    // 1. `overflow-hidden` dihapus dari sini agar gambar tidak terpotong.
    <section className="w-full bg-primary h-[400px] relative pt-[89px] mt-30">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Kolom Kiri: Teks & Tombol (Tidak ada perubahan) */}
        <div className="text-center md:text-left pb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tunggu Apa Lagi?
          </h2>
          <p className="text-white/90 mb-8 max-w-lg">
            Wujudkan Sekolah Digital Sekarang Juga, Jadikan lingkungan sekolah
            Anda menjadi lebih digital dengan memakai Cards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-secondary hover:bg-orange-400 text-white font-semibold py-3 px-6"
            >
              Jadwalkan Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white hover:bg-white/90 text-primary font-semibold py-3 px-6 border-transparent"
            >
              Kontak Whatsapp
            </Button>
          </div>
        </div>

        {/* Kolom Kanan: Gambar */}
        {/* 2. Margin diubah menjadi negatif (`md:-mt-24`) untuk menarik gambar ke atas di layar desktop. */}
        {/* 3. Lebar diatur (`w-full max-w-md`) untuk kontrol layout yang lebih baik. */}
        <div className="flex-shrink-0 mt-12 md:-mt-30 w-full  bottom-0 max-w-md md:max-w-lg">
          <img
            src="/images/guru.png" // Pastikan path ini sesuai dengan struktur folder Anda
            alt="Guru dan Murid"
            className="h-auto w-full object-contain bottom-0 "
          />
        </div>
        
      </div>
    </section>
  );
}