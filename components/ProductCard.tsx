import React from "react";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {formatDate, TProductProps} from "@/utils";
import {get_categories, getUserbyId} from "@/app/actions/actions";
import CategoryButton from "@/components/CategoryButton";

export default async function ProductCard({product}: { product: TProductProps}) {
    const {
        name,
        id: product_id,
        user_id,
        price,
        rating,
        created_at,
        stock_quantity,
    } = product;
    const categories = await get_categories(product_id)
    const user = await getUserbyId(user_id);

    return (
        <div className="shadow-sm max-sm:max-w-[400px] bg-gray-800">
            <div className="flex items-center justify-center max-w-2xl min-h-[180px] bg-slate-200 relative">
                {/*<Image ...></Image>*/}
                <Badge variant='destructive'
                       className='absolute top-1.5 right-1.5 text-xs'>{stock_quantity} in stock</Badge>
            </div>

            <div className='text-white p-4'>
                <Link href={`/products/${product_id}`}
                      className='hover:text-gray-200 line-clamp-1 capitalize w-fit'>
                    {name}
                </Link>
                <div className='flex  items-center justify-between mt-1'>
                    <p className="text-amber-600 flex gap-1 items-center">
                        <span className="text-xs">Rs </span>
                        <span className='font-bold text-lg'>{price}</span>
                    </p>
                    <p>{rating} ⭐</p>
                </div>
                <div className='flex items-center overflow-scroll scrollbar-none mt-2 gap-2'>
                    {categories.map((category) => (
                        <CategoryButton category={category} key={category.id} />
                    ))}
                </div>
                <Button size='sm' variant='link' className='text-gray-300 text-sm' asChild>
                    <Link href={`/user/${user_id}`}>{user?.name}</Link>
                </Button>
                <Badge variant='default' className='block text-white mt-2 px-3 py-1 bg-slate-700/80 text-xs w-fit'>{formatDate(created_at)}</Badge>
            </div>
        </div>
    )
}