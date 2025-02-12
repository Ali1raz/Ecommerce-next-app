"use client"


import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { Menu} from "lucide-react";
import {routes} from "@/utils";

export default function NavBar() {
    const {user, isAuthenticated } = useKindeBrowserClient()

    return (
        <div className='max-w-5xl mt-2 mx-auto'>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button className='h-fit px-4 py-1' variant="secondary" size='sm'><Menu/></Button>
                </DrawerTrigger>
                <DrawerContent className='max-w-sm mx-auto px-8'>
                    <div className="mx-auto w-full ">
                        <DrawerHeader>
                            <DrawerTitle>
                                {user ? (
                                    <div className='flex items-center gap-4 flex-1'>
                                        <Avatar>
                                            <AvatarImage src={user?.picture || ''} alt='user'
                                                         className='rounded-full '
                                                         width={15} height={15}/>
                                        </Avatar>
                                        <span className='text-sm'>{user.given_name}</span>
                                    </div>
                                ) : (<span>Hey Guest</span>)}
                            </DrawerTitle>
                        </DrawerHeader>
                        <div className='flex flex-col gap-2 px-5'>
                            {routes.filter(link => link.public || isAuthenticated)
                                .map((link) => (
                                    <Link href={link.href} key={link.id} className='bg-slate-200 text-sm p-2 transition-all duration-75'>
                                        {link.label}
                                    </Link>
                                ))}
                        </div>
                        <DrawerFooter>
                            {isAuthenticated ? (
                                <Button asChild variant='destructive'
                                        className='rounded-none'><LogoutLink>Logout</LogoutLink></Button>
                            ) : (
                                <Button asChild variant='secondary' className='rounded-none'><LoginLink>Login/Sign
                                    Up</LoginLink></Button>
                            )}
                            <DrawerClose asChild>
                                <Button className='rounded-none' variant="outline">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}
