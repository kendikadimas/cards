import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BanpromItemSimple } from "@/types"; // Import tipe

interface PromoBannerProps {
  banners: BanpromItemSimple[]; // Terima 'banners' sebagai prop
}

export function PromoBanner({ banners }: PromoBannerProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);
  const nextSlide = useCallback(() => api?.scrollNext(), [api]);
  const prevSlide = useCallback(() => api?.scrollPrev(), [api]);

  // Autoplay
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // 5 detik
    return () => clearInterval(interval);
  }, [api]);

  // Jangan render apapun jika tidak ada banner
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-20">
      <div className="text-center py-8">
        <h2 className="text-4xl font-bold text-primary">
          Penawaran Spesial Untuk Anda
        </h2>
      </div>

      <div className="relative w-full">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full relative">
          <CarouselContent>
            {banners.map((promo) => (
              <CarouselItem key={promo.id}>
                <Card className="border-none bg-transparent shadow-none hover:shadow-none hover:translate-y-0">
                  <CardContent className="flex items-center justify-center p-0">
                    <img
                      src={promo.gambar_url}
                      alt={promo.judul}
                      className="w-[60%] h-auto object-cover rounded-2xl"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <button onClick={prevSlide} className="absolute top-1/2 left-[15%] -translate-y-1/2 bg-white/80 rounded-full p-2 z-10">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 right-[15%] -translate-y-1/2 bg-white/80 rounded-full p-2 z-10">
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  current === index + 1 ? "w-4 bg-primary" : "bg-primary/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
