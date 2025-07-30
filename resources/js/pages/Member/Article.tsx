"use client"

import { useState, useEffect } from "react"
import MemberLayout from "@/layouts/member-layout"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { MemberArticleUploadForm } from "@/components/ui/member-article-upload-form"
import { usePage, router, Head, Link } from "@inertiajs/react"
import type { MemberArticlePageProps, ArticleListItem } from "@/types"
import { MemberArticleListItem } from "@/components/ui/member-article-list-item"
import { useDebounce } from 'use-debounce'; // Pastikan Anda sudah menginstal ini: npm i use-debounce

export default function MemberArticlesPage() {
  const { articles, categories, filters } = usePage<MemberArticlePageProps>().props

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<ArticleListItem | null>(null)

  // State untuk mengontrol input filter
  const [search, setSearch] = useState(filters.search || '');
  const [category, setCategory] = useState(filters.category || 'semua');
  const [month, setMonth] = useState(filters.month || 'semua');
  
  const [debouncedSearch] = useDebounce(search, 500); // Tunda pencarian 500ms agar tidak terlalu sering request

  // useEffect akan berjalan setiap kali nilai filter berubah
  useEffect(() => {
    const params: { [key: string]: string } = {};

    if (debouncedSearch) params.search = debouncedSearch;
    if (category && category !== 'semua') params.category = category;
    if (month && month !== 'semua') params.month = month;
    
    router.get(route("member.articles"), params, {
      preserveState: true,
      replace: true,
    });
  }, [debouncedSearch, category, month]);

  // Handler untuk aksi-aksi
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

  const monthOptions = [
      { value: '1', label: 'Januari' }, { value: '2', label: 'Februari' },
      { value: '3', label: 'Maret' }, { value: '4', label: 'April' },
      { value: '5', label: 'Mei' }, { value: '6', label: 'Juni' },
      { value: '7', label: 'Juli' }, { value: '8', label: 'Agustus' },
      { value: '9', label: 'September' }, { value: '10', label: 'Oktober' },
      { value: '11', label: 'November' }, { value: '12', label: 'Desember' },
  ];

  return (
    <MemberLayout title="Artikel Unggahan Anda">
      <Head title="Artikel Saya" />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Kolom Kiri: Filter */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-6">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Cari..." 
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Filter Kategori</h3>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Semua Kategori" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Kategori</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>{cat.nama_kategori}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               <div>
                <h3 className="font-semibold text-gray-800 mb-2">Filter Berdasarkan Bulan</h3>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger><SelectValue placeholder="Semua Bulan" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Bulan</SelectItem>
                    {monthOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          {/* Kolom Kanan: Daftar Artikel */}
          <main className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Artikel Unggahan Anda</h1>
              <Button onClick={handleCreate} className="bg-primary text-white hover:primary/80">
                <Plus className="h-4 w-4 mr-2" /> Unggah Artikel
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.data.length > 0 ? (
              articles.data.map((article) => (
                <MemberArticleListItem
                  key={article.id}
                  article={article}
                  onEdit={() => handleEdit(article)}
                  onDelete={() => handleDelete(article.id)}
                />
              ))
            ) : (
              <div className="text-center py-24 border-2 border-dashed rounded-2xl bg-gray-50">
                  <p className="text-gray-500">Tidak ada artikel yang cocok dengan filter Anda.</p>
              </div>
            )}
            </div>

            {/* Link Paginasi */}
            {articles.links.length > 3 && (
                <div className="mt-8 flex justify-center space-x-2">
                    {articles.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`px-4 py-2 text-sm rounded-lg ${!link.url ? 'text-gray-400 cursor-not-allowed' : ''} ${link.active ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700 hover:bg-gray-100'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal untuk Form Create/Edit */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-3xl p-0 border-none bg-transparent">
          <MemberArticleUploadForm
            key={editingArticle?.id || 'new'}
            initialData={editingArticle}
            categories={categories}
            onSubmitSuccess={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </MemberLayout>
  )
}