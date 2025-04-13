'use client'

import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import React from "react";

export default function GoBackButton({label, icon = <ArrowLeft />}: {label: string, icon?: React.ReactNode}) {
    const router = useRouter();
    return (
        <Button size='sm'
                onClick={() => {router.back()}}
                asChild
                variant='secondary'
                className='rounded-none hover:underline hover:cursor-pointer'>
            <span>{icon}{label}</span>
        </Button>
    )
}