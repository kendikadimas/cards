import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types";

interface ProfileDetailCardProps {
    user: User;
}

export function ProfileDetailCard({ user }: ProfileDetailCardProps) {
    return (
        <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={user.profile_image} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
            </div>
        </div>
    );
}
