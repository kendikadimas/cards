"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Check } from "lucide-react"
import { useState } from "react"
import { router } from "@inertiajs/react"
import type { DemoBookingItem } from "@/types"

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
}: DemoBookingItem) {
  const [isDone, setIsDone] = useState(initialIsDone)

  const handleMarkDone = () => {
    const newStatus = !isDone
    if (confirm(`Anda yakin ingin menandai booking ini sebagai ${newStatus ? "Selesai" : "Belum Selesai"}?`)) {
      // FIX: Menggunakan route 'dembook.update' dan method router.put
      router.put(
        route("dembook.update", id),
        { is_done: newStatus },
        {
          preserveScroll: true,
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
    <Card className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-4 px-0 pt-0">
        <CardTitle className="text-2xl font-bold text-gray-900">Detail Booking Demo</CardTitle>
        <div className="flex items-center gap-4">
          <a href={`tel:${nomorHp}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="text-green-600 border-green-300 hover:bg-green-50 bg-white">
              <Phone className="h-4 w-4 mr-2" /> Hubungi Pengguna
            </Button>
          </a>
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleMarkDone}
          >
            <Check className="h-4 w-4 mr-2" /> {isDone ? "Batalkan Selesai" : "Tandai Selesai"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-gray-800 px-0 pb-0">
        <div>
          <p className="text-sm text-gray-500">Nama Anda</p>
          <p className="font-semibold">{namaAnda}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Sebagai</p>
          <p className="font-semibold">{sebagai}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Nama Lembaga</p>
          <p className="font-semibold">{namaLembaga}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Jenis Lembaga</p>
          <p className="font-semibold">{jenisLembaga}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Estimasi Jumlah Siswa/Santri</p>
          <p className="font-semibold">{estimasiJumlahSiswa || "Tidak disebutkan"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Nomor HP/WhatsApp</p>
          <p className="font-semibold">{nomorHp}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Kabupaten/Kota</p>
          <p className="font-semibold">{kabupatenKota}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Provinsi</p>
          <p className="font-semibold">{provinsi}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-500">Kebutuhan Fitur</p>
          <ul className="list-disc list-inside font-semibold">
            {kebutuhanFitur && kebutuhanFitur.length > 0 ? (
              kebutuhanFitur.map((fitur, index) => <li key={index}>{fitur}</li>)
            ) : (
              <li>Tidak ada fitur spesifik yang dipilih.</li>
            )}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-500">Mendengar CAZH dari</p>
          <p className="font-semibold">{mendengarCazhDari}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-500">Tanggal Booking</p>
          <p className="font-semibold">{tanggalBooking}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-500">Status</p>
          <p className={`font-bold text-lg ${isDone ? "text-green-600" : "text-orange-600"}`}>
            {isDone ? "Selesai" : "Pending"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}