"use client"

import { useState } from "react"
import { Head, router, usePage } from "@inertiajs/react"
import AdminLayout from "@/layouts/admin-layout"
import EditorLayout from "@/layouts/editor-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import type { ReviewArticlePageProps, SharedData } from "@/types"
import { Textarea } from "@/components/ui/textarea"
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

// Komponen untuk menampilkan isi artikel
function ArticleDisplay({ article }: { article: ReviewArticlePageProps["article"] }) {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <header className="mb-6">
        <Badge variant="outline">{article.category_name || "Uncategorized"}</Badge>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{article.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Oleh {article.author} pada {article.date}
        </p>
      </header>
      <div className="my-6 aspect-video bg-muted rounded-lg overflow-hidden">
        <img
          src={article.image_url || `/placeholder.svg`}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.body_html }} />
    </div>
  )
}

// Komponen untuk panel review di sisi kanan
function ReviewPanel({ article }: { article: ReviewArticlePageProps["article"] }) {
  const [feedback, setFeedback] = useState('');

  const handlePublish = () => {
    if (confirm("Anda yakin ingin mempublikasikan artikel ini?")) {
      router.post(route("articles.publish", article.id))
    }
  }

  const handleReject = () => {
    if (!feedback.trim()) {
        alert('Harap isi feedback penolakan.');
        return;
    }
    if (confirm("Anda yakin ingin menolak artikel ini?")) {
      router.post(route("articles.reject", article.id), { reasons: [feedback] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Aksi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Penulis</p>
          <p className="text-sm text-muted-foreground">{article.author}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Status Saat Ini</p>
          <Badge>{article.status}</Badge>
        </div>
        <Separator />
        {/* FIX: Form feedback sekarang lebih jelas */}
        <div>
            <Label htmlFor="feedback">Feedback Penolakan (wajib diisi jika ditolak)</Label>
            <Textarea 
                id="feedback"
                placeholder="Contoh: Informasi kurang akurat, gambar tidak relevan..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="mt-2"
            />
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
            <Check className="mr-2 h-4 w-4" /> Accept & Publish
          </Button>
          <Button variant="destructive" onClick={handleReject}>
            <X className="mr-2 h-4 w-4" /> Reject
          </Button>
          <Button variant="secondary" onClick={() => router.get(route('comments.manage', { article: article.id }))}>
            Lihat Like dan Komen
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ReviewArtikel() {
  const { article, auth } = usePage<any>().props as ReviewArticlePageProps & SharedData
  const Layout = auth.user?.role === 'admin' ? AdminLayout : EditorLayout;
  const pageTitle = "Review Artikel: " + article.title;
  const breadcrumbItems = [
    { label: "Dashboard", href: route(auth.user?.role === 'admin' ? 'adashboard' : 'edashboard') },
    { label: "Artikel", href: route('articles.manage') },
    { label: "Review" }
  ];

  return (
    <Layout pageTitle={pageTitle} breadcrumbItems={breadcrumbItems}>
      <Head title={`Review: ${article.title}`} />
    
      {/* FIX: Area <main> sekarang bisa di-scroll */}
      <div className="px-8 mt-5">

      </div>
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <ArticleDisplay article={article} />
          </div>
          <div className="lg:sticky lg:top-6">
            <ReviewPanel article={article} />
          </div>
        </div>
      </main>
    </Layout>
  )
}