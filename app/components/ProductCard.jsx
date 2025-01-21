 import React from "react";
 import Image from "next/image";
 import ProductButton from "@/app/components/ProductButton";
 import AddToCartButton from "@/app/components/AddToCartButton";

export default function ProductCard({product}) {
     const {name, id, rating, priceCents} = product;

     const getProduct = async (id) => {
         console.log("id", id);
     }

    return (
        <div className="flex sm:flex-col shadow-sm bg-gray-800">
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
                <p className="text-sm line-clamp-2">{name}</p>
                <div className=''>
                    <span className='text-sm'>{rating.stars} of {rating.count}</span>
                </div>
                <p className="font-bold">${(priceCents / 100).toFixed(2)}</p>
                <div className='flex sm:flex-col flex-row items-center gap-2 mt-2 '>
                    <ProductButton productId={id} getProduct={() =>getProduct(id)} />
                    <AddToCartButton productId={id} />
                </div>
            </div>
        </div>
    )
}