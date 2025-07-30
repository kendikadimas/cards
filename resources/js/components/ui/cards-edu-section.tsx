"use client"

import { Check } from "lucide-react";

// Komponen sekarang menerima 'data' sebagai prop
interface CardsEduSectionProps {
  data: {
    title: string;
    features: string[];
    image_url: string;
  };
}

export function CardsEduSection({ data }: CardsEduSectionProps) {
  // Jika tidak ada data, jangan render apa-apa untuk menghindari error
  if (!data) {
    return null;
  }

  return (
    <section className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Kolom Kiri: Gambar Aplikasi */}
          <div className="flex justify-center">
            <img
              src={data.image_url} // <-- Gunakan data dinamis
              alt="Aplikasi CARDS EDU"
              className=" w-full max-w-lg"
            />
          </div>

          {/* Kolom Kanan: Judul dan Fitur */}
          <div className="text-gray-800 space-y-6 lg:pl-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary leading-tight">
              {data.title} {/* <-- Gunakan data dinamis */}
            </h2>
            
            <ul className="space-y-4 pt-4">
              {/* Gunakan data dinamis untuk me-render fitur */}
              {data.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-green-100 p-1 rounded-full">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-lg text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
