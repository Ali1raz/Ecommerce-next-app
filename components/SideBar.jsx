'use client'

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

const links = [
    {
        id: 1,
        label: "Home",
        href: "/",
    },
    {
        id: 2,
        label: "About",
        href: "/about-us",
    },
    {
        id: 3,
        label: "Cart",
        href: "/cart",
    },
    {
        id: 4,
        label: "Add New Products",
        href: "/products/new",
    },

]

export default function SideBar({isOpen, onClose}) {
    const {user} = useKindeBrowserClient()
    return (
        <div
            className={`bg-gray-900 z-10 sm:min-w-56 w-full max-w-72 transition-all duration-300 absolute top-0 h-screen p-4 ${isOpen ? 'left-0 shadow-md' : '-left-[150%]'}`}>
            <div className='flex items-center justify-between '>
                {user ? (
                    <div className='flex items-center gap-4 flex-1'>
                        <Avatar>
                            <AvatarImage src={user?.picture || ''} alt='user'
                                         className='rounded-full '
                                         width={15} height={15}/>
                        </Avatar>
                        <span className='text-sm'>{user.given_name}</span>
                    </div>
                ): (
                    <>
                        <span className='uppercase font-bold underline'>shop</span>
                    </>
                )}
                <Button variant='destructive'
                        className='px-2 '
                        onClick={onClose}>
                    <ChevronLeft/>
                </Button>
            </div>
            <div className='flex flex-col mt-8 gap-6'>
                <div className='flex flex-col gap-2'>
                    {links.map((link) => (
                        <Link href={link.href} key={link.id}
                              className='hover:bg-slate-700 text-sm p-2 transition-all duration-75'>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {user && <Button asChild variant='destructive' className='rounded-none '><LogoutLink>Logout</LogoutLink></Button>}
            </div>
        </div>
    )
}