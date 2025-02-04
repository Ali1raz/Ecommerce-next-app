'use client'

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";

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
    return (
        <div
            className={`bg-gray-900 z-10 sm:min-w-48 w-full max-w-72 transition-all duration-300 absolute top-0 h-screen p-4 ${isOpen ? 'left-0 shadow-md' : '-left-[150%]'}`}>
            <div className='flex items-center justify-between '>
                <div className='uppercase font-bold underline'>SHOP</div>
                <Button variant='destructive'
                        className='px-2 border-2 border-transparent hover:border-gray-100'
                        onClick={onClose}>
                    <ChevronLeft/>
                </Button></div>
            <div className='space-y-1 flex flex-col mt-4'>
                {links.map((link) => (
                    <Link href={link.href} key={link.id}
                          className='hover:bg-slate-700 p-2 transition-all duration-75'>
                        {link.label}
                    </Link>
                ))}
            </div>

        </div>
    )
}