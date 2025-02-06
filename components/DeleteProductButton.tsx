'use client'

import {Button} from "./ui/button";
import {delete_product} from "@/app/actions/actions";

export default function DeleteProductButton({productId}: { productId: string }) {
    console.log(productId);
    async function handleDelete(id: string) {
        await delete_product(id)
    }

    return (
        <Button onClick={() => handleDelete(productId)} variant='destructive' className='rounded-none'>Delete</Button>
    )
}