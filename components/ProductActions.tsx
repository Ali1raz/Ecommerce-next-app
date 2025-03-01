'use client'

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Eye, Edit, Trash, MoreVertical} from "lucide-react"
import Link from "next/link"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import DeleteProductButton from "@/components/DeleteProductButton";

export default function ProductActions(
    {className, product_id}:
    {className?: string, product_id: string}
) {

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='sm' variant='outline' className={cn(className, 'rounded-none')}>
                    <MoreVertical/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-none">
            <DropdownMenuItem className='cursor-pointer'><Eye/><Link href={`/products/${product_id}`}>View details</Link></DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'><Edit/>Edit product</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'><Trash/><DeleteProductButton productId={product_id} className='text-red-600 hover:text-red-600'/></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}