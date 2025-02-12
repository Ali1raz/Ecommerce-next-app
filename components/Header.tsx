import Link from "next/link";
import NavBar from "./NavBar";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {ShoppingCart, UserIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Header() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    return (
        <header className="bg-slate-800 text-slate-200 p-3 px-4 w-full">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
                <div>
                    <Link href='/' className='font-bold text-2xl uppercase'>Shop</Link>
                </div>
                <div className='flex items-center gap-4'>
                    <Button variant='secondary' disabled={!user}>
                        <Link href="/cart"
                              className='px-1 flex gap-2 items-center justify-center'>
                            <span className='text-xl'><ShoppingCart/></span>
                            <span className='sm:block hidden'>Cart</span>
                        </Link>
                    </Button>
                    {user ? (
                        <div className='flex items-center gap-2'>
                            <span className=''>{user.given_name}</span>
                            <Avatar>
                                <AvatarImage
                                    src={user?.picture || ''} alt='user'
                                    className='rounded-full'
                                    width={15} height={15}/>
                                <AvatarFallback><UserIcon color='black' size={20}/></AvatarFallback>
                            </Avatar>
                        </div>
                    ): (
                        <Button variant='secondary' asChild className='bg-amber-500 hover:bg-amber-600 text-white'><LoginLink>Login/Sign Up</LoginLink></Button>
                    )}
                </div>
            </div>
            <NavBar/>
        </header>
    )
}