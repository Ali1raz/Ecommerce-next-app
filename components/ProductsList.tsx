import ProductCard from './ProductCard';
import {TProductProps} from "@/utils";

export default function ProductsList({data}: {data: TProductProps[]}) {
    const products = data;
    return (
        <div
            className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4'>
            {products && products.map(product => (
                <ProductCard key={product?.id} product={product}/>
            ))}
        </div>
    )
}