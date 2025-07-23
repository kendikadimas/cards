"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Check } from "lucide-react"
import { useState } from "react"
import { router } from "@inertiajs/react"
// import { route } from "inertiajs"

interface DemoBookingDetailProps {
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
tanggalBooking: string
isDone: boolean
}

export function DemoDetailCard({
id,
namaAnda,
sebagai,
namaLembaga,
jenisLembaga,
estimasiJumlahSiswa,
nomorHp,
kabupatenKota,
provinsi,
kebutuhanFitur,
mendengarCazhDari,
tanggalBooking,
isDone: initialIsDone,
}: DemoBookingDetailProps) {
const [isDone, setIsDone] = useState(initialIsDone)

const handleMarkDone = () => {
    const newStatus = !isDone
    if (confirm(`Anda yakin ingin menandai booking ini sebagai ${newStatus ? "Selesai" : "Belum Selesai"}?`)) {
    // Implementasi logika update status ke backend
    router.put(
        route("demo-bookings.update-status", id),
        { is_done: newStatus },
        {
        onSuccess: () => {
            setIsDone(newStatus)
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
    <Card className="bg-white rounded-xl shadow-lg p-8 border border-blue-200">
    <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900">Detail Booking Demo</CardTitle>
        <div className="flex items-center gap-4">
        <a href={`tel:${nomorHp}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="text-green-500 border-green-200 hover:bg-green-50 bg-transparent">
            <Phone className="h-4 w-4 mr-1" /> Hubungi Pengguna
            </Button>
        </a>
        <Button
            variant="outline"
            className="text-primary-dark-teal border-primary-dark-teal hover:bg-primary-dark-teal hover:text-white bg-transparent"
            onClick={handleMarkDone}
        >
            <Check className="h-4 w-4 mr-1" /> {isDone ? "Batalkan Selesai" : "Tandai Selesai"}
        </Button>
        </div>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-gray-800">
        <div>
        <p className="font-semibold">Nama Anda:</p>
        <p>{namaAnda}</p>
        </div>
        <div>
        <p className="font-semibold">Sebagai:</p>
        <p>{sebagai}</p>
        </div>
        <div>
        <p className="font-semibold">Nama Lembaga:</p>
        <p>{namaLembaga}</p>
        </div>
        <div>
        <p className="font-semibold">Jenis Lembaga:</p>
        <p>{jenisLembaga}</p>
        </div>
        <div>
        <p className="font-semibold">Estimasi Jumlah Siswa/Santri:</p>
        <p>{estimasiJumlahSiswa || "Tidak disebutkan"}</p>
        </div>
        <div>
        <p className="font-semibold">Nomor HP/WhatsApp:</p>
        <p>{nomorHp}</p>
        </div>
        <div>
        <p className="font-semibold">Kabupaten/Kota:</p>
        <p>{kabupatenKota}</p>
        </div>
        <div>
        <p className="font-semibold">Provinsi:</p>
        <p>{provinsi}</p>
        </div>
        <div className="md:col-span-2">
        <p className="font-semibold">Kebutuhan Fitur:</p>
        <ul className="list-disc list-inside">
            {kebutuhanFitur.length > 0 ? (
            kebutuhanFitur.map((fitur, index) => <li key={index}>{fitur}</li>)
            ) : (
            <li>Tidak ada fitur spesifik yang dipilih.</li>
            )}
        </ul>
        </div>
        <div className="md:col-span-2">
        <p className="font-semibold">Mendengar CAZH dari:</p>
        <p>{mendengarCazhDari}</p>
        </div>
        <div className="md:col-span-2">
        <p className="font-semibold">Tanggal Booking:</p>
        <p>{tanggalBooking}</p>
        </div>
        <div className="md:col-span-2">
        <p className="font-semibold">Status:</p>
        <p className={`font-bold ${isDone ? "text-green-600" : "text-orange-600"}`}>
            {isDone ? "Selesai" : "Pending"}
        </p>
        </div>
    </CardContent>
    </Card>
)
}
