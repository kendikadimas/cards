"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { SharedData } from "@/types"
import { Link, usePage, router } from "@inertiajs/react"

// Pastikan fungsi `route` dari Ziggy tersedia secara global
declare const route: (...args: any[]) => string

// Link navigasi standar untuk guest
const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/flexy-cazh", label: "Flexycazh" },
  { href: "/about", label: "Tentang" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Kontak" },
]

export function Navbar() {
  const { auth } = usePage<SharedData>().props

  // Tentukan href untuk link Profil berdasarkan peran pengguna
  let profileHref = "/profile"
  if (auth.user) {
    if (auth.user.role === "admin" || auth.user.role === "Super Admin") {
      profileHref = route("adashboard")
    } else if (auth.user.role === "editor") {
      profileHref = route("edashboard")
    } else if (auth.user.role === "member") {
      profileHref = route("mdashboard")
    }
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    router.post(route("logout"))
  }

  const isMember = auth.user?.role === 'member';

  return (
    <header className="w-full bg-primary top-0 px-20 py-6">
      <nav className="container relative mx-auto flex h-16 items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <img src="/images/Cards.svg" alt="Cards Logo" className="h-12 transition-transform transform hover:scale-105" />
          </Link>
        </div>

        <div className="hidden md:flex flex-grow justify-center">
          {/* FIX: Tambahkan prop `viewport={false}` untuk menonaktifkan viewport terpusat */}
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-1">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors z-100"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}

              {isMember && (
                <NavigationMenuItem className="z-100">
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 focus:bg-white/10 data-[state=open]:bg-white/10">
                    Member
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {/* FIX: Tambahkan styling langsung ke <ul> agar sesuai desain */}
                    <ul className="grid w-[200px] gap-1 p-2 bg-white rounded-md shadow-lg z-100">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href={route('mdashboard')} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Dashboard Member</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                       <li>
                        <NavigationMenuLink asChild>
                          <Link href={route('member.analytics')} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Statistik Saya</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                       <li>
                        <NavigationMenuLink asChild>
                          <Link href={route('member.articles')} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Artikel Saya</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          {auth.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
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
                    <p className="text-xs leading-none text-muted-foreground">{auth.user.role}</p>
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
            <div className="hidden sm:flex items-center gap-2">
              <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <Link href={route('login')}>Log in</Link>
              </Button>
              <Button asChild variant={"secondary"}>
                <Link href={route('register')}>Register</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}