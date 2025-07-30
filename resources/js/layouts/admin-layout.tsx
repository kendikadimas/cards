"use client"

import type React from "react"
import { usePage, Link, router } from "@inertiajs/react"
import { SuperAdminSidebar } from "@/components/admin-sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { SharedData } from "@/types"

interface SuperAdminLayoutProps {
  children: React.ReactNode
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const { auth } = usePage<SharedData>().props

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    router.post(route("logout"))
  }
  
  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      <SuperAdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header Utama Dasbor */}
       

        {/* Konten Halaman Anak */}
        {children}
      </div>
    </div>
  )
}
