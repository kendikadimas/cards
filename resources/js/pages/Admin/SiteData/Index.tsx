import React, { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Save } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import { Switch } from '@/components/ui/switch';

interface SiteStat {
  id: number;
  key: string;
  label: string;
  value: number;
  order: number;
}

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  avatar: string | null;
  avatar_url: string;
  order: number;
  is_active: boolean;
}

interface PageProps {
  stats: SiteStat[];
  testimonials: Testimonial[];
}

export default function SiteDataIndex() {
  const { stats, testimonials } = usePage<PageProps & any>().props;
  const [editingStat, setEditingStat] = useState<SiteStat | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);

  // Form for editing stats
  const statForm = useForm({
    label: '',
    value: 0,
  });

  // Form for testimonials
  const testimonialForm = useForm({
    quote: '',
    name: '',
    title: '',
    avatar: null as File | null,
    is_active: true as boolean,
  });

  const handleEditStat = (stat: SiteStat) => {
    setEditingStat(stat);
    statForm.setData({
      label: stat.label,
      value: stat.value,
    });
  };

  const handleSaveStat = () => {
    if (!editingStat) return;
    
    statForm.patch(route('sitestats.update', editingStat.id), {
      preserveScroll: true,
      onSuccess: () => {
        setEditingStat(null);
        statForm.reset();
      },
    });
  };

  const handleAddTestimonial = () => {
    testimonialForm.post(route('testimonials.store'), {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => {
        setIsAddingTestimonial(false);
        testimonialForm.reset();
      },
    });
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    testimonialForm.setData({
      quote: testimonial.quote,
      name: testimonial.name,
      title: testimonial.title,
      avatar: null,
      is_active: testimonial.is_active,
    });
  };

  const handleUpdateTestimonial = () => {
    if (!editingTestimonial) return;
    
    testimonialForm.post(route('testimonials.update', editingTestimonial.id), {
      preserveScroll: true,
      forceFormData: true,
      _method: 'patch',
      onSuccess: () => {
        setEditingTestimonial(null);
        testimonialForm.reset();
      },
    } as any);
  };

  const handleDeleteTestimonial = (id: number) => {
    if (confirm('Hapus testimoni ini?')) {
      router.delete(route('testimonials.destroy', id), {
        preserveScroll: true,
      });
    }
  };

  return (
    <AdminLayout 
      pageTitle="Kelola Data Situs" 
      breadcrumbItems={[
        { label: 'Dashboard', href: '/adashboard' }, 
        { label: 'Kelola Data Situs' }
      ]}
    >
      <Head title="Kelola Data Situs" />
      
      <div className="h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Site Statistics Section */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Data Guru & Siswa</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat: SiteStat) => (
                <Card key={stat.id} className="p-6">
                  {editingStat?.id === stat.id ? (
                    <div className="space-y-4">
                      <div>
                        <Label>Label</Label>
                        <Input
                          value={statForm.data.label}
                          onChange={(e) => statForm.setData('label', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Nilai</Label>
                        <Input
                          type="number"
                          value={statForm.data.value}
                          onChange={(e) => statForm.setData('value', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveStat} size="sm" disabled={statForm.processing}>
                          <Save className="h-4 w-4 mr-1" /> Simpan
                        </Button>
                        <Button onClick={() => setEditingStat(null)} variant="outline" size="sm">
                          Batal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-medium text-gray-700">{stat.label}</h3>
                        <Button onClick={() => handleEditStat(stat)} variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-4xl font-bold text-primary">{stat.value.toLocaleString()}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-primary">Kelola Testimoni</h2>
              <Dialog open={isAddingTestimonial} onOpenChange={setIsAddingTestimonial}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Tambah Testimoni
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Tambah Testimoni Baru</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Kutipan</Label>
                      <Textarea
                        value={testimonialForm.data.quote}
                        onChange={(e) => testimonialForm.setData('quote', e.target.value)}
                        rows={4}
                        placeholder="Masukkan kutipan testimoni..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Nama</Label>
                        <Input
                          value={testimonialForm.data.name}
                          onChange={(e) => testimonialForm.setData('name', e.target.value)}
                          placeholder="Nama lengkap"
                        />
                      </div>
                      <div>
                        <Label>Jabatan/Posisi</Label>
                        <Input
                          value={testimonialForm.data.title}
                          onChange={(e) => testimonialForm.setData('title', e.target.value)}
                          placeholder="Kepala Sekolah, Guru, dll"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Foto Avatar</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => testimonialForm.setData('avatar', e.target.files?.[0] || null)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={testimonialForm.data.is_active}
                        onCheckedChange={(checked) => testimonialForm.setData('is_active', checked)}
                      />
                      <Label>Aktif</Label>
                    </div>
                    <Button onClick={handleAddTestimonial} className="w-full" disabled={testimonialForm.processing}>
                      Simpan Testimoni
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial: Testimonial) => (
                <Card key={testimonial.id} className="p-6">
                  <Dialog open={editingTestimonial?.id === testimonial.id} onOpenChange={(open) => !open && setEditingTestimonial(null)}>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={testimonial.avatar_url}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{testimonial.name}</h3>
                            <p className="text-sm text-gray-500">{testimonial.title}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded ${testimonial.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {testimonial.is_active ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-3">"{testimonial.quote}"</p>
                      <div className="flex gap-2 pt-2">
                        <DialogTrigger asChild>
                          <Button onClick={() => handleEditTestimonial(testimonial)} variant="outline" size="sm" className="flex-1">
                            <Pencil className="h-4 w-4 mr-1" /> Edit
                          </Button>
                        </DialogTrigger>
                        <Button onClick={() => handleDeleteTestimonial(testimonial.id)} variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Testimoni</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Kutipan</Label>
                          <Textarea
                            value={testimonialForm.data.quote}
                            onChange={(e) => testimonialForm.setData('quote', e.target.value)}
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Nama</Label>
                            <Input
                              value={testimonialForm.data.name}
                              onChange={(e) => testimonialForm.setData('name', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Jabatan/Posisi</Label>
                            <Input
                              value={testimonialForm.data.title}
                              onChange={(e) => testimonialForm.setData('title', e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Foto Avatar (opsional - kosongkan jika tidak ingin mengubah)</Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => testimonialForm.setData('avatar', e.target.files?.[0] || null)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={testimonialForm.data.is_active}
                            onCheckedChange={(checked) => testimonialForm.setData('is_active', checked)}
                          />
                          <Label>Aktif</Label>
                        </div>
                        <Button onClick={handleUpdateTestimonial} className="w-full" disabled={testimonialForm.processing}>
                          Perbarui Testimoni
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
