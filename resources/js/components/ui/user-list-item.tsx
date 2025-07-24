import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { ChevronRight } from "lucide-react"
// import { route } from "inertia"

interface UserListItemProps {
  id: string
  profileImage: string
  name: string
  role: string
}

export function UserListItem({ id, profileImage, name, role }: UserListItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={profileImage || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-sm font-medium">{name}</h4>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
      <Button asChild variant="ghost" size="icon" className="h-8 w-8">
        {/* <Link href={route("users.show", id)} title="Lihat Detail Pengguna">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Lihat Detail</span>
        </Link> */}
      </Button>
    </div>
  )
}
