import React from 'react'
import { Hero } from '@/components/ui/hero'
import { TwoColumnSection } from '@/components/ui/two-column-section'
import { FeaturesSection } from '@/components/ui/features-section'
import { Footer } from '@/components/ui/footer'
import { Navbar } from '@/components/ui/navbar'
import { AlternatingFeatureSection } from '@/components/ui/alternating-feature-section'
import { ApplicationFormSection } from '@/components/ui/application-form-section'
import { FlexyCazhSection } from '@/components/ui/flexy-cazh-section'
import { StepSection } from '@/components/ui/step-section'
import { FlexyCazhFormDialog } from '@/components/ui/flexy-cazh-form-dialog'
import { HeroFlexy } from '@/components/ui/hero-flexy'


const FlexyCazh = () => {
  return (
    <div>
        <Navbar />
        <HeroFlexy />
        <FlexyCazhSection />
        <StepSection
          title="Bergabung Menjadi Partner CARDS"
          description="Untuk mengajukan FlexyCazh, Anda harus menjadi Partner CARDS terlebih dahulu. Setelah terdaftar, Anda akan mendapatkan akses resmi untuk pengajuan FlexyCazh beserta semua keuntungan dan kemudahannya."
          imageSrc="" // Ganti dengan URL gambar asli Anda
          imageAlt="Dua pria melihat laptop"
          variant="teal-bg"
        />
        <section className=" w-full mx-auto flex flex-col items-center justify-center py-16 min-h-[50vh] bg-gray-100">
          <h2 className="text-4xl font-extrabold mb-4 text-primary">Ajukan Pembiayaan Anda Sekarang!</h2>
          <p className="text-lg text-gray-600 mb-8">Nikmati kemudahan akses pembiayaan fleksibel dengan proses cepat dan mudah</p>
          <FlexyCazhFormDialog />
        </section>
        {/* <ApplicationFormSection /> */}
        <Footer />
    </div>
  )
}

export default FlexyCazh