import React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import {
  TestimonialCard,
  TestimonialProps,
} from "@/components/ui/testimonial-card";

const testimonials: TestimonialProps[] = [
  {
    quote:
      "Platform ini benar-benar mengubah cara kami mengelola administrasi. Semuanya menjadi lebih efisien dan terorganisir.",
    name: "Budi Santoso",
    title: "Kepala Sekolah, SMA Negeri 1",
    avatarSrc: "https://github.com/shadcn.png",
    avatarFallback: "BS",
  },
  {
    quote:
      "Sebagai orang tua, saya merasa lebih terhubung dengan perkembangan anak saya di sekolah berkat aplikasi ini. Luar biasa!",
    name: "Citra Lestari",
    title: "Orang Tua Murid",
    avatarSrc: "https://github.com/shadcn.png",
    avatarFallback: "CL",
  },
  {
    quote:
      "Fitur e-learning dan pembayaran non-tunai sangat membantu. Ini adalah inovasi yang dibutuhkan dunia pendidikan saat ini.",
    name: "Ahmad Dahlan",
    title: "Ketua Yayasan Pendidikan",
    avatarSrc: "https://github.com/shadcn.png",
    avatarFallback: "AD",
  },
];

export function TestimonialsSection() {
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
