import type {Metadata} from "next";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Ecommerce Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${inter.className} selection:bg-amber-100 selection:text-amber-950`}
        >
        <Header/>
        {children}
        <Toaster/>
        <Footer/>
        </body>
        </html>
    );
}
