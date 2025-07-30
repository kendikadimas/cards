import { Card, CardContent } from "@/components/ui/card"

interface MemberPromoCardProps {
  gambar_url: string
  judul: string
}

export function MemberPromoCard({ gambar_url, judul}: MemberPromoCardProps) {
  return (
    <Card className="overflow-hidden rounded-lg shadow-md border border-blue-200">
      <CardContent className="p-0">
        <div className="relative w-full aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1] overflow-hidden rounded-t-lg">
          <img
            src={gambar_url}
            alt={judul}
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{judul}</h3>
          {/* <p className="text-sm text-muted-foreground mt-1">{description}</p> */}
        </div>
      </CardContent>
    </Card>
  )
}
