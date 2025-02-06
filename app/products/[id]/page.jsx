import Link from "next/link";
import {prisma} from "../../../lib/prisma";
import {Button} from "../../../components/ui/button";
import ProductDetails from "../../../components/ProductDetails";

export default async function ProductPage({params}) {
    const {id} = await params;
    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    })

    return (
        <div className='mt-2 max-w-4xl mx-auto '>
            <Button asChild variant='secondary' className='py-1 px-3 border-1 rounded-none'>
                <Link className=' ' href={`..`}>Back</Link>
            </Button>
            <h1 className='text-2xl border-b text-center font-bold my-4'>Product Details</h1>
            <ProductDetails product={product}/>
        </div>

    );
}
