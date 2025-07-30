import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

export function DeleteAccountSection() {
    const { data, setData, delete: destroy, processing, errors } = useForm({
        password: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if(confirm('Apakah Anda yakin ingin menghapus akun Anda secara permanen? Aksi ini tidak dapat dibatalkan.')) {
            destroy(route('profile.destroy'));
        }
    }

    return (
        <div className="p-6 border rounded-lg bg-red-50 border-red-200">
             <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                    <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-red-800 mb-2">Hapus Akun</h3>
                    <p className="text-sm text-red-700 mb-4">Setelah akun Anda dihapus, semua datanya akan hilang permanen. Harap unduh data apa pun yang ingin Anda simpan.</p>
                </div>
             </div>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                 <div>
                    <Input id="delete_password" type="password" placeholder="Masukan Sandi Anda" value={data.password} onChange={e => setData('password', e.target.value)} />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <Button variant="destructive" type="submit" disabled={processing} className="w-full rounded-full">
                    {processing ? 'Menghapus...' : 'Ya, Hapus'}
                </Button>
            </form>
        </div>
    );
}