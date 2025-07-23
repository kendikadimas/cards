"use client"

import SuperAdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DemoBookingCard } from "@/components/ui/demo-booking-card"
import { Head } from "@inertiajs/react"
import { useState, useEffect } from "react" // Add useEffect import
import { usePage, router } from "@inertiajs/react" // Import usePage and router
// import { route } from "inertiajs" // Import route from Inertia.js

interface DemoBooking {
  id: string
  namaAnda: string
  sebagai: string
  namaLembaga: string
  jenisLembaga: string
  estimasiJumlahSiswa?: string
  nomorHp: string
  kabupatenKota: string
  provinsi: string
  kebutuhanFitur: string[]
  mendengarCazhDari: string
  tanggalBooking: string // Tanggal booking dibuat
  isDone: boolean
}

interface ManageDemoBookingsPageProps {
  demoBookings: DemoBooking[]
}

export default function ManageDemoBookingsPage() {
  const { demoBookings: initialDemoBookings } = usePage<ManageDemoBookingsPageProps>().props
  const [demoBookings, setDemoBookings] = useState(initialDemoBookings)

  // Update useEffect to re-sync state if initial data changes (e.g., after a successful update)
  useEffect(() => {
    setDemoBookings(initialDemoBookings)
  }, [initialDemoBookings])

  const handleMarkDone = (id: string, newStatus: boolean) => {
    if (confirm(`Anda yakin ingin menandai booking ini sebagai ${newStatus ? "Selesai" : "Belum Selesai"}?`)) {
      router.put(
        route("demo-bookings.update-status", id),
        { is_done: newStatus },
        {
          onSuccess: () => {
            // Inertia automatically reloads props on success, so useEffect will update state
            alert(`Status booking berhasil diperbarui menjadi ${newStatus ? "Selesai" : "Belum Selesai"}.`)
          },
          onError: (errors) => {
            console.error("Error updating status:", errors)
            alert("Gagal memperbarui status booking.")
          },
        },
      )
    }
  }

  return (
    <SuperAdminLayout>
      <Head title="Kelola Booking Demo" />

      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="text-xl font-semibold">Kelola Booking Demo</h1>
          <p className="text-sm text-muted-foreground">Daftar permintaan demo dari pengguna.</p>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Permintaan Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoBookings.map((booking) => (
                <DemoBookingCard key={booking.id} {...booking} onMarkDone={handleMarkDone} />
              ))}
            </div>
            {demoBookings.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Tidak ada permintaan demo yang ditemukan.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </SuperAdminLayout>
  )
}
