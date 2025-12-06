import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  FileText, 
  Users, 
  CalendarCheck,
  FileX
} from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MonthlyData {
  month: string;
  count: number;
  [key: string]: any;
}

interface CategoryData {
  name: string;
  value: number;
  [key: string]: any;
}

interface StatsData {
  totalArticles: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalRejected: number;
  totalUsers: number;
  totalDemoRequests: number;
}

interface PageProps {
  stats: StatsData;
  monthlyStats: MonthlyData[];
  categoryStats: CategoryData[];
  [key: string]: any;
}

const COLORS = ['#8884d8', '#ff6b6b', '#4ecdc4', '#ffd93d', '#95e1d3', '#f38181'];

export default function Statistics() {
  const { stats, monthlyStats, categoryStats } = usePage<PageProps>().props;
  const [selectedMetric, setSelectedMetric] = React.useState('count');

  return (
    <AdminLayout 
      pageTitle="Statistik" 
      breadcrumbItems={[
        { label: 'Dashboard', href: '/adashboard' }, 
        { label: 'Statistik' }
      ]}
    >
      <Head title="Statistik" />
      
      <div className="h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {/* Total Artikel */}
          <Card className="p-4 bg-gradient-to-br from-cyan-50 to-teal-50 border-none shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-white"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">Total Artikel</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalArticles.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Artikel Dibaca */}
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-none shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Eye className="h-6 w-6 text-white"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">Artikel Dibaca</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalViews.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Artikel Disukai */}
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border-none shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                <ThumbsUp className="h-6 w-6 text-white"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">Artikel Disukai</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalLikes.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Artikel Komentar */}
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border-none shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-white"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">Artikel Komentar</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalComments.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Artikel Ditolak */}
          <Card className="p-4 bg-gradient-to-br from-red-50 to-pink-50 border-none shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <FileX className="h-6 w-6 text-white"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">Artikel Ditolak</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalRejected.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Total User */}
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-white"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">Total User</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary">Statistik Artikel</h2>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Statistik Bulanan Artikel</h3>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Pilih Metrik" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="count">Jumlah Disuka Perbulan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Bar dataKey="count" fill="#8884d8" radius={[8, 8, 0, 0]} name="Disukai" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori Artikel</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryStats}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry: any) => `${entry.payload.name} (${entry.payload.value})`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
