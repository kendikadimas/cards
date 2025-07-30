"use client"

import { Head, usePage } from "@inertiajs/react";
import type { User, PageProps, ArticleListItem, Activity } from "@/types";

// 1. Impor semua layout yang mungkin digunakan
import MemberLayout from "@/layouts/member-layout";
import AdminLayout from "@/layouts/admin-layout";
import EditorLayout from "@/layouts/editor-layout";

// Import komponen-komponen konten profil
import { ProfileUpdateForm } from "@/components/ui/profile-update-form";
import { PasswordUpdateForm } from "@/components/ui/password-update-form";
import { DeleteAccountSection } from "@/components/ui/delete-account-section";
import { UserArticlesCard } from "@/components/ui/user-articles-card";
import { UserActivityCard } from "@/components/ui/user-activity-card";

interface ProfilePageProps extends PageProps {
    user_articles: ArticleListItem[];
    recent_activities: Activity[];
}



export default function ProfilePage() {
    const { auth, user_articles, recent_activities } = usePage<ProfilePageProps>().props;
    const user = auth.user as User;
    
    // Tentukan komponen layout berdasarkan peran pengguna
    const getLayout = () => {
        switch (user.role) {
            case 'admin':
                case 'Super Admin':
                    return AdminLayout;
                    case 'editor':
                return EditorLayout;
            case 'member':
            default:
                return MemberLayout;
            }
        };
        
        const Layout = getLayout();
        
        const pageTitle = "Profile Anda"; 
          const breadcrumbItems = [
            { label: "Dashboard", href: route('adashboard') },
            { label: "Profile", href: route('profile.show') },
        ];
        return (
            <Layout pageTitle={pageTitle} breadcrumbItems={breadcrumbItems}>
            <Head title="Profile Anda" />
            <div className="container mx-auto py-10 overflow-y-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Profile Anda</h1>
                
                <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
                    <ProfileUpdateForm user={user} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                        <div className="space-y-8">
                            {/* FIX: Tambahkan kondisi untuk hanya menampilkan kartu artikel untuk 'member' */}
                            {user.role === 'member' && (
                                <UserArticlesCard articles={user_articles} />
                            )}
                            <PasswordUpdateForm />
                        </div>
                        <div className="space-y-8">
                            <UserActivityCard activities={recent_activities} />
                            <DeleteAccountSection />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

