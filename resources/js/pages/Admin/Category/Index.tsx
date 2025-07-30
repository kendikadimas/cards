import SuperAdminLayout from "@/layouts/admin-layout"
import { CategoryTable } from "@/components/ui/category-table"
import { Head, usePage } from "@inertiajs/react"
import type { ManageCategoriesPageProps } from "@/types"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function ManageCategoriesPage() {
  // FIX: Get the 'categories' prop from the page data sent by the controller.
  const { categories } = usePage<ManageCategoriesPageProps>().props

  const pageTitle = "Kelola Kategori Artikel" 
  const breadcrumbItems = [
    { label: "Dashboard", href: route('adashboard') },
    { label: "Kategori", href: route('categories.index') },

  ];

  return (
    <SuperAdminLayout pageTitle={pageTitle} breadcrumbItems={breadcrumbItems}>
      <Head title="Kelola Kategori" />

     

      <main className="flex-1 p-6 overflow-y-auto">
        {/* FIX: Pass the 'categories' data to the CategoryTable component. */}
        <CategoryTable categories={categories} />
      </main>
    </SuperAdminLayout>
  )
}
