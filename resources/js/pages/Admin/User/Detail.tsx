"use client"
import SuperAdminLayout from "@/layouts/admin-layout"
import { UserDetailCard } from "@/components/ui/user-detail-card"
import { UserArticlesList } from "@/components/ui/user-articles-list"
import { UserActivitiesList } from "@/components/ui/user-activities-list"
import { Head, usePage, router } from "@inertiajs/react" // Import router
import type { UserDetailPageProps } from "@/types"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function UserDetailPage() {
  const { user, articles, activities } = usePage<UserDetailPageProps>().props
  const searchParams = new URLSearchParams(window.location.search)
  const defaultEditMode = searchParams.get("edit") === "true"

  // Definisikan fungsi handler di sini
  const handleReviewArticle = (articleId: number) => {
    router.visit(route("articles.review", articleId));
  };

  const handleEditArticle = (articleId: number) => {
    // Tombol Edit juga akan mengarahkan ke halaman review untuk saat ini
    router.visit(route("articles.review", articleId));
  };

  const handleDeleteArticle = (articleId: number) => {
    if (confirm("Anda yakin ingin menghapus artikel ini?")) {
      router.delete(route("articles.destroy", articleId), {
        preserveScroll: true, // Agar halaman tidak scroll ke atas
      });
    }
  };

  const pageTitle = "Kelola Pengguna" // Judul halaman
  const breadcrumbItems = [
    { label: "Dashboard", href: route('adashboard') },
    { label: "Pengguna", href: route('users.index') },
    { label: user.name, href: route('users.show', user.id) },
  ];

  return (
    <SuperAdminLayout pageTitle={pageTitle} breadcrumbItems={breadcrumbItems}>
      <Head title={`Detail User: ${user.name}`} />

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserDetailCard user={user} defaultEditMode={defaultEditMode} />
          {/* Teruskan fungsi handler ke komponen UserArticlesList */}
          <UserArticlesList 
            articles={articles} 
            onReview={handleReviewArticle}
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
          />
        </div>
        <div className="mt-6">
          <UserActivitiesList activities={activities} />
        </div>
      </main>
    </SuperAdminLayout>
  )
}