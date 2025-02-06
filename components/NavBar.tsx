'use client';

import React from "react";
import SideBar from "./SideBar";
import {Button} from "@/components/ui/button";
import {ChevronRight} from "lucide-react";


export default function NavBar() {
    const [isOpen, setIsOpen] = React.useState(false);

    function toggleOpen() {
        setIsOpen(prev => !prev);
    }

    return (
        <nav className="mt-3 flex items-center justify-start gap-3 max-w-6xl mx-auto">
            <Button
                className='px-2 py-0 transition-all duration-100 text-sm'
                onClick={() => {
                    toggleOpen()
                }}>
                <ChevronRight/>
            </Button>
            <ul className="flex items-center justify-start gap-3 text-sm">
                <li>Today deal</li>
                <li>Customer Service</li>
                <li>Registry</li>
                <li>Gift cards</li>
            </ul>
            <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)}/>

        </nav>
    )
}