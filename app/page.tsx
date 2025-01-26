import Products from "@/app/components/Products";
import SearchForm from "@/app/components/SearchForm";
export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {

    const query = (await searchParams).query;
  return (
      <div>
          <div className='text-center my-4'>
              <h2 className='font-bold text-3xl'>New Year, now you</h2>
              <h3>Shop deal</h3>
          </div>
          <div className=" max-w-3xl mx-auto max-sm:mx-8 my-4">
              <SearchForm query={query}/>
          </div>
          <Products/>
      </div>
  );
}
