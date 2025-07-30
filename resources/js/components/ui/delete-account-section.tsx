import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <div className="p-4 border rounded-lg bg-red-50 border-red-200">
             <h3 className="font-semibold text-red-700 mb-2">Hapus Akun</h3>
             <p className="text-sm text-red-600 mb-4">Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. Sebelum menghapus akun Anda, harap unduh data atau informasi apa pun yang ingin Anda simpan.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <Label htmlFor="delete_password">Masukkan Sandi untuk Konfirmasi</Label>
                    <Input id="delete_password" type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <Button variant="destructive" type="submit" disabled={processing}>{processing ? 'Menghapus...' : 'Hapus Akun'}</Button>
            </form>
        </div>
    );
}
