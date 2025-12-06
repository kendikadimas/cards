import { Check } from "lucide-react";

// Terima 'data' sebagai prop
export function ParentAppSection({ data }) {
  return (
    <section className="w-full bg-white py-16 lg:py-24 overflow-hidden px-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri: Teks */}
          <div className="relative flex justify-center">
             <div className="absolute top-10 right-0 w-28 h-28 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
             <div className="absolute bottom-10 left-0 w-28 h-28 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <img
              src={data.image_url} // Gunakan data.image_url
              alt="Aplikasi Orang Tua CARDS"
              className="relative bg-primary rounded-4xl z-10 w-full h-[500px] object-cover"
            />
          </div>
          <div className="text-gray-700 space-y-4 lg:pr-8">
            <p className="font-semibold text-teal-600">{data.pre_title}</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-tight">
              {data.title}
            </h2>
            <p className="text-lg text-gray-600">
              {data.description}
            </p>
            <ul className="space-y-3 pt-4">
              {/* Gunakan data.features untuk me-render list */}
              {data.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-teal-500 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 pt-6">
                <a href="#" aria-label="Download on the App Store" className='bg-black px-6 py-2 rounded-md flex items-center gap-2'>
                            <img src="/images/apple icon.svg" alt="App Store" className="h-12 " />
                            <p className='text-sm underline text-white'>
                                Download on the <br /> <span className='font-bold text-xl text-white'>
                                    App Store
                                </span>
                            </p>
                        </a>
                        <a href="#" aria-label="Get it on Google Play" className='bg-black px-6 py-2 rounded-md flex items-center gap-2'>
                            <img src="/images/google play icon.svg" alt="Google Play" className="h-12" />
                             <p className='text-sm text-white'>
                                Get it on <br /> <span className='font-bold text-xl text-white'>
                                    Google Play
                                </span>
                            </p>
                        </a>
            </div>
          </div>
          {/* Kolom Kanan: Gambar */}
        </div>
      </div>
    </section>
  )
}
