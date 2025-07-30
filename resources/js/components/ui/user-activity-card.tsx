"use client"

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Activity } from "@/types";
import { FileText, User, MessageSquare } from "lucide-react"; // Contoh ikon

// Komponen helper untuk memilih ikon berdasarkan tipe aktivitas
const ActivityIcon: React.FC<{ type: string }> = ({ type }) => {
    switch (type) {
        case 'article_created':
            return <FileText className="h-5 w-5 text-blue-500" />;
        case 'profile_updated':
            return <User className="h-5 w-5 text-green-500" />;
        case 'comment_posted':
            return <MessageSquare className="h-5 w-5 text-purple-500" />;
        default:
            return <div className="h-5 w-5 bg-gray-300 rounded-full" />; // Ikon default
    }
};

interface UserActivityCardProps {
    activities: Activity[];
}

export function UserActivityCard({ activities }: UserActivityCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {activities && activities.length > 0 ? (
                    activities.map(activity => (
                        <div key={activity.id} className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                                <ActivityIcon type={activity.type} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                                <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                        Belum ada aktivitas terbaru.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
