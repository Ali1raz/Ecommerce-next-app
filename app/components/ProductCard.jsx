 import React from "react";
 import Image from "next/image";
 import ProductButton from "./ProductButton";
 import AddToCartButton from "./AddToCartButton";

export default function ProductCard({product}) {
     const {name, id, image, rating, priceCents} = product;

     const getProduct = async (id) => {
         console.log("id", id);
     }

    return (
        <div className="flex flex-row sm:flex-col  shadow-sm bg-gray-800">
            <div className="flex items-center justify-center min-w-[157px] min-h-[180px] bg-white">
                <Image
                    src={`/${image}`}
                    alt={name}
                    width={157}
                    height={180}
                    className="max-w-full max-h-[180px] object-contain"
                />
            </div>

            <div className='p-4 grow'>
                <p className="text-sm line-clamp-1">{name}</p>
                <div className=''>
                    <span className='text-sm'>{rating.stars} of {rating.count}</span>
                </div>
                <p className="font-bold">${(priceCents / 100).toFixed(2)}</p>
                <div className='flex flex-col max-sm:items-stretch items-center gap-2 mt-2'>
                    <ProductButton productId={id} getProduct={() =>getProduct(id)} />
                    <AddToCartButton productId={id} />
                </div>
            </div>
        </div>
    )
}