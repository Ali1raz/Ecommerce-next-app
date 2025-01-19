// 'use client';

 import React from "react";
 import Image from "next/image";

export default function ProductCard({product}) {
     const {name, rating, priceCents} = product;

    return (
        <div className="flex sm:flex-col bg-gray-800">
            <div className="flex items-center justify-center h-[180px] bg-white">
                <Image
                    src={`/${product.image}`}
                    alt={name}
                    width={157}
                    height={180}
                    className="max-w-full max-h-full object-contain"
                />
            </div>

            <div className='p-3'>
                <p className="text-sm">{name}</p>
                <div className='flex items-center '>
                    <span className=''>{rating.stars}</span>
                    <span className=''></span>
                </div>
                <p className="font-bold">${(priceCents / 100)}</p>
            </div>
        </div>
    )
}