import {prisma} from "@/lib/prisma";
import ProductDetails from "@/components/ProductDetails";
import GoBackButton from "@/components/GoBackButton";

export default async function ProductPage({params}: {params: {id: string}}) {
    const {id} = await params;
    const product = await prisma.product.findUnique({
        where: {id}
    })

    if (!product) {
        return (
            <div className='mt-2 max-w-4xl mx-auto'>
                <GoBackButton label='Back'/>
                <h1 className='text-2xl border-b text-center font-bold mb-4'>Product Not Found.</h1>
            </div>
        );
    }

    return (
        <div className='mt-2 max-w-4xl mx-auto'>
            <GoBackButton label='Back'/>
            <h1 className='text-2xl border-b text-center font-bold mb-4'>Product Details</h1>
            <ProductDetails product={product}/>
        </div>
    );
}
