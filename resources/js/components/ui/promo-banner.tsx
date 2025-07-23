import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SectionHeader } from "@/components/ui/section-header";
import { ChevronLeft, ChevronRight } from "lucide-react";

const promoData = [
  { id: 1, imageSrc: "/images/1.png", alt: "Promo Banner 1" },
  { id: 2, imageSrc: "/images/2.png", alt: "Promo Banner 2" },
  { id: 3, imageSrc: "/images/2.png", alt: "Promo Banner 3" },
];

export function PromoBanner() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const nextSlide = () => {
    if (!api) return;
    const nextIndex = (api.selectedScrollSnap() + 1) % promoData.length;
    api.scrollTo(nextIndex);
  };

  const prevSlide = () => {
    if (!api) return;
    const prevIndex =
      (api.selectedScrollSnap() - 1 + promoData.length) % promoData.length;
    api.scrollTo(prevIndex);
  };

  // Autoplay
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 detik
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="w-full py-20">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-primary">
          Penawaran Spesial Untuk Anda
        </h2>
      </div>

      <div className="relative w-full">
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className="w-full relative"
        >
          <CarouselContent>
            {promoData.map((promo) => (
              <CarouselItem key={promo.id}>
                <Card className="border-none bg-transparent shadow-none hover:shadow-none hover:translate-y-0 border-nonet">
                  <CardContent className="flex items-center justify-center p-0">
                    <img
                      src={promo.imageSrc}
                      alt={promo.alt}
                      className="w-[60%] h-auto object-cover rounded-2xl"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Panah Navigasi */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-[15%] -translate-y-1/2 bg-white/80 rounded-full p-2"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-[15%] -translate-y-1/2 bg-white/80 rounded-full p-2"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {promoData.map((_, index) => (
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
