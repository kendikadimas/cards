"use client"

import SuperAdminLayout from "@/layouts/admin-layout"
import { DemoDetailCard } from "@/components/ui/demo-detail-card"
import { Head } from "@inertiajs/react"

// Dummy Data for a single Demo Booking (replace with actual fetch in a real app)
const dummyDemoBooking = {
    id: "1",
    namaAnda: "Budi Santoso",
    sebagai: "Sekolah",
    namaLembaga: "SDN Maju Jaya",
    jenisLembaga: "SD",
    estimasiJumlahSiswa: "250",
    nomorHp: "081234567890",
    kabupatenKota: "Jakarta Pusat",
    provinsi: "DKI Jakarta",
    kebutuhanFitur: ["PPDB Online", "Akademik, Jadwal Pelajaran", "Keuangan, Pinjaman"],
    mendengarCazhDari: "Sales CAZH",
    tanggalBooking: "15 Juli 2025",
    isDone: false,
}

export default function DemoBookingDetailPage({ params }: { params: { id: string } }) {
// In a real application, you would fetch the specific demo booking data based on params.id
const demoBooking = dummyDemoBooking // Using dummy data for now

return (
    <SuperAdminLayout>
    <Head title={`Detail Booking Demo: ${demoBooking.namaLembaga}`} />

    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
        <h1 className="text-xl font-semibold">Detail Booking Demo</h1>
        <p className="text-sm text-muted-foreground">Informasi lengkap permintaan demo.</p>
        </div>
    </header>

    <main className="flex-1 p-6 overflow-y-auto">
        <DemoDetailCard {...demoBooking} />
    </main>
    </SuperAdminLayout>
)
}
