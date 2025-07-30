import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area, AreaChart } from 'recharts';
import type React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react";

type ChartDataPoint = {
  name: string;
  value: number;
};

interface MemberDetailStatCardProps {
  icon: React.ElementType
  title: string
  value: string | number
  data: ChartDataPoint[];
  chartColorClass: string
  chartPlaceholderText: string;
}

export function MemberDetailStatCard({ 
  icon: Icon, 
  title, 
  value, 
  data, 
  chartColorClass, 
  chartPlaceholderText 
}: MemberDetailStatCardProps) {
  
  // Calculate trend if we have data
  const getTrend = () => {
    if (!data || data.length < 2) return null;
    const current = data[data.length - 1].value;
    const previous = data[data.length - 2].value;
    return current > previous ? 'up' : current < previous ? 'down' : 'stable';
  };

  const trend = getTrend();

  return (
    <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
              {title}
            </CardTitle>
            {trend && data.length > 1 && (
              <div className={cn(
                "flex items-center space-x-1 text-xs",
                trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-gray-500'
              )}>
                {trend === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : trend === 'down' ? (
                  <TrendingDown className="h-3 w-3" />
                ) : null}
                <span>
                  {trend === 'up' ? 'Meningkat' : trend === 'down' ? 'Menurun' : 'Stabil'}
                </span>
              </div>
            )}
            {data.length === 1 && (
              <div className="flex items-center space-x-1 text-xs text-blue-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Data terbaru</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                {value}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {data && data.length > 0 ? (
          <div className={cn("rounded-2xl p-4 relative overflow-hidden", chartColorClass)}>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            
            <div className="h-24 relative z-10">
              {data.length === 1 ? (
                // Single data point visualization
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
                      <div className="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full animate-ping opacity-30"></div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-gray-700">{data[0].value}</p>
                      <p className="text-xs text-gray-500">{data[0].name}</p>
                    </div>
                  </div>
                </div>
              ) : (
                // Multiple data points - show chart
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 5,
                      left: 5,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={false}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#F9FAFB',
                        fontSize: '12px',
                        padding: '8px 12px'
                      }}
                      labelStyle={{ color: '#F9FAFB', fontSize: '11px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      fill={`url(#gradient-${title.replace(/\s+/g, '-')})`}
                      dot={false}
                      activeDot={{ r: 3, fill: '#1D4ED8', strokeWidth: 1, stroke: '#fff' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
            
            {/* Mini stats */}
            <div className="flex justify-between items-center mt-2 text-xs text-gray-600 relative z-10">
              {data.length === 1 ? (
                <div className="w-full text-center">
                  <span className="font-medium">Data periode: {data[0].name}</span>
                </div>
              ) : (
                <>
                  <span className="font-medium">
                    {data[0].name}
                  </span>
                  <span className="font-medium">
                    {data[data.length - 1].name}
                  </span>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className={cn("rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500 space-y-2", chartColorClass)}>
            <Icon className="h-8 w-8 text-gray-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">{chartPlaceholderText}</p>
              <p className="text-xs text-gray-500 mt-1">Belum ada data tersedia</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}