import React, { useCallback } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { ParentAppSection } from '@/components/ui/parent-features';
import { CashlessSection } from '@/components/ui/canteen-features';
import { DashboardSection } from '@/components/ui/school-features';
import { CardsEduSection } from '@/components/ui/cards-edu-section';
import { LucideProps, ReceiptText, Landmark, Store, FileText, BookOpen, CalendarCheck, ClipboardList, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import type { ProductDetailPageProps, ProductFeature } from '@/types';
import { P } from 'node_modules/framer-motion/dist/types.d-Bq-Qm38R';
import useEmblaCarousel from 'embla-carousel-react';
import { Card } from '@/components/ui/card';

// Map untuk mencocokkan nama ikon string dengan komponen ikon Lucide
const iconMap: { [key: string]: React.ElementType<LucideProps> } = {
  'receipt-text': ReceiptText,
  'landmark': Landmark,
  'store': Store,
  'file-text': FileText,
  'book-open': BookOpen,
  'calendar-check': CalendarCheck,
  'clipboard-list': ClipboardList,
  'message-square': MessageSquare,
};

const UniqueSectionRenderer = ({ section }) => {
    if (!section) return null; // Jika tidak ada section unik, jangan render apa-apa

    switch (section.type) {
        case 'cards-parent':
            return <ParentAppSection data={section.data} />;
        case 'cards-school':
            return <DashboardSection data={section.data} />;
        case 'cards-canteen':
            return <CashlessSection data={section.data} />;
        case 'cards-edu':
            return <CardsEduSection data={section.data} />;
        default:
            return null;
    }
}

// --- Hero Section ---
const HeroSection = ({ title }: { title: string }) => (
    <section className="bg-primary text-white text-center py-16 px-15">
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
    </section>
);

// --- About Section ---
const AboutSection = ({ name, description, icon }: { name: string, description: string, icon: string }) => (
    <section className="py-16 lg:py-24 bg-white px-20">
        <div className="container mx-auto px-4 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-gray-700 space-y-6 pl-5">
                    <h2 className="text-4xl font-bold text-primary">Apa Itu {name}?</h2>
                    <p className="text-lg leading-relaxed text-justify">{description}</p>
                    <div className="flex items-center gap-4 pt-4">
                        <a href="#" aria-label="Download on the App Store" className='bg-black px-6 py-2 rounded-md flex items-center gap-2'>
                            <img src="/images/apple icon.svg" alt="App Store" className="h-12 " />
                            <p className='text-sm underline text-white'>
                                Download on the <br /> <span className='font-bold text-xl text-white'>
                                    App Store
                                </span>
                            </p>
                        </a>
                        <a href="#" aria-label="Get it on Google Play" className='bg-black px-6 py-2 rounded-md flex items-center gap-2'>
                            <img src="/images/google play icon.svg" alt="Google Play" className="h-12" />
                             <p className='text-sm text-white'>
                                Get it on <br /> <span className='font-bold text-xl text-white'>
                                    Google Play
                                </span>
                            </p>
                        </a>
                    </div>
                </div>
                <div className="flex justify-center items-center ">
                    <div className="size-[350px]">
                        <img src={icon} alt={`${name} icon`} />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- Features Section ---
const FeaturesSection = ({ name, features }: { name: string, features: ProductFeature[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: true,
        slidesToScroll: 1,
        containScroll: 'trimSnaps'
    });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <section className="py-16 lg:py-24 bg-primary text-white px-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold">Fitur {name}</h2>
                <div className="mt-12 relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {features.map((feature, index) => {
                                const IconComponent = iconMap[feature.icon];
                                return (
                                    <div key={index} className="flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_33.33%] pl-4">
                                        <Card className="flex flex-col items-start text-left p-6 bg-white text-primary rounded-2xl h-full relative overflow-hidden">
                                            {/* Top right icon */}
                                            <div className="absolute -top-10 -right-1 p-5 bg-white/20 rounded-full shadow-inner">
                                                {IconComponent && <IconComponent className="h-8 w-8 text-primary/70" />}
                                            </div>

                                            {/* Top left mini logo */}
                                            <div className="absolute top-4 left-4 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
                                                <img src="/images/cards.png" alt="Cards mini logo" className="h-4"/>
                                            </div>

                                            <div className="mt-12">
                                                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {feature.description} 
                                                </p>
                                            </div>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Carousel Controls */}
                    <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-[-20px]">
                        <Button onClick={scrollPrev} variant="outline" size="icon" className="rounded-full bg-white/80 hover:bg-white text-primary backdrop-blur-sm -ml-4">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <Button onClick={scrollNext} variant="outline" size="icon" className="rounded-full bg-white/80 hover:bg-white text-primary backdrop-blur-sm -mr-4">
                            <ArrowRight className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};


// --- Partners Section ---
const PartnersSection = ({ partners }: { partners: string[] }) => (
    <section className="py-16 bg-white border-primary border-1 px-20 w-3/4 rounded-2xl mx-auto mb-20">
        <div className="container mx-auto px-4 text-center bg-white/50">
            <h3 className="text-2xl font-semibold text-gray-700 mb-8">Dipercaya Oleh Berbagai Institusi</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
                {partners.map((logo, index) => (
                    <img key={index} src={logo} alt={`Partner Logo ${index + 1}`} className="h-12 md:h-16 object-contain" />
                ))}
            </div>
        </div>
    </section>
);

// --- Halaman Detail Produk Utama ---
export default function ProductDetailPage() {
    const { product, partners } = usePage<ProductDetailPageProps>().props;

    return (
        <>
            <Head title={product.name} />
            <Navbar />

            <main>
                <HeroSection title={product.name} />
                <AboutSection name={product.name} description={product.description} icon={product.icon} />
                <FeaturesSection name={product.name} features={product.features} />
                <UniqueSectionRenderer section={product.unique_section} />
                <PartnersSection partners={partners} />
            </main>

            <Footer />
        </>
    );
}
