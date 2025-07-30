import SuperAdminLayout from "@/layouts/admin-layout";
import { Head, usePage } from "@inertiajs/react";
import type { BannerReviewPageProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function ReviewBannerPage() {
    const { banner } = usePage<BannerReviewPageProps>().props;

    const getStatusVariant = (status: string) => {
        const lowerStatus = status.toLowerCase();
        if (lowerStatus === "aktif") return "bg-green-100 text-green-800";
        if (lowerStatus === "tidak aktif") return "bg-red-100 text-red-800";
        return "bg-gray-100 text-gray-800";
    };

    return (
        <SuperAdminLayout>
            <Head title={`Review Banner: ${banner.title}`} />
            <header className="flex h-16 items-center justify-between border-b bg-white px-6">
                <div>
                    <h1 className="text-xl font-semibold">Review Banner Promosi</h1>
                    <Breadcrumbs items={[
                        { label: "Dashboard", href: route('adashboard') },
                        { label: "Banner", href: route('banners.index') },
                        { label: "Review", href: route('banners.review', banner.id) },
                    ]} />
                    </div>
            </header>

            <main className="flex-1 p-6 overflow-y-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>{banner.title}</CardTitle>
                        <div className="flex items-center gap-4 pt-2">
                            <Badge className={getStatusVariant(banner.status)}>{banner.status}</Badge>
                            <span className="text-sm text-muted-foreground">
                                Durasi: {banner.duration} ({banner.startDate} - {banner.endDate})
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm font-medium">Preview Banner:</p>
                        <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden border">
                             <img src={banner.image_url} alt={banner.title} className="w-full h-full object-contain" />
                        </div>
                    </CardContent>
                </Card>
            </main>
        </SuperAdminLayout>
    );
}
