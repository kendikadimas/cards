"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Phone, Eye } from "lucide-react"
import { Link } from "@inertiajs/react"
import { useState } from "react"
// import { route } from "inertia" // Correct import for Ziggy's route helper

interface DemoBookingCardProps {
  id: string
  namaAnda: string
  namaLembaga: string
  nomorHp: string
  tanggalBooking: string // Tanggal booking dibuat
  isDone: boolean
  onMarkDone: (id: string, isDone: boolean) => void
}

export function DemoBookingCard({
  id,
  namaAnda,
  namaLembaga,
  nomorHp,
  tanggalBooking,
  isDone,
  onMarkDone,
}: DemoBookingCardProps) {
  const [checked, setChecked] = useState(isDone)

  const handleCheckboxChange = (newChecked: boolean) => {
    setChecked(newChecked)
    onMarkDone(id, newChecked)
  }

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg rounded-xl border border-blue-200 bg-white">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold text-gray-900 leading-tight">{namaLembaga}</CardTitle>
        <Checkbox
          checked={checked}
          onCheckedChange={handleCheckboxChange}
          id={`done-checkbox-${id}`}
          className="h-5 w-5 border-primary-dark-teal data-[state=checked]:bg-primary-dark-teal data-[state=checked]:text-white"
        />
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground">
          Oleh: <span className="font-medium text-gray-800">{namaAnda}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Tanggal Booking: <span className="font-medium text-gray-800">{tanggalBooking}</span>
        </p>
        <div className="flex gap-2 mt-4">
          <Link href={route("demo-bookings.show", id)}>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-500 border-blue-200 hover:bg-blue-50 bg-transparent"
            >
              <Eye className="h-4 w-4 mr-1" /> Review
            </Button>
          </Link>
          <a href={`tel:${nomorHp}`} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="sm"
              className="text-green-500 border-green-200 hover:bg-green-50 bg-transparent"
            >
              <Phone className="h-4 w-4 mr-1" /> Hubungi
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
