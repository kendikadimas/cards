import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "lucide-react"

export function ArticleStatsChart() {
  // Data dummy untuk chart, bisa diganti dengan data dinamis dari props nanti
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
    datasets: [
      {
        label: "Artikel Dipublikasi",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Artikel Pending",
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-muted-foreground" />
          Statistik Artikel Bulanan
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder for a chart. You would integrate a charting library here (e.g., Recharts, Chart.js) */}
        <div className="flex items-center justify-center h-64 bg-muted rounded-md text-muted-foreground">
          Grafik Statistik Artikel (Integrasi Chart Library)
        </div>
      </CardContent>
    </Card>
  )
}
