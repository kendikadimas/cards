import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { UserListItem } from "./user-list-item"
import type { UserManagementData } from "@/types" // Import interface dari types/index.d.ts

interface UserManagementSectionProps {
  users: UserManagementData[]
}

export function UserManagementSection({ users }: UserManagementSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manajemen Pengguna</CardTitle>
        <Button variant="ghost" size="sm">
          Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((user) => (
              <UserListItem key={user.id} profileImage={user.profileImage} name={user.name} role={user.role} />
            ))
          ) : (
            <p className="text-muted-foreground text-sm text-center py-4">Tidak ada pengguna untuk ditampilkan.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
