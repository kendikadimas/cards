import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="bg-primary w-full h-screen relative overflow-hidden">
      
      <div className="container mx-auto px-20 pt-30 pb-25 mb-10 flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="text-center lg:text-left relative">

          <div className="absolute -top-6 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-5 h-5 bg-accent-orange rounded-full z-20" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter text-white max-w-4xl mx-auto lg:mx-0">
              Sistem Terintegrasi<br className="hidden md:block"/> 
              dan Transaksi <i>Cashless</i>
            </h1>
            <p className="mt-1 mb-2 text-base md:text-lg text-white/90 max-w-xl mx-auto lg:mx-0">
              Layanan lengkap manajemen data siswa, staff/guru, PPDB online, administrasi, keuangan, akademik, presensi,
              tabungan, hingga transaksi non tunai di kantin lembaga pendidikan (Sekolah & Pondok Pesantren)
            </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button variant="secondary" size="lg">
                <a href={route('demo')} className="text-white">Jadwalkan Demo</a>
              </Button>
              <Button variant="outline" size="lg" className="text-primary bg-white hover:bg-primary hover:text-white transition-colors duration-300">
                <a href={route('about')} className="">Selengkapnya</a>
              </Button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center ml-20">
          <img
            src="/images/dashboard.png"
            alt="Dashboard and mobile app illustration"
            className="w-full max-w-md lg:max-w-lg rounded-xl"
          />
        </div>
      </div>
    </section>
  )
}
