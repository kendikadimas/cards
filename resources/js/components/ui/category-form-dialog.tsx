"use client"

import { useState } from "react"
import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, PlusCircle } from "lucide-react"
import type { Category } from "@/types"

interface CategoryFormDialogProps {
  type: "create" | "edit"
  initialData?: Category
}

export function CategoryFormDialog({ type, initialData }: CategoryFormDialogProps) {
  const [open, setOpen] = useState(false)
  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: initialData?.name || "",
    status: initialData?.status || "active",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const onSuccess = () => {
      setOpen(false)
      reset()
    }

    if (type === "edit" && initialData) {
      put(route("kategori.update", initialData.id), { onSuccess })
    } else {
      post(route("kategori.store"), { onSuccess })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {type === "edit" ? (
          <Button variant="outline" size="icon" className="h-8 w-8 text-orange-500 border-orange-200 hover:bg-orange-50">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Kategori
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type === "edit" ? "Edit Kategori" : "Buat Kategori Baru"}</DialogTitle>
          <DialogDescription>
            {type === "edit" ? "Perbarui detail kategori di bawah ini." : "Isi detail untuk kategori baru."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nama</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="col-span-3"
              />
              {errors.name && <p className="col-span-4 text-red-500 text-xs text-right">{errors.name}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select value={data.status} onValueChange={(value) => setData("status", value as "active" | "inactive")}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={processing}>
              {processing ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
