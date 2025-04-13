import Link from "next/link";
import {getToCategories} from "@/app/actions/actions";
import {mySocialLinks, routes, TCategory} from "@/utils";

export default async function Footer() {
    const categories:TCategory[] = await getToCategories();
    return (
        <footer className="p-4 mt-8 border-t-2 bg-slate-800 text-slate-200 ">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <div className='flex flex-col max-w-fit space-y-1'>
                            {routes.map(route => (
                                route.public && <Link className="hover:text-gray-300 capitalize" href={route.href} key={route.id}>{route.label}</Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Top Categories</h3>
                        <div className='flex flex-col max-w-fit space-y-2'>
                            {categories.map(category => (
                                <Link className='hover:text-gray-300 capitalize' href={`/?category=${category.slug}`} key={category.id}>{category.name}</Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Connect with me</h3>
                        <div className='flex flex-col max-w-fit space-y-2'>
                            {mySocialLinks.map(link => (
                                <Link href={link.href} key={link.id} className='hover:text-gray-300 capitalize'>{link.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>


    )
}