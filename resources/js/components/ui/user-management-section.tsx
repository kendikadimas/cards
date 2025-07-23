import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserListItem } from "./user-list-item"
import { Plus } from "lucide-react"
import type { UserManagementData } from "@/types" // Import interface dari types/index.d.ts

interface UserManagementSectionProps {
  users: UserManagementData[]
}

export function UserManagementSection({ users }: UserManagementSectionProps) {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manajemen Pengguna</CardTitle>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" /> Tambahkan user
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {users.map((user) => (
          <UserListItem key={user.id} {...user} />
        ))}
      </CardContent>
    </Card>
  )
}
