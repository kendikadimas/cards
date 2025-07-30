import SuperAdminLayout from "@/layouts/admin-layout"
import { BannerTable } from "@/components/ui/banner-table"
import { Head, usePage } from "@inertiajs/react"
import type { ManageBannersPageProps } from "@/types"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function ManageBannersPage() {
  // Ambil data banproms dari props yang dikirim controller
  const { banproms } = usePage<ManageBannersPageProps>().props

  const pageTitle = "Kelola Banner Promosi"
  const breadcrumbItems = [
    { label: "Dashboard", href: route('adashboard') },
    { label: "Banner", href: route('banners.index') },
  ]
  return (
    <SuperAdminLayout pageTitle={pageTitle} breadcrumbItems={breadcrumbItems}>
      <Head title="Kelola Banner" />

     

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Teruskan data asli ke BannerTable */}
        <BannerTable banproms={banproms} />
      </main>
    </SuperAdminLayout>
  )
}
