"use client"

import { useState } from "react" // <-- Import useState
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Eye } from "lucide-react"
import { Link, router } from "@inertiajs/react"
import { cn } from "@/lib/utils"
import type { ManageBannersPageProps, BanpromItem } from "@/types"
import { BannerFormDialog } from "./banner-form-dialog"
// Import komponen Dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface BannerTableProps {
  banproms: ManageBannersPageProps['banproms'];
}

export function BannerTable({ banproms }: BannerTableProps) {
  // State untuk mengelola popup review
  const [reviewingBanner, setReviewingBanner] = useState<BanpromItem | null>(null);

  const getStatusVariant = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === "aktif") return "bg-green-100 text-green-800";
    if (lowerStatus === "tidak aktif") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  }

  const handleDelete = (id: number) => {
    if (confirm("Anda yakin ingin menghapus banner ini?")) {
      router.delete(route("banners.destroy", id), {
        preserveScroll: true,
      })
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Daftar Banner</CardTitle>
          <BannerFormDialog type="create" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gambar</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Durasi</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banproms.data.map((promo: BanpromItem) => (
                <TableRow key={promo.id}>
                  <TableCell>
                    <img src={promo.image_url} alt={promo.title} className="w-24 h-12 object-cover rounded-md"/>
                  </TableCell>
                  <TableCell className="font-medium">{promo.title}</TableCell>
                  <TableCell>
                    <Badge className={cn("border-none capitalize", getStatusVariant(promo.status))}>
                      {promo.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{promo.duration}</TableCell>
                  <TableCell>{promo.startDate} - {promo.endDate}</TableCell>
                  <TableCell className="flex items-center justify-center gap-2">
                    {/* FIX: Tombol Review sekarang memicu popup */}
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 text-blue-500 border-blue-200 hover:bg-blue-50"
                      onClick={() => setReviewingBanner(promo)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <BannerFormDialog type="edit" initialData={promo} />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => handleDelete(promo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
               {banproms.data.length === 0 && (
                  <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          Tidak ada banner promosi yang ditemukan.
                      </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mt-6 flex justify-center space-x-1">
              {banproms.links.map((link, index) => (
                  <Link
                      key={index}
                      href={link.url || '#'}
                      className={`px-3 py-2 text-sm rounded-md ${!link.url ? 'text-gray-400' : ''} ${link.active ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700 hover:bg-gray-50'}`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                  />
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Komponen Dialog untuk Popup Review Gambar */}
      <Dialog open={!!reviewingBanner} onOpenChange={() => setReviewingBanner(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Preview: {reviewingBanner?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden border">
              <img src={reviewingBanner?.image_url} alt={reviewingBanner?.title} className="w-full h-full object-contain" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
