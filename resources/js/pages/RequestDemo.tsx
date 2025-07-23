import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { SectionHeader } from "@/components/ui/section-header"
import { DemoForm } from "@/components/ui/demo-form"

export default function DemoBookingPage() {
    return (    
        <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-16 lg:py-24 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
                <SectionHeader
                title="Formulir Pendaftaran"
                description="Layanan CazhCards - Digitalisasi Sekolah dan Pesantren"
                />
            </div>
            <div className="max-w-3xl mx-auto">
                <DemoForm />
            </div>
            </div>
        </main>
        <Footer />
        </div>
    )
    }
