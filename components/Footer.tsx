import Link from "next/link";
import {getToCategories} from "@/app/actions/actions";
import {TCategory} from "@/utils";

export default async function Footer() {
    const categories:TCategory[] = await getToCategories();
    return (
        <footer className="p-4 mt-8 border-t-2 bg-slate-800 text-slate-200 ">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <div className='flex flex-col max-w-fit space-y-1'>
                            <Link href="/" className="hover:text-gray-300 ">Home</Link>
                            <Link href="/cart" className="hover:text-gray-300 ">Cart</Link>
                            <Link href="/about-us" className="hover:text-gray-300 ">About Us</Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Top Categories</h3>
                        <div className='flex flex-col max-w-fit space-y-2'>
                            {categories.map(category => (
                                <Link  className='hover:text-gray-300 capitalize' href={`/?category=${category.slug}`} key={category.id}>{category.name}</Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Connect with me</h3>
                        <div className='flex flex-col max-w-fit space-y-2'>
                            <Link href="https://codepen.io/Ali1raz " className='hover:text-gray-300'>Codepen</Link>
                            <Link href="https://github.com/Ali1raz" className='hover:text-gray-300'>Github</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>


    )
}