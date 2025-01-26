import Link from "next/link";
import NavBar from "./NavBar";
import SearchForm from "./SearchForm";
export default async function Header({}) {

    return (
        <header className="bg-blue-900 text-white p-3 px-4 w-full">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
                <Link href='/' className='font-bold text-2xl uppercase'>Shop</Link>
                <Link href="/cart" className='flex gap-2 items-center justify-center'>
                    <span className='text-xl'>🛒</span>
                    <span className='sm:block hidden'>Cart</span>
                </Link>
            </div>
            <NavBar />
        </header>
    )
}