"use client"

import SuperAdminLayout from "@/layouts/admin-layout"
import { DemoDetailCard } from "@/components/ui/demo-detail-card"
import { Head, usePage } from "@inertiajs/react"
import type { DemoBookingDetailPageProps } from "@/types" // Import tipe baru

export default function DemoBookingDetailPage() {
  // Ambil data 'dembook' asli dari props yang dikirim oleh controller
  const { dembook } = usePage<DemoBookingDetailPageProps>().props

  return (
    <SuperAdminLayout>
      <Head title={`Detail Booking Demo: ${dembook.namaLembaga}`} />

      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div>
              <h1 className="text-xl font-semibold">Detail Booking Demo</h1>
              <p className="text-sm text-muted-foreground">Informasi lengkap permintaan demo.</p>
          </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
          {/* Teruskan data asli ke komponen card */}
          <DemoDetailCard {...dembook} />
      </main>
    </SuperAdminLayout>
  )
}