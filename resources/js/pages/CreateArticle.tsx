"use client"

import AdminLayout from "@/layouts/admin-layout"
import { Head, router, usePage } from "@inertiajs/react"
import { ArticleForm } from "@/components/ui/article-form"
import { useState } from "react"
import type { CreateArticlePageProps } from "@/types"

export default function CreateArticle() {
  const { categories } = usePage<CreateArticlePageProps>().props
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null)
  const [isSubmissionError, setIsSubmissionError] = useState(false)

  const handleSubmit = (values: { title: string; image: string; description: string; kategori_id: number }) => {
    setIsSubmitting(true)
    setSubmissionMessage(null)
    setIsSubmissionError(false)

    router.post(route("articles.store"), values, {
      onSuccess: () => {
        setSubmissionMessage("Artikel berhasil ditambahkan dan menunggu review!")
        setIsSubmissionError(false)
        setIsSubmitting(false)
        // Optionally, you can redirect after a short delay
        // setTimeout(() => router.visit(route('articles.manage')), 2000);
      },
      onError: (errors) => {
        console.error("Error submitting article:", errors)
        setSubmissionMessage("Gagal menambahkan artikel. Silakan coba lagi.")
        setIsSubmissionError(true)
        setIsSubmitting(false)
      },
    })
  }

  return (
    <AdminLayout>
      <Head title="Tambah Artikel Baru" />
      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="text-xl font-semibold">Tambah Artikel Baru</h1>
          <p className="text-sm text-muted-foreground">Isi detail artikel baru Anda.</p>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm">
          {submissionMessage && (
            <div
              className={`mb-4 rounded-md p-3 text-sm ${
                isSubmissionError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
              }`}
              role="alert"
            >
              {submissionMessage}
            </div>
          )}
          <ArticleForm onSubmit={handleSubmit} isSubmitting={isSubmitting} categories={categories} />
        </div>
      </main>
    </AdminLayout>
  )
}
