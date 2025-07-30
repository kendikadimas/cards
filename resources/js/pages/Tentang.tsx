import React from 'react';
import { Head } from '@inertiajs/react';
import { Navbar } from '@/components/ui/navbar'; // Sesuaikan path jika perlu
import { Footer } from '@/components/ui/footer'; // Sesuaikan path jika perlu
import { Button } from '@/components/ui/button';
import { Award, Star, CheckCircle, PlayCircle, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TestimonialCard } from '@/components/ui/testimonial-card';

// --- Hero Section ---
const HeroSection = () => (
    <section className="bg-primary text-white text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Tentang CARDS</h1>
        <p className="mt-4 max-w-2xl mx-auto text-white/90">
            Pelajari lebih lanjut tentang misi, visi, dan pencapaian kami.
        </p>
    </section>
);

// --- About "CARDS by Cazh" Section ---
const AboutCardsSection = () => (
    <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full px-30">
                <div className="border-2 border-primary rounded-tl-[20px] rounded-tr-[0px] rounded-br-[20px] rounded-bl-[0px] text-gray-700 space-y-4 p-6">                    
                    <h2 className="text-3xl font-bold text-primary mb-6 rounded-tr-[10px] rounded-br-[0px] rounded-bl-[0px] rounded-tl-[10px]">CARDS by Cazh</h2>
                    <p className='text-primary text-justify'>CARDS by Cazh adalah solusi sistem informasi sekolah terpadu yang dirancang untuk merevolusi dunia pendidikan. Kami menyediakan platform manajemen sekolah berbasis cloud yang efisien, aman, dan mudah digunakan untuk membantu sekolah mengelola administrasi, keuangan, dan komunikasi dengan lebih baik.</p>
                    <p className='text-primary text-justify'>Misi kami adalah memberdayakan institusi pendidikan dengan teknologi inovatif agar mereka dapat fokus pada hal yang paling penting: memberikan pendidikan berkualitas.</p>
                </div>
                <div>
                    <img src="/images/about.png" alt="CARDS Platform" className="rounded-lg" />
                </div>
            </div>
        </div>
    </section>
);
const WhyChooseUsSection = () => {
    const testimonials = [
        { name: "Zahra", title: "Santri Pesantren Al-Hikmah", quote: "Saya sangat senang dengan kemudahan yang diberikan oleh kartu santri digital. Sekarang saya tidak perlu lagi repot membawa uang tunai atau mencatat izin secara manual.", avatarSrc: "https://i.pravatar.cc/150?u=zahra1", avatarFallback: "Z" },
        { name: "Zahra", title: "Santri Pesantren Al-Hikmah", quote: "Saya sangat senang dengan kemudahan yang diberikan oleh kartu santri digital. Sekarang saya tidak perlu lagi repot membawa uang tunai atau mencatat izin secara manual.", avatarSrc: "https://i.pravatar.cc/150?u=zahra2", avatarFallback: "Z" },
        { name: "Zahra", title: "Santri Pesantren Al-Hikmah", quote: "Saya sangat senang dengan kemudahan yang diberikan oleh kartu santri digital. Sekarang saya tidak perlu lagi repot membawa uang tunai atau mencatat izin secara manual.", avatarSrc: "https://i.pravatar.cc/150?u=zahra3", avatarFallback: "Z" },
        { name: "Zahra", title: "Santri Pesantren Al-Hikmah", quote: "Saya sangat senang dengan kemudahan yang diberikan oleh kartu santri digital. Sekarang saya tidak perlu lagi repot membawa uang tunai atau mencatat izin secara manual.", avatarSrc: "https://i.pravatar.cc/150?u=zahra4", avatarFallback: "Z" },
    ];

    return (
        <section className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl -z-10"></div>
            
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-primary">Kenapa Harus memilih Kami?</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mt-12 px-30">
                    {/* Kolom Kiri: Video */}
                    <div className="flex flex-col w-full bg-white rounded-xl shadow-lg p-4">
                        <div className="w-full aspect-video">
                             <iframe 
                                className="w-full h-full rounded-lg"
                                src="https://www.youtube.com/embed/My51fX4zwEE?si=jEHWM0XvBZ4QhXVl" // Ganti dengan ID video YouTube Anda
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="pt-4 text-center lg:text-left">
                            <p className="font-semibold text-gray-800">Ibu Gulami Setya Sari - Wali Santri PP Raudlotut Tholibin, Purwanegara, Banjarnegara, Jateng</p>
                            <a href="https://www.youtube.com/@cazhcards" className="text-sm text-red-600 font-medium hover:underline">YouTube</a>
                        </div>
                    </div>

                    {/* Kolom Kanan: Testimoni */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                        {testimonials.map((testimonial, index) => (
                           // FIX: Menggunakan elemen statis, bukan komponen TestimonialCard
                           <div key={index} className="bg-white p-4 rounded-2xl shadow-md border border-cyan-100 flex flex-col">
                               <Quote className="w-5 h-5 text-gray-300 mb-2" />
                               {/* FIX: Ukuran font diperkecil */}
                               <p className="text-gray-600 text-sm mb-4 flex-grow">"{testimonial.quote}"</p>
                               <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-100">
                                   <Avatar className="h-8 w-8">
                                       <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
                                       <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                                   </Avatar>
                                   <div>
                                       {/* FIX: Ukuran font diperkecil */}
                                       <p className="font-semibold text-sm">{testimonial.name}</p>
                                       <p className="text-xs text-gray-500">{testimonial.title}</p>
                                   </div>
                               </div>
                           </div>
                        ))}
                    </div>
                </div>
                
                <div className="text-center mt-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8">
                        Testimoni Lainnya
                    </Button>
                </div>
            </div>
        </section>
    );
};

// --- Awards Section ---
const AwardsSection = () => {
    // Ganti dengan path gambar penghargaan Anda
    const awards = [
        { imageSrc: "/images/winner_jateng.svg", altText: "Winner The Best Fintech 2023" },
        { imageSrc: "/images/winner_banyumas.svg", altText: "Winner Startup Rating 2023" },
        { imageSrc: "/images/top25_kominfo.svg", altText: "Top 25 Pahlawan Digital Kominfo 2023" },
        { imageSrc: "/images/top3_telkomsel.svg", altText: "Top 3 The NextDev Telkomsel" },
    ];
    return (
        <section className="py-16 lg:py-24 bg-primary text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold">Penghargaan & Prestasi Kami</h2>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                    {awards.map((award, index) => (
                        <div key={index}>
                            <img 
                                src={award.imageSrc} 
                                alt={award.altText} 
                                className="h-64 w-auto mx-auto object-contain mb-10" // Atur tinggi gambar
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// --- Forum & Platforms Section ---
// const ForumSection = () => (
//     <section className="py-16 lg:py-24 bg-white">
//         {/* <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                  <div> */}
//                 </div>
//                 {/* <div className="text-gray-700 space-y-4">
//                     <h2 className="text-3xl font-bold text-primary">CAZH and CARDS Forum</h2>
//                     <p>Bergabunglah dengan komunitas kami untuk berbagi pengetahuan, mendapatkan dukungan, dan berkolaborasi dengan para pendidik lainnya dari seluruh Indonesia.</p>
//                     <ul className="space-y-2">
//                         <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Diskusi & Kolaborasi</li>
//                         <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Dukungan Prioritas</li>
//                         <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Update Fitur Terbaru</li>
//                         <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Webinar & Pelatihan Eksklusif</li>
//                     </ul>
//                 </div> */}
//             </div>
//         </div>
//     </section>
// );

const PlatformsSection = () => {
    const platforms = [
        "/images/partner.svg",
        "/images/partner2.svg",
        ];
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-semibold text-primary mb-8">Sudah Terbukti di Berbagai Platform</h1>
                <div className="flex flex-col justify-center items-center gap-8 lg:gap-12">
                    {platforms.map((logo, index) => (
                        <img key={index} src={logo} alt={`Platform Logo ${index + 1}`} className="w-3/4 h-auto object-contain " />
                    ))}
                </div>
            </div>
        </section>
    );
};


// --- Halaman Tentang Utama ---
export default function TentangPage() {
    return (
        <>
            <Head title="Tentang Kami" />
            <Navbar />

            <main>
                <HeroSection />
                <AboutCardsSection />
                <WhyChooseUsSection />
                <AwardsSection />
                    <div className="container mx-auto w-full bg-primary flex justify-center">
                        <img src="/images/cards-pse.png" alt="CARDS Forum" className="w-full h-full rounded-lg shadow-lg object-cover" />
                    </div>
                {/* <ForumSection /> */}
                <PlatformsSection />
            </main>

            <Footer />
        </>
    );
}
