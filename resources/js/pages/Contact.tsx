import React from 'react';
import { Head } from '@inertiajs/react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { ContactForm } from '@/components/ui/contact-form';
import { ContactInfo } from '@/components/ui/contact-info';
import { LocationMap } from '@/components/ui/location-map';

export default function Contact() {
    return (
        <>
        <section>
            <Navbar />
            <Head title="Hubungi Kami" />

                {/* Header Halaman */}
                <div className="py-20 text-center bg-primary text-white">
                    <h1 className="text-5xl font-bold">Tunggu Apa Lagi?</h1>
                    <p className="mt-4">Mendigitalisasi lingkungan lembaga anda memakai Cards!</p>
                </div>

            <main className='pr-15'>
                {/* Seksi Utama (Form & Info) */}
                <section className="py-10">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            <ContactForm />
                            <ContactInfo />
                        </div>
                    </div>
                </section>
            </main>

        </section>
                {/* Seksi Peta */}
                <LocationMap />

    <Footer />
    </>
    );
}