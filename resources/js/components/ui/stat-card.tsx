"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type React from "react"

// Tipe props diperbarui untuk mengakomodasi desain baru
interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  bgColor: string // Prop baru untuk warna latar utama
}

export function StatCard({ 
    title, 
    value, 
    description, 
    icon, 
    bgColor, 
}: StatCardProps) {
  // Fungsi untuk memformat angka (misal: 112000 -> 112.000)
  const formatNumber = (num: string | number) => 
    new Intl.NumberFormat('id-ID').format(Number(num));

  return (
    <Card className={cn("text-white rounded-xl shadow-lg border-none", bgColor)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium">{title}</p>
          {/* Latar belakang ikon dibuat lebih transparan */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
            {icon}
          </div>
        </div>
        <p className="text-3xl font-bold mt-2">{formatNumber(value)}</p>
        <p className="text-xs text-white/80 mt-2">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}