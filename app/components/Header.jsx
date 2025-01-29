import Link from "next/link";
import NavBar from "./NavBar";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";


export default async function Header({}) {
    const {isAuthenticated} = getKindeServerSession();
    const isloggedIn = await isAuthenticated();

    return (
        <header className="bg-blue-900 text-white p-3 px-4 w-full">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
                <div>
                    <Link href='/' className='font-bold text-2xl uppercase'>Shop</Link>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <Link href="/cart" className='flex gap-2 items-center justify-center'>
                        <span className='text-xl'>🛒</span>
                        <span className='sm:block hidden'>Cart</span>
                    </Link>
                    {isloggedIn && (<LogoutLink>Logout</LogoutLink>)}
                </div>
            </div>
            <NavBar/>
        </header>
    )
}