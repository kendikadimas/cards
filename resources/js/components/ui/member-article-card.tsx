"use client"

import React, { useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@inertiajs/react"
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import type { MemberArticleData } from "@/types" // Pastikan tipe ini ada di index.d.ts
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

export function MemberArticleCard({ imageSrc, title, timeRead, link }: MemberArticleData) {
  return (
    <Card className="flex p-0 flex-col h-full overflow-hidden rounded-2xl border-2 border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white group">
      {/* Gambar Artikel */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <Link href={link}>
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
      
      <CardContent className="p-6 flex flex-col flex-grow">
        {/* Judul */}
        <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 mb-3">
          <Link href={link} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </h3>

        {/* Spacer untuk mendorong footer ke bawah */}
        <div className="flex-grow" />

        {/* Footer Kartu */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{timeRead}</span>
          </div>
          <Link href={link} className="flex items-center gap-2 font-semibold text-primary group-hover:underline">
            Baca <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
