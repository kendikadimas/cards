import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

// Registrasi komponen Chart.js yang dibutuhkan
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
// Definisikan tipe untuk satu item data chart
interface ChartDataItem {
  month: string;
  count: number;
}

// Definisikan tipe untuk props komponen
interface ArticleStatsChartProps {
    chartData?: ChartDataItem[]; // Prop dibuat opsional untuk keamanan
}

export function ArticleStatsChart({ chartData = [] }: ArticleStatsChartProps) {
  // Olah data dari props menjadi format yang dimengerti oleh Chart.js
  const data = {
    labels: chartData.map(d => d.month), // Sumbu X: Bulan
    datasets: [
      {
        label: "Artikel Dibuat",
        data: chartData.map(d => d.count), // Sumbu Y: Jumlah Artikel
        fill: true, // Mengisi area di bawah garis
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3, // Membuat garis sedikit melengkung
      },
    ],
  };

  // Opsi untuk kustomisasi tampilan chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          Statistik Artikel (6 Bulan Terakhir)
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] sm:h-[300px]">
        {/* Render chart jika ada data, jika tidak, tampilkan pesan */}
        {chartData && chartData.length > 0 ? (
            <Line options={options} data={data} />
        ) : (
            <div className="flex items-center justify-center h-full bg-muted rounded-md text-muted-foreground">
                Tidak ada data statistik untuk ditampilkan.
            </div>
        )}
      </CardContent>
    </Card>
  )
}
