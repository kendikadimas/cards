import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/editor-layout'; // Asumsi layout untuk editor
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { File, Users, BarChart2, Clock, Plus, CheckCircle } from 'lucide-react';
import type { EditorDashboardPageProps, PendingArticle, Activity } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

// Komponen untuk satu item aktivitas
const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
    const iconMap = {
        submitted: <Plus />,
        approved: <CheckCircle />,
    };
    const bgColorMap = {
        submitted: 'bg-blue-500',
        approved: 'bg-green-500',
    };

    return (
        <div className="flex items-center gap-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bgColorMap[activity.type] || 'bg-gray-500'} text-white`}>
                {iconMap[activity.type] || <File />}
            </div>
            <div>
                <p className="font-medium" dangerouslySetInnerHTML={{ __html: activity.text }} />
                <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
        </div>
    );
};

// Komponen untuk satu item artikel pending
const PendingArticleItem: React.FC<{ article: PendingArticle }> = ({ article }) => (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0">
        <div>
            <p className="font-semibold text-gray-800">{article.title}</p>
            <p className="text-sm text-muted-foreground">Oleh: {article.author} - {article.time}</p>
        </div>
        <Link href={route('articles.review', article.id)} className="text-sm text-blue-600 hover:underline">
            Review
        </Link>
    </div>
);




export default function DashboardEditor({ stats, pendingArticles, recentActivities }: EditorDashboardPageProps) {
    
    const getProgressText = (progress: number) => {
        if (progress > 0) {
            return `+${progress}% dari bulan lalu`;
        }
        if (progress < 0) {
            // Tanda minus sudah otomatis ada di angka progress
            return `${progress}% dari bulan lalu`;
        }
        return 'Tidak ada perubahan';
    };
    
    return (
        <AdminLayout>
            <Head title="Dashboard Editor" />
            <main className="flex-1 p-6 space-y-6">
                {/* Kartu Statistik */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard 
                        title="Total Artikel" 
                        value={stats.totalArtikel} 
                        description={getProgressText(stats.articleProgress)}
                        icon={<File className="h-6 w-6 text-white" />} 
                        bgColor="bg-[#00718F]"
                    />
                    <StatCard 
                        title="Artikel Pending" 
                        value={stats.artikelPending} 
                        description={`+${stats.newPending} artikel baru minggu ini`}
                        icon={<Clock className="h-6 w-6 text-white" />} 
                        bgColor="bg-[#27AE60]"
                    />
                    <StatCard 
                        title="Artikel Bulan Ini" 
                        value={stats.artikelBulanIni} 
                        description="Target 20 artikel"
                        icon={<BarChart2 className="h-6 w-6 text-white" />} 
                        bgColor="bg-[#F39C12]"
                    />
                    <StatCard 
                        title="Total Member" 
                        value={stats.totalMember} 
                        description={getProgressText(stats.memberProgress)}
                        icon={<Users className="h-6 w-6 text-white" />} 
                        bgColor="bg-[#8E44AD]"
                    />
                </div>

                {/* Artikel Pending & Aktivitas Terbaru */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><CardTitle>Artikel Pending</CardTitle></CardHeader>
                        <CardContent className="p-0">
                            {pendingArticles.length > 0 ? (
                                pendingArticles.map((article) => <PendingArticleItem key={article.id} article={article} />)
                            ) : (
                                <p className="text-center text-muted-foreground p-8">Tidak ada artikel yang perlu direview.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Aktivitas Terbaru</CardTitle></CardHeader>
                        <CardContent>
                            {/* 2. Bungkus daftar aktivitas dengan ScrollArea dan beri tinggi tetap */}
                            <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-6">
                                    {recentActivities.length > 0 ? (
                                        recentActivities.map((activity) => <ActivityItem key={activity.id} activity={activity} />)
                                    ) : (
                                        <p className="text-center text-muted-foreground pt-8">Tidak ada aktivitas terbaru.</p>
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </AdminLayout>
    );
}
