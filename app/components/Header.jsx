import Link from "next/link";
import NavBar from "@/app/components/NavBar";

export default function Header() {


    return (
        <header className="bg-blue-950 text-white p-3 px-4 w-full">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
                <Link href='/' className='font-bold text-2xl uppercase'>Shop</Link>
                <div className="w-full max-w-2xl border mx-8">
                    <form action="" className="flex flex-row items-center justify-center">
                        <input type="text" className="px-3 py-1 w-full  text-gray-900" placeholder="Search..." />
                        <button className='px-3 py-1'>🔎</button>
                    </form>
                </div>
                <Link href="/cart">cart</Link>
            </div>
            <NavBar />
        </header>
    )
}