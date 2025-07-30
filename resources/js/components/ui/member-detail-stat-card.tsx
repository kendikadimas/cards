import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type React from "react"
import { cn } from "@/lib/utils"

type ChartDataPoint = {
  name: string;
  value: number;
};

interface MemberDetailStatCardProps {
  icon: React.ElementType
  title: string
  value: string | number
  data: ChartDataPoint[]; // Data untuk grafik
  chartColorClass: string // Tailwind class for chart background gradient
  chartPlaceholderText: string;
}

export function MemberDetailStatCard({ icon: Icon, title, value, data, chartColorClass, chartPlaceholderText }: MemberDetailStatCardProps) {
  return (
    <Card className="border border-blue-200 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">{title}</CardTitle>
        <div className="flex items-center gap-2 mb-3">
          <Icon className="h-5 w-5 text-primary" />
          <div className="text-3xl font-bold text-gray-900">{value}</div>
        </div>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <div className={cn("h-24 rounded-md flex items-center justify-center text-gray-500", chartColorClass)}>
            {/* Placeholder for Chart */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            {chartPlaceholderText}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
