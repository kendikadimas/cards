import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/editor-layout'; // Asumsi layout untuk editor
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { File, Users, BarChart2, Clock, Plus, CheckCircle } from 'lucide-react';
import type { EditorDashboardPageProps, PendingArticle, Activity } from '@/types';

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
    return (
        <AdminLayout>
            <Head title="Dashboard Editor" />
            <main className="flex-1 p-6 space-y-6">
                {/* Kartu Statistik */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Total Artikel" value={stats.totalArtikel} icon={<File className="h-5 w-5 text-blue-600" />} iconBgClass="bg-blue-100" />
                    <StatCard title="Artikel Pending" value={stats.artikelPending} icon={<Clock className="h-5 w-5 text-orange-600" />} iconBgClass="bg-orange-100" />
                    <StatCard title="Artikel Bulan Ini" value={stats.artikelBulanIni} icon={<BarChart2 className="h-5 w-5 text-green-600" />} iconBgClass="bg-green-100" />
                    <StatCard title="Total Member" value={stats.totalMember} icon={<Users className="h-5 w-5 text-purple-600" />} iconBgClass="bg-purple-100" />
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
                        <CardContent className="space-y-6">
                             {recentActivities.length > 0 ? (
                                recentActivities.map((activity) => <ActivityItem key={activity.id} activity={activity} />)
                            ) : (
                                <p className="text-center text-muted-foreground p-8">Tidak ada aktivitas terbaru.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </AdminLayout>
    );
}
