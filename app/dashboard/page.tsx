import {getStats} from "@/app/dashboard/actions";
import Link from "next/link";

export default async function Dashboard({searchParams}: {
    searchParams: Promise<{ filter?: string }>;
}) {
    const {filter} = await searchParams;
    const {success, data} = await getStats();

    if (!success) {
            return <>
                <h1 className='text-center text-2xl text-red-500'>Something gone wrong on server side</h1>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </>
    }
    return (
        <div className=''>
            {/*<Products products={data.products}/>*/}
            {filter && <Link href='/dashboard/' className='bg-amber-500 w-fit'>X {filter}</Link>}
            <pre className='text-wrap break-words'>{JSON.stringify(data[filter || 'users'], null, 2)}</pre>
        </div>
    )
}