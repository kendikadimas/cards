"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FlexyCazhCardProps {
  icon: React.ElementType
  title: string
  features: string[]
  onNavigateCard: (direction: "prev" | "next") => void
}

export function FlexyCazhCard({
  icon: Icon,
  title,
  features,
  onNavigateCard,
}: FlexyCazhCardProps) {
  return (
    // Wrapper tetap mengatur lebar maksimum 500px
    <div className="relative pt-10 w-full max-w-[500px] mx-auto">
      {/* Ikon diposisikan absolut terhadap wrapper */}
      <div className="absolute top-0 left-6 p-3 bg-orange-500 rounded-xl shadow-md border-4 border-white z-10">
        <Icon className="h-8 w-8 text-white" />
      </div>

      {/* FIX: Kartu diberi tinggi tetap h-[300px] */}
      <Card className="relative bg-[#00718F] p-0 ml-2 text-white rounded-2xl shadow-xl border-4 border-white flex flex-col h-[300px]">
        <CardHeader className="pt-10 px-6 ml-10 flex-shrink-0">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        
        {/* Konten tidak lagi scrollable */}
        <CardContent className="px-6 flex-grow">
          <ul className="space-y-1">
            {features.map((feature, index) => (
              // FIX: Ukuran font dikecilkan dari text-base menjadi text-sm
              <li key={index} className="flex items-start gap-3 text-sm">
                <Check className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        {/* Tombol Navigasi di dalam kartu */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/50 text-white hover:bg-white hover:text-[#00718F] transition-colors bg-transparent"
            onClick={() => onNavigateCard("prev")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/50 text-white hover:bg-white hover:text-[#00718F] transition-colors bg-transparent"
            onClick={() => onNavigateCard("next")}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
