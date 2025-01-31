import ProductDetails from "../../components/ProductDetails";
import Link from "next/link";
import {prisma} from "../../../lib/prisma";

export default async function ProductPage({params}) {
    const {id} = await params;
    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    })

    return (
        <div className='mt-2'>
            <Link className='p-1 m-2 border border-transparent hover:border-white' href={`..`}>⬅️ Back</Link>
            <h1 className='text-2xl border-b text-center font-bold my-4'>Product Details</h1>
            <ProductDetails product={product}/>
        </div>

    );
}
