import { CheckCircle2 } from "lucide-react";

// Terima 'data' sebagai prop
export function DashboardSection({ data }) {
  return (
    <section className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri: Gambar */}
          <div className="relative flex justify-center">
            <div className="absolute top-0 -left-10 w-24 h-24 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-10 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <img
              src={data.image_url} // Gunakan data.image_url
              alt="Dashboard CARDS"
              className="relative rounded-4xl z-10 w-full max-w-xl"
            />
          </div>
          {/* Kolom Kanan: Teks */}
          <div className="text-gray-700 space-y-4 lg:pl-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-tight">
              {data.title}
            </h2>
            <p className="text-lg text-gray-600">
              {data.description}
            </p>
            <ul className="space-y-3 pt-4">
              {/* Gunakan data.features untuk me-render list */}
              {data.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-teal-500" />
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
