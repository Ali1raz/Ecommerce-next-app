import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {TUser} from "@/utils";
import {User2Icon} from "lucide-react";

export default function UserAvatar({user, size}: {user: TUser, size: number}) {
    return (
        <Avatar>
            <AvatarImage
                src={user?.picture}
                alt='user'
                className='rounded-full'
                width={size} height={size}
            ></AvatarImage>
            <AvatarFallback><User2Icon/></AvatarFallback>
        </Avatar>
    )
}