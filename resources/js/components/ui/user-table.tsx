"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { Link, router } from "@inertiajs/react"
import type { UserListItem, ManageUsersPageProps } from "@/types"

interface UserTableProps {
  users: ManageUsersPageProps['users'];
}

export function UserTable({ users }: UserTableProps) {
  const handleDelete = (userId: number) => {
    if (confirm("Anda yakin ingin menghapus pengguna ini?")) {
      // Gunakan nama route yang benar
      router.delete(route("users.destroy", userId))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Pengguna</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Foto</TableHead>
              <TableHead>Nama Pengguna</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>No Telepon</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <img 
                    src={user.profileImage || "/placeholder.svg"}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  <Link href={route("users.show", user.id)}>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 border-blue-200 hover:bg-blue-50">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={route("users.show", { user: user.id, edit: 'true' })}>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-orange-500 border-orange-200 hover:bg-orange-50">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Render Paginasi */}
        <div className="mt-6 flex justify-center space-x-1">
            {users.links.map((link, index) => (
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
  )
}