"use client"

import { useState } from "react"
import MemberLayout from "@/layouts/member-layout"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { MemberArticleUploadCard } from "@/components/ui/member-article-upload-card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { MemberArticleUploadForm } from "@/components/ui/member-article-upload-form"
import { usePage, router, Head, Link } from "@inertiajs/react"
import type { MemberArticlePageProps, ArticleListItem, Category } from "@/types"

export default function MemberArticlesPage() {
  // Ambil data asli dari controller menggunakan usePage hook
  const { articles, categories } = usePage<MemberArticlePageProps>().props

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<ArticleListItem | null>(null)

  const handleCreate = () => {
    setEditingArticle(null)
    setIsFormOpen(true)
  }

  const handleEdit = (article: ArticleListItem) => {
    setEditingArticle(article)
    setIsFormOpen(true)
  }

  const handleDelete = (articleId: number) => {
    if (confirm("Anda yakin ingin menghapus artikel ini?")) {
      router.delete(route("member.articles.destroy", articleId), {
        preserveScroll: true,
      })
    }
  }

  return (
    <MemberLayout title="Artikel Unggahan Anda">
      <Head title="Artikel Saya" />
      <div className="container mx-auto space-y-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Artikel Unggahan Anda</h1>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Input
              type="text"
              placeholder="Cari artikel..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Button onClick={handleCreate} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Unggah Artikel
          </Button>
        </div>

        {/* Daftar Artikel */}
        <div className="grid grid-cols-1 gap-6">
          {/* FIX: Lakukan pengecekan sebelum me-render data */}
          {articles && articles.data && articles.data.length > 0 ? (
            articles.data.map((article) => (
              <MemberArticleUploadCard
                key={article.id}
                article={article} // Kirim seluruh objek artikel
                onEdit={() => handleEdit(article)}
                onDelete={() => handleDelete(article.id)}
              />
            ))
          ) : (
            <div className="text-center py-16 border rounded-lg bg-gray-50">
                <p className="text-gray-500">Anda belum mengunggah artikel apapun.</p>
            </div>
          )}
        </div>

        {/* Link Paginasi */}
        {articles && articles.links && articles.links.length > 3 && (
            <div className="mt-6 flex justify-center space-x-1">
                {articles.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={`px-3 py-2 text-sm rounded-md ${!link.url ? 'text-gray-400 cursor-not-allowed' : ''} ${link.active ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700 hover:bg-gray-50'}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        )}

        {/* Modal untuk Form Create/Edit */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-2xl p-0 border-none bg-transparent">
            <MemberArticleUploadForm
              key={editingArticle?.id || 'new'}
              initialData={editingArticle}
              categories={categories}
              onSubmitSuccess={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </MemberLayout>
  )
}
