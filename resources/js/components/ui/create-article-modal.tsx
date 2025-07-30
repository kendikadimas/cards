"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import type { ArticleListItem, Category } from "@/types"

interface ArticleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  articleToEdit: ArticleListItem | null;
}

export function ArticleFormModal({ isOpen, onClose, categories, articleToEdit }: ArticleFormModalProps) {
  const isEditMode = !!articleToEdit;

  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    kategori_id: "",
    description: "",
    image: null as File | null,
    // FIX: Hapus _method spoofing agar selalu POST
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && articleToEdit) {
      setData({
        title: articleToEdit.title || "",
        kategori_id: articleToEdit.kategori_id?.toString() || "",
        description: articleToEdit.konten || "",
        image: null,
      });
      setPreviewImage(articleToEdit.image_url || null);
    } else {
      reset();
      setPreviewImage(null);
    }
  }, [articleToEdit, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('image', file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditMode ? route("articles.update", articleToEdit!.id) : route("articles.store");
    
    // Kirim sebagai POST, Laravel akan menanganinya
    post(url, {
      forceFormData: true,
      onSuccess: () => onClose(),
    });
  };

  if (!isOpen) return null; 

  return (
    // FIX: Padding diubah dari p-8 menjadi p-6
    <div className="bg-white rounded-xl shadow-lg p-6 border w-1/2 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">{isEditMode ? "Edit Artikel" : "Unggah Artikel"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Judul Artikel</Label>
          <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1" />
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
          <Label>{isEditMode ? "Ganti Gambar Artikel (Opsional)" : "Gambar Banner"}</Label>
          {/* FIX: Tinggi pratinjau gambar diubah dari h-48 menjadi h-40 */}
          <div className="mt-1 flex justify-center items-center border-2 border-dashed rounded-md h-40 bg-gray-50 relative">
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
          {/* FIX: Jumlah baris textarea diubah dari 8 menjadi 6 */}
          <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={6} className="mt-1" />
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
