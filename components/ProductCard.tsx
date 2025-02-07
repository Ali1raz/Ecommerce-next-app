import React from "react";
import Image from "next/image";
import Link from "next/link";
import {formatDate, Product} from "@/utils";
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button";
import DeleteProductButton from "@/components/DeleteProductButton";


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
        <li className="flex flex-col  shadow-sm  bg-gray-800">
            <div className="flex items-center justify-center min-w-[157px] min-h-[180px] bg-slate-200 relative">
                {/*<Image ...></Image>*/}
                <Badge variant='destructive'
                       className='absolute top-1.5 right-1.5 py-1 px-4 text-xs   '>{stock_quantity}</Badge>
            </div>

            <div className='p-4 text-white'>
                <p className='line-clamp-1  capitalize '>{name}</p>
                <div className='flex  items-center justify-between mt-1'>
                    <p className="text-amber-600 text-lg font-bold flex gap-1 items-center">
                        <span className="text-xs">Rs</span>
                        <span>{price}</span>
                    </p>
                    <p>{rating} ⭐</p>
                </div>
                <Button variant='secondary' asChild className=' px-5 rounded-none py-1 mt-2'>
                    <Link href={`/products/${id}`}>View</Link>
                </Button>
                <Badge variant='secondary'
                       className='block text-white px-3 py-1 mt-4 bg-slate-700/80 text-xs w-fit'>{formatDate(created_at)}</Badge>
            </div>
        </li>
    )
}