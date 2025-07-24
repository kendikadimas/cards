"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
// import Image from "next/image"
import { Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Category } from "@/types"

interface ArticleFormProps {
  initialData?: {
    title: string
    image: string
    description: string
    kategori_id: number
  }
  categories: Category[]
  onSubmit: (values: { title: string; image: string; description: string; kategori_id: number }) => void
  isSubmitting: boolean
}

export function ArticleForm({ initialData, categories, onSubmit, isSubmitting }: ArticleFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [image, setImage] = useState(initialData?.image || "")
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.image || null)
  const [description, setDescription] = useState(initialData?.description || "")
  const [kategoriId, setKategoriId] = useState<number | undefined>(initialData?.kategori_id)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (kategoriId === undefined) {
      alert("Harap pilih kategori.")
      return
    }
    onSubmit({ title, image, description, kategori_id: kategoriId })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        // Dalam aplikasi nyata, Anda akan mengunggah file dan mendapatkan URL
        // Untuk saat ini, kita akan mengatur URL dummy atau membiarkannya kosong
        setImage("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KLsHYEOdWXjtPvKMt0ocRq8S5VcfKV.png")
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewImage(null)
      setImage("")
    }
  }

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-8 border border-blue-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{initialData ? "Edit Artikel" : "Tambah Artikel Baru"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Judul Artikel</Label>
          <Input
            id="title"
            placeholder="Masukkan judul artikel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Kategori</Label>
          <Select
            onValueChange={(value) => setKategoriId(Number.parseInt(value))}
            value={kategoriId?.toString() || ""}
            disabled={isSubmitting}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.nama_kategori}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image">URL Gambar (Opsional)</Label>
          <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 h-48 relative overflow-hidden bg-white">
            {previewImage ? (
              <img
                src={previewImage || "/placeholder.svg"}
                alt="Banner Preview"
                className="rounded-lg"
              />
            ) : (
              <span className="text-muted-foreground">masukan foto banner disini</span>
            )}
            <Input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
              value={undefined} // Penting untuk mengosongkan nilai input file
            />
            <Upload className="absolute top-4 right-4 h-6 w-6 text-gray-500" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Konten Artikel</Label>
          <Textarea
            id="description"
            placeholder="Tulis konten artikel Anda di sini..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={10}
            required
            disabled={isSubmitting}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan Artikel"}
        </Button>
      </form>
    </div>
  )
}
