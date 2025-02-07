import ProductCard from './ProductCard';
import {TProductProps} from "@/utils";


export default function ProductsList({data}: {data: TProductProps[]}) {
    const products = data;
    return (
        <div
            className='grid md:grid-cols-3 sm:grid-cols-2 gap-5'>
            {products && products.map(product => (
                <ProductCard key={product?.id} product={product}/>
            ))}
        </div>
    )
}