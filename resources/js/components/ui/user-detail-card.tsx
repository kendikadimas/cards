"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Pencil } from "lucide-react"
import { router } from "@inertiajs/react"
import type { UserInTable } from "@/types"

interface UserDetailCardProps {
  user: UserInTable
  defaultEditMode?: boolean
}

export function UserDetailCard({ user, defaultEditMode = false }: UserDetailCardProps) {
  const [isEditing, setIsEditing] = useState(defaultEditMode)
  const [formData, setFormData] = useState({...user, profile_image: null as File | null});

  useEffect(() => {
    setIsEditing(defaultEditMode)
    setFormData({...user, profile_image: null}) // Selalu update form data jika user prop berubah
  }, [defaultEditMode, user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, profile_image: e.target.files![0] }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }


  const handleSave = () => {
    // Gunakan router.post dengan _method 'put' untuk upload file
    router.post(route("users.update", formData.id), {
      _method: 'put',
      ...formData,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsEditing(false)
        alert('Data pengguna berhasil diperbarui!')
      },
      onError: (errors) => {
        console.error("Error saving user data:", errors)
        const firstError = Object.values(errors)[0];
        alert(`Gagal menyimpan: ${firstError}`)
      },
    })
  }

  return (
    <Card className="lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Detail Pengguna</CardTitle>
        {isEditing ? (
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
            <Check className="h-4 w-4 mr-2" /> Simpan
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)} variant="outline" className="text-orange-500 border-orange-200 hover:bg-orange-50">
            <Pencil className="h-4 w-4 mr-2" /> Edit
          </Button>
        )}
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        {/* Foto Profil saat ini */}
        <div className="flex flex-col items-center">
            <img src={user.profileImage} alt={user.name} className="h-24 w-24 rounded-full object-cover mb-2" />
        </div>
        <div>
          <Label htmlFor="name">Nama pengguna</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} readOnly={!isEditing} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="email">Email Pengguna</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} readOnly={!isEditing} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="phone">No Telepon</Label>
          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} readOnly={!isEditing} className="mt-1" />
        </div>
       <div>
          <Label htmlFor="role">Role</Label>
          {isEditing ? (
            <Select value={formData.role} onValueChange={(value) => handleSelectChange(value)}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Member">Member</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Super Admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input id="role" name="role" value={formData.role} readOnly className="mt-1 bg-gray-100" />
          )}
        </div>

        {/* Input untuk ganti foto profil, hanya muncul saat mode edit */}
        {isEditing && (
          <div>
            <Label htmlFor="profile_image">Ganti Foto Profil</Label>
            <Input id="profile_image" name="profile_image" type="file" onChange={handleFileChange} className="mt-1" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}