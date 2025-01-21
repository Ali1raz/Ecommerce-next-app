'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductDetails from "../../components/ProductDetails";
import Link from "next/link";

export default function ProductPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        fetch(`http://localhost:3000/api/products/${id}`)
            .then((res) => {
                if (!res.ok) {
                    setError(`Failed to fetch product: ${res.status}`);
                    return;
                }
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                setError(null);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));  // Ensure loading is set to false
    }, [id]);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center">Error: {error}</p>;
    }

    if (!product) {
        return <p className="text-center">Product not found</p>;
    }

    return (
        <div className='mt-2'>
            <Link className='p-1 m-2 border border-transparent hover:border-white' href={`..`}>⬅️ Back</Link>
            <h1 className='text-2xl border-b text-center font-bold my-4'>Product Details</h1>
            <ProductDetails product={product} />
        </div>

    );
}
