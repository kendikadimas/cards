import React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import {
  TestimonialCard,
  TestimonialProps,
} from "@/components/ui/testimonial-card";

interface TestimonialsSectionProps {
  testimonials: TestimonialProps[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="overflow-hidden py-10 lg:py-24 bg-primary w-full">
      <div className="container mx-auto px-4">
        <SectionHeader
          variant="white"
          title="Apa Kata Mereka?"
          description="Dengarkan pengalaman dari para pengguna yang telah merasakan manfaat dari platform kami."
        />

        <div className="overflow-hidden ">
          <div className="carousel-track">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="w-full max-w-[400px] sm:w-[400px] md:w-[500px] flex-shrink-0 snap-center"
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
