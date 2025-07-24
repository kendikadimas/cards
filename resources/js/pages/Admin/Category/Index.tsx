import SuperAdminLayout from "@/layouts/admin-layout"
import { CategoryTable } from "@/components/ui/category-table"
import { Head, usePage } from "@inertiajs/react"
import type { ManageCategoriesPageProps } from "@/types"

export default function ManageCategoriesPage() {
  // FIX: Get the 'categories' prop from the page data sent by the controller.
  const { categories } = usePage<ManageCategoriesPageProps>().props

  return (
    <SuperAdminLayout>
      <Head title="Kelola Kategori" />

      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="text-xl font-semibold">Kelola Kategori Artikel</h1>
          <p className="text-sm text-muted-foreground">Manajemen kategori untuk artikel.</p>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        {/* FIX: Pass the 'categories' data to the CategoryTable component. */}
        <CategoryTable categories={categories} />
      </main>
    </SuperAdminLayout>
  )
}
