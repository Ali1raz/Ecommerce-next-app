import Image from "next/image";
import React from "react";
import AddToCartButton from "./AddToCartButton";


export default function ProductDetails ({product}) {
    const {id, name, image, priceCents, rating: {stars, count}, keywords} = product;
    return (
        <div className='max-w-2xl sm:mx-auto mx-5'>
            <div className='w-full bg-white h-auto p-4 flex items-center justify-center'>
                <Image className='mx-auto ' src={`/${image}`} alt={name} width={200} height={200}/>
            </div>
            <div className="mt-6">
                <p>{name}</p>
                <p className="font-bold mt-2">${(priceCents / 100).toFixed(2)}</p>
                <div className='my-1 flex items-center justify-start gap-2'>
                    <p className='text-bold'>Rating:</p>
                    <Image className='inline' src={`/images/ratings/rating-${(stars * 10)}.png`}
                           alt={`alt-${(stars * 10)}`} width={100} height={10}/>
                    <p><span>{stars}</span> of <span>{count}</span> users</p>
                </div>
                <AddToCartButton productId={id}/>
            </div>
            <div className='mt-4 '>
                <h3>Tags:</h3>
                <div className="mt-3 flex items-center justify-start gap-3">

                    {keywords.map((kw, index) => {
                        return <button className='bg-amber-300 text-black  hover:scale-105 transition-all duration-100 py-1 px-2 rounded-2xl' key={index}>{kw}</button>
                    })}
                </div>
            </div>
        </div>
    )
}