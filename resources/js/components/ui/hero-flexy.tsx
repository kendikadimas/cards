import { Button } from "@/components/ui/button"

export function HeroFlexy() {
  return (
    <section className="bg-primary w-full relative overflow-hidden">
      {/* Container utama diubah untuk menyelaraskan item ke bawah pada layar besar (lg:items-end) */}
      <div className="container mx-auto px-6 md:px-12  flex flex-col-reverse lg:flex-row items-center lg:items-end gap-8">
        
        {/* Konten Teks (Lebar 1/2 di layar besar) */}
        <div className="w-full lg:w-1/2 text-center lg:text-left pb-16 lg:pb-24 relative">
          {/* Elemen dekoratif lingkaran oranye */}
          {/* <div className="absolute -top-4 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-5 h-5 bg-orange-500 rounded-full z-10" /> */}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter text-white max-w-3xl mx-auto lg:mx-0">
            Solusi Pendanaan Fleksibel <br className="hidden md:block"/> 
            Untuk Sekolah Anda!
          </h1>
          
          <p className="mt-6 text-base md:text-lg text-white/90 max-w-xl mx-auto lg:mx-0">
           Mendukung sekolah dalam mengelola arus kas dengan lebih fleksibel, agar setiap rencana dan kebutuhan bisa terealisasi tepat waktu tanpa harus mengorbankan kualitas pendidikan.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {/* Tombol bisa ditambahkan di sini jika perlu */}
          </div>
        </div>

        {/* Gambar (Lebar 1/2 di layar besar) */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/images/hero-flexy.png"
            alt="Ilustrasi dashboard dan aplikasi mobile"
            className="w-full h-auto max-w-lg lg:max-w-none" // max-w-none agar gambar bisa mengisi container
          />
        </div>
      </div>
    </section>
  )
}
