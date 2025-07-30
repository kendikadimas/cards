import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PasswordUpdateForm() {
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('password.update'), {
            onSuccess: () => reset(),
        });
    }

    return (
        <div className="p-6 border rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Perbarui Sandi</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Input id="current_password" type="password" placeholder="Masukan Sandi Sekarang" value={data.current_password} onChange={e => setData('current_password', e.target.value)} />
                     {errors.current_password && <p className="text-red-500 text-xs mt-1">{errors.current_password}</p>}
                </div>
                <div>
                    <Input id="password" type="password" placeholder="Masukan Sandi Baru" value={data.password} onChange={e => setData('password', e.target.value)} />
                     {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                    <Input id="password_confirmation" type="password" placeholder="Konfirmasi Sandi Baru" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                </div>
                <Button type="submit" disabled={processing} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white rounded-full">
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </form>
        </div>
    );
}