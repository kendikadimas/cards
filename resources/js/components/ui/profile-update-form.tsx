"use client"

import type React from "react"
import { useState } from "react"
import { useForm, usePage } from "@inertiajs/react"
import type { User, PageProps } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera } from "lucide-react"

interface ProfileUpdateFormProps {
    user: User;
}

export function ProfileUpdateForm({ user }: ProfileUpdateFormProps) {
    const { errors } = usePage<PageProps>().props;

    const { data, setData, post, processing } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        institution: user.institution || '',
        profile_image: null as File | null,
        _method: 'patch',
    });

    const [previewImage, setPreviewImage] = useState<string | null>(user.profile_image_url || null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('profile_image', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('profile.update'), {
            forceFormData: true,
        });
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div className="sm:col-span-1 flex flex-col items-center gap-4">
                <div className="relative">
                    <img src={previewImage || `https://ui-avatars.com/api/?name=${data.name}`} alt="Profile" className="h-32 w-32 rounded-full object-cover border-4 border-gray-200" />
                    <Label htmlFor="profile_image" className="absolute bottom-1 right-1 bg-white h-8 w-8 rounded-full flex items-center justify-center cursor-pointer shadow-md">
                        <Camera className="h-4 w-4 text-gray-600" />
                    </Label>
                    <Input id="profile_image" type="file" className="hidden" onChange={handleFileChange} />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
                    <p className="text-muted-foreground">{user.role}</p>
                </div>
                 <Button type="submit" disabled={processing} className="w-full bg-cyan-600 hover:bg-cyan-700">
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </div>

            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="name">Username</Label>
                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                 <div>
                    <Label htmlFor="institution">Nama Instansi (jika ada)</Label>
                    <Input id="institution" value={data.institution || ''} onChange={e => setData('institution', e.target.value)} className="mt-1" />
                    {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
                </div>
                 <div className="sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="mt-1" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                 <div className="sm:col-span-2">
                    <Label htmlFor="phone">No. Telepon</Label>
                    <Input id="phone" value={data.phone || ''} onChange={e => setData('phone', e.target.value)} className="mt-1" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
            </div>
        </form>
    );
}
