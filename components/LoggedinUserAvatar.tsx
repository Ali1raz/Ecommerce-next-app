"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import type {TKindeUser} from "@/utils"
import { LogOut, Settings, UserIcon } from "lucide-react"
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

export default function LoggedinUserAvatar({ user, size }: { user: TKindeUser; size: number }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.picture} alt="user" className="rounded-full" width={size} height={size} />
                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60" align='end' forceMount>
                <div className="">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.picture} alt="user" className="rounded-full" />
                            <AvatarFallback>
                                <UserIcon />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-0.5">
                            <p className="text-sm font-medium leading-none">{`${user?.given_name} ${user?.family_name}`}</p>
                            <p className="text-xs text-muted-foreground truncate leading-tight">{user?.email || ""}</p>
                        </div>
                    </div>
                    <div className="border-t border-border my-2"></div>
                    <Button asChild variant="ghost" size='sm' className="w-full justify-start gap-2 px-2">
                        <Link href={`/user/${user?.id}`}>
                            <UserIcon className="h-4 w-4" />
                            <span>View Profile</span>
                        </Link>
                    </Button>
                    <div className="border-t border-border my-1 w-full"></div>
                    <Button size='sm' asChild
                        variant="ghost"
                        className="w-full justify-start gap-2 px-2 text-red-500 hover:text-red-500 hover:bg-red-50"
                    >
                        <LogoutLink><LogOut/> Logout</LogoutLink>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

