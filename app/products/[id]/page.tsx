import ProductDetails from "@/components/ProductDetails";
import GoBackButton from "@/components/GoBackButton";
import {get_product} from "@/app/actions/actions";
import {notFound} from "next/navigation";

type PageProps = {
    params: {
        id: string;
    }
}

export default async function ProductPage({params}: PageProps) {
    const {id} = params;
    const product = await get_product(id);

    if (!product) {
        notFound()
    }

    return (
        <div className='mt-2 max-w-4xl mx-auto'>
            <GoBackButton label='Back'/>
            <h1 className='text-2xl border-b text-center font-bold mb-4'>Product Details</h1>
            <ProductDetails product={product}/>
        </div>
    );
}
