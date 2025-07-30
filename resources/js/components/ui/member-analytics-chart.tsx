// components/ui/member-analytics-chart.tsx (Contoh menggunakan Recharts)
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Asumsi Anda menggunakan Shadcn UI Card

type ChartDataPoint = {
  name: string;
  value: number;
};

interface MemberAnalyticsChartProps {
  title: string;
  value: number; // Ini mungkin masih berguna untuk menampilkan total di header kartu
  data: ChartDataPoint[]; // Data untuk grafik
  chartPlaceholderText: string;
}

export function MemberAnalyticsChart({ title, value, data, chartPlaceholderText }: MemberAnalyticsChartProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-2xl font-bold">{value}</div> {/* Menampilkan total */}
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <div className="h-[200px]"> {/* Tinggi grafik */}
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
                <Legend />
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
  );
}