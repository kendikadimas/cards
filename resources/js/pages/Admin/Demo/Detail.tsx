"use client"

import SuperAdminLayout from "@/layouts/admin-layout"
import { DemoDetailCard } from "@/components/ui/demo-detail-card"
import { Head, usePage } from "@inertiajs/react"
import type { DemoBookingDetailPageProps } from "@/types" // Import tipe baru
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function DemoBookingDetailPage() {
  // Ambil data 'dembook' asli dari props yang dikirim oleh controller
  const { dembook } = usePage<DemoBookingDetailPageProps>().props
  const pageTitle = "Kelola Permintaan Demo" 
  const breadcrumbItems = [
    { label: "Dashboard", href: route('adashboard') },
    { label: "Demo", href: route('dembook.index') },
    { label: dembook.namaLembaga || "Detail Booking" }, // Gunakan nama lembaga atau default
  ];


  return (
    <SuperAdminLayout pageTitle={pageTitle} breadcrumbItems={breadcrumbItems}>
      <Head title={`Detail Booking Demo: ${dembook.namaLembaga}`} />

      <main className="flex-1 p-6 overflow-y-auto">
          {/* Teruskan data asli ke komponen card */}
          <DemoDetailCard {...dembook} />
      </main>
    </SuperAdminLayout>
  )
}