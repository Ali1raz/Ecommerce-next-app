'use client'

import {TCategory} from "@/utils";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function CategoryButton({category}: {category: TCategory}) {
    return (
        <Button asChild variant='secondary' size='sm'
            className='cursor-pointer px-2 h-fit hover:bg-gray-300 text-xs'
    >
        <Link href={`/?category=${category.slug}`} passHref scroll={false}
        >
            <span className='line-clamp-1'>{category.name}</span>
        </Link>
        </Button>
    )
}