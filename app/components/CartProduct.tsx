import Link from "next/link";
import React from "react";
import RemoveFromCartButton from "@/app/components/RemoveFromCartButton";
import {Product} from "@/utils";
import {Button} from "@/components/ui/button";

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
                        <Button
                            className='bg-blue-900 text-white px-5 py-1 mt-2'>
                            View
                        </Button>
                    </Link>
                    <RemoveFromCartButton id={id}/>
                </div>
            </div>
        </div>
    )
}