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
        <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-4">Perbarui Sandi</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="current_password">Sandi Saat Ini</Label>
                    <Input id="current_password" type="password" value={data.current_password} onChange={e => setData('current_password', e.target.value)} />
                     {errors.current_password && <p className="text-red-500 text-xs mt-1">{errors.current_password}</p>}
                </div>
                <div>
                    <Label htmlFor="password">Sandi Baru</Label>
                    <Input id="password" type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
                     {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                    <Label htmlFor="password_confirmation">Konfirmasi Sandi Baru</Label>
                    <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                </div>
                <Button type="submit" disabled={processing}>{processing ? 'Menyimpan...' : 'Simpan'}</Button>
            </form>
        </div>
    );
}
