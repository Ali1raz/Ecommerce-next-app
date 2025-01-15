'use client';

import React from "react";
import SideBar from "@/app/components/SideBar";

export default function NavBar(props) {
    const [isOpen, setIsOpen] = React.useState(false);

    function toggleOpen() {
        setIsOpen(prev => !prev);
    }

    return (
        <nav className="mt-3 flex items-center justify-start gap-3">
            <button
                className='border-transparent border-2 hover:border-gray-50 hover:border-2 transition-all duration-100'
                onClick={() => {toggleOpen()}}>
            📃</button>
            <ul className="flex items-center justify-start gap-3 text-sm">
                <li>Today deal</li>
                <li>Customer Service</li>
                <li>Registry</li>
                <li>Gift cards</li>
                <li>{isOpen && 'open'}</li>
            </ul>
            <SideBar isOpen={isOpen} onClose={toggleOpen}/>
        </nav>
    )
}