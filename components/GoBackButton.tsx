'use client'

import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function GoBackButton({label}: {label: string}) {
    const router = useRouter();
    return (
        <Button size='sm'
                onClick={() => {router.back()}}
                asChild
                variant='secondary'
                className='rounded-none hover:underline'>
            <Link href={`../`}><ArrowLeft/>{label}</Link>
        </Button>
    )
}