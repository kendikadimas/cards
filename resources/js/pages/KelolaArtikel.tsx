"use client"

import AdminLayout from "@/layouts/admin-layout"
import EditorLayout from "@/layouts/editor-layout"
import { Head, usePage, router } from "@inertiajs/react"
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
  const { articles, categories, auth } = usePage<KelolaArtikelPageProps & SharedData>().props
  const [searchTerm, setSearchTerm] = useState("")
  const [articleToActOn, setArticleToActOn] = useState<number | null>(null)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReasonInput, setRejectReasonInput] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<ArticleListItem | null>(null)

  const filteredArticles = (articles.data || []).filter(
    (article: ArticleListItem) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.category_name && article.category_name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

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
              <Input
                placeholder="Cari artikel berdasarkan judul, penulis, atau kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xl"
              />
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
                article={article}
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