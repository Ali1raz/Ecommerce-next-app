import ProductCard from './ProductCard';
import {TProductProps} from "@/utils";


export default async function ProductsList({data}: {data: TProductProps[]}) {
    const products = await data;
    return (
        <div
            className='grid md:grid-cols-3 sm:grid-cols-2 gap-5'>
            {products && products.map(product => (
                <ProductCard key={product?.id} product={product}/>
            ))}
        </div>
    )
}