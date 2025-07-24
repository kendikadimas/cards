"use client"
import SuperAdminLayout from "@/layouts/admin-layout"
import { UserDetailCard } from "@/components/ui/user-detail-card"
import { UserArticlesList } from "@/components/ui/user-articles-list"
import { UserActivitiesList } from "@/components/ui/user-activities-list"
import { Head, usePage } from "@inertiajs/react"
import type { UserDetailPageProps } from "@/types" // Import tipe baru

export default function UserDetailPage() {
  // Ambil data dari props yang dikirim controller
  const { user, articles, activities } = usePage<UserDetailPageProps>().props

  // Dapatkan parameter 'edit' dari URL
  const searchParams = new URLSearchParams(window.location.search)
  const defaultEditMode = searchParams.get("edit") === "true"

  return (
    <SuperAdminLayout>
      <Head title={`Detail User: ${user.name}`} />

      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <p className="text-sm text-muted-foreground">Detail dan manajemen pengguna.</p>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserDetailCard user={user} defaultEditMode={defaultEditMode} />
          <UserArticlesList articles={articles} />
        </div>
        <div className="mt-6">
          <UserActivitiesList activities={activities} />
        </div>
      </main>
    </SuperAdminLayout>
  )
}