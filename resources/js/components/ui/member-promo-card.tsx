"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@inertiajs/react"
import type { PromoData } from "@/types" // Pastikan tipe ini ada


export function MemberPromoCard({ id, gambar_url, judul, description, link }: PromoData & { link?: string }) {
  const cardContent = (
    <Card className="overflow-hidden rounded-lg shadow-md border border-blue-200 h-full">
      <CardContent className="p-0 h-full">
        <div className="relative w-full  overflow-hidden h-full">
          <img
            src={gambar_url || "/placeholder.svg"}
            alt={judul}
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 bg-black/50 text-white p-4 w-full">
              <h3 className="font-bold text-lg">{judul}</h3>
              <p className="text-sm opacity-90">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Jika ada link, bungkus kartu dengan komponen Link
  return link ? <Link href={link}>{cardContent}</Link> : cardContent;
}