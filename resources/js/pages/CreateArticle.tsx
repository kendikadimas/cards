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

  const handleSubmit = (values: { title: string; image: File | null; description: string; kategori_id: number }) => {
    setIsSubmitting(true)
    setSubmissionMessage(null)
    setIsSubmissionError(false)

    // Menggunakan router.post dengan data FormData untuk upload file
    router.post(route("articles.store"), values as any, {
      onSuccess: () => {
        setSubmissionMessage("Artikel berhasil ditambahkan dan menunggu review!")
        setIsSubmissionError(false)
        setIsSubmitting(false)
      },
      onError: (errors) => {
        console.error("Error submitting article:", errors)
        const firstError = errors[Object.keys(errors)[0]];
        setSubmissionMessage(firstError || "Gagal menambahkan artikel. Silakan coba lagi.")
        setIsSubmissionError(true)
        setIsSubmitting(false)
      },
    })
  }

  return (
    <AdminLayout>
      <Head title="Unggah Artikel" />
      
      {/* Latar belakang utama diatur menjadi abu-abu */}
      <main className="flex-1 p-6 sm:p-8 bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-2xl">
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