"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CategoryFormDialog } from "./category-form-dialog"
import { DeleteCategoryDialog } from "./delete-category-dialog"
import { cn } from "@/lib/utils"
import { router, Link } from "@inertiajs/react"
import type { ManageCategoriesPageProps } from "@/types"

interface CategoryTableProps {
  categories: ManageCategoriesPageProps['categories'];
}

export function CategoryTable({ categories }: CategoryTableProps) {
  const getStatusVariant = (status: "active" | "inactive") => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const handleDeleteCategory = (categoryId: number) => {
    router.delete(route("kategori.destroy", categoryId), {
      preserveScroll: true,
      // onSuccess: () => alert('Kategori berhasil dihapus!'), // Notifikasi bisa ditangani secara global
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Daftar Kategori Artikel</CardTitle>
        <CategoryFormDialog type="create" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Nama Kategori</TableHead>
              <TableHead className="w-[30%]">Slug</TableHead>
              <TableHead className="w-[15%]">Status</TableHead>
              <TableHead className="w-[15%] text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.data.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-muted-foreground">{category.slug || "-"}</TableCell>
                <TableCell>
                  <Badge className={cn("border-none", getStatusVariant(category.status))}>
                    {category.status === "active" ? "Aktif" : "Tidak Aktif"}
                  </Badge>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  <CategoryFormDialog type="edit" initialData={category} />
                  <DeleteCategoryDialog onConfirmDelete={() => handleDeleteCategory(category.id)} />
                </TableCell>
              </TableRow>
            ))}
             {categories.data.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        Tidak ada kategori yang ditemukan.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
         {/* Paginasi */}
        <div className="mt-6 flex justify-center space-x-1">
            {categories.links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || '#'}
                    className={`px-3 py-2 text-sm rounded-md ${!link.url ? 'text-gray-400 cursor-not-allowed' : ''} ${link.active ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700 hover:bg-gray-50'}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
