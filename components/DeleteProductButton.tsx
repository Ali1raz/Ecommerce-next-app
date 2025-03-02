'use client'

import {Button} from "./ui/button";
import {delete_product} from "@/app/actions/actions";
import {cn} from "@/lib/utils";
import {toast} from "sonner";
import {AlertCircleIcon, CheckCircleIcon} from "lucide-react";

export default function DeleteProductButton({productId, className}: { productId: string, className?: string }) {
    async function handleDelete(id: string) {
        const result = await delete_product(id)
        toast(`${result.message}`, {
            icon: result.success ? <CheckCircleIcon/> : <AlertCircleIcon/>,
            dismissible: true,
            position: "top-right",
            style: {borderRadius: 0},
        })
    }

    return (
        <Button
            variant='ghost'
            onClick={() => handleDelete(productId)}
            className={cn('rounded-none active:bg-transparent h-fit p-0', className)}
        >Delete</Button>
    )
}