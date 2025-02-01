'use client'

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

export default function SideBar({isOpen, onClose}) {
    return (
        <div
            className={`bg-gray-900 z-10 min-w-72 max-w-2xl transition-all duration-300 absolute top-0 h-screen p-4  ${isOpen ? 'left-0 shadow-md' : '-left-[150%]'}`}>
            <ul className='flex flex-col px-4 gap-4 text-sm mt-8 '>
                <li className="hover:underline">Smart Home</li>
                <li className="hover:underline">Arts & Crafts</li>
                <li className="hover:underline">Kitchen</li>
                <li>Toys</li>
                <li>Clothing</li>
                <li>
                    <Link href='/products/new'>Add New Product</Link>
                </li>
            </ul>
            <Button variant='destructive'
                    className='px-2 absolute right-0 translate-x-full  top-0 border-2 border-transparent hover:border-gray-100'
                    onClick={onClose}>
                <CloseIcon/>
            </Button>
        </div>
    )
}