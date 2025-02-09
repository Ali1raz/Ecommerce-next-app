import React from "react";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {formatDate, TProductProps} from "@/utils";
import {getUserbyId} from "@/app/actions/actions";

export default async function ProductCard({product}: { product: TProductProps}) {
    const {
        name,
        id,
        user_id,
        price,
        rating,
        created_at,
        stock_quantity,
        categories
    } = product;

    const {name: ownerName} = await getUserbyId(user_id);

    return (
        <li className="flex flex-col  shadow-sm  bg-gray-800">
            <div className="flex items-center justify-center min-w-[157px] min-h-[180px] bg-slate-200 relative">
                {/*<Image ...></Image>*/}
                <Badge variant='destructive'
                       className='absolute top-1.5 right-1.5 py-1 px-4 text-xs'>{stock_quantity}</Badge>
            </div>

            <div className='p-4 text-white'>
                <Link href={`/products/${id}`} className='hover:text-gray-200'>
                    <p className='line-clamp-1 capitalize'>{name}</p>
                </Link>
                <div className='flex  items-center justify-between mt-1'>
                    <p className="text-amber-600 flex gap-1 items-center">
                        <span className="text-xs">Rs</span>
                        <span className='font-bold text-lg'>{price}</span>
                    </p>
                    <p>{rating} ⭐</p>
                </div>
                <div className='flex items-center gap-2'>
                    {categories.map((category) => (
                        <Badge variant='secondary' className=''
                              key={category.category_id}>{category.category_name}</Badge>
                    ))}
                </div>
                <Button variant='link' className='text-gray-300 text-xs p-0 m-0' asChild><Link
                    href={`/user/${user_id}`}>{ownerName}</Link></Button>
                <Badge variant='secondary'
                       className='block text-white px-3 py-1 mt-4 bg-slate-700/80 text-xs w-fit'>{formatDate(created_at)}</Badge>
            </div>
        </li>
    )
}