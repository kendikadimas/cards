"use client"

import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArticleForm } from "@/components/ui/article-form"
import type { Category, ArticleListItem } from "@/types"

interface ArticleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  articleToEdit: ArticleListItem | null; // Prop untuk menampung data artikel yang akan diedit
}

export function ArticleFormModal({ isOpen, onClose, categories, articleToEdit }: ArticleFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  // Tentukan apakah ini mode edit atau mode buat baru
  const isEditMode = articleToEdit !== null;

  const handleSubmit = (values: { title: string; image: File | null; description: string; kategori_id: number }) => {
    setIsSubmitting(true)
    setSubmissionError(null)

    // Siapkan data untuk dikirim. Inertia otomatis mengubahnya ke FormData jika ada file.
    const postData = {
        ...values,
        _method: isEditMode ? 'POST' : 'POST', // Inertia bisa pakai POST untuk update
    };

    const routeName = isEditMode ? route("articles.update", articleToEdit.id) : route("articles.store");

    router.post(routeName, postData as any, {
      onSuccess: () => {
        setIsSubmitting(false)
        onClose(); // Tutup modal setelah berhasil
      },
      onError: (errors) => {
        const firstError = errors[Object.keys(errors)[0]];
        setSubmissionError(firstError || "Gagal menyimpan. Silakan periksa kembali isian Anda.")
        setIsSubmitting(false)
      },
    })
  }

  // Reset pesan error saat modal ditutup
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSubmissionError(null);
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Artikel" : "Tambah Artikel Baru"}</DialogTitle>
        </DialogHeader>
        <div className="p-2">
            {submissionError && (
                <div className="mb-4 rounded-md p-3 text-sm bg-red-100 text-red-700" role="alert">
                  {submissionError}
                </div>
            )}
            <ArticleForm
                key={articleToEdit?.id || 'new'} // Beri key agar form di-reset saat berganti antara edit/create
                initialData={articleToEdit} 
                onSubmit={handleSubmit} 
                isSubmitting={isSubmitting} 
                categories={categories} 
            />
        </div>
      </DialogContent>
    </Dialog>
  )
}