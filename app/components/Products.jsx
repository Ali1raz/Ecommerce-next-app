import ProductCard from './ProductCard';
import {prisma} from "@/lib/prisma";

async function getAllProducts() {
    const products = await prisma.product.findMany();
    return products;
}

export default async function Products() {

    const products = await getAllProducts();

    return (
        <div
            className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 mx-auto sm:px-8 px-4 max-w-6xl'>
            {products?.map(product => (
                <ProductCard key={product?.id} product={product}/>
            ))}
        </div>
    )
}