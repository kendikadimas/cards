"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useForm } from "@inertiajs/react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ArticleListItem, Category } from "@/types"

interface MemberArticleUploadFormProps {
  initialData?: ArticleListItem | null
  categories: Category[]
  onSubmitSuccess?: () => void
}

export function MemberArticleUploadForm({ initialData, categories, onSubmitSuccess }: MemberArticleUploadFormProps) {
  const isEditMode = !!initialData

  const { data, setData, post, errors, processing } = useForm({
    title: initialData?.title || "",
    kategori_id: initialData?.category_id?.toString() || "", // Pastikan kategori_id adalah string
    description: initialData?.konten || "", // <-- FIX: Gunakan 'konten' untuk deskripsi lengkap
    image: null as File | null,
    _method: isEditMode ? 'PUT' : 'POST',
  })

  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.imageSrc || null)

  useEffect(() => {
    // Reset form jika beralih antara mode create dan edit
    setData({
        title: initialData?.title || "",
        kategori_id: initialData?.category_id?.toString() || "",
        description: initialData?.konten || "",
        image: null,
        _method: isEditMode ? 'PUT' : 'POST',
    });
    setPreviewImage(initialData?.imageSrc || null);
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setData('image', file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const url = isEditMode ? route("member.articles.update", initialData.id) : route("member.articles.upload")
    
    post(url, {
      forceFormData: true,
      onSuccess: () => {
        if (onSubmitSuccess) onSubmitSuccess()
      },
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-center mb-6">{isEditMode ? "Edit Artikel" : "Unggah Artikel Anda"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Judul Artikel</Label>
          <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} className="mt-1" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>
        <div>
          <Label htmlFor="kategori_id">Kategori</Label>
          <Select onValueChange={(value) => setData('kategori_id', value)} value={data.kategori_id}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>{cat.nama_kategori}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.kategori_id && <p className="text-red-500 text-xs mt-1">{errors.kategori_id}</p>}
        </div>
        <div>
          <Label>Gambar Artikel</Label>
          <div className="mt-1 flex justify-center items-center border-2 border-dashed rounded-md h-48 bg-gray-50 relative">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="h-full w-full object-cover rounded-md" />
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-10 w-10 text-gray-400" />
                <p className="mt-1 text-sm text-gray-600">Pilih file untuk diunggah</p>
              </div>
            )}
            <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
          </div>
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>
        <div>
          <Label htmlFor="description">Deskripsi / Konten</Label>
          <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} rows={8} className="mt-1" />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
            {processing ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Kirim Artikel')}
          </Button>
        </div>
      </form>
    </div>
  )
}
