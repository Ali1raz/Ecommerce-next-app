'use client';

import Link from "next/link";

export default function ProductButton({productId, getProduct}) {
    return (
        <Link href={`/products/${productId}`} className='w-fit'>
            <button
                className='bg-blue-900 text-white px-4 py-1 mt-1 hover:scale-105'
                onClick={() => getProduct(productId)}
            >
                See Product
            </button>
        </Link>
    )
}