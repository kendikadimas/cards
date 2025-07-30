"use client"

import React, { useCallback, useEffect, useState } from "react"
import MemberLayout from "@/layouts/member-layout"
import { MemberStatCard } from "@/components/ui/member-stat-card"
// import {  MemberArticleCard } from "@/components/ui/member-article-card"
import { ArticleCarousel } from "@/components/ui/article-carousel"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, Head, usePage } from "@inertiajs/react"
import type { MemberDashboardPageProps } from "@/types"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"

// Komponen Carousel untuk Promo
const PromoCarousel = ({ promos }) => {
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) return;
        const interval = setInterval(() => api.scrollNext(), 5000); // Autoplay 5 detik
        return () => clearInterval(interval);
    }, [api]);

    if (!promos || promos.length === 0) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg p-8">
                <p className="text-gray-500">Tidak ada promo aktif saat ini.</p>
            </div>
        );
    }

    return (
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full relative">
            <CarouselContent>
                {promos.map((promo) => (
                    <CarouselItem key={promo.id}>
                        <div className="relative w-full aspect-[3/1] overflow-hidden rounded-lg">
                            <img src={promo.imageSrc} alt={promo.title} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 bg-black/50 text-white p-4 w-full">
                                <h3 className="font-bold">{promo.title}</h3>
                                <p className="text-sm opacity-90">{promo.description}</p>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <Button size="icon" variant="ghost" className="absolute top-1/2 -translate-y-1/2 left-2 rounded-full bg-white/80 hover:bg-white text-primary" onClick={() => api?.scrollPrev()}><ChevronLeft/></Button>
            <Button size="icon" variant="ghost" className="absolute top-1/2 -translate-y-1/2 right-2 rounded-full bg-white/80 hover:bg-white text-primary" onClick={() => api?.scrollNext()}><ChevronRight/></Button>
        </Carousel>
    );
};

export default function MemberDashboardPage() {
  const { promos, stats, articles } = usePage<MemberDashboardPageProps>().props

  return (
    <MemberLayout title="Dashboard Member">
      <Head title="Dashboard" />
      <div className="container mx-auto space-y-8 py-8 px-15">
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Bagian Promo Carousel */}
          <section className="lg:w-3/4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Promo untuk Anda</h2>
            <PromoCarousel promos={promos} />
          </section>

          {/* Bagian Statistik */}
          <section className="lg:w-1/4">
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistik Saya</h2>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <MemberStatCard key={index} {...stat} />
              ))}
            </div>
          </section>
        </div>
        
        {/* Bagian Artikel */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Artikel untuk Anda</h2>
            <Button asChild size="sm" className="bg-primary text-white hover:bg-primary/80">
              <Link href={route("member.articles")}>
                <Plus className="h-4 w-4 mr-2" /> Unggah Artikel
              </Link>
            </Button>
          </div>
            <div className="">
              <ArticleCarousel articles={articles} />
            </div>
        </section>
      </div>
    </MemberLayout>
  )
}