import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, ShieldCheck, Trash2, Eye, ThumbsUp, Calendar, Clock, CornerDownRight } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import EditorLayout from '@/layouts/editor-layout';

interface CommentRow {
  id: number;
  article_id: number;
  article_title?: string | null;
  article_slug?: string | null;
  article_published_at?: string | null;
  article_read_time?: number | null;
  article_stats: {
    read_count: number;
    likes_count: number;
    comments_count: number;
  };
  user_name: string;
  user_avatar?: string | null;
  content: string;
  status: string;
  is_inappropriate: boolean;
  created_at: string;
  created_time: string;
  time_ago: string;
  parent_id?: number | null;
  reply_to_user?: string | null;
  replies: CommentRow[];
}

interface PagePropsShape {
  comments: {
    data: CommentRow[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  articles: { id: number; title: string }[];
  filters: { article?: string; date_from?: string; date_to?: string };
  stats: { total: number; approved: number; pending: number; flagged: number };
  auth: { user: { role: string } };
}

export default function KelolaKomentar() {
  const { comments, articles, filters, stats, auth } = usePage<any>().props as PagePropsShape;
  const Layout = auth.user?.role === 'admin' ? AdminLayout : EditorLayout;

  const onFilterChange = (patch: Partial<PagePropsShape['filters']>) => {
    const params: Record<string, any> = { ...filters, ...patch };
    // bersihkan parameter kosong agar tidak mengirim "" ke URL
    if (!params.article) delete params.article;
    if (!params.date_from) delete params.date_from;
    if (!params.date_to) delete params.date_to;
    router.get(route('comments.manage'), params, { preserveState: true, replace: true });
  };

  const destroy = (id: number) => { 
    if (confirm('Hapus komentar ini?')) 
      router.delete(route('comments.destroy', id), { preserveScroll: true }); 
  };

  const CommentThread: React.FC<{ comment: CommentRow; depth?: number }> = ({ comment, depth = 0 }) => (
    <div className={depth > 0 ? 'ml-16 mt-3' : ''}>
      <Card className={`p-5 ${depth > 0 ? 'bg-teal-50/30 border-l-4 border-teal-400' : 'bg-white shadow-sm border'}`}>
        {/* Reply indicator */}
        {depth > 0 && comment.reply_to_user && (
          <div className="flex items-center gap-2 mb-3 text-sm text-teal-700 font-medium">
            <CornerDownRight className="h-4 w-4" />
            <span>Membalas {comment.reply_to_user}</span>
          </div>
        )}
        
        <div className="flex gap-4">
          <Avatar className="h-12 w-12 flex-shrink-0">
            {comment.user_avatar && <AvatarImage src={comment.user_avatar} />}
            <AvatarFallback className="bg-gradient-to-br from-teal-400 to-cyan-500 text-white font-semibold text-lg">
              {comment.user_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base">{comment.user_name}</h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-0.5">
                  <span>{comment.created_at}</span>
                  <span>•</span>
                  <span>{comment.created_time}</span>
                  <span>•</span>
                  <span>{comment.time_ago}</span>
                </div>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => destroy(comment.id)}
                className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Content */}
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{comment.content}</p>
          </div>
        </div>
      </Card>
      
      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3 mt-3">
          {comment.replies.map(r => <CommentThread key={r.id} comment={r} depth={depth + 1} />)}
        </div>
      )}
    </div>
  );

  return (
    <Layout pageTitle="Kelola Komentar" breadcrumbItems={[{ label: 'Dashboard', href: route(auth.user?.role === 'admin' ? 'adashboard' : 'edashboard') }, { label: 'Kelola Komentar' }]}>
      <Head title="Kelola Komentar" />
      <div className="h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Article Header - shown when filtering by article */}
          {comments.data.length > 0 && comments.data[0]?.article_title && (
            <div className="space-y-4">
              {/* Title and Meta */}
              <div>
                <h1 className="text-3xl font-bold text-primary mb-3">
                  {comments.data[0].article_title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>Dipublikasi : {comments.data[0].article_published_at}</span>
                  </div>
                  {comments.data[0].article_read_time && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{comments.data[0].article_read_time} Menit Dibaca</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Article Stats Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="p-6 bg-gradient-to-br from-cyan-50 to-teal-50 border-none shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                      <Eye className="h-8 w-8 text-white"/>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 mb-1">Total Dibaca</p>
                      <p className="text-4xl font-bold text-gray-900">
                        {comments.data[0].article_stats.read_count.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-none shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <ThumbsUp className="h-8 w-8 text-white"/>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 mb-1">Artikel Disuka</p>
                      <p className="text-4xl font-bold text-gray-900">
                        {comments.data[0].article_stats.likes_count.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-none shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-8 w-8 text-white"/>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 mb-1">Artikel Komentar</p>
                      <p className="text-4xl font-bold text-gray-900">
                        {comments.data[0].article_stats.comments_count.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Komentar Artikel</h2>
            <div className="space-y-4">
              {comments.data.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">Tidak ada komentar.</p>
                </Card>
              )}
              {comments.data.map(c => (
                <CommentThread key={c.id} comment={c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
