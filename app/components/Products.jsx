'use client';
import React from 'react';
import ProductCard from './ProductCard';

export default function Products() {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3000/api/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.log(err));
    }, []);

    return (
        <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 mx-auto sm:px-8 px-4 max-w-6xl'>
            {products?.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}