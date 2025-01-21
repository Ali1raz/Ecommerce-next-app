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
        <div className='grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 mx-2'>
            {products?.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}