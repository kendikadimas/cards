"use client"

import { MemberArticleCard } from "./member-article-card"; // Pastikan tipe ini ada di index.d.ts
import type { MemberArticleData } from "@/types"; // Pastikan tipe ini ada di index.d.ts
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArticleCarouselProps {
    articles: MemberArticleData[];
}

export function ArticleCarousel({ articles }: ArticleCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
        loop: true,
    });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    if (!articles || articles.length === 0) {
        return <p>Tidak ada artikel untuk ditampilkan.</p>;
    }

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4">
                    {articles.map((article) => (
                        <div key={article.id} className="flex-[0_0_90%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4">
                            <MemberArticleCard {...article} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Tombol Navigasi */}
            <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 -left-4 -translate-y-1/2 rounded-full h-10 w-10 z-10"
                onClick={scrollPrev}
            >
                <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 -right-4 -translate-y-1/2 rounded-full h-10 w-10 z-10"
                onClick={scrollNext}
            >
                <ChevronRight className="h-5 w-5" />
            </Button>
        </div>
    );
}