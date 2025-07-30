import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';

export function ContactInfo() {
    return (
        <div className="space-y-6 w-3/4 mr-20">
            <h3 className="text-3xl font-bold text-primary">PT Cazh Teknologi Inovasi</h3>
            <p className="text-muted-foreground">
                Kami siap membantu Anda. Hubungi kami melalui detail di bawah ini atau isi formulir di samping.
            </p>
            
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <span className="text-muted-foreground">Ruko Graha Timur, Jl. Martadireja 1 No.Blok B2, Kepetek, Mersi, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53111</span>
                </div>
                <div className='flex justify-between'>
                    <div className="flex items-center gap-4">
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">+62 811-255-170</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">admin@cazh.co.id</span>
                    </div>
                </div>
            </div>

            <Separator />

            <div>
                <h4 className="text-lg font-semibold">Social Media</h4>
                <div className="flex items-center gap-4 mt-4">
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-6 w-6"/></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-6 w-6"/></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-6 w-6"/></Link>
                </div>
            </div>
        </div>
    );
}