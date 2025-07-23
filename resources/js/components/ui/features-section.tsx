import { Monitor, FileText, QrCode, ShieldCheck, Lock } from "lucide-react"

const featuresData = [
  {
    title: "Administrasi Digital",
    description: "Administrasi digital yang mudah, akurat, terlacak, dan aman.",
    icon: Monitor,
  },
  {
    title: "Transparansi",
    description: "Akses akademik mudah & transparan bagi orang tua dan sekolah.",
    icon: FileText,
  },
  {
    title: "Transaksi Digital",
    description: "Dukung transaksi digital untuk tagihan & kantin.",
    icon: QrCode,
  },
  {
    title: "Keamanan",
    description: "Keamanan terjamin lewat enkripsi & kontrol akses.",
    icon: ShieldCheck,
  },
]

export function FeaturesSection() {
  return (
    <section className="w-full py-30 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left side: Image of phone with floating elements */}
        <div className="relative lg:w-1/2 flex justify-center">
          <img
            src="/images/mockup-hp.png"
            alt="Mobile app interface"
            className="w-[553px] h-[508px] object-contain"
          />
          {/* Floating element 1: Payment methods */}
          <div className="absolute top-[50%] left-[10%]">
            <div className="flex items-center gap-2 bg-white/70 shadow-md rounded-lg px-3 py-2 w-[75%]">
              <div className="p-2 bg-orange-500 rounded-lg flex items-center justify-center">
                <img src="/images/qr-code.svg" alt="Metode Pembayaran" className="h-auto w-8"/>
              </div>
              <span className="text-sm text-gray-800">
                Berbagai cara dan metode pembayaran.
              </span>
            </div>
          </div>

          {/* Floating element 2: Encrypted data */}
          <div className="absolute top-[10%] right-[5%]">
            <div className="flex items-center  bg-white/70 shadow-md rounded-lg px-3 py-2 ">
              <div className="p-3 bg-purple-500 rounded-lg shadow-md flex items-center justify-center">
                <img src="/images/data-lock.svg" alt="Data Terenkripsi" />
              </div>
              <span className="text-sm text-gray-700 w-30 text-right">
                Data terenkripsi, akses terkendali.
              </span>
            </div>
          </div>

          {/* Floating element 3: Easy admin */}
          <div className="absolute bottom-[10%] right-[20%]">
            <div className="flex items-center gap-2 bg-white/70 shadow-md rounded-lg px-3 py-2">
              <div className="p-3 bg-teal-500 rounded-lg shadow-md flex items-center justify-center">
                <img src="/images/file-copy.svg" alt="Administrasi Digital" />
              </div>
              <span className="text-sm text-gray-700 w-34 text-left">
                Administrasi mudah, akurat & aman.
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Text and Features List */}
        <div className="lg:w-1/2 space-y-8 text-left">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-black">Apa itu <span className="text-primary">CARDS</span> ?</h2>
            <h3 className="text-4xl font-bold text-primary">Platform Digital untuk Lembaga Pendidikan</h3>
            <p className="font-normal text-muted-foreground text-[18px] leading-[28px] w-[606px]">
              CARDS mempermudah sekolah dan lembaga dalam pengelolaan keuangan dan administrasi. Satu sistem terpusat,
              banyak solusi cerdas.
            </p>
          </div>

          <div className="grid gap-6">
            {featuresData.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-md flex-shrink-0 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-primary">{feature.title}</h4>
                  <p className="text-primary">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

