"use client"

import SuperAdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DemoBookingCard } from "@/components/ui/demo-booking-card"
import { Head, Link, usePage, router } from "@inertiajs/react"
import type { ManageDemoBookingsPageProps, DemoBookingItem } from "@/types" // Import tipe baru

export default function ManageDemoBookingsPage() {
  const { demoBookings } = usePage<ManageDemoBookingsPageProps>().props

  const handleMarkDone = (id: string, newStatus: boolean) => {
    // Pastikan konfirmasi sebelum update
    if (confirm(`Anda yakin ingin mengubah status booking ini menjadi ${newStatus ? "Selesai" : "Belum Selesai"}?`)) {
      // Gunakan nama route 'dembook.update' sesuai standar resource controller
      router.put(
        route("dembook.update", id),
        { is_done: newStatus },
        {
          preserveScroll: true, // Agar halaman tidak scroll ke atas setelah update
          onSuccess: () => {
            alert("Status booking berhasil diperbarui.")
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
              {/* Gunakan demoBookings.data untuk iterasi data paginasi */}
              {demoBookings.data.map((booking: DemoBookingItem) => (
                <DemoBookingCard key={booking.id} {...booking} onMarkDone={handleMarkDone} />
              ))}
            </div>
            {demoBookings.data.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Tidak ada permintaan demo yang ditemukan.</p>
            )}
            {/* Tambahkan Link Paginasi */}
            <div className="mt-8 flex justify-center space-x-2">
              {demoBookings.links.map((link, index) => (
                  <Link
                      key={index}
                      href={link.url || ""}
                      className={`px-4 py-2 rounded-md text-sm ${
                          link.active
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 border"
                      } ${!link.url ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                  />
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </SuperAdminLayout>
  )
}