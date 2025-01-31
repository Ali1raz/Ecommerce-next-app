import Form from "next/form";
import SearchFormReset from "@/app/components/SearchFormReset";
import {search_products} from "@/app/actions/actions";

export default function SearchForm({query}: { query?: string }) {
    return (
        <Form action='/' scroll={false}
              className="searchForm grow z-0 flex flex-row relative items-center justify-center">
            <input
                type="text"
                name="query"
                defaultValue={query}
                className="px-3 py-1 w-full outline-none outline-2 outline-offset-0 outline-transparent focus-within:outline-amber-300 text-gray-900"
                placeholder="Search..."/>
            <div className=' flex justify-center items-center gap-1 text-md sm:gap-4 absolute right-0 top-0'>
                {query && <SearchFormReset/>}
                <button className='px-2 py-1 bg-blue-900/50' type='submit'>🔎</button>
            </div>
        </Form>
    )
}