"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { ClipboardPaste } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Category, ArticleListItem } from "@/types"

interface ArticleFormProps {
  initialData?: ArticleListItem | null;
  categories: Category[];
  onSubmit: (values: { title: string; image: File | null; description: string; kategori_id: number }) => void;
  isSubmitting: boolean;
}

export function ArticleForm({ initialData, categories, onSubmit, isSubmitting }: ArticleFormProps) {
  // --- FIX: Inisialisasi 'description' dari 'initialData.konten' ---
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.konten || ""); // Menggunakan .konten
  const [kategoriId, setKategoriId] = useState<number | undefined>(initialData?.kategori_id);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Gunakan useEffect untuk menangani kasus di mana initialData berubah
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.konten || ""); // Menggunakan .konten
      setKategoriId(initialData.kategori_id);
    } else {
      // FIX: Reset form jika ini adalah mode 'create' (buat baru)
      setTitle("");
      setDescription("");
      setKategoriId(undefined);
      setImageFile(null);
    }
  }, [initialData]);
  // -----------------------------------------------------------------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (kategoriId === undefined) {
      alert("Harap pilih kategori.");
      return;
    }
    // 'description' dari state lokal akan dikirim
    onSubmit({ title, image: imageFile, description, kategori_id: kategoriId });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  return (
    <div className="bg-white rounded-xl p-2 sm:p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="title"
          placeholder="Inputkan Judul Artikel Anda"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isSubmitting}
          className="py-6"
        />
        
        <Select
          onValueChange={(value) => setKategoriId(Number.parseInt(value))}
          value={kategoriId?.toString() || ""}
          disabled={isSubmitting}
        >
          <SelectTrigger className="py-6">
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.nama_kategori}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {initialData?.image_url && (
            <div className="text-sm">
                <p className="font-medium text-gray-700 mb-2">Gambar Saat Ini:</p>
                <img src={initialData.image_url} alt={initialData.title} className="rounded-md max-h-40 w-auto" />
                <p className="text-xs text-gray-500 mt-2">Pilih file baru di bawah untuk mengganti gambar ini.</p>
            </div>
        )}

        <div className="relative">
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isSubmitting}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 pr-10 py-6"
          />
           <ClipboardPaste className="absolute top-1/2 right-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        <Textarea
          id="description"
          placeholder="Inputkan Deskripsi Konten"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          required
          disabled={isSubmitting}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : (initialData ? "Simpan Perubahan" : "Kirim Artikel")}
          </Button>
        </div>
      </form>
    </div>
  )
}