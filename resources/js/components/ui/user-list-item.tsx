"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react" // <-- 1. Impor ikon baru

interface UserListItemProps {
  id: string
  profileImage: string
  name: string
  role: string
  onEdit: (id: string) => void;    // <-- 2. Tambahkan prop untuk handle edit
  onDelete: (id: string) => void;  // <-- 2. Tambahkan prop untuk handle delete
}

export function UserListItem({ id, profileImage, name, role, onEdit, onDelete }: UserListItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
      {/* Bagian Kiri: Avatar, Nama, dan Role */}
      <div className="flex items-center gap-4">
        <Avatar className="h-11 w-11">
          <AvatarImage src={profileImage || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-base font-bold text-gray-800">{name}</h4>
          <p className="text-sm text-muted-foreground">Role {role}</p>
        </div>
      </div>

      {/* Bagian Kanan: Tombol Edit dan Hapus */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          onClick={() => onEdit(id)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="bg-red-100 text-red-800 hover:bg-red-200"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Hapus
        </Button>
      </div>
    </div>
  )
}
