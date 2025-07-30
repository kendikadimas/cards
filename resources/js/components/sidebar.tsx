"use client"
import React from "react"
import { Link, router, usePage } from "@inertiajs/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

// Komponen NavLink yang dinamis
const NavLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  const { url } = usePage()
  // Tentukan apakah link aktif jika URL saat ini dimulai dengan href link
  const isActive = url.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all font-medium",
        isActive
          ? "bg-primary text-white" // Gaya saat aktif
          : "bg-white text-primary hover:bg-primary/10" // Gaya saat tidak aktif
      )}
    >
      {children}
    </Link>
  )
}

// Daftar menu untuk sidebar editor
const editorNavItems = [
    { href: "/edashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/articles/manage", icon: FileText, label: "Kelola Artikel" },
]

export function Sidebar() {
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    router.post("/logout")
  }

  return (
    <aside className="hidden w-64 flex-col border-r bg-white md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="#" className="flex items-center gap-2 font-semibold">
          <img
            src="/images/Cards.png" // Pastikan path logo benar
            alt="Cards Logo"
            className="w-25 h-10"
          />
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {editorNavItems.map((item) => (
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