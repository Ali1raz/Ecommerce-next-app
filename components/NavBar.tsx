'use client';

import React from "react";
import SideBar from "./SideBar";
import {Button} from "@/components/ui/button";
import {ChevronRight} from "lucide-react";

export default function NavBar() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <nav className="mt-3 flex items-center justify-start gap-3">
            <Button
                className='px-2 py-0 transition-all duration-100 text-sm'
                onClick={() => setIsOpen(true)}>
                <ChevronRight/>
            </Button>
            <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)}/>

        </nav>
    )
}