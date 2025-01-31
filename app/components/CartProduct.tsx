import Link from "next/link";
import React from "react";
import RemoveFromCartButton from "@/app/components/RemoveFromCartButton";

type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    total: number;
}

export default function CartProduct({product}: { product: Product }) {
    const {name, id, quantity, total, price, description} = product;
    return (
        <div className="flex flex-col  shadow-sm bg-gray-800">
            <div className="flex items-center justify-center min-w-[157px] min-h-[180px] bg-white relative">
                {/*<Image ...></Image>*/}
                <span
                    className='absolute top-1.5 right-1.5 py-1 px-4 text-xs drop-shadow-sm rounded-full bg-red-500 text-white'>{quantity}</span>
            </div>
            <div className='p-4'>
                <p className='line-clamp-1 text-[18px] font-bold capitalize '>{name}</p>
                <div className='flex  items-center justify-between mt-1'>
                    <p className='text-md font-bold'>Total Rs: {total}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <Link href={`/products/${id}`}>
                        <button
                            className='bg-blue-900 text-white px-5 py-1 mt-2 transition duration-100 hover:scale-105'>
                            View
                        </button>
                    </Link>
                    <RemoveFromCartButton id={id}/>
                </div>
            </div>
        </div>
    )
}