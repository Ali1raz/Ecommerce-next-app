'use client'

import Link from "next/link";
import NavBar from "./NavBar";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar"
import {ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";


export default function Header({}) {
    const {getUser} = useKindeBrowserClient();

    const user = getUser();

    return (
        <header className="bg-slate-800 text-slate-200  p-3 px-4 w-full">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
                <div>
                    <Link href='/' className='font-bold text-2xl uppercase'>Shop</Link>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <Link href="/cart"
                          className='px-3  flex gap-2 items-center justify-center border-b-transparent border-b-2 hover:border-b-slate-800 dark:hover:border-b-slate-300'>
                        <span className='text-xl'><ShoppingCart/></span>
                        <span className='sm:block hidden'>Cart</span>
                    </Link>
                    {user ? (
                        <>
                            <Avatar>
                                <AvatarImage src={user?.picture || ''} alt='user'
                                             className='rounded-full '
                                             width={15} height={15}/>
                            </Avatar>
                        </>
                    ): (
                        <>
                            <Button variant='secondary' className='rounded-none' onClick={() => {redirect('api/auth/login')}}>Login/Sign Up</Button>
                        </>
                    )}
                </div>
            </div>
            <NavBar/>
        </header>
    )
}