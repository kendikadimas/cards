"use client"

import type React from "react"
import { Link, router, usePage } from "@inertiajs/react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Users,
  Folder,
  Megaphone,
  CalendarCheck,
  LogOut,
  BarChart3,
  Database,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Komponen NavLink yang diperbarui
interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const { url } = usePage()
  const isActive = url.startsWith(href)

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive
          ? "bg-primary text-white" // Gaya saat aktif
          : "bg-white text-primary hover:bg-primary/10" // Gaya saat tidak aktif
      )}
    >
      {children}
    </Link>
  )
}

// Daftar menu sidebar
const sidebarNavItems = [
    { href: "/adashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/statistics", icon: BarChart3, label: "Statistik" },
    { href: "/site-data", icon: Database, label: "Kelola Data Situs" },
    { href: "/dembook", icon: CalendarCheck, label: "Booking Demo" },
    { href: "/articles/manage", icon: FileText, label: "Artikel" },
    { href: "/users", icon: Users, label: "Pengguna" },
    { href: "/kategori", icon: Folder, label: "Kategori" },
    { href: "/banners", icon: Megaphone, label: "Banner Promosi" },
]

export function SuperAdminSidebar() {
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    router.post("/logout")
  }

  return (
    <aside className="hidden w-64 flex-col border-r bg-white md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="#" className="flex items-center gap-2 font-semibold">
          <img src="/images/Cards.png" alt="Cards Logo" width={150} height={40} className="w-25 h-10" />
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {sidebarNavItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
                <item.icon className="h-4 w-4" /> {item.label}
            </NavLink>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t">
        <Button
          onClick={handleLogout}
          variant="destructive" // Menggunakan variant destructive untuk warna merah
          className="w-full justify-start hover:bg-red-700/90"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </aside>
  )
}
