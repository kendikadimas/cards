"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { router } from "@inertiajs/react" // Assuming Inertia.js for submission

// Skema validasi menggunakan Zod
const formSchema = z.object({
namaAnda: z.string().min(1, { message: "Nama Anda harus diisi." }),
sebagai: z.string().min(1, { message: "Pilih peran Anda." }),
namaLembaga: z.string().min(1, { message: "Nama Lembaga harus diisi." }),
jenisLembaga: z.string().min(1, { message: "Pilih jenis lembaga." }),
estimasiJumlahSiswa: z.string().optional(), // Bisa string karena input type number
nomorHp: z.string().min(10, { message: "Nomor HP/WhatsApp tidak valid." }),
kabupatenKota: z.string().min(1, { message: "Kabupaten/Kota harus diisi." }),
provinsi: z.string().min(1, { message: "Provinsi harus diisi." }),
kebutuhanFitur: z.array(z.string()).optional(),
mendengarCazhDari: z.string().min(1, { message: "Pilih bagaimana Anda mendengar tentang CAZH." }),
})

// Data untuk dropdown dan checkbox/radio
const sebagaiOptions = ["Sekolah", "Pondok Pesantren", "Yayasan", "Lainnya"]
const jenisLembagaOptions = ["TK", "SD", "SMP", "SMA", "Perguruan Tinggi", "Pesantren", "Lainnya"]
const kebutuhanFiturOptions = [
{ id: "ppdb-online", label: "PPDB Online" },
{ id: "akademik-jadwal", label: "Akademik, Jadwal Pelajaran" },
{ id: "keuangan-pinjaman", label: "Keuangan, Pinjaman" },
{ id: "pembagian-kamar", label: "Pembagian Kamar" },
{ id: "lain", label: "Lain" },
{ id: "tagihan-pembayaran", label: "Tagihan & Pembayaran Online" },
{ id: "presensi-harian", label: "Presensi Harian, Mapel, Kegiatan" },
{ id: "kasir-kantin", label: "Kasir Kantin/Toko" },
{ id: "data-siswa-guru", label: "Data Siswa & Guru/Staf, Alumni" },
]
const mendengarCazhDariOptions = [
{ id: "sales-cazh", label: "Sales CAZH" },
{ id: "mesin-pencari", label: "Mesin Pencari" },
{ id: "sosial-media", label: "Sosial Media" },
{ id: "youtube", label: "YouTube" },
{ id: "iklan", label: "Iklan" },
{ id: "referral", label: "Referral" },
]

export function DemoForm() {
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    namaAnda: "",
    sebagai: "",
    namaLembaga: "",
    jenisLembaga: "",
    estimasiJumlahSiswa: "",
    nomorHp: "",
    kabupatenKota: "",
    provinsi: "",
    kebutuhanFitur: [],
    mendengarCazhDari: "",
    },
})

function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Demo booking form submitted:", values)
    // In a real application, you would send this data to your backend
    // For Inertia.js, it might look like this:
    router.post(route("demo-bookings.store"), values, {
    onSuccess: () => {
        alert("Formulir demo Anda telah terkirim! Kami akan segera menghubungi Anda.")
        form.reset()
    },
    onError: (errors) => {
        console.error("Error submitting form:", errors)
        alert("Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.")
    },
    })
}

return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-200">
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <FormField
            name="namaAnda"
            control={form.control}
            render={({ field }) => (
            <FormItem>
                <FormLabel>Nama Anda *</FormLabel>
                <FormControl>
                <Input {...field} placeholder="Type here" />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            name="sebagai"
            control={form.control}
            render={({ field }) => (
            <FormItem>
                <FormLabel>Sebagai *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                    <SelectValue placeholder="Silakan Pilih" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {sebagaiOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            name="namaLembaga"
            control={form.control}
            render={({ field }) => (
            <FormItem>
                <FormLabel>Nama Lembaga *</FormLabel>
                <FormControl>
                <Input {...field} placeholder="Type here" />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            name="jenisLembaga"
            control={form.control}
            render={({ field }) => (
            <FormItem>
                <FormLabel>Jenis Lembaga *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                    <SelectValue placeholder="Please Select" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {jenisLembagaOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            name="estimasiJumlahSiswa"
            control={form.control}
            render={({ field }) => (
            <FormItem>
                <FormLabel>Estimasi Jumlah Siswa/Santri</FormLabel>
                <FormControl>
                <Input type="number" {...field} placeholder="Type here" />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            name="nomorHp"
            control={form.control}
            render={({ field }) => (
            <FormItem>
                <FormLabel>Nomor HP/WhatsApp Anda *</FormLabel>
                <FormControl>
                <Input type="tel" {...field} placeholder="Type here" />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            name="kabupatenKota"
            control={form.control}
            render={({ field }) => (
            <FormItem>
                <FormLabel>Kabupaten/Kota *</FormLabel>
                <FormControl>
                <Input {...field} placeholder="Type here" />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            name="provinsi"
            control={form.control}
            render={({ field }) => (
            <FormItem>
                <FormLabel>Provinsi *</FormLabel>
                <FormControl>
                <Input {...field} placeholder="Type here" />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
            name="kebutuhanFitur"
            control={form.control}
            render={() => (
            <FormItem className="md:col-span-2">
                <div className="mb-4">
                <FormLabel className="text-base">Kebutuhan Fitur *</FormLabel>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {kebutuhanFiturOptions.map((item) => (
                    <FormField
                    key={item.id}
                    control={form.control}
                    name="kebutuhanFitur"
                    render={({ field }) => {
                        return (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                            <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id))
                                }}
                            />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                        )
                    }}
                    />
                ))}
                </div>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
            name="mendengarCazhDari"
            control={form.control}
            render={({ field }) => (
            <FormItem className="md:col-span-2">
                <FormLabel className="text-base">Mendengar CAZH dari *</FormLabel>
                <FormControl>
                <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                >
                    {mendengarCazhDariOptions.map((item) => (
                    <FormItem key={item.id} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                        <RadioGroupItem value={item.id} />
                        </FormControl>
                        <FormLabel className="font-normal">{item.label}</FormLabel>
                    </FormItem>
                    ))}
                </RadioGroup>
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <div className="md:col-span-2 flex justify-end mt-4">
            <Button
            type="submit"
            className="bg-primary hover:bg-primary/80 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
            Kirim Permintaan Demo
            </Button>
        </div>
        </form>
    </Form>
    </div>
)
}
