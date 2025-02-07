import SearchForm from "@/components/SearchForm";
import {find_or_save_user_to_db, get_all_products} from "@/app/actions/actions";
import ProductsList from "@/components/ProductsList";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {

  const { query } = await searchParams;
  const products = await get_all_products(query);

  const {isAuthenticated} = getKindeServerSession();
  if (await isAuthenticated()) await find_or_save_user_to_db()

  return (
    <>
      <div className="bg-pink-500 border-b-2 border-transparent">
        <div className="text-center flex items-center flex-col py-4">
          <h2 className="font-bold md:text-5xl text-3xl">
            Your one stop Shop, Anytime, Anywhere
          </h2>
          <h3 className="text-xl font-semibold mt-4 uppercase px-7 py-1 text-black bg-white">
            Shop deal
          </h3>
        </div>
        <div className="flex items-center gap-2 max-w-3xl mx-auto px-8 my-4">
          <SearchForm query={query} />
        </div>
      </div>
      <div className="container px-6 py-4 max-w-6xl mx-auto ">
        <p className="mb-4 font-bold text-2xl">
          {query ? `Search results for "${query}"` : "All Products"}
        </p>

        {products.length !== 0 ? (<ProductsList data={products}/>): (
            <h1 className='text-center text-2xl mt-8'>No products found.</h1>
        )}
      </div>
    </>
  );
}
