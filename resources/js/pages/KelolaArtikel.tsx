"use client"

import AdminLayout from "@/layouts/admin-layout"
import EditorLayout from "@/layouts/editor-layout"
import { Head, usePage, router, Link } from "@inertiajs/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import type { KelolaArtikelPageProps, ArticleListItem, SharedData } from "@/types"
import { AdminArticleCard } from "@/components/ui/admin-article-card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArticleFormModal } from "@/components/ui/create-article-modal"
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function KelolaArtikel() {
  const { articles, categories, auth, filters } = usePage<any>().props as (KelolaArtikelPageProps & SharedData & { filters?: { search?: string; per_page?: string } })
  const [searchTerm, setSearchTerm] = useState(filters?.search || "")
  const [perPage, setPerPage] = useState(filters?.per_page || '10')
  const [articleToActOn, setArticleToActOn] = useState<number | null>(null)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReasonInput, setRejectReasonInput] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<ArticleListItem | null>(null)

  // We now rely on server-side pagination & search; just use articles.data
  const filteredArticles = articles.data || []

  const applySearch = () => {
    router.get(route('articles.manage'), { search: searchTerm, per_page: perPage }, { preserveState: true, replace: true })
  }

  const changePerPage = (value: string) => {
    setPerPage(value)
    router.get(route('articles.manage'), { search: searchTerm, per_page: value }, { preserveState: true, replace: true })
  }

  const handleReview = (articleId: number) => {
    router.visit(route("articles.review", articleId))
  }

  const handleDeleteClick = (articleId: number) => {
    setArticleToActOn(articleId)
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      router.delete(route("articles.destroy", articleId), {
        onSuccess: () => {
          alert("Artikel berhasil dihapus!")
          setArticleToActOn(null)
        },
        onError: (errors) => {
          console.error("Error deleting article:", errors)
          alert("Gagal menghapus artikel.")
          setArticleToActOn(null)
        },
      })
    }
  }

  const handlePublish = (articleId: number) => {
    if (confirm("Apakah Anda yakin ingin mempublikasikan artikel ini?")) {
      router.post(
        route("articles.publish", articleId),
        {},
        {
          onSuccess: () => alert("Artikel berhasil dipublikasikan!"),
          onError: (errors) => {
            console.error("Error publishing article:", errors)
            alert("Gagal mempublikasikan artikel.")
          },
        },
      )
    }
  }

  const handleRejectClick = (articleId: number) => {
    setArticleToActOn(articleId)
    setShowRejectDialog(true)
  }

  // --- FIX: Buat fungsi handleEdit yang benar ---
  const handleEdit = (article: ArticleListItem) => {
    setEditingArticle(article) // Simpan seluruh objek artikel
    setIsModalOpen(true) // Buka modal
  }

  const handleCreate = () => {
    setEditingArticle(null) // Pastikan tidak ada data artikel saat membuat baru
    setIsModalOpen(true)
  }

  const handleRejectConfirm = () => {
    if (!rejectReasonInput.trim()) {
      alert("Harap masukkan alasan penolakan.")
      return
    }

    if (articleToActOn !== null) {
      router.post(
        route("articles.reject", articleToActOn),
        { reasons: [rejectReasonInput.trim()] },
        {
          onSuccess: () => {
            alert("Artikel berhasil ditolak!")
            setShowRejectDialog(false)
            setRejectReasonInput("")
            setArticleToActOn(null)
          },
          onError: (errors) => {
            console.error("Error rejecting article:", errors)
            alert("Gagal menolak artikel.")
          },
        },
      )
    }
  }

  const Layout = auth.user?.role === 'admin' ? AdminLayout : EditorLayout;
  const pageTitle = "Kelola Artikel";
  const breadcrumbItems = [
    { label: "Dashboard", href: route('adashboard') },
    { label: "Artikel" }
  ];
  return (
    <Layout pageTitle={pageTitle} breadcrumbItems={breadcrumbItems}>
      <Head title="Kelola Artikel" />
      
      <main className="flex-1 p-4 overflow-y-auto">
          <div className="flex-1 flex pb-5 justify-between px-2 pt-2">

            <div className="flex-1">
              <div className="flex gap-2">
                <Input
                  placeholder="Cari judul / penulis / kategori..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') applySearch() }}
                  className="max-w-xl"
                />
                <Button variant="secondary" onClick={applySearch}>Cari</Button>
                <select className="border rounded px-2 text-sm" value={perPage} onChange={(e) => changePerPage(e.target.value)}>
                  {[10,25,50,100].map(n => <option key={n} value={n}>{n}/hal</option>)}
                </select>
              </div>
            </div>
            <Button onClick={handleCreate}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Artikel Baru
            </Button>
          </div>
        

        {filteredArticles.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredArticles.map((article) => (
              <AdminArticleCard
                key={article.id}
                article={article as ArticleListItem}
                onReview={handleReview}
                onPublish={handlePublish}
                onReject={handleRejectClick}
                onDelete={handleDeleteClick}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">Tidak ada artikel ditemukan.</div>
        )}

        {/* Pagination */}
        <div className="flex justify-end flex-wrap gap-1 mt-6">
          {articles.links?.map((l, idx) => (
            l.url ? (
              <Link
                key={idx}
                href={l.url}
                preserveScroll
                className={`px-3 py-1 rounded text-sm border ${l.active ? 'bg-primary text-white border-primary' : 'bg-white hover:bg-gray-100 border-gray-200'}`}
                dangerouslySetInnerHTML={{ __html: l.label }}
              />
            ) : (
              <span key={idx} className="px-3 py-1 rounded text-sm text-gray-400 border border-transparent" dangerouslySetInnerHTML={{ __html: l.label }} />
            )
          ))}
        </div>

        <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tolak Artikel</AlertDialogTitle>
              <AlertDialogDescription>
                Berikan alasan mengapa artikel ini ditolak. Alasan ini akan dikirimkan kepada penulis.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="reject-reason">Alasan Penolakan</Label>
                <Textarea
                  id="reject-reason"
                  placeholder="Misalnya: Konten tidak sesuai, informasi tidak akurat, plagiarisme, dll."
                  value={rejectReasonInput}
                  onChange={(e) => setRejectReasonInput(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleRejectConfirm}>Tolak Artikel</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>

      

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl p-0 border-none bg-transparent shadow-none">
            <ArticleFormModal
            isOpen={isModalOpen}
                // Beri key agar form di-reset saat beralih antara edit dan create
                key={editingArticle?.id || 'new-article'}
                categories={categories}
                articleToEdit={editingArticle}
                onClose={() => setIsModalOpen(false)}
            />
        </DialogContent>
      </Dialog>
    </Layout>
  )
}