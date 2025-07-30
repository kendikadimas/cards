"use client"

import { useState } from "react"
import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Pencil } from "lucide-react"
import type { BanpromItem } from "@/types"

interface BannerFormDialogProps {
  type: 'create' | 'edit';
  initialData?: BanpromItem;
}

export function BannerFormDialog({ type, initialData }: BannerFormDialogProps) {
  const [open, setOpen] = useState(false);
  const isEditMode = type === 'edit';

  const { data, setData, post, errors, processing, reset } = useForm({
    judul: initialData?.title || '',
    gambar: null as File | null,
    tglmulai: initialData?.startDate || '',
    tglakhir: initialData?.endDate || '',
    status: initialData?.status || 'berakhir',
    _method: isEditMode ? 'PUT' : 'POST',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditMode ? route("banners.update", initialData!.id) : route("banners.store");
    
    post(url, {
      forceFormData: true,
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant="outline" size="icon" className="h-8 w-8 text-orange-500 border-orange-200 hover:bg-orange-50">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Banner
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Banner Promosi' : 'Tambah Banner Baru'}</DialogTitle>
          <DialogDescription>
            Isi detail di bawah ini dan klik simpan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div>
            <Label htmlFor="judul">Judul</Label>
            <Input id="judul" value={data.judul} onChange={(e) => setData('judul', e.target.value)} className="mt-1" />
            {errors.judul && <p className="text-red-500 text-xs mt-1">{errors.judul}</p>}
          </div>
          <div>
            <Label htmlFor="gambar">{isEditMode ? 'Ganti Gambar (Opsional)' : 'Gambar'}</Label>
            <Input id="gambar" type="file" onChange={(e) => setData('gambar', e.target.files ? e.target.files[0] : null)} className="mt-1" />
            {errors.gambar && <p className="text-red-500 text-xs mt-1">{errors.gambar}</p>}
          </div>
          <div>
            <Label htmlFor="tglmulai">Tanggal Mulai</Label>
            <Input id="tglmulai" type="date" value={data.tglmulai} onChange={(e) => setData('tglmulai', e.target.value)} className="mt-1" />
            {errors.tglmulai && <p className="text-red-500 text-xs mt-1">{errors.tglmulai}</p>}
          </div>
          <div>
            <Label htmlFor="tglakhir">Tanggal Akhir</Label>
            <Input id="tglakhir" type="date" value={data.tglakhir} onChange={(e) => setData('tglakhir', e.target.value)} className="mt-1" />
            {errors.tglakhir && <p className="text-red-500 text-xs mt-1">{errors.tglakhir}</p>}
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => setData('status', value)} value={data.status}>
                <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent defaultValue={"aktif"}>
                    <SelectItem value="aktif">Aktif</SelectItem>
                    <SelectItem value="berakhir">Berakhir</SelectItem>
                </SelectContent>
            </Select>
            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={processing}>
              {processing ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
