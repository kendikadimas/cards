"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useForm, usePage } from "@inertiajs/react"
import type { User, PageProps } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileUpdateFormProps {
    user: User;
}

export function ProfileUpdateForm({ user }: ProfileUpdateFormProps) {
    const { errors } = usePage<PageProps>().props;

    const { data, setData, post, processing } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        institution: user.institution || '', // Asumsi ada kolom 'institution'
        profile_image: null as File | null,
        _method: 'patch', // <-- FIX: Tambahkan _method spoofing di sini
    });

    const [previewImage, setPreviewImage] = useState<string | null>(user.profile_image || null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('profile_image', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Rute ini harusnya 'profile.update' atau yang sesuai di routes/web.php
        // Menggunakan router.post karena ada file upload
        post(route('profile.update'), {
            forceFormData: true,
            onSuccess: () => alert('Profil berhasil diperbarui!'),
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Informasi Profil</CardTitle>
                <CardDescription>Perbarui informasi profil dan alamat email Anda.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                        <img src={previewImage || `https://ui-avatars.com/api/?name=${data.name}`} alt="Profile" className="h-24 w-24 rounded-full object-cover" />
                        <div>
                            <Label htmlFor="profile_image" className="cursor-pointer text-blue-600 hover:underline">
                                Perbarui Foto Profil
                            </Label>
                            <Input id="profile_image" type="file" className="hidden" onChange={handleFileChange} />
                            {errors.profile_image && <p className="text-red-500 text-xs mt-1">{errors.profile_image}</p>}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="name">Username</Label>
                        <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="mt-1" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                     <div>
                        <Label htmlFor="phone">No. Telepon</Label>
                        <Input id="phone" value={data.phone || ''} onChange={e => setData('phone', e.target.value)} className="mt-1" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                        <Label htmlFor="institution">Nama Instansi (jika ada)</Label>
                        <Input id="institution" value={data.institution || ''} onChange={e => setData('institution', e.target.value)} className="mt-1" />
                        {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
