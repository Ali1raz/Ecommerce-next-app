import React from "react";
import Image from "next/image";
import Link from "next/link";
import {formatDate, Product} from "@/utils";


export default function ProductCard({product}: { product: Product }) {
    const {
        name,
        id,
        price,
        rating,
        created_at,
        stock_quantity
    } = product;


    return (
        <li className="flex flex-col  shadow-sm bg-gray-800">
            <div className="flex items-center justify-center min-w-[157px] min-h-[180px] bg-white relative">
                {/*<Image ...></Image>*/}
                <span
                    className='absolute top-1.5 right-1.5 py-1 px-4 text-xs drop-shadow-sm rounded-full bg-red-500 text-white'>{stock_quantity}</span>
            </div>

            <div className='p-4'>
                <p className='line-clamp-1  capitalize '>{name}</p>
                <div className='flex  items-center justify-between mt-1'>
                    <p className='text-md font-bold'>Rs {price}</p>
                    <p>{rating} ⭐</p>
                </div>
                <Link href={`/products/${id}`}>
                    <button className='bg-blue-900 text-white px-5 py-1 mt-2 transition duration-100 hover:scale-105'>
                        View
                    </button>
                </Link>
                <p className=' px-3 py-1 mt-4 bg-slate-700/80 text-sm w-fit rounded-full '>{formatDate(created_at)}</p>
            </div>
        </li>
    )
}