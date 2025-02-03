import Link from "next/link";
import SearchForm from "@/app/components/SearchForm";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {findOrCreateUser, get_all_products} from "@/app/actions/actions";
import ProductsList from "@/app/components/ProductsList";

export default async function Home({searchParams}: { searchParams: Promise<{ query?: string }> }) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    const {query} = await searchParams;
    if (user) await findOrCreateUser()

    const products = await get_all_products(query);

    return (
        <>
            <div className='bg-pink-500 border-b-2 border-transparent'>
                <div className='text-center flex items-center flex-col py-4'>
                    <h2 className='font-bold md:text-5xl text-3xl'>Your one stop Shop, Anytime, Anywhere</h2>
                    <h3 className='text-xl font-semibold mt-4 uppercase px-5 py-1 text-black bg-yellow-400'>Shop
                        deal</h3>
                </div>
                <div className="flex items-center gap-2 max-w-3xl mx-auto px-8 my-4">
                    <SearchForm query={query}/>
                </div>
            </div>
            <div className='container px-6 py-4 max-w-6xl mx-auto '>
                <p className='mb-4 font-bold text-lg'>{query ? `Search results for "${query}"` : "All Products"}</p>

                <ProductsList data={products}/>
            </div>
        </>
    );
}
