import SuperAdminLayout from "@/layouts/admin-layout"
import { BannerTable } from "@/components/ui/banner-table"
import { Head, usePage } from "@inertiajs/react"
import type { ManageBannersPageProps } from "@/types"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function ManageBannersPage() {
  // Ambil data banproms dari props yang dikirim controller
  const { banproms } = usePage<ManageBannersPageProps>().props

  return (
    <SuperAdminLayout>
      <Head title="Kelola Banner" />

      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="text-xl font-semibold">Kelola Banner Promosi</h1>
          <Breadcrumbs items={[
            { label: "Dashboard", href: route('adashboard') },
            { label: "Banner", href: route('banners.index') },
          ]} />
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Teruskan data asli ke BannerTable */}
        <BannerTable banproms={banproms} />
      </main>
    </SuperAdminLayout>
  )
}
