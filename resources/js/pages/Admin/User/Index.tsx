import SuperAdminLayout from "@/layouts/admin-layout"
import { UserTable } from "@/components/ui/user-table"
import { Head, usePage } from "@inertiajs/react"
import type { ManageUsersPageProps } from "@/types"
import { Button } from "@/components/ui/button" // Import Button
import { PlusCircle } from "lucide-react" // Import Ikon
import { useState } from "react" // Import useState
import { UserFormModal } from "@/components/ui/user-form-modal" // Import Modal
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function ManageUsersPage() {
  const { users } = usePage<ManageUsersPageProps>().props
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengontrol modal
  const pageTitle = "Kelola Pengguna" // Judul halaman
  const breadcrumbItems = [
    { label: "Dashboard", href: route('adashboard') },
    { label: "Pengguna", href: route('users.index') },
  ];



  return (
    <SuperAdminLayout pageTitle={pageTitle} breadcrumbItems={breadcrumbItems}>
      <Head title="Kelola User" />
        {/* <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Pengguna
        </Button> */}
      <main className="flex-1 p-6 overflow-y-auto">
        <UserTable users={users} />
      </main>

      {/* Render komponen modal */}
      <UserFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SuperAdminLayout>
  )
}