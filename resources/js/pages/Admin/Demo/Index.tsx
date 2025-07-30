"use client"

import SuperAdminLayout from "@/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DemoBookingCard } from "@/components/ui/demo-booking-card"
import { Head, Link, usePage, router } from "@inertiajs/react"
import type { ManageDemoBookingsPageProps, DemoBookingItem } from "@/types"
import { Button } from "@/components/ui/button" // Pastikan Button diimpor
import { cn } from "@/lib/utils" // Import cn untuk styling kondisional
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function ManageDemoBookingsPage() {
  const { demoBookings, filters } = usePage<ManageDemoBookingsPageProps>().props

  const handleMarkDone = (id: string, newStatus: boolean) => {
    if (confirm(`Anda yakin ingin mengubah status booking ini menjadi ${newStatus ? "Selesai" : "Belum Selesai"}?`)) {
      router.put(
        route("dembook.update", id),
        { is_done: newStatus },
        {
          preserveScroll: true,
          onSuccess: () => alert("Status booking berhasil diperbarui."),
          onError: (errors) => {
            console.error("Error updating status:", errors)
            alert("Gagal memperbarui status booking.")
          },
        },
      )
    }
  }

  const handleFilter = (status: "all" | "done" | "pending") => {
    router.get(
      route("dembook.index"),
      { status: status === "all" ? undefined : status },
      {
        preserveState: true,
        preserveScroll: true,
      },
    )
  }

  return (
    <SuperAdminLayout>
      <Head title="Kelola Booking Demo" />

      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="text-xl font-semibold">Kelola Booking Demo</h1>
<Breadcrumbs items={[
            { label: "Dashboard", href: route('adashboard') },
            { label: "Demo", href: route('dembook.index') },
          ]} />
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Permintaan Demo</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filter Buttons */}
            <div className="flex items-center gap-2 mb-6">
              <Button
                // Tombol ini aktif jika tidak ada filter status (status = 'all')
                variant={!filters.status ? "secondary" : "default"}
                onClick={() => handleFilter("all")}
              >
                Semua
              </Button>
              <Button
                // Tombol ini aktif jika filter status adalah 'done'
                variant={filters.status === "done" ? "secondary" : "default"}
                onClick={() => handleFilter("done")}
              >
                Selesai
              </Button>
              <Button
                // Tombol ini aktif jika filter status adalah 'pending'
                variant={filters.status === "pending" ? "secondary" : "default"}
                onClick={() => handleFilter("pending")}
              >
                Pending
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {demoBookings.data.map((booking: DemoBookingItem) => (
                <DemoBookingCard key={booking.id} {...booking} onMarkDone={handleMarkDone} />
              ))}
            </div>
            
            {demoBookings.data.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Tidak ada permintaan demo yang cocok dengan filter Anda.</p>
            )}

            {/* Paginasi */}
            <div className="mt-8 flex justify-center space-x-2">
              {demoBookings.links.map((link, index) => (
                  <Link
                      key={index}
                      href={link.url || ""}
                      className={cn(
                          "px-4 py-2 rounded-md text-sm",
                          link.active
                              ? "bg-secondary text-white"
                              : "bg-default text-primary-foreground border",
                          !link.url ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
                      )}
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