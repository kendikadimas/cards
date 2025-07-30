// components/ui/member-analytics-chart.tsx
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, FileText } from 'lucide-react';

type ChartDataPoint = {
  name: string;
  value: number;
};

interface MemberAnalyticsChartProps {
  title: string;
  value: number;
  data: ChartDataPoint[];
  chartPlaceholderText: string;
}

export function MemberAnalyticsChart({ title, value, data, chartPlaceholderText }: MemberAnalyticsChartProps) {
  return (
    <Card className="border-0 shadow-2xl overflow-hidden">
      <CardHeader className=" text-black pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-black ">{title}</CardTitle>
              <p className="text-black text-sm">Perkembangan publikasi artikel Anda</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-black">{value}</div>
            <div className="flex items-center space-x-1 text-black">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm text-black">Total Artikel</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {data && data.length > 0 ? (
          <div className="space-y-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="#6B7280" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis 
                    stroke="#6B7280" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#6B7280' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#F9FAFB',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                    labelStyle={{ color: '#F9FAFB' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    fill="url(#colorGradient)"
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#1D4ED8', strokeWidth: 2, stroke: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {/* Chart insights */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Publikasi per periode</span>
              </div>
              {data.length > 1 && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>
                    {data[data.length - 1].value > data[data.length - 2].value ? 'Trending naik' : 'Perlu peningkatan'}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 space-y-4">
            <div className="p-4 bg-gray-100 rounded-full">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-gray-600">{chartPlaceholderText}</p>
              <p className="text-sm text-gray-500 mt-1">Mulai publikasikan artikel untuk melihat grafik</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}