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
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

interface SuperAdminLayoutProps {
  children: React.ReactNode;
  pageTitle: string; // Prop baru untuk judul
  breadcrumbItems: { label: string; href?: string }[]; // Prop baru untuk breadcrumbs
}

export default function SuperAdminLayout({ children, pageTitle, breadcrumbItems }: SuperAdminLayoutProps) {
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
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 flex-shrink-0">
          {/* Bagian Kiri Header sekarang dinamis */}
          <div>
            <h1 className="text-xl font-semibold">{pageTitle}</h1>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <div className="flex items-center gap-4">
            {auth.user ? (
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                      <AvatarImage
                          src={auth.user.profile_image}
                          alt={auth.user.name}
                      />
                      <AvatarFallback>{auth.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                  </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{auth.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{auth.user.email}</p>
                      </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                      <Link href={route('profile.show')}>Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:bg-red-50 focus:text-red-600">
                      Logout
                  </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
              ) : (
              <Button asChild variant="default">
                  <Link href={route('login')}>Login</Link>
              </Button>
              )}
          </div>
      </header>
        {/* Konten Halaman Anak */}
        {children}
      </div>
    </div>
  )
}
